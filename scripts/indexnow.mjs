// 새로 올리거나 고친 글 주소를 네이버·빙(IndexNow)에 바로 알려줍니다.
// GitHub Actions(.github/workflows/indexnow.yml)가 main에 글이 올라올 때마다 자동으로 실행해요.
//
// 사용법
//   node scripts/indexnow.mjs --diff <이전커밋> <현재커밋>   바뀐 글만 제출 (자동 실행용)
//   node scripts/indexnow.mjs --all                         사이트맵 전체 제출 (처음 한 번)
//   node scripts/indexnow.mjs /services/watch-screen/...     원하는 주소만 제출
//
// 제출 전에 실제 사이트에 새 글이 떴는지(대표주소가 맞는지) 확인하고, 뜰 때까지 최대 10분 기다려요.
import { readFileSync, readdirSync, appendFileSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const SITE = 'https://www.safefix.co.kr';
const HOST = 'www.safefix.co.kr';
const KEY = readdirSync(join(root, 'public')).find((f) => /^[0-9a-f]{32}\.txt$/.test(f))?.replace('.txt', '');
if (!KEY) throw new Error('public/ 에 IndexNow 키 파일이 없어요');
const ENDPOINTS = ['https://searchadvisor.naver.com/indexnow', 'https://api.indexnow.org/indexnow'];

const enc = (p) => SITE + encodeURI(decodeURI(p));
const front = (file) => {
  const m = readFileSync(file, 'utf8').match(/^---\n([\s\S]*?)\n---/);
  const o = {};
  for (const l of (m?.[1] || '').split('\n')) {
    const i = l.indexOf(':');
    if (i > 0) o[l.slice(0, i).trim()] = l.slice(i + 1).trim();
  }
  return o;
};

function postsBySlug() {
  execSync('node scripts/blog.mjs', { cwd: root, stdio: 'ignore' });
  const list = JSON.parse(readFileSync(join(root, 'blog.generated.json'), 'utf8'));
  return new Map(list.filter((p) => !p.draft).map((p) => [p.slug, p]));
}

function fromDiff(before, after) {
  const zero = /^0+$/.test(before);
  const range = zero ? `${after}~1 ${after}` : `${before} ${after}`;
  const files = execSync(`git -c core.quotepath=false diff --name-only --diff-filter=AMR ${range}`, { cwd: root, encoding: 'utf8' })
    .split('\n').filter(Boolean);
  const posts = postsBySlug();
  const paths = new Set();
  let siteChanged = false;
  for (const f of files) {
    if (/^content\/blog\/.*\.md$/.test(f) && existsSync(join(root, f))) {
      const fm = front(join(root, f));
      const p = posts.get(fm.slug);
      if (!p) continue; // 초안은 제출하지 않아요
      paths.add(p.path);
      paths.add(`/services/${p.service}`);
      if (p.area) paths.add(`/services/${p.service}/${p.area}`);
      paths.add('/');
    } else if (/^(src\/|App\.tsx|index\.html|seo\.json|services\.json|content\/reviews\.json|scripts\/prerender\.mjs)/.test(f)) {
      siteChanged = true;
    }
  }
  if (siteChanged) paths.add('/');
  return [...paths];
}

async function fromSitemap() {
  const xml = await (await fetch(`${SITE}/sitemap.xml`)).text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => decodeURI(m[1].replace(SITE, '')));
}

async function isLive(path) {
  try {
    const r = await fetch(enc(path), { redirect: 'manual' });
    if (r.status !== 200) return false;
    const html = await r.text();
    const c = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
    return c === enc(path) || (path === '/' && c === SITE + '/');
  } catch { return false; }
}

async function waitLive(paths) {
  const pending = new Set(paths);
  const until = Date.now() + 10 * 60 * 1000;
  while (pending.size && Date.now() < until) {
    for (const p of [...pending]) if (await isLive(p)) pending.delete(p);
    if (pending.size) await new Promise((r) => setTimeout(r, 20000));
  }
  return paths.filter((p) => !pending.has(p));
}

async function submit(paths) {
  const urlList = paths.map(enc);
  const body = JSON.stringify({ host: HOST, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList });
  const out = [];
  for (const ep of ENDPOINTS) {
    try {
      const r = await fetch(ep, { method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8' }, body });
      out.push(`${new URL(ep).host}: ${r.status}`);
    } catch (e) { out.push(`${new URL(ep).host}: 실패 ${e.message}`); }
  }
  return out;
}

const args = process.argv.slice(2);
let paths;
if (args[0] === '--diff') paths = fromDiff(args[1], args[2]);
else if (args[0] === '--all') paths = await fromSitemap();
else paths = args;

if (!paths.length) { console.log('제출할 새 글이 없어요'); process.exit(0); }
if (process.env.DRY_RUN) { console.log(paths.join('\n')); process.exit(0); }
const live = args[0] === '--all' ? paths : await waitLive(paths);
const missed = paths.filter((p) => !live.includes(p));
const result = live.length ? await submit(live) : [];

const lines = [
  '## 색인 요청 결과',
  '',
  `IndexNow(네이버·빙) 응답: ${result.join(', ') || '제출 안 함'} (200·202면 정상)`,
  '',
  '### 제출한 주소 — 구글 서치콘솔 "URL 검사"에도 넣어주세요',
  ...live.map((p) => `- ${SITE}${decodeURI(p)}`),
  ...(missed.length ? ['', '### 10분 안에 사이트에 안 떠서 제출 못 한 주소', ...missed.map((p) => `- ${SITE}${decodeURI(p)}`)] : []),
];
console.log(lines.join('\n'));
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, lines.join('\n') + '\n');
if (result.some((r) => !/: 20[02]$/.test(r))) process.exitCode = 1;
