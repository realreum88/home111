// 빌드 후 메뉴별 HTML을 따로 만들어 검색엔진이 각 페이지를 개별로 수집하게 합니다.
// - 페이지마다 고유 제목·설명·대표주소(canonical)
// - 자바스크립트를 실행하지 않는 수집기(네이버 등)도 읽을 수 있는 본문 요약과 메뉴 링크
// - sitemap.xml 자동 생성
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const dist = join(root, 'dist');
const seo = JSON.parse(readFileSync(join(root, 'seo.json'), 'utf8'));
const base = readFileSync(join(dist, 'index.html'), 'utf8');
const today = new Date().toISOString().slice(0, 10);

const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const nav = [
  ['/', '홈'],
  ['/services', '수리하기'],
  ['/services/iphone', '아이폰수리'],
  ['/services/ipad', '아이패드수리'],
  ['/services/macbook', '맥북수리'],
  ['/services/watch', '애플워치수리'],
  ['/delivery', '택배수리'],
  ['/cases', '수리 사례'],
  ['/locations', '매장안내'],
  ['/faq', '자주 묻는 질문'],
];

function render(path, page) {
  const canonical = seo.site + (page.canonical || path);
  let html = base
    .replace(/<title>.*?<\/title>/, `<title>${esc(page.title)}</title>`)
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${esc(page.description)}">`)
    .replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${esc(page.title)}">`)
    .replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${esc(page.description)}">`)
    .replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${canonical}">`)
    .replace(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${canonical}">`);
  if (page.sitemap === false && !page.canonical) {
    html = html.replace(/<meta name="robots" content="[^"]*">/, '<meta name="robots" content="noindex,follow">');
  }
  // 페이지별 구조화 데이터 (검색엔진·AI가 페이지 성격을 정확히 이해하도록)
  const qa = path === '/faq' ? seo.faq : page.qa || [];
  const ld = [];
  const crumbs = [{ name: '홈', url: seo.site + '/' }];
  if (path.startsWith('/services/')) crumbs.push({ name: '수리하기', url: seo.site + '/services' });
  if (path !== '/') crumbs.push({ name: page.crumb || page.h1, url: canonical });
  if (crumbs.length > 1) {
    ld.push({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: c.url })) });
  }
  if (page.service) {
    ld.push({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: page.service.name,
      serviceType: page.service.name,
      description: page.description,
      url: canonical,
      provider: { '@id': seo.site + '/#business' },
      areaServed: [{ '@type': 'CollegeOrUniversity', name: '중앙대학교' }, { '@type': 'CollegeOrUniversity', name: '숭실대학교' }, { '@type': 'City', name: '서울' }],
      hasOfferCatalog: { '@type': 'OfferCatalog', name: page.service.name + ' 항목', itemListElement: page.service.items.map((n) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: page.service.device + ' ' + n } })) },
    });
  }
  if (qa.length) {
    ld.push({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: qa.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });
  }
  const ldTags = ld.map((d) => `<script type="application/ld+json">${JSON.stringify(d).replace(/</g, '\\u003c')}</script>`).join('');
  html = html.replace('</head>', ldTags + '</head>');
  const body =
    `<main data-prerender><h1>${esc(page.h1)}</h1>` +
    `<p>${esc(page.description)}</p>` +
    (page.body.length ? `<ul>${page.body.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>` : '') +
    (qa.length ? `<section><h2>자주 묻는 질문</h2>${qa.map(([q, a]) => `<h3>${esc(q)}</h3><p>${esc(a)}</p>`).join('')}</section>` : '') +
    `<nav><ul>${nav.map(([h, t]) => `<li><a href="${h}">${t}</a></li>`).join('')}</ul></nav></main>`;
  html = html.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
  const out = path === '/' ? join(dist, 'index.html') : join(dist, path.slice(1), 'index.html');
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html);
}

for (const [path, page] of Object.entries(seo.pages)) render(path, page);

const urls = Object.entries(seo.pages)
  .filter(([, p]) => p.sitemap)
  .map(([path, p]) => `  <url>\n    <loc>${seo.site}${path}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${p.priority}</priority>\n  </url>`)
  .join('\n');
writeFileSync(join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
console.log('prerendered', Object.keys(seo.pages).length, 'pages');
