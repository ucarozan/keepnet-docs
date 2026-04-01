#!/usr/bin/env node
/**
 * OpenAPI spec enrichment script
 * Fetches the live Keepnet API spec and adds tags + x-parent to build the GitBook menu hierarchy.
 *
 * Search/list request `example` payloads: minimal `filter` (Condition + SearchInputTextValue: ''),
 * explicit `orderBy` / `ascending`, no `searchInputTextValue: null` (team docs standard; not stored in public repo).
 *
 * Usage: node scripts/enrich-openapi-spec.mjs [output-path]
 * Default output: openapi/keepnet-api-spec.json
 */

const SPEC_URL = 'https://api.keepnetlabs.com/swagger/v1/swagger.json';
const DEFAULT_OUTPUT = 'openapi/keepnet-api-spec.json';
const PARENT_TAG = 'endpoints';
const API_BASE_URL = 'https://api.keepnetlabs.com';

async function fetchSpec() {
  const res = await fetch(SPEC_URL);
  if (!res.ok) throw new Error(`Spec fetch failed: ${res.status} ${res.statusText}`);
  return res.json();
}

function collectTagsFromPaths(spec) {
  const tags = new Set();
  for (const path of Object.values(spec.paths || {})) {
    for (const op of Object.values(path)) {
      if (op && Array.isArray(op.tags)) {
        op.tags.forEach((t) => tags.add(t));
      }
    }
  }
  return [...tags].sort();
}

/** OAuth token endpoint — for GitBook Test it. Do not show in Endpoints menu (documented in Quickstart). */
/** x-scalar-ignore: Hides token endpoint from API client list. User only uses Authorize; avoids invalid_client when using Send. */
const CONNECT_TOKEN_PATH = {
  '/connect/token': {
    post: {
      'x-scalar-ignore': true,
      tags: [], // No Authentication section in Endpoints menu — token is in Quickstart
      operationId: 'requestAccessToken',
      summary: 'Request an access token',
      description:
        'OAuth 2.0 Client Credentials flow. Returns a Bearer token for API requests. Use this token in the Authorization header.',
      requestBody: {
        required: true,
        content: {
          'application/x-www-form-urlencoded': {
            schema: {
              type: 'object',
              required: ['grant_type', 'client_id', 'client_secret', 'scope'],
              properties: {
                grant_type: { type: 'string', enum: ['client_credentials'], description: 'Must be client_credentials' },
                client_id: { type: 'string', description: 'Client ID from REST API settings' },
                client_secret: { type: 'string', description: 'Client Secret from REST API settings' },
                scope: { type: 'string', enum: ['api1'], description: 'Must be api1 for Keepnet API' },
              },
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'Token issued successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  access_token: { type: 'string', description: 'Bearer token for API requests' },
                  expires_in: { type: 'integer', description: 'Seconds until expiry (typically 3600)' },
                  token_type: { type: 'string', enum: ['Bearer'] },
                  scope: { type: 'string', example: 'api1' },
                },
              },
            },
          },
        },
        '400': { description: 'Invalid request (missing or invalid credentials)' },
        '401': { description: 'Invalid client_id or client_secret' },
      },
      security: [], // Token endpoint — auth gerekmez
    },
  },
};

function enrichSpec(spec) {
  const tagsFromPaths = collectTagsFromPaths(spec);
  // Add authentication tag — token endpoint is in Quickstart, do not show in Endpoints menu
  const specTags = [
    { name: PARENT_TAG, description: 'API endpoint reference. Expand to browse by resource.' },
    ...tagsFromPaths.map((name) => ({ name, 'x-parent': PARENT_TAG })),
  ];

  // OAuth token endpoint + merged paths
  const mergedPaths = { ...CONNECT_TOKEN_PATH, ...spec.paths };

  // servers required for GitBook "Test it" (base URL)
  const servers = spec.servers?.length
    ? spec.servers
    : [{ url: API_BASE_URL, description: 'Keepnet API' }];

  // OAuth2: Primary — Test it shows client_id, client_secret; Scalar auto-fetches token
  // Bearer: Fallback — paste token if already obtained
  const securitySchemes = {
    ...spec.components?.securitySchemes,
    oauth2: {
      type: 'oauth2',
      flows: {
        clientCredentials: {
          tokenUrl: 'https://api.keepnetlabs.com/connect/token',
          scopes: { api1: 'API' },
        },
      },
      description: 'Client ID and Client Secret from Company → Company Settings → REST API. Enter credentials to auto-fetch token.',
    },
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      description: 'Paste token if you already have one (obtained via OAuth2). [Quickstart →](https://doc.keepnetlabs.com/api-reference/quickstart)',
    },
  };
  const components = { ...spec.components, securitySchemes };

  // OAuth2 first: Test it shows OAuth2 client credentials (client_id, client_secret) by default
  // Bearer as fallback: users can paste token if they already have one
  const security = [{ oauth2: ['api1'] }, { bearerAuth: [] }];

  // Request body examples — Test it panel shows ready-to-send body
  const enrichedPaths = injectRequestExamples(mergedPaths);

  return { ...spec, paths: enrichedPaths, tags: specTags, servers, components, security };
}

