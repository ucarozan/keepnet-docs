#!/usr/bin/env node
/**
 * OpenAPI spec validation script
 * Usage: node scripts/validate-spec.mjs [spec-path]
 */

import fs from 'fs';
import path from 'path';

const SPEC_PATH = process.argv[2] || 'openapi/keepnet-api-spec.json';

function validate(specPath) {
  const fullPath = path.resolve(process.cwd(), specPath);
  if (!fs.existsSync(fullPath)) {
    console.error('✗ File not found:', fullPath);
    process.exit(1);
  }
  const spec = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  const errors = [];

  if (!spec.openapi) errors.push('openapi version missing');
  if (!spec.info) errors.push('info missing');
  if (!spec.paths || Object.keys(spec.paths).length === 0) errors.push('paths is empty');
  if (!Array.isArray(spec.tags) || spec.tags.length === 0) errors.push('tags array missing or empty');
  const parent = spec.tags?.find((t) => t.name === 'endpoints');
  if (!parent) errors.push('endpoints parent tag missing');
  const withParent = spec.tags?.filter((t) => t['x-parent']).length ?? 0;
  if (withParent === 0) errors.push('no tag with x-parent defined');
  if (!spec.servers?.length) errors.push('servers array missing (required for GitBook Test it)');
  if (!spec.components?.securitySchemes?.bearerAuth) errors.push('bearerAuth security scheme missing (required for Test it)');

  if (errors.length > 0) {
    console.error('✗ Validation errors:');
    errors.forEach((e) => console.error('  -', e));
    process.exit(1);
  }

  console.log('✓ OpenAPI spec is valid');
  console.log('  - paths:', Object.keys(spec.paths).length);
  console.log('  - tags:', spec.tags.length, '(1 parent +', withParent, 'child)');
}

validate(SPEC_PATH);
