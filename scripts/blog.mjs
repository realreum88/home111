// content/blog/*.md → blog.generated.json
// 홈페이지 수리 사례 글을 빌드 전에 읽어 화면(React)과 정적 HTML(prerender)이 함께 씁니다.
// 주소 구조: /services/<서비스>/<지역>/<글주소>   예) /services/ipad-screen/sangdo/상도동아이패드액정수리
// 글 맨 위 --- 사이에 title, description, date, service, area, areaName, slug, draft 를 적습니다.
// service 는 services.json 의 id 중 하나예요.
// "## 자주 묻는 질문" 아래 "### 질문" + 답변 문단은 FAQ 구조화 데이터로도 들어갑니다.
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const dir = join(root, 'content', 'blog');
const SERVICES = JSON.parse(readFileSync(join(root, 'services.json'), 'utf8'));
const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function inline(t) {
  return esc(t)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/\[(.+?)\]\((https?:\/\/[^\s)]+|\/[^\s)]*)\)/g, (_, txt, href) =>
      href.startsWith('/') ? `<a href="${href}">${txt}</a>` : `<a href="${href}" target="_blank" rel="noopener noreferrer">${txt}</a>`,
    );
}
const plain = (t) => t.replace(/\*\*(.+?)\*\*/g, '$1').replace(/`(.+?)`/g, '$1').replace(/\[(.+?)\]\([^)]*\)/g, '$1');

function markdown(src) {
  const lines = src.split('\n');
  const out = [];
  const faq = [];
  const toc = [];
  let inFaq = false;
  let q = null;
  let i = 0;
  while (i < lines.length) {
    const l = lines[i];
    if (!l.trim()) { i++; continue; }
    let m;
    if ((m = l.match(/^(#{2,3})\s+(.*)$/))) {
      const lv = m[1].length;
      const text = m[2].trim();
      if (lv === 2) {
        inFaq = /자주 묻는 질문|FAQ/i.test(text);
        toc.push(plain(text));
      }
      q = null;
      if (lv === 3 && inFaq) {
        q = { q: plain(text), a: [] };
        faq.push(q);
      }
      out.push(`<h${lv}>${inline(text)}</h${lv}>`);
      i++;
      continue;
    }
    if (l.startsWith('|')) {
      const rows = [];
      while (i < lines.length && lines[i].startsWith('|')) rows.push(lines[i++]);
      const cells = (r) => r.replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
      const head = cells(rows[0]);
      const body = rows.slice(rows[1] && /^[\s|:-]+$/.test(rows[1]) ? 2 : 1).map(cells);
      out.push(
        `<div class="table-wrap"><table><thead><tr>${head.map((c) => `<th>${inline(c)}</th>`).join('')}</tr></thead><tbody>` +
          body.map((r) => `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join('')}</tr>`).join('') +
          '</tbody></table></div>',
      );
      continue;
    }
    if (/^(\d+\.|-|\*)\s+/.test(l)) {
      const ordered = /^\d+\./.test(l);
      const items = [];
      while (i < lines.length && /^(\d+\.|-|\*)\s+/.test(lines[i])) items.push(lines[i++].replace(/^(\d+\.|-|\*)\s+/, ''));
      const tag = ordered ? 'ol' : 'ul';
      out.push(`<${tag}>${items.map((t) => `<li>${inline(t)}</li>`).join('')}</${tag}>`);
      if (q) q.a.push(items.map(plain).join(' '));
      continue;
    }
    if (l.startsWith('>')) {
      const buf = [];
      while (i < lines.length && lines[i].startsWith('>')) buf.push(lines[i++].replace(/^>\s?/, ''));
      out.push(`<blockquote>${inline(buf.join(' '))}</blockquote>`);
      continue;
    }
    const buf = [];
    while (i < lines.length && lines[i].trim() && !/^(#{2,3}\s|\||(\d+\.|-|\*)\s|>)/.test(lines[i])) buf.push(lines[i++].trim());
    const text = buf.join(' ');
    out.push(`<p>${inline(text)}</p>`);
    if (q) q.a.push(plain(text));
  }
  return { html: out.join('\n'), faq: faq.filter((f) => f.a.length).map((f) => [f.q, f.a.join(' ')]), toc };
}

function parse(file) {
  const raw = readFileSync(join(dir, file), 'utf8').replace(/\r\n/g, '\n');
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error(`${file}: 맨 위에 --- 로 감싼 글 정보가 없어요`);
  const meta = {};
  for (const line of m[1].split('\n')) {
    const k = line.match(/^(\w+):\s*(.*)$/);
    if (k) meta[k[1]] = k[2].trim().replace(/^["']|["']$/g, '');
  }
  for (const key of ['title', 'description', 'date', 'slug', 'service', 'area', 'areaName']) if (!meta[key]) throw new Error(`${file}: ${key} 가 비어 있어요`);
  const svc = SERVICES.find((x) => x.id === meta.service);
  if (!svc) throw new Error(`${file}: service 는 services.json 의 id 중 하나예요 (${SERVICES.map((x) => x.id).join(', ')})`);
  if (!/^[a-z0-9-]+$/.test(meta.area)) throw new Error(`${file}: area 는 영문 소문자·숫자·- 만 써주세요 (예: sangdo)`);
  if (!/^[가-힣a-z0-9-]+$/.test(meta.slug)) throw new Error(`${file}: slug 는 한글·영문 소문자·숫자·- 만, 띄어쓰기 없이 써주세요`);
  const { html, faq, toc } = markdown(m[2]);
  return {
    slug: meta.slug,
    title: meta.title,
    description: meta.description,
    date: meta.date,
    updated: meta.updated || meta.date,
    service: svc.id,
    serviceName: svc.name,
    device: svc.device,
    area: meta.area,
    areaName: meta.areaName,
    path: `/services/${svc.id}/${meta.area}/${meta.slug}`,
    draft: meta.draft === 'true',
    html,
    faq,
    toc,
  };
}

const posts = existsSync(dir)
  ? readdirSync(dir).filter((f) => f.endsWith('.md')).map(parse)
  : [];
const showDrafts = process.env.BLOG_DRAFTS === '1';
const live = posts.filter((p) => showDrafts || !p.draft).sort((a, b) => (a.date < b.date ? 1 : -1));
const paths = new Set();
for (const p of live) {
  if (paths.has(p.path)) throw new Error(`주소 중복: ${p.path}`);
  paths.add(p.path);
}
writeFileSync(join(root, 'blog.generated.json'), JSON.stringify(live, null, 1));
console.log('blog', live.length, 'posts', posts.length - live.length ? `(${posts.length - live.length} draft 제외)` : '');