/** Ready-to-use request body for Test it — complex filter from schema causes 400; use minimal body */
const COMPANIES_SEARCH_EXAMPLE = {
  pageNumber: 1,
  pageSize: 10,
  orderBy: 'CreateTime',
  ascending: false,
  filter: {
    Condition: 'AND',
    SearchInputTextValue: '',
  },
};

/** Companies search for overage list — Reseller: isTargetUserCountExceededLimit. */
const COMPANIES_SEARCH_OVERAGE_EXAMPLE = {
  pageNumber: 1,
  pageSize: 10,
  orderBy: 'CreateTime',
  ascending: false,
  filter: {
    Condition: 'AND',
    SearchInputTextValue: '',
  },
  isTargetUserCountExceededLimit: true,
};

/** Export endpoint — CSV/Excel export, Test it on the same page. */
const COMPANIES_SEARCH_EXPORT_EXAMPLE = {
  pageNumber: 1,
  pageSize: 10,
  orderBy: 'CreateTime',
  ascending: false,
  isClustered: false,
  isTargetUserCountExceededLimit: false,
  reportAllPages: false,
  exportType: 'CSV',
  filter: {
    Condition: 'AND',
    SearchInputTextValue: '',
  },
};

/** Companies export for overage list — isTargetUserCountExceededLimit. */
const COMPANIES_SEARCH_EXPORT_OVERAGE_EXAMPLE = {
  pageNumber: 1,
  pageSize: 10,
  orderBy: 'CreateTime',
  ascending: false,
  isClustered: false,
  isTargetUserCountExceededLimit: true,
  reportAllPages: false,
  exportType: 'CSV',
  filter: {
    Condition: 'AND',
    SearchInputTextValue: '',
  },
};

/** Company groups search — Reseller: list groups, Test it minimal body. */
const COMPANY_GROUPS_SEARCH_EXAMPLE = {
  pageNumber: 1,
  pageSize: 10,
  orderBy: 'CreateTime',
  ascending: false,
  filter: {
    Condition: 'AND',
    SearchInputTextValue: '',
  },
};

/** Company groups export — Reseller: export groups to CSV. */
const COMPANY_GROUPS_SEARCH_EXPORT_EXAMPLE = {
  pageNumber: 1,
  pageSize: 10,
  orderBy: 'CreateTime',
  ascending: false,
  isClustered: false,
  reportAllPages: false,
  exportType: 'CSV',
  filter: {
    Condition: 'AND',
    SearchInputTextValue: '',
  },
};

/** Enrollments search — minimal filter (no nulls; add FilterGroups only if tenant requires). */
const ENROLLMENTS_SEARCH_EXAMPLE = {
  pageNumber: 1,
  pageSize: 20,
  orderBy: 'CreateTime',
  ascending: false,
  filter: {
    Condition: 'AND',
    SearchInputTextValue: '',
  },
};

/** Training report users search — same contract: explicit sort, empty string not null. */
const TRAINING_REPORTS_USERS_SEARCH_EXAMPLE = {
  pageNumber: 1,
  pageSize: 100,
  orderBy: 'Email',
  ascending: false,
  filter: {
    Condition: 'AND',
    SearchInputTextValue: '',
  },
};

/** Enrollments search export — CSV/Excel; minimal filter. */
const ENROLLMENTS_SEARCH_EXPORT_EXAMPLE = {
  pageNumber: 1,
  pageSize: 20,
  orderBy: 'CreateTime',
  ascending: false,
  filter: {
    Condition: 'AND',
    SearchInputTextValue: '',
  },
  reportAllPages: false,
  exportType: 'CSV',
};

/** Target users — download example Excel/CSV template. */
const TARGET_USERS_EXAMPLE_FILE_EXAMPLE = {
  exportType: 'Excel',
};

