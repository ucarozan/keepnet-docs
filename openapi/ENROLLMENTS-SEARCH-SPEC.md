# POST /api/enrollments/search — OpenAPI Spec Özeti

Spec dosyası: `keepnet-api-spec.json`

---

## 1. Endpoint

- **Path:** `/api/enrollments/search`
- **Method:** POST
- **Tags:** Enrollment
- **Summary:** "Returns a list of enrollments"

---

## 2. Request body: SearchEnrollmentRequest

| Alan            | Zorunlu | Tip                          | Açıklama |
|-----------------|---------|------------------------------|----------|
| **filter**      | evet    | Filter                       | Koşul, filterGroups, searchInputTextValue |
| **enrollmentType** | hayır | EnrollmentTypeRequestEnum    | Spec'te sadece `$ref` ile tanımlı |
| pageNumber      | hayır   | integer (int32)              | |
| pageSize        | hayır   | integer (int32)              | |
| orderBy         | hayır   | string (nullable)            | |
| ascending       | hayır   | boolean                      | |

---

## 3. EnrollmentTypeRequestEnum (spec’te)

```json
"KeepnetLabs.AwarenessEducator.Core.Enums.EnrollmentTypeRequestEnum": {
  "type": "string"
}
```

**Spec’te olası değerler (enum listesi) YOK.** Sadece `type: string` tanımlı; "Survey", "Training" veya sayısal değerler spec’te geçmiyor.

---

## 4. Response: EnrollmentSearchRestView (her bir result)

Response’taki her kayıtta yer alan alanlardan ilgili olanlar:

| Alan          | Tip     | Açıklama |
|---------------|---------|----------|
| enrollmentId  | string  | |
| name          | string  | |
| **type**      | string (readOnly) | Response’ta enrollment türü (örn. "Survey", "Training") bu alanda dönüyor. |
| status        | string  | |
| trainingName  | string  | |
| delivery      | string  | |
| deliveryType  | string  | |
| ...           |         | (tags, languages, startDate, createTime, vb.) |

Yani **response’ta** `type` ile Survey/Training ayrımı var; **request’teki** `enrollmentType` için spec’te sadece “string” var, enum değerleri yok.

---

## 5. Enum değerlerini nereden öğrenmek?

**GET /api/enrollments/form-details**

- **Summary:** "Gets Enrollment Enums Names and Values"
- **Response:** `EnrollmentEnumTypesDTO`
  - **enumNameValuePairs:** object, key’ler enum adları, value’lar `EnumResult[]` (name/value çiftleri)

Yani **enrollmentType** için kabul edilen değerler (Survey, Training vb.) spec’te sabit yazılı değil; **GET /api/enrollments/form-details** cevabındaki `enumNameValuePairs` içinde yer alıyor.

---

## 6. Sonuç

- **Aradığımız şey (Survey/Training için request değeri):** Spec’te **yok**.  
- **Nerede var:** **GET /api/enrollments/form-details** yanıtında `enumNameValuePairs` içinde (runtime’da dönen enum listesi).
