#!/usr/bin/env python3
"""
E2E: Company Admin (or scoped Reseller) phishing campaign job report flow.

Loads credentials from ~/.zhc.env or ~/zhc.env (same as test-api-flow.sh).
Does not print client_secret or access_token.

Optional env:
  KEEPNET_API_BASE_URL
  KEEPNET_TEST_COMPANY_RESOURCE_ID  (Reseller: scope header; omit for Company Admin-style calls)
  CLIENT_ID / CLIENT_SECRET or KEEPNET_CLIENT_ID / KEEPNET_CLIENT_SECRET

Exit 0 when all required steps return HTTP 200.
"""

from __future__ import annotations

import json
import os
import re
import subprocess
import sys
import urllib.parse
from pathlib import Path


def load_env_files() -> None:
    for p in (Path.home() / ".zhc.env", Path.home() / "zhc.env"):
        if not p.is_file():
            continue
        for line in p.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            line = re.sub(r"^export\s+", "", line)
            key, _, val = line.partition("=")
            key, val = key.strip(), val.strip().strip('"').strip("'")
            if key and key not in os.environ:
                os.environ[key] = val


def curl_json(method: str, url: str, headers: list[str], data: str | None = None) -> tuple[int, dict | list | str]:
    cmd = ["curl", "-s", "-S", "-w", "\n%{http_code}", "-X", method, url]
    for h in headers:
        cmd.extend(["-H", h])
    if data is not None:
        cmd.extend(["-H", "Content-Type: application/json", "-d", data])
    out = subprocess.check_output(cmd, text=True, stderr=subprocess.PIPE)
    body, code_s = out.rsplit("\n", 1)
    code = int(code_s)
    if not body.strip():
        return code, {}
    try:
        return code, json.loads(body)
    except json.JSONDecodeError:
        return code, body


def curl_form_token(url: str, form_body: str) -> tuple[int, dict]:
    cmd = [
        "curl",
        "-s",
        "-S",
        "-w",
        "\n%{http_code}",
        "-X",
        "POST",
        url,
        "-H",
        "Content-Type: application/x-www-form-urlencoded",
        "-d",
        form_body,
    ]
    out = subprocess.check_output(cmd, text=True, stderr=subprocess.PIPE)
    body, code_s = out.rsplit("\n", 1)
    return int(code_s), json.loads(body)


