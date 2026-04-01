#!/usr/bin/env python3
"""
End-to-end Reseller test: create REST API client for a managed company, verify, delete.

Loads credentials from ~/.zhc.env or ~/zhc.env (same pattern as test-api-flow.sh).
Does not print client_secret or access_token.

Usage:
  python3 scripts/test-reseller-rest-api-client-e2e.py

Optional env:
  KEEPNET_API_BASE_URL       (default https://api.keepnetlabs.com)
  KEEPNET_TEST_COMPANY_RESOURCE_ID   (default: first company from companies/search)
  KEEPNET_TEST_ROLE_RESOURCE_ID      (default: role named "Company Admin" from GET /api/roles)
  CLIENT_ID / CLIENT_SECRET or KEEPNET_CLIENT_ID / KEEPNET_CLIENT_SECRET
"""

from __future__ import annotations

import json
import os
import subprocess
import sys
import time
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
            key, _, val = line.partition("=")
            key, val = key.strip(), val.strip().strip('"').strip("'")
            if key and key not in os.environ:
                os.environ[key] = val


def curl_json(method: str, url: str, headers: list[str], data: str | None = None) -> dict:
    cmd = ["curl", "-s", "-S", "-X", method, url, *headers]
    if data is not None:
        cmd.extend(["-H", "Content-Type: application/json", "-d", data])
    out = subprocess.check_output(cmd, text=True, stderr=subprocess.PIPE)
    return json.loads(out)


def curl_form_post(url: str, form_body: str) -> dict:
    cmd = [
        "curl",
        "-s",
        "-S",
        "-X",
        "POST",
        url,
        "-H",
        "Content-Type: application/x-www-form-urlencoded",
        "-d",
        form_body,
    ]
    out = subprocess.check_output(cmd, text=True, stderr=subprocess.PIPE)
    return json.loads(out)


