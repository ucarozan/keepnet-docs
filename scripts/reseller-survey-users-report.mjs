#!/usr/bin/env node
/**
 * Reseller use-case: Keepnet Labs LTD → Security Culture - Keepnet enrollment → Users report (her kullanıcı için survey verisi).
 * Credentials: ~/.zhc.env (KEEPNET_CLIENT_ID, KEEPNET_CLIENT_SECRET)
 * Usage: node scripts/reseller-survey-users-report.mjs
 */

import { join } from 'path';
import { existsSync, readFileSync, writeFileSync } from 'fs';

const BASE_URL = 'https://api.keepnetlabs.com';
const ENV_PATH = join(process.env.HOME || '', '.zhc.env');

function loadEnv() {
  if (!existsSync(ENV_PATH)) {
    console.error('❌ ~/.zhc.env bulunamadı. KEEPNET_CLIENT_ID ve KEEPNET_CLIENT_SECRET gerekli.');
    process.exit(1);
  }
  const content = readFileSync(ENV_PATH, 'utf8');
  const env = {};
  for (const line of content.split('\n')) {
    const m = line.match(/^export\s+(\w+)=["']?([^"'\n]*)["']?/);
    if (m) env[m[1]] = m[2].trim();
  }
  return env;
}

async function getToken(clientId, clientSecret) {
  const body = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: clientId,
    client_secret: clientSecret,
    scope: 'api1',
  });
  const res = await fetch(`${BASE_URL}/connect/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Token alınamadı (${res.status}): ${text}`);
  }
  const json = await res.json();
  return json.access_token;
}

async function apiPost(token, path, body, companyId = null) {
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
  if (companyId) headers['X-KEEPNET-Company-Id'] = companyId;
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`API ${path} → ${res.status}: ${text}`);
  return text ? JSON.parse(text) : {};
}

async function apiGet(token, path, companyId = null, query = '') {
  const headers = { 'Authorization': `Bearer ${token}` };
  if (companyId) headers['X-KEEPNET-Company-Id'] = companyId;
  const url = query ? `${BASE_URL}${path}?${query}` : `${BASE_URL}${path}`;
  const res = await fetch(url, { method: 'GET', headers });
  const text = await res.text();
  if (!res.ok) throw new Error(`API ${path} → ${res.status}: ${text}`);
  return text ? JSON.parse(text) : {};
}

/** Survey Report - Security Culture - Keepnet (dash URL'deki enrollment ID) */
const ENROLLMENT_ID_SECURITY_CULTURE_KEEPNET = '7cc15c9d-b411-4b6a-b7f4-b72abe043d6f';

