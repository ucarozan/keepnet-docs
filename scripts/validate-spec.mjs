#!/usr/bin/env node
/**
 * OpenAPI spec doğrulama script'i
 * Kullanım: node scripts/validate-spec.mjs [spec-path]
 */

import fs from 'fs';
import path from 'path';

const SPEC_PATH = process.argv[2] || 'openapi/keepnet-api-spec.json';

function validate(specPath) {
  const fullPath = path.resolve(process.cwd(), specPath);
  if (!fs.existsSync(fullPath)) {
    console.error('✗ Dosya bulunamadı:', fullPath);
    process.exit(1);
  }
  const spec = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  const errors = [];

  if (!spec.openapi) errors.push('openapi versiyonu eksik');
  if (!spec.info) errors.push('info eksik');
  if (!spec.paths || Object.keys(spec.paths).length === 0) errors.push('paths boş');
  if (!Array.isArray(spec.tags) || spec.tags.length === 0) errors.push('tags dizisi eksik veya boş');
  const parent = spec.tags?.find((t) => t.name === 'endpoints');
  if (!parent) errors.push('endpoints parent tag eksik');
  const withParent = spec.tags?.filter((t) => t['x-parent']).length ?? 0;
  if (withParent === 0) errors.push('x-parent tanımlı tag yok');
  if (!spec.servers?.length) errors.push('servers dizisi eksik (GitBook Test it için gerekli)');
  if (!spec.components?.securitySchemes?.bearerAuth) errors.push('bearerAuth security scheme eksik (Test it için)');

  if (errors.length > 0) {
    console.error('✗ Validasyon hataları:');
    errors.forEach((e) => console.error('  -', e));
    process.exit(1);
  }

  console.log('✓ OpenAPI spec geçerli');
  console.log('  - paths:', Object.keys(spec.paths).length);
  console.log('  - tags:', spec.tags.length, '(1 parent +', withParent, 'child)');
}

validate(SPEC_PATH);
