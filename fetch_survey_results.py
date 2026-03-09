#!/usr/bin/env python3
"""
Security Culture - Keepnet survey: Tüm kullanıcılar için exam-result-sessions çeker,
ham JSON ve analiz için düz tablo (CSV) üretir.
Çalıştırma: .zhc.env yüklü ortamda python3 fetch_survey_results.py
"""
import json
import os
import re
import time
import urllib.request
from pathlib import Path

ENROLLMENT_ID = "7cc15c9d-b411-4b6a-b7f4-b72abe043d6f"
COMPANY_ID = "jZlbh5B9vyA1"
BASE_URL = "https://api.keepnetlabs.com"
USERS_FILE = Path(__file__).parent / "survey-users-list.json"
OUT_FULL_JSON = Path(__file__).parent / "survey-results-full.json"
OUT_FLAT_CSV = Path(__file__).parent / "survey-results-for-analysis.csv"
OUT_RESPONSES_CSV = Path(__file__).parent / "survey-responses-by-question.csv"


def load_dotenv(path: Path) -> None:
    if not path.exists():
        return
    with open(path, encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            if "=" in line:
                k, v = line.split("=", 1)
                v = v.strip().strip('"').strip("'")
                os.environ.setdefault(k.strip(), v)


def get_token() -> str:
    client_id = os.environ.get("KEEPNET_CLIENT_ID") or os.environ.get("CLIENT_ID")
    client_secret = os.environ.get("KEEPNET_CLIENT_SECRET") or os.environ.get("CLIENT_SECRET")
    if not client_id or not client_secret:
        raise SystemExit("KEEPNET_CLIENT_ID ve KEEPNET_CLIENT_SECRET gerekli (.zhc.env)")
    data = (
        "grant_type=client_credentials"
        f"&client_id={urllib.parse.quote(client_id)}"
        f"&client_secret={urllib.parse.quote(client_secret)}"
        "&scope=api1"
    ).encode()
    req = urllib.request.Request(
        f"{BASE_URL}/connect/token",
        data=data,
        method="POST",
        headers={"Content-Type": "application/x-www-form-urlencoded"},
    )
    with urllib.request.urlopen(req, timeout=15) as r:
        body = json.loads(r.read().decode())
    return body["access_token"]


def fetch_sessions(token: str, target_user_id: str) -> list:
    url = f"{BASE_URL}/api/training-reports/{ENROLLMENT_ID}/exam-result-sessions/{target_user_id}"
    req = urllib.request.Request(
        url,
        method="GET",
        headers={
            "Authorization": f"Bearer {token}",
            "X-KEEPNET-Company-Id": COMPANY_ID,
            "x-ir-company-id": COMPANY_ID,
        },
    )
    with urllib.request.urlopen(req, timeout=30) as r:
        out = json.loads(r.read().decode())
    return out.get("data") or []


def parse_latency(latency: str) -> float:
    """PT0H0M4S -> saniye."""
    if not latency:
        return 0.0
    m = re.match(r"PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?", latency)
    if not m:
        return 0.0
    h, mi, s = (int(g or 0) for g in m.groups())
    return h * 3600 + mi * 60 + s


def main() -> None:
    load_dotenv(Path.home() / ".zhc.env")
    token = get_token()

    with open(USERS_FILE, encoding="utf-8") as f:
        payload = json.load(f)
    users = payload["users"]

    full_result = {
        "enrollmentId": ENROLLMENT_ID,
        "companyId": COMPANY_ID,
        "totalUsers": len(users),
        "users": [],
    }

    flat_rows = []
    for i, u in enumerate(users):
        uid = u["targetUserResourceId"]
        email = u.get("email", "")
        status = u.get("status", "")
        first_name = u.get("firstName", "")
        last_name = u.get("lastName", "")
        last_interaction = u.get("lastInteractionDate", "")
        print(f"[{i+1}/{len(users)}] {email} ({status}) ...", end=" ", flush=True)
        try:
            sessions = fetch_sessions(token, uid)
        except Exception as e:
            print(f"ERR: {e}")
            full_result["users"].append({
                "user": u,
                "sessions": [],
                "error": str(e),
            })
            time.sleep(0.5)
            continue
        full_result["users"].append({"user": u, "sessions": sessions})
        # Düz tablo: her soru-cevap bir satır
        for sess in sessions:
            human = sess.get("interactionsHumanReadable") or []
            for q in human:
                response_label = ""
                for a in q.get("answers") or []:
                    if a.get("isUserAnswer"):
                        response_label = a.get("option", "")
                        break
                response_code = (q.get("studentOrLearnerResponse") or "").split("_")[0]
                flat_rows.append({
                    "email": email,
                    "targetUserResourceId": uid,
                    "status": status,
                    "firstName": first_name,
                    "lastName": last_name,
                    "lastInteractionDate": last_interaction,
                    "question_index": q.get("index", ""),
                    "question_text": (q.get("question") or q.get("description") or "").replace("\n", " "),
                    "response_label": response_label,
                    "response_code": response_code,
                    "latency_seconds": parse_latency(q.get("latency") or ""),
                })
        print(len(sessions), "session(s),", sum(len(s.get("interactionsHumanReadable") or []) for s in sessions), "answers")
        time.sleep(0.35)

    with open(OUT_FULL_JSON, "w", encoding="utf-8") as f:
        json.dump(full_result, f, indent=2, ensure_ascii=False)

    # CSV: flat
    if flat_rows:
        import csv
        cols = list(flat_rows[0].keys())
        with open(OUT_FLAT_CSV, "w", encoding="utf-8", newline="") as f:
            w = csv.DictWriter(f, fieldnames=cols)
            w.writeheader()
            w.writerows(flat_rows)
        print(f"Wrote {OUT_FLAT_CSV} ({len(flat_rows)} rows)")

    # CSV: one row per user, questions as columns (Q0, Q1, ... response label)
    by_user = {}
    for r in flat_rows:
        key = (r["email"], r["targetUserResourceId"], r["status"])
        if key not in by_user:
            by_user[key] = {"email": r["email"], "targetUserResourceId": r["targetUserResourceId"], "status": r["status"], "firstName": r["firstName"], "lastName": r["lastName"], "lastInteractionDate": r["lastInteractionDate"]}
        idx = r["question_index"]
        by_user[key][f"Q{idx}"] = r["response_label"]
    if by_user:
        import csv
        all_cols = ["email", "targetUserResourceId", "status", "firstName", "lastName", "lastInteractionDate"]
        max_q = -1
        for row in by_user.values():
            for k in row:
                if k.startswith("Q"):
                    max_q = max(max_q, int(k[1:]))
        max_q_idx = max_q  # 0..39
        for i in range(max_q_idx + 1):
            all_cols.append(f"Q{i}")
        with open(OUT_RESPONSES_CSV, "w", encoding="utf-8", newline="") as f:
            w = csv.DictWriter(f, fieldnames=all_cols, extrasaction="ignore")
            w.writeheader()
            for row in by_user.values():
                w.writerow({c: row.get(c, "") for c in all_cols})
        print(f"Wrote {OUT_RESPONSES_CSV} ({len(by_user)} users, Q0..Q{max_q_idx})")

    print(f"Wrote {OUT_FULL_JSON}")


if __name__ == "__main__":
    main()
