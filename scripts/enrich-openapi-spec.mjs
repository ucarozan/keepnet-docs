#!/usr/bin/env node
/**
 * OpenAPI spec zenginleştirme script'i
 * Canlı Keepnet API spec'ini alır, tags + x-parent ekleyerek GitBook menü hiyerarşisi oluşturur.
 *
 * Kullanım: node scripts/enrich-openapi-spec.mjs [output-path]
 * Varsayılan output: openapi/keepnet-api-spec.json
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

/** OAuth token endpoint — GitBook Test it için. Endpoints menüsünde gösterme (Quickstart'ta dokümante). */
/** x-scalar-ignore: Token endpoint'i API client listesinden gizler. Kullanıcı sadece Authorize kullanır; Send ile invalid_client hatası önlenir. */
const CONNECT_TOKEN_PATH = {
  '/connect/token': {
    post: {
      'x-scalar-ignore': true,
      tags: [], // Endpoints menüsünde Authentication bölümü yok — token Quickstart'ta
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
  // Authentication tag ekleme — token endpoint Quickstart'ta, Endpoints menüsünde gösterme
  const specTags = [
    { name: PARENT_TAG, description: 'API endpoint reference. Expand to browse by resource.' },
    ...tagsFromPaths.map((name) => ({ name, 'x-parent': PARENT_TAG })),
  ];

  // OAuth token endpoint + merged paths
  const mergedPaths = { ...CONNECT_TOKEN_PATH, ...spec.paths };

  // GitBook "Test it" için servers gerekli (base URL)
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

  // Request body examples — Test it panelinde hazır body ile Send
  const enrichedPaths = injectRequestExamples(mergedPaths);

  return { ...spec, paths: enrichedPaths, tags: specTags, servers, components, security };
}

/** Test it için hazır request body — schema'dan gelen karmaşık filter yapısı 400 hatası veriyor, minimal body kullan */
const COMPANIES_SEARCH_EXAMPLE = {
  pageNumber: 1,
  pageSize: 10,
  orderBy: 'CreateTime',
  ascending: false,
  filter: null,
};

/** Export endpoint — CSV/Excel export, aynı sayfada Test it. */
const COMPANIES_SEARCH_EXPORT_EXAMPLE = {
  pageNumber: 1,
  pageSize: 10,
  orderBy: 'CreateTime',
  ascending: false,
  filter: null,
  reportAllPages: false,
  exportType: 'Csv',
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

function injectRequestExamples(paths) {
  const result = { ...paths };

  if (result['/api/companies/search']?.post?.requestBody?.content) {
    // Schema'dan gelen default (filterGroups, filterItems vs.) API'de 400 Invalid request veriyor.
    // Sadece example kullan — schema yok, client example'ı default body olarak göstersin.
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
        },
      },
      example: COMPANIES_SEARCH_EXAMPLE,
      examples: {
        default: {
          summary: 'Minimal (works with Send after Authorize)',
          value: COMPANIES_SEARCH_EXAMPLE,
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
        },
      },
      example: COMPANIES_SEARCH_EXPORT_EXAMPLE,
      examples: {
        default: {
          summary: 'Minimal CSV export (works with Send after Authorize)',
          value: COMPANIES_SEARCH_EXPORT_EXAMPLE,
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
