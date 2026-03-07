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

function enrichSpec(spec) {
  const tagsFromPaths = collectTagsFromPaths(spec);
  const specTags = [
    { name: PARENT_TAG, description: 'API endpoint reference. Expand to browse by resource.' },
    ...tagsFromPaths.map((name) => ({ name, 'x-parent': PARENT_TAG })),
  ];

  // GitBook "Test it" için servers gerekli (base URL)
  const servers = spec.servers?.length
    ? spec.servers
    : [{ url: API_BASE_URL, description: 'Keepnet API' }];

  // Bearer token seçeneği: Kullanıcı token'ı doğrudan yapıştırabilir (OAuth2 client credentials ile alınan)
  const securitySchemes = {
    ...spec.components?.securitySchemes,
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      description: 'OAuth2 client credentials ile alınan access_token. [Token al](https://doc.keepnetlabs.com/api-reference/authentication)',
    },
  };
  const components = { ...spec.components, securitySchemes };

  // Bearer + OAuth2: Test it'te Bearer ile token yapıştırma veya OAuth2 client credentials
  const security = [{ bearerAuth: [] }, ...(spec.security || [])];

  return { ...spec, tags: specTags, servers, components, security };
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