async function main() {
  const env = loadEnv();
  const clientId = env.KEEPNET_CLIENT_ID || env.CLIENT_ID;
  const clientSecret = env.KEEPNET_CLIENT_SECRET || env.CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    console.error('❌ KEEPNET_CLIENT_ID ve KEEPNET_CLIENT_SECRET .zhc.env içinde tanımlı olmalı.');
    process.exit(1);
  }

  console.log('=== 1. Token alınıyor ===');
  const token = await getToken(clientId, clientSecret);
  console.log('✓ Token alındı\n');

  console.log('=== 2. Şirket listesi (Keepnet Labs LTD aranıyor) ===');
  let companyId = null;
  let page = 1;
  const pageSize = 50;
  while (true) {
    const res = await apiPost(token, '/api/companies/search', {
      pageNumber: page,
      pageSize,
      orderBy: 'CreateTime',
      ascending: false,
      filter: null,
    });
    const data = res.data || res;
    const results = data.results || [];
    const company = results.find(c => (c.companyName || '').trim() === 'Keepnet Labs LTD');
    if (company) {
      companyId = company.companyResourceId || company.resourceId;
      console.log('✓ Bulundu:', company.companyName, '→ companyResourceId:', companyId);
      break;
    }
    if (results.length < pageSize) break;
    page++;
  }
  if (!companyId) {
    console.log('⚠ "Keepnet Labs LTD" isimli şirket bulunamadı. Tüm şirketler (ilk sayfa):');
    const res = await apiPost(token, '/api/companies/search', {
      pageNumber: 1,
      pageSize: 20,
      orderBy: 'CreateTime',
      ascending: false,
      filter: null,
    });
    const data = res.data || res;
    (data.results || []).forEach(c => console.log('  -', c.companyName, '|', c.companyResourceId));
    process.exit(1);
  }

  const enrollmentId = ENROLLMENT_ID_SECURITY_CULTURE_KEEPNET;
  const enrollmentName = 'Security Culture - Keepnet';
  console.log('\n=== 3. Survey raporu (Security Culture - Keepnet) ===');
  console.log('Enrollment ID (URL\'den):', enrollmentId);

  // Önce aynı enrollment için summary ve GET enrollment erişimini dene (403 sebebini anlamak için)
  try {
    const summaryRes = await apiGet(
      token,
      `/api/training-reports/${enrollmentId}/summary`,
      companyId,
      'trainingType=0'
    );
    console.log('  GET summary (trainingType=0) [X-KEEPNET-Company-Id]: 200 OK');
  } catch (e) {
    console.log('  GET summary [X-KEEPNET-Company-Id]:', e.message);
  }
  try {
    await apiGet(token, `/api/enrollments/${enrollmentId}`, companyId);
    console.log('  GET enrollment [X-KEEPNET-Company-Id]: 200 OK');
  } catch (e) {
    console.log('  GET enrollment [X-KEEPNET-Company-Id]:', e.message);
  }
  // Header OLMADAN dene (token varsayılan company)
  try {
    await apiGet(token, `/api/training-reports/${enrollmentId}/summary`, null, 'trainingType=0');
    console.log('  GET summary [header YOK]: 200 OK');
  } catch (e) {
    console.log('  GET summary [header YOK]:', e.message);
  }
  try {
    await apiGet(token, `/api/enrollments/${enrollmentId}`, null);
    console.log('  GET enrollment [header YOK]: 200 OK');
  } catch (e) {
    console.log('  GET enrollment [header YOK]:', e.message);
  }

  console.log('\n=== 4. Users raporu (training-reports/users/search, tüm sayfalar) ===');
  const usersReportBody = {
    pageNumber: 1,
    pageSize: 100,
    orderBy: 'Email',
    ascending: true,
    trainingType: 0, // Survey (dashboard URL'deki trainingType=0)
    filter: { searchInputTextValue: null, condition: 'and', filterGroups: [] },
  };
  const allUsers = [];
  let userPage = 1;
  while (true) {
    usersReportBody.pageNumber = userPage;
    const usersRes = await apiPost(
      token,
      `/api/training-reports/${enrollmentId}/users/search`,
      usersReportBody,
      companyId
    );
    const ud = usersRes.data || usersRes;
    const results = ud.results || [];
    allUsers.push(...results);
    const total = ud.totalNumberOfRecords ?? results.length;
    console.log(`  Sayfa ${userPage}: ${results.length} kullanıcı (toplam kayıt: ${total})`);
    if (results.length === 0 || results.length < (ud.pageSize || 100)) break;
    if (allUsers.length >= total) break;
    userPage++;
  }

  console.log('\n=== Özet ===');
  console.log('Şirket:', 'Keepnet Labs LTD', '| Company ID:', companyId);
  console.log('Enrollment:', enrollmentName, '| Enrollment ID:', enrollmentId);
  console.log('Users raporu – toplam kullanıcı sayısı:', allUsers.length);

  const outputPath = join(process.cwd(), 'reseller-survey-users-report.json');
  writeFileSync(outputPath, JSON.stringify({
    companyName: 'Keepnet Labs LTD',
    companyResourceId: companyId,
    enrollmentName,
    enrollmentId,
    fetchedAt: new Date().toISOString(),
    totalUsers: allUsers.length,
    users: allUsers,
  }, null, 2), 'utf8');
  console.log('\n✓ Tüm kullanıcı survey verisi kaydedildi:', outputPath);
}

main().catch(err => {
  console.error('Hata:', err.message);
  process.exit(1);
});