def main() -> int:
    load_env_files()
    base = os.environ.get("KEEPNET_API_BASE_URL", "https://api.keepnetlabs.com").rstrip("/")
    cid = os.environ.get("CLIENT_ID") or os.environ.get("KEEPNET_CLIENT_ID")
    csec = os.environ.get("CLIENT_SECRET") or os.environ.get("KEEPNET_CLIENT_SECRET")
    if not cid or not csec:
        print("ERROR: Set CLIENT_ID/KEEPNET_CLIENT_ID and CLIENT_SECRET/KEEPNET_CLIENT_SECRET in ~/.zhc.env", file=sys.stderr)
        return 1

    # 1) Token
    body = urllib.parse.urlencode(
        {
            "grant_type": "client_credentials",
            "client_id": cid,
            "client_secret": csec,
            "scope": "api1",
        }
    )
    tok = curl_form_post(f"{base}/connect/token", body)
    access = tok.get("access_token")
    if not access:
        print("ERROR: token response missing access_token", file=sys.stderr)
        return 1
    print("OK POST /connect/token")

    auth_h = f"Authorization: Bearer {access}"

    # 2) Companies search
    comp = curl_json(
        "POST",
        f"{base}/api/companies/search",
        ["-H", auth_h, "-H", "Content-Type: application/json"],
        json.dumps(
            {
                "pageNumber": 1,
                "pageSize": 5,
                "orderBy": "CreateTime",
                "ascending": False,
                "filter": None,
            }
        ),
    )
    results = (comp.get("data") or {}).get("results") or []
    if not results:
        print("ERROR: companies/search returned no results", file=sys.stderr)
        return 1
    company_id = os.environ.get("KEEPNET_TEST_COMPANY_RESOURCE_ID") or results[0].get("companyResourceId")
    if not company_id:
        print("ERROR: no companyResourceId", file=sys.stderr)
        return 1
    print("OK POST /api/companies/search companyResourceId=", company_id)

    scope_headers = ["-H", auth_h, "-H", f"X-KEEPNET-Company-Id: {company_id}"]

    # 3) GET roles
    roles_resp = curl_json("GET", f"{base}/api/roles", scope_headers)
    rlist = roles_resp.get("data") or []
    if not isinstance(rlist, list) or not rlist:
        print("ERROR: GET /api/roles returned no data list", file=sys.stderr)
        return 1
    role_id = os.environ.get("KEEPNET_TEST_ROLE_RESOURCE_ID")
    if not role_id:
        for r in rlist:
            if (r.get("name") or "").strip() == "Company Admin":
                role_id = r.get("resourceId")
                break
        if not role_id:
            role_id = rlist[0].get("resourceId")
    if not role_id:
        print("ERROR: could not pick roleResourceId", file=sys.stderr)
        return 1
    print("OK GET /api/roles roleResourceId=", role_id)

    # 4) Generate credentials
    gen = curl_json("GET", f"{base}/api/companies/clients/generate-client-credentials", scope_headers)
    gdata = gen.get("data") or {}
    gcid, gsec = gdata.get("clientId"), gdata.get("clientSecret")
    if not gcid or not gsec:
        print("ERROR: generate-client-credentials missing clientId/clientSecret in data", file=sys.stderr)
        return 1
    print("OK GET /api/companies/clients/generate-client-credentials")

    # 5) Create client
    name = f"E2E script test {int(time.time())}"
    create_body = {
        "name": name,
        "clientId": gcid,
        "clientSecret": gsec,
        "statusId": 1,
        "hasIpAddressRestriction": False,
        "roleResourceIdList": [role_id],
    }
    created = curl_json(
        "POST",
        f"{base}/api/companies/clients",
        scope_headers + ["-H", "Content-Type: application/json"],
        json.dumps(create_body),
    )
    inner = created.get("data") or {}
    rid = inner.get("resourceId") or inner.get("id")
    if not rid:
        print(
            "ERROR: POST /api/companies/clients failed:",
            created.get("message") or created.get("Message"),
            created.get("validationMessages") or created.get("ValidationMessages"),
            file=sys.stderr,
        )
        return 1
    print("OK POST /api/companies/clients resourceId=", rid)

    # 6) GET client
    got = curl_json("GET", f"{base}/api/companies/clients/{rid}", scope_headers)
    if (got.get("data") or {}).get("resourceId") != rid:
        print("ERROR: GET client mismatch", file=sys.stderr)
        return 1
    print("OK GET /api/companies/clients/{resourceId}")

    # 7) clients/search — minimal filter (verified 200 on api.keepnetlabs.com)
    search_body = {
        "pageNumber": 1,
        "pageSize": 10,
        "orderBy": "CreateTime",
        "ascending": False,
        "filter": {"Condition": "AND", "SearchInputTextValue": ""},
    }
    try:
        srch = curl_json(
            "POST",
            f"{base}/api/companies/clients/search",
            scope_headers + ["-H", "Content-Type: application/json"],
            json.dumps(search_body),
        )
        st = (srch.get("Status") or srch.get("status") or "").upper()
        if st == "INTERNAL_SERVER_ERROR" or st == "INPUT_ERROR":
            print("ERROR POST /api/companies/clients/search:", srch.get("Message") or srch.get("message"), srch.get("validationMessages"), file=sys.stderr)
            return 1
        found = [x for x in ((srch.get("data") or {}).get("results") or []) if x.get("resourceId") == rid]
        print("OK POST /api/companies/clients/search" if found else "WARN POST /api/companies/clients/search row not in first page")
    except (subprocess.CalledProcessError, json.JSONDecodeError) as e:
        print("ERROR clients/search:", e, file=sys.stderr)
        return 1

    # 8) Delete
    curl_json("DELETE", f"{base}/api/companies/clients/{rid}", scope_headers)
    print("OK DELETE /api/companies/clients/{resourceId}")

    print("ALL_OK")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