/** Target users — create column-to-field mapping after file upload. */
const TARGET_USERS_CREATE_MAPPING_EXAMPLE = {
  transactionId: '<transactionId-from-upload>',
  targetGroupResourceIds: [],
  fieldMappings: [
    { excelColumnName: 'Email', fieldName: 'email' },
    { excelColumnName: 'First Name', fieldName: 'firstName' },
    { excelColumnName: 'Last Name', fieldName: 'lastName' },
    { excelColumnName: 'Department', fieldName: 'department' },
  ],
};

/** Target users — preview parsed tmp users before import. */
const TARGET_USERS_TMP_SEARCH_EXAMPLE = {
  pageNumber: 1,
  pageSize: 20,
  orderBy: 'Email',
  ascending: false,
  filter: {
    Condition: 'AND',
    SearchInputTextValue: '',
  },
};

/** Target users — confirm and import parsed users. */
const TARGET_USERS_IMPORT_EXAMPLE = {
  importType: 'All',
  selectedResourceIds: [],
};

/** Enrollment create — minimal body for Test it. */
const ENROLLMENT_CREATE_EXAMPLE = {
  trainingId: '<trainingResourceId>',
  name: 'Q1 Security Awareness Training',
  targetGroupResourceIds: ['<targetGroupResourceId>'],
  enrollmentScheduler: {
    scheduledDate: '2026-04-01T09:00:00Z',
    scheduledTimeZoneId: 'Europe/Istanbul',
    useOwnTimeZone: false,
    dueDate: '2026-04-30T23:59:59Z',
  },
  awardCertificate: true,
  markedAsTest: false,
  sendTeamsNotification: false,
};

/** Trainings search — minimal paginated search (no null filter fields). */
const TRAININGS_SEARCH_EXAMPLE = {
  pageNumber: 1,
  pageSize: 20,
  orderBy: 'Name',
  ascending: true,
  filter: {
    Condition: 'AND',
    SearchInputTextValue: '',
  },
};

/** Target groups search (current company) — minimal paginated search. */
const TARGET_GROUPS_SEARCH_EXAMPLE = {
  pageNumber: 1,
  pageSize: 20,
  orderBy: 'Name',
  ascending: true,
  filter: {
    Condition: 'AND',
    SearchInputTextValue: '',
  },
};

/** Phishing scenario search — minimal paginated search. */
const PHISHING_SCENARIO_SEARCH_EXAMPLE = {
  pageNumber: 1,
  pageSize: 20,
  orderBy: 'Name',
  ascending: true,
  filter: {
    Condition: 'AND',
    SearchInputTextValue: '',
  },
};

/** Phishing campaign create — minimal body for Test it. */
const PHISHING_CAMPAIGN_CREATE_EXAMPLE = {
  name: 'Q1 Phishing Simulation',
  scheduleTypeId: 1,
  phishingScenarioResourceIds: ['<scenarioResourceId>'],
  targetGroupResourceIds: ['<targetGroupResourceId>'],
  duration: 7,
  distributionTypeId: 1,
  distributionDelayEvery: 0,
  distributionDelayTimeTypeId: 1,
  sendingLimit: 0,
  emailDeliverySettingType: 1,
  excludeFromReports: false,
  sendOnlyActiveUsers: true,
};

/** Phishing campaign job start — minimal body. */
const PHISHING_CAMPAIGN_JOB_START_EXAMPLE = {
  scheduleTypeId: 1,
  targetGroupResourceIds: ['<targetGroupResourceId>'],
  excludeFromReports: false,
  sendingLimit: 0,
  distributionDelayEvery: 0,
  distributionDelayTimeTypeId: 1,
  useTargetUserTimeZone: false,
};

/** SCIM create — minimal body. */
const SCIM_CREATE_EXAMPLE = {
  name: 'Entra ID SCIM',
  groupResourceId: null,
  fieldMappings: [],
  syncPlatformGroup: false,
};

/** Direct Email Creation (DEC) create — M365 example. */
const DEC_CREATE_EXAMPLE = {
  name: 'Acme Corp M365 DEC',
  tenantId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  allowedDomains: ['acmecorp.com'],
  type: 1,
};

/** DEC test — send test email. */
const DEC_TEST_EXAMPLE = {
  resourceId: '<decResourceId>',
  from: 'noreply@acmecorp.com',
  fromName: 'Keepnet',
  to: 'admin@acmecorp.com',
  message: 'DEC test email',
  tenantId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  type: 1,
};