def main() -> int:
    load_env_files()
    base = os.environ.get("KEEPNET_API_BASE_URL", "https://api.keepnetlabs.com").rstrip("/")
    cid = os.environ.get("CLIENT_ID") or os.environ.get("KEEPNET_CLIENT_ID")
    csec = os.environ.get("CLIENT_SECRET") or os.environ.get("KEEPNET_CLIENT_SECRET")
    if not cid or not csec:
        print("ERROR: Set KEEPNET_CLIENT_ID and KEEPNET_CLIENT_SECRET in ~/.zhc.env", file=sys.stderr)
        return 1

    company_id = os.environ.get("KEEPNET_TEST_COMPANY_RESOURCE_ID", "").strip()

    form = urllib.parse.urlencode(
        {
            "grant_type": "client_credentials",
            "client_id": cid,
            "client_secret": csec,
            "scope": "api1",
        }
    )
    code, tok = curl_form_token(f"{base}/connect/token", form)
    if code != 200 or "access_token" not in tok:
        print(f"FAIL POST /connect/token HTTP {code}")
        return 1
    print("OK POST /connect/token")
    token = tok["access_token"]
    auth = f"Authorization: Bearer {token}"

    scope_headers = [auth]
    if company_id:
        scope_headers.append(f"X-KEEPNET-Company-Id: {company_id}")

    if not company_id:
        # Reseller token: pick first managed company for scoped job-report search
        search_body = json.dumps(
            {
                "pageNumber": 1,
                "pageSize": 1,
                "orderBy": "CreateTime",
                "ascending": False,
                "filter": {"Condition": "AND", "SearchInputTextValue": ""},
            }
        )
        code, comp = curl_json("POST", f"{base}/api/companies/search", [auth], search_body)
        if code == 200 and isinstance(comp, dict):
            rows = (comp.get("data") or {}).get("results") or []
            if rows and rows[0].get("companyResourceId"):
                company_id = rows[0]["companyResourceId"]
                scope_headers.append(f"X-KEEPNET-Company-Id: {company_id}")
                print("INFO using X-KEEPNET-Company-Id from companies/search (Reseller)")

    camp_body = json.dumps(
        {
            "pageNumber": 1,
            "pageSize": 5,
            "orderBy": "CreateTime",
            "ascending": False,
            "filter": {"Condition": "AND", "SearchInputTextValue": ""},
        }
    )
    job_body = json.dumps(
        {
            "pageNumber": 1,
            "pageSize": 5,
            "orderBy": "Name",
            "ascending": False,
            "filter": {"Condition": "AND", "SearchInputTextValue": ""},
        }
    )
    user_body = json.dumps(
        {
            "pageNumber": 1,
            "pageSize": 10,
            "orderBy": "Email",
            "ascending": False,
            "filter": {"Condition": "AND", "SearchInputTextValue": ""},
        }
    )

    code, _ = curl_json("POST", f"{base}/api/phishing-simulator/phishing-campaign/search", scope_headers, camp_body)
    if code != 200:
        print(f"FAIL POST phishing-campaign/search HTTP {code}")
        return 1
    print("OK POST phishing-campaign/search")

    code, job_resp = curl_json(
        "POST",
        f"{base}/api/phishing-simulator/phishing-campaign-job-report/search",
        scope_headers,
        job_body,
    )
    if code != 200:
        print(f"FAIL POST phishing-campaign-job-report/search HTTP {code}")
        return 1
    print("OK POST phishing-campaign-job-report/search")

    results = (job_resp.get("data") or {}).get("results") if isinstance(job_resp, dict) else None
    if not results:
        print("SKIP no campaign jobs in tenant (empty results)")
        return 0

    row = results[0]
    pcrid = row.get("phishingCampaignResourceId")
    inst = row.get("instanceGroup")
    if not pcrid or inst is None:
        print("FAIL job row missing phishingCampaignResourceId or instanceGroup")
        return 1

    code, _ = curl_json(
        "GET",
        f"{base}/api/phishing-simulator/phishing-campaign-job-report/summary/{pcrid}/{inst}",
        scope_headers,
    )
    if code != 200:
        print(f"FAIL GET summary HTTP {code}")
        return 1
    print("OK GET summary")

    for search_type in ("Opened", "Clicked", "All"):
        code, _ = curl_json(
            "POST",
            f"{base}/api/phishing-simulator/phishing-campaign-job-report/{search_type}/search/{pcrid}/{inst}",
            scope_headers,
            user_body,
        )
        if code != 200:
            print(f"FAIL POST {search_type}/search HTTP {code}")
            return 1
        print(f"OK POST {search_type}/search")

    code, all_resp = curl_json(
        "POST",
        f"{base}/api/phishing-simulator/phishing-campaign-job-report/All/search/{pcrid}/{inst}",
        scope_headers,
        user_body,
    )
    users = (all_resp.get("data") or {}).get("results") if isinstance(all_resp, dict) else []
    if users and users[0].get("resourceId"):
        urid = users[0]["resourceId"]
        for ep in ("search-email-opened", "search-email-clicked", "search-email-submitted"):
            code, _ = curl_json(
                "POST",
                f"{base}/api/phishing-simulator/phishing-campaign-job-report/{ep}/{urid}",
                scope_headers,
                user_body,
            )
            if code != 200:
                print(f"FAIL POST {ep}/{{userResourceId}} HTTP {code}")
                return 1
            print(f"OK POST {ep}/{{userResourceId}}")

    print("ALL CHECKS PASSED")
    return 0


if __name__ == "__main__":
    sys.exit(main())
