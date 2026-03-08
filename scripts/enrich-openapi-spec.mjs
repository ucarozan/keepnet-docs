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

/** OAuth token endpoint — GitBook Test it + authentication sayfası embed için */
/** x-scalar-ignore: Token endpoint'i API client listesinden gizler. Kullanıcı sadece Authorize kullanır; Send ile invalid_client hatası önlenir. */
const CONNECT_TOKEN_PATH = {
  '/connect/token': {
    post: {
      'x-scalar-ignore': true,
      tags: ['Authentication'],
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
  if (!tagsFromPaths.includes('Authentication')) tagsFromPaths.push('Authentication');
  const specTags = [
    { name: PARENT_TAG, description: 'API endpoint reference. Expand to browse by resource.' },
    ...tagsFromPaths.map((name) => ({ name, 'x-parent': PARENT_TAG })),
  ];

  // OAuth token endpoint — Test it + embedded OpenAPI için
  const paths = { ...CONNECT_TOKEN_PATH, ...spec.paths };

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
      description: 'Paste token if you already have one (obtained via OAuth2). [Get token](https://doc.keepnetlabs.com/api-reference/authentication)',
    },
  };
  const components = { ...spec.components, securitySchemes };

  // OAuth2 first: Test it shows OAuth2 client credentials (client_id, client_secret) by default
  // Bearer as fallback: users can paste token if they already have one
  const security = [{ oauth2: ['api1'] }, { bearerAuth: [] }];

  return { ...spec, paths, tags: specTags, servers, components, security };
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