function injectRequestExamples(paths) {
  const result = { ...paths };

  if (result['/api/companies/search']?.post?.requestBody?.content) {
    const content = {
      schema: {
        type: 'object',
        required: ['pageNumber', 'pageSize', 'orderBy', 'ascending', 'filter'],
        properties: {
          pageNumber: { type: 'integer', example: 1 },
          pageSize: { type: 'integer', example: 10 },
          orderBy: { type: 'string', example: 'CreateTime' },
          ascending: { type: 'boolean', example: false },
          filter: {
            type: 'object',
            properties: {
              Condition: { type: 'string', example: 'AND' },
              SearchInputTextValue: { type: 'string', example: '' },
            },
          },
          isTargetUserCountExceededLimit: { type: 'boolean', example: false, description: 'If true, only companies exceeding license limit are returned' },
        },
      },
      example: COMPANIES_SEARCH_EXAMPLE,
      examples: {
        default: {
          summary: 'Minimal (works with Send after Authorize)',
          value: COMPANIES_SEARCH_EXAMPLE,
        },
        overage: {
          summary: 'Customers exceeding license limit',
          value: COMPANIES_SEARCH_OVERAGE_EXAMPLE,
        },
      },
    };
    for (const key of Object.keys(result['/api/companies/search'].post.requestBody.content)) {
      result['/api/companies/search'].post.requestBody.content[key] = { ...content };
    }
  }

  if (result['/api/companies/search/export']?.post?.requestBody?.content) {
    const exportContent = {
      schema: {
        type: 'object',
        required: ['pageNumber', 'pageSize', 'orderBy', 'ascending', 'exportType', 'filter'],
        properties: {
          pageNumber: { type: 'integer', example: 1 },
          pageSize: { type: 'integer', example: 10 },
          orderBy: { type: 'string', example: 'CreateTime' },
          ascending: { type: 'boolean', example: false },
          isClustered: { type: 'boolean', example: false },
          isTargetUserCountExceededLimit: { type: 'boolean', example: false, description: 'If true, export only companies exceeding license limit' },
          reportAllPages: { type: 'boolean', example: false },
          exportType: { type: 'string', example: 'CSV' },
          filter: {
            type: 'object',
            properties: {
              Condition: { type: 'string', example: 'AND' },
              SearchInputTextValue: { type: 'string', example: '' },
            },
          },
        },
      },
      example: COMPANIES_SEARCH_EXPORT_EXAMPLE,
      examples: {
        default: {
          summary: 'Minimal CSV export (works with Send after Authorize)',
          value: COMPANIES_SEARCH_EXPORT_EXAMPLE,
        },
        overage: {
          summary: 'Export customers exceeding license limit',
          value: COMPANIES_SEARCH_EXPORT_OVERAGE_EXAMPLE,
        },
      },
    };
    for (const key of Object.keys(result['/api/companies/search/export'].post.requestBody.content)) {
      result['/api/companies/search/export'].post.requestBody.content[key] = { ...exportContent };
    }
  }

  if (result['/api/company-groups/search']?.post?.requestBody?.content) {
    const groupSearchContent = {
      schema: {
        type: 'object',
        required: ['pageNumber', 'pageSize', 'orderBy', 'ascending'],
        properties: {
          pageNumber: { type: 'integer', example: 1 },
          pageSize: { type: 'integer', example: 10 },
          orderBy: { type: 'string', example: 'CreateTime' },
          ascending: { type: 'boolean', example: false },
          filter: {
            type: 'object',
            properties: {
              Condition: { type: 'string', example: 'AND' },
              SearchInputTextValue: { type: 'string', example: '' },
            },
          },
        },
      },
      example: COMPANY_GROUPS_SEARCH_EXAMPLE,
      examples: {
        default: {
          summary: 'Minimal (works with Send after Authorize)',
          value: COMPANY_GROUPS_SEARCH_EXAMPLE,
        },
      },
    };
    for (const key of Object.keys(result['/api/company-groups/search'].post.requestBody.content)) {
      result['/api/company-groups/search'].post.requestBody.content[key] = { ...groupSearchContent };
    }
  }

  if (result['/api/company-groups/search/export']?.post?.requestBody?.content) {
    const groupExportContent = {
      schema: {
        type: 'object',
        required: ['pageNumber', 'pageSize', 'orderBy', 'ascending', 'exportType'],
        properties: {
          pageNumber: { type: 'integer', example: 1 },
          pageSize: { type: 'integer', example: 10 },
          orderBy: { type: 'string', example: 'CreateTime' },
          ascending: { type: 'boolean', example: false },
          filter: {
            type: 'object',
            properties: {
              Condition: { type: 'string', example: 'AND' },
              SearchInputTextValue: { type: 'string', example: '' },
            },
          },
          reportAllPages: { type: 'boolean', example: false },
          exportType: { type: 'string', example: 'CSV' },
        },
      },
      example: COMPANY_GROUPS_SEARCH_EXPORT_EXAMPLE,
      examples: {
        default: {
          summary: 'Minimal CSV export (works with Send after Authorize)',
          value: COMPANY_GROUPS_SEARCH_EXPORT_EXAMPLE,
        },
      },
    };
    for (const key of Object.keys(result['/api/company-groups/search/export'].post.requestBody.content)) {
      result['/api/company-groups/search/export'].post.requestBody.content[key] = { ...groupExportContent };
    }
  }

  if (result['/api/enrollments/search']?.post?.requestBody?.content) {
    const enrollmentSearchContent = {
      schema: {
        type: 'object',
        required: ['pageNumber', 'pageSize', 'orderBy', 'ascending', 'filter'],
        properties: {
          pageNumber: { type: 'integer', example: 1 },
          pageSize: { type: 'integer', example: 20 },
          orderBy: { type: 'string', example: 'CreateTime' },
          ascending: { type: 'boolean', example: false },
          filter: {
            type: 'object',
            properties: {
              Condition: { type: 'string', example: 'AND' },
              SearchInputTextValue: { type: 'string', example: '' },
            },
          },
          enrollmentType: { type: 'string', example: 'Survey', description: 'Optional: use "Survey" to list only survey enrollments' },
        },
      },
      example: ENROLLMENTS_SEARCH_EXAMPLE,
      examples: {
        default: {
          summary: 'Minimal (works with Send after Authorize)',
          value: ENROLLMENTS_SEARCH_EXAMPLE,
        },
        surveyOnly: {
          summary: 'Survey enrollments only',
          value: { ...ENROLLMENTS_SEARCH_EXAMPLE, enrollmentType: 'Survey' },
        },
      },
    };
    for (const key of Object.keys(result['/api/enrollments/search'].post.requestBody.content)) {
      result['/api/enrollments/search'].post.requestBody.content[key] = { ...enrollmentSearchContent };
    }
  }

  if (result['/api/training-reports/{enrollmentId}/users/search']?.post?.requestBody?.content) {
    const usersSearchContent = {
      schema: {
        type: 'object',
        required: ['pageNumber', 'pageSize', 'orderBy', 'ascending', 'filter'],
        properties: {
          pageNumber: { type: 'integer', example: 1 },
          pageSize: { type: 'integer', example: 100 },
          orderBy: { type: 'string', example: 'Email' },
          ascending: { type: 'boolean', example: false },
          filter: {
            type: 'object',
            properties: {
              Condition: { type: 'string', example: 'AND' },
              SearchInputTextValue: { type: 'string', example: '' },
            },
          },
          trainingType: { type: 'integer', nullable: true, description: 'Optional: e.g. 0 for Survey enrollment' },
        },
      },
      example: TRAINING_REPORTS_USERS_SEARCH_EXAMPLE,
      examples: {
        default: {
          summary: 'Minimal (works with Send after Authorize)',
          value: TRAINING_REPORTS_USERS_SEARCH_EXAMPLE,
        },
      },
    };
    for (const key of Object.keys(result['/api/training-reports/{enrollmentId}/users/search'].post.requestBody.content)) {
      result['/api/training-reports/{enrollmentId}/users/search'].post.requestBody.content[key] = { ...usersSearchContent };
    }
  }

  if (result['/api/enrollments/search/export']?.post?.requestBody?.content) {
    const enrollmentExportContent = {
      schema: {
        type: 'object',
        required: ['pageNumber', 'pageSize', 'orderBy', 'ascending', 'filter', 'exportType'],
        properties: {
          pageNumber: { type: 'integer', example: 1 },
          pageSize: { type: 'integer', example: 20 },
          orderBy: { type: 'string', example: 'CreateTime' },
          ascending: { type: 'boolean', example: false },
          filter: {
            type: 'object',
            properties: {
              Condition: { type: 'string', example: 'AND' },
              SearchInputTextValue: { type: 'string', example: '' },
            },
          },
          reportAllPages: { type: 'boolean', example: false },
          exportType: { type: 'string', example: 'CSV' },
          enrollmentType: { type: 'string', description: 'Optional: e.g. Survey' },
        },
      },
      example: ENROLLMENTS_SEARCH_EXPORT_EXAMPLE,
      examples: {
        default: {
          summary: 'Minimal CSV export (works with Send after Authorize)',
          value: ENROLLMENTS_SEARCH_EXPORT_EXAMPLE,
        },
      },
    };
    for (const key of Object.keys(result['/api/enrollments/search/export'].post.requestBody.content)) {
      result['/api/enrollments/search/export'].post.requestBody.content[key] = { ...enrollmentExportContent };
    }
  }

  // --- Target users: Excel/CSV import flow ---

  if (result['/api/target-users/example-file']?.post?.requestBody?.content) {
    const exampleFileContent = {
      schema: {
        type: 'object',
        required: ['exportType'],
        properties: {
          exportType: { type: 'string', example: 'Excel', description: 'Excel or Csv' },
        },
      },
      example: TARGET_USERS_EXAMPLE_FILE_EXAMPLE,
      examples: {
        default: {
          summary: 'Download Excel template',
          value: TARGET_USERS_EXAMPLE_FILE_EXAMPLE,
        },
      },
    };
    for (const key of Object.keys(result['/api/target-users/example-file'].post.requestBody.content)) {
      result['/api/target-users/example-file'].post.requestBody.content[key] = { ...exampleFileContent };
    }
  }

  if (result['/api/target-users/create-mapping']?.post?.requestBody?.content) {
    const mappingContent = {
      schema: {
        type: 'object',
        required: ['transactionId', 'fieldMappings'],
        properties: {
          transactionId: { type: 'string', example: '<transactionId-from-upload>' },
          targetGroupResourceIds: { type: 'array', items: { type: 'string' }, description: 'Optional: assign users to groups' },
          fieldMappings: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                excelColumnName: { type: 'string' },
                fieldName: { type: 'string' },
              },
            },
            description: 'Map each Excel column to a target user field (email, firstName, lastName, department, etc.)',
          },
        },
      },
      example: TARGET_USERS_CREATE_MAPPING_EXAMPLE,
      examples: {
        default: {
          summary: 'Map Email, First Name, Last Name, Department',
          value: TARGET_USERS_CREATE_MAPPING_EXAMPLE,
        },
      },
    };
    for (const key of Object.keys(result['/api/target-users/create-mapping'].post.requestBody.content)) {
      result['/api/target-users/create-mapping'].post.requestBody.content[key] = { ...mappingContent };
    }
  }

  if (result['/api/target-users/{transactionId}/search']?.post?.requestBody?.content) {
    const tmpSearchContent = {
      schema: {
        type: 'object',
        required: ['pageNumber', 'pageSize'],
        properties: {
          pageNumber: { type: 'integer', example: 1 },
          pageSize: { type: 'integer', example: 20 },
          orderBy: { type: 'string', example: 'Email' },
          ascending: { type: 'boolean', example: false },
          filter: {
            type: 'object',
            properties: {
              Condition: { type: 'string', example: 'AND' },
              SearchInputTextValue: { type: 'string', example: '' },
            },
          },
        },
      },
      example: TARGET_USERS_TMP_SEARCH_EXAMPLE,
      examples: {
        default: {
          summary: 'Preview parsed users (works with Send after Authorize)',
          value: TARGET_USERS_TMP_SEARCH_EXAMPLE,
        },
      },
    };
    for (const key of Object.keys(result['/api/target-users/{transactionId}/search'].post.requestBody.content)) {
      result['/api/target-users/{transactionId}/search'].post.requestBody.content[key] = { ...tmpSearchContent };
    }
  }

  if (result['/api/target-users/{transactionId}/import']?.post?.requestBody?.content) {
    const importContent = {
      schema: {
        type: 'object',
        required: ['importType'],
        properties: {
          importType: { type: 'string', example: 'All', description: 'All or Selected' },
          selectedResourceIds: { type: 'array', items: { type: 'string' }, description: 'Required when importType is Selected' },
        },
      },
      example: TARGET_USERS_IMPORT_EXAMPLE,
      examples: {
        default: {
          summary: 'Import all parsed users',
          value: TARGET_USERS_IMPORT_EXAMPLE,
        },
      },
    };
    for (const key of Object.keys(result['/api/target-users/{transactionId}/import'].post.requestBody.content)) {
      result['/api/target-users/{transactionId}/import'].post.requestBody.content[key] = { ...importContent };
    }
  }

  // --- Enrollment, training, target-group, phishing, SCIM, DEC ---

  if (result['/api/enrollments']?.post?.requestBody?.content) {
    const enrollContent = {
      schema: {
        type: 'object',
        required: ['trainingId', 'name', 'targetGroupResourceIds'],
        properties: {
          trainingId: { type: 'string', example: '<trainingResourceId>' },
          name: { type: 'string', example: 'Q1 Security Awareness Training' },
          targetGroupResourceIds: { type: 'array', items: { type: 'string' } },
          enrollmentScheduler: {
            type: 'object',
            properties: {
              scheduledDate: { type: 'string', format: 'date-time' },
              scheduledTimeZoneId: { type: 'string', example: 'Europe/Istanbul' },
              useOwnTimeZone: { type: 'boolean', example: false },
              dueDate: { type: 'string', format: 'date-time' },
            },
          },
          awardCertificate: { type: 'boolean', example: true },
          markedAsTest: { type: 'boolean', example: false },
          sendTeamsNotification: { type: 'boolean', example: false },
        },
      },
      example: ENROLLMENT_CREATE_EXAMPLE,
    };
    for (const key of Object.keys(result['/api/enrollments'].post.requestBody.content)) {
      result['/api/enrollments'].post.requestBody.content[key] = { ...enrollContent };
    }
  }

  if (result['/api/trainings/search']?.post?.requestBody?.content) {
    const trainSearchContent = {
      schema: {
        type: 'object',
        required: ['pageNumber', 'pageSize'],
        properties: {
          pageNumber: { type: 'integer', example: 1 },
          pageSize: { type: 'integer', example: 20 },
          orderBy: { type: 'string', example: 'Name' },
          ascending: { type: 'boolean', example: true },
          filter: {
            type: 'object',
            properties: {
              condition: { type: 'string', example: 'and' },
              searchInputTextValue: { type: 'string', nullable: true },
              filterGroups: { type: 'array', items: { type: 'object' } },
            },
          },
        },
      },
      example: TRAININGS_SEARCH_EXAMPLE,
    };
    for (const key of Object.keys(result['/api/trainings/search'].post.requestBody.content)) {
      result['/api/trainings/search'].post.requestBody.content[key] = { ...trainSearchContent };
    }
  }

  if (result['/api/target-groups/search/current-company']?.post?.requestBody?.content) {
    const tgSearchContent = {
      schema: {
        type: 'object',
        required: ['pageNumber', 'pageSize'],
        properties: {
          pageNumber: { type: 'integer', example: 1 },
          pageSize: { type: 'integer', example: 20 },
          orderBy: { type: 'string', example: 'Name' },
          ascending: { type: 'boolean', example: true },
          filter: {
            type: 'object',
            properties: {
              condition: { type: 'string', example: 'and' },
              searchInputTextValue: { type: 'string', nullable: true },
              filterGroups: { type: 'array', items: { type: 'object' } },
            },
          },
        },
      },
      example: TARGET_GROUPS_SEARCH_EXAMPLE,
    };
    for (const key of Object.keys(result['/api/target-groups/search/current-company'].post.requestBody.content)) {
      result['/api/target-groups/search/current-company'].post.requestBody.content[key] = { ...tgSearchContent };
    }
  }

  if (result['/api/phishing-simulator/phishing-scenario/search']?.post?.requestBody?.content) {
    const scenarioSearchContent = {
      schema: {
        type: 'object',
        required: ['pageNumber', 'pageSize'],
        properties: {
          pageNumber: { type: 'integer', example: 1 },
          pageSize: { type: 'integer', example: 20 },
          orderBy: { type: 'string', example: 'Name' },
          ascending: { type: 'boolean', example: true },
          filter: {
            type: 'object',
            properties: {
              Condition: { type: 'string', example: 'AND' },
              SearchInputTextValue: { type: 'string', example: '' },
            },
          },
        },
      },
      example: PHISHING_SCENARIO_SEARCH_EXAMPLE,
    };
    for (const key of Object.keys(result['/api/phishing-simulator/phishing-scenario/search'].post.requestBody.content)) {
      result['/api/phishing-simulator/phishing-scenario/search'].post.requestBody.content[key] = { ...scenarioSearchContent };
    }
  }

  if (result['/api/phishing-simulator/phishing-campaign']?.post?.requestBody?.content) {
    const campaignContent = {
      schema: {
        type: 'object',
        required: ['name', 'scheduleTypeId'],
        properties: {
          name: { type: 'string', example: 'Q1 Phishing Simulation' },
          scheduleTypeId: { type: 'integer', example: 1 },
          phishingScenarioResourceIds: { type: 'array', items: { type: 'string' } },
          targetGroupResourceIds: { type: 'array', items: { type: 'string' } },
          duration: { type: 'integer', example: 7 },
          distributionTypeId: { type: 'integer', example: 1 },
          distributionDelayEvery: { type: 'integer', example: 0 },
          distributionDelayTimeTypeId: { type: 'integer', example: 1 },
          sendingLimit: { type: 'integer', example: 0 },
          emailDeliverySettingType: { type: 'integer', example: 1 },
          excludeFromReports: { type: 'boolean', example: false },
          sendOnlyActiveUsers: { type: 'boolean', example: true },
        },
      },
      example: PHISHING_CAMPAIGN_CREATE_EXAMPLE,
    };
    for (const key of Object.keys(result['/api/phishing-simulator/phishing-campaign'].post.requestBody.content)) {
      result['/api/phishing-simulator/phishing-campaign'].post.requestBody.content[key] = { ...campaignContent };
    }
  }

  if (result['/api/phishing-simulator/phishing-campaign-job/start/{resourceId}']?.post?.requestBody?.content) {
    const jobStartContent = {
      schema: {
        type: 'object',
        properties: {
          scheduleTypeId: { type: 'integer', example: 1 },
          targetGroupResourceIds: { type: 'array', items: { type: 'string' } },
          excludeFromReports: { type: 'boolean', example: false },
          sendingLimit: { type: 'integer', example: 0 },
          distributionDelayEvery: { type: 'integer', example: 0 },
          distributionDelayTimeTypeId: { type: 'integer', example: 1 },
          useTargetUserTimeZone: { type: 'boolean', example: false },
        },
      },
      example: PHISHING_CAMPAIGN_JOB_START_EXAMPLE,
    };
    for (const key of Object.keys(result['/api/phishing-simulator/phishing-campaign-job/start/{resourceId}'].post.requestBody.content)) {
      result['/api/phishing-simulator/phishing-campaign-job/start/{resourceId}'].post.requestBody.content[key] = { ...jobStartContent };
    }
  }

  if (result['/api/scim']?.post?.requestBody?.content) {
    const scimContent = {
      schema: {
        type: 'object',
        required: ['name'],
        properties: {
          name: { type: 'string', maxLength: 30, example: 'Entra ID SCIM' },
          groupResourceId: { type: 'string', nullable: true, description: 'Assign provisioned users to a target group' },
          fieldMappings: { type: 'array', items: { type: 'object', properties: { customFieldResourceId: { type: 'string' }, scimFieldResourceId: { type: 'string' } } } },
          syncPlatformGroup: { type: 'boolean', example: false },
        },
      },
      example: SCIM_CREATE_EXAMPLE,
    };
    for (const key of Object.keys(result['/api/scim'].post.requestBody.content)) {
      result['/api/scim'].post.requestBody.content[key] = { ...scimContent };
    }
  }

  if (result['/api/companies/direct-email-settings']?.post?.requestBody?.content) {
    const decContent = {
      schema: {
        type: 'object',
        required: ['name', 'tenantId', 'allowedDomains'],
        properties: {
          name: { type: 'string', maxLength: 64, example: 'Acme Corp M365 DEC' },
          tenantId: { type: 'string', example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' },
          allowedDomains: { type: 'array', items: { type: 'string' }, example: ['acmecorp.com'] },
          type: { type: 'integer', example: 1, description: '1 = Microsoft 365, 2 = Google Workspace' },
        },
      },
      example: DEC_CREATE_EXAMPLE,
    };
    for (const key of Object.keys(result['/api/companies/direct-email-settings'].post.requestBody.content)) {
      result['/api/companies/direct-email-settings'].post.requestBody.content[key] = { ...decContent };
    }
  }

  if (result['/api/companies/direct-email-settings/test']?.post?.requestBody?.content) {
    const decTestContent = {
      schema: {
        type: 'object',
        properties: {
          resourceId: { type: 'string', example: '<decResourceId>' },
          from: { type: 'string', example: 'noreply@acmecorp.com' },
          fromName: { type: 'string', example: 'Keepnet' },
          to: { type: 'string', example: 'admin@acmecorp.com' },
          message: { type: 'string', example: 'DEC test email' },
          tenantId: { type: 'string', example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' },
          type: { type: 'integer', example: 1 },
        },
      },
      example: DEC_TEST_EXAMPLE,
    };
    for (const key of Object.keys(result['/api/companies/direct-email-settings/test'].post.requestBody.content)) {
      result['/api/companies/direct-email-settings/test'].post.requestBody.content[key] = { ...decTestContent };
    }
  }

  return result;
}

async function main() {
  const outputPath = process.argv[2] || DEFAULT_OUTPUT;
  const spec = await fetchSpec();
  const enriched = enrichSpec(spec);
  const fs = await import('fs');
  const path = await import('path');
  const dir = path.dirname(outputPath);
  if (dir) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(enriched, null, 2), 'utf8');
  console.log(`✓ Enriched spec written to ${outputPath} (${enriched.tags.length} tags)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
