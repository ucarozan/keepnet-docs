#!/usr/bin/env node
/**
 * OpenAPI spec enrichment script
 * Fetches the live Keepnet API spec and adds tags + x-parent to build the GitBook menu hierarchy.
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
  filter: null,
};

/** Companies search for overage list — Reseller: isTargetUserCountExceededLimit. */
const COMPANIES_SEARCH_OVERAGE_EXAMPLE = {
  pageNumber: 1,
  pageSize: 10,
  orderBy: 'CreateTime',
  ascending: false,
  filter: null,
  isTargetUserCountExceededLimit: true,
};

/** Export endpoint — CSV/Excel export, Test it on the same page. */
const COMPANIES_SEARCH_EXPORT_EXAMPLE = {
  pageNumber: 1,
  pageSize: 10,
  orderBy: 'CreateTime',
  ascending: false,
  filter: null,
  reportAllPages: false,
  exportType: 'Csv',
};

/** Companies export for overage list — isTargetUserCountExceededLimit. */
const COMPANIES_SEARCH_EXPORT_OVERAGE_EXAMPLE = {
  pageNumber: 1,
  pageSize: 10,
  orderBy: 'CreateTime',
  ascending: false,
  filter: null,
  reportAllPages: false,
  exportType: 'Csv',
  isTargetUserCountExceededLimit: true,
};

/** Company groups search — Reseller: list groups, Test it minimal body. */
const COMPANY_GROUPS_SEARCH_EXAMPLE = {
  pageNumber: 1,
  pageSize: 10,
  orderBy: 'CreateTime',
  ascending: false,
  filter: null,
};

/** Company groups export — Reseller: export groups to CSV. */
const COMPANY_GROUPS_SEARCH_EXPORT_EXAMPLE = {
  pageNumber: 1,
  pageSize: 10,
  orderBy: 'CreateTime',
  ascending: false,
  filter: null,
  reportAllPages: false,
  exportType: 'Csv',
};

/** Enrollments search — Reseller: list enrollments; filter structure required by API. */
const ENROLLMENTS_SEARCH_EXAMPLE = {
  pageNumber: 1,
  pageSize: 20,
  orderBy: 'CreateTime',
  ascending: false,
  filter: {
    Condition: 'AND',
    SearchInputTextValue: '',
    FilterGroups: [
      { Condition: 'AND', FilterItems: [], FilterGroups: [] },
      { Condition: 'OR', FilterItems: [], FilterGroups: [] },
    ],
  },
};

/** Training report users search — per-user report for an enrollment; filter required. */
const TRAINING_REPORTS_USERS_SEARCH_EXAMPLE = {
  pageNumber: 1,
  pageSize: 100,
  orderBy: 'Email',
  ascending: true,
  filter: {
    condition: 'and',
    searchInputTextValue: null,
    filterGroups: [],
  },
};

/** Enrollments search export — CSV/Excel; filter uses Common.Core (camelCase). */
const ENROLLMENTS_SEARCH_EXPORT_EXAMPLE = {
  pageNumber: 1,
  pageSize: 20,
  orderBy: 'CreateTime',
  ascending: false,
  filter: {
    condition: 'and',
    searchInputTextValue: null,
    filterGroups: [],
  },
  reportAllPages: false,
  exportType: 'Csv',
};

function injectRequestExamples(paths) {
  const result = { ...paths };

  if (result['/api/companies/search']?.post?.requestBody?.content) {
    // Default from schema (filterGroups, filterItems etc.) causes 400 Invalid request from API.
    // Use example only — no schema; client shows this example as default body.
    const content = {
      schema: {
        type: 'object',
        required: ['pageNumber', 'pageSize', 'orderBy', 'ascending'],
        properties: {
          pageNumber: { type: 'integer', example: 1 },
          pageSize: { type: 'integer', example: 10 },
          orderBy: { type: 'string', example: 'CreateTime' },
          ascending: { type: 'boolean', example: false },
          filter: { type: 'object', nullable: true },
          isTargetUserCountExceededLimit: { type: 'boolean', description: 'If true, only companies exceeding license limit are returned' },
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
        required: ['pageNumber', 'pageSize', 'orderBy', 'ascending', 'exportType'],
        properties: {
          pageNumber: { type: 'integer', example: 1 },
          pageSize: { type: 'integer', example: 10 },
          orderBy: { type: 'string', example: 'CreateTime' },
          ascending: { type: 'boolean', example: false },
          filter: { type: 'object', nullable: true },
          reportAllPages: { type: 'boolean', example: false },
          exportType: { type: 'string', example: 'Csv' },
          isTargetUserCountExceededLimit: { type: 'boolean', description: 'If true, export only companies exceeding license limit' },
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
          filter: { type: 'object', nullable: true },
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
          filter: { type: 'object', nullable: true },
          reportAllPages: { type: 'boolean', example: false },
          exportType: { type: 'string', example: 'Csv' },
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
              FilterGroups: { type: 'array', items: { type: 'object' } },
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
          ascending: { type: 'boolean', example: true },
          filter: {
            type: 'object',
            properties: {
              condition: { type: 'string', example: 'and' },
              searchInputTextValue: { type: 'string', nullable: true },
              filterGroups: { type: 'array', items: { type: 'object' } },
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
              condition: { type: 'string', example: 'and' },
              searchInputTextValue: { type: 'string', nullable: true },
              filterGroups: { type: 'array', items: { type: 'object' } },
            },
          },
          reportAllPages: { type: 'boolean', example: false },
          exportType: { type: 'string', example: 'Csv' },
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
