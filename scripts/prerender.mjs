// 빌드 후 메뉴별 HTML을 따로 만들어 검색엔진이 각 페이지를 개별로 수집하게 합니다.
// - 페이지마다 고유 제목·설명·대표주소(canonical)
// - 자바스크립트를 실행하지 않는 수집기(네이버 등)도 읽을 수 있는 본문 요약과 메뉴 링크
// - sitemap.xml 자동 생성
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const dist = join(root, 'dist');
const seo = JSON.parse(readFileSync(join(root, 'seo.json'), 'utf8'));
const blog = JSON.parse(readFileSync(join(root, 'blog.generated.json'), 'utf8'));
// 서비스(수리 종류)·지역·사례 페이지를 페이지 목록에 합칩니다
// /services/<서비스>  /services/<서비스>/<지역>  /services/<서비스>/<지역>/<글주소>
const SERVICES = JSON.parse(readFileSync(join(root, 'services.json'), 'utf8'));
const LABEL = { iphone: '아이폰', ipad: '아이패드', macbook: '맥북', watch: '애플워치' };
const link = (p) => [p.path, p.title, p.description];
const REGION_LINE = '많이 찾아주시는 지역: 서울 동작구(상도동/노량진/흑석동/동작동/사당동/신대방), 관악구(신림/서울대입구/낙성대동/삼성동), 서초구(반포동/방배동), 용산구(용산/이촌동), 영등포구(여의도), 인천(청라), 강원(춘천/원주/철원), 경기(양평). 먼 지역은 택배(편도 택배비)·퀵(손님 부담)으로 접수할 수 있어요.';
const STORE_LINE = '서울 동작구 상도로47아길 44-1 동작청년창업지원센터 3층 304호 · 0507-1330-5340 · 중앙대·숭실대 도보 10분 · 무료 주차';
for (const s of SERVICES) {
  const warranty = s.warranty || '3개월';
  const posts = blog.filter((p) => p.service === s.id);
  const areas = [...new Map(posts.map((p) => [p.area, p.areaName])).entries()];
  seo.pages['/services/' + s.id] = {
    title: `${s.name} 상도동 중앙대·숭실대 | 세이프픽스`,
    description: `${s.name}(${s.short}), 외주 없이 대표가 직접 진단하고 고쳐요. 중앙대·숭실대 도보 10분, 무료 주차, 수리 후 ${warranty} 무상 보증.`,
    h1: `${s.name}, 대표가 직접 고쳐요`,
    body: [...s.symptoms.map((x) => '증상: ' + x), ...(s.points || []), `수리 후 ${warranty} 무상 보증(고객 과실 제외).`, STORE_LINE, REGION_LINE],
    sitemap: true,
    priority: '0.8',
    crumb: s.name,
    trail: [[LABEL[s.device] + '수리', '/services/' + s.device]],
    service: { name: s.name, device: '', items: s.symptoms },
    qa: [
      [`${s.name} 비용은 어떻게 정해지나요?`, '모델과 증상에 따라 작업 범위가 달라져요. 기기 상태를 먼저 확인한 뒤 비용과 소요 시간을 안내하고, 동의하신 경우에만 수리해요.'],
      [`${s.name} 후 보증이 있나요?`, `네, 수리 후 ${warranty} 동안 같은 증상이 다시 나타나면 무상으로 봐드려요. 떨어뜨리거나 물에 빠뜨린 경우처럼 고객 과실은 제외돼요.`],
      ['어디에 있나요? 주차되나요?', '서울 동작구 상도로47아길 44-1 동작청년창업지원센터 3층 304호에 있어요. 중앙대·숭실대에서 걸어서 약 10분이고, 무료 주차가 가능해요.'],
      ['멀리 있어도 맡길 수 있나요?', '네, 전국 택배 수리가 가능해요. 점검 후 비용을 안내하고 동의하시면 수리해서 우체국 택배로 보내드려요. 보통 1~2일 걸려요.'],
    ],
    links: [...posts.map(link), ...areas.map(([a, n]) => [`/services/${s.id}/${a}`, `${n} ${s.name}`, `${n} ${s.name} 사례 모음`])],
  };
  for (const [a, n] of areas) {
    seo.pages[`/services/${s.id}/${a}`] = {
      title: `${n} ${s.name} | 세이프픽스`,
      description: `${n}에서 맡기신 ${s.name} 사례를 모았어요. 대표가 직접 진단하고 고친 과정과 결과를 확인해보세요.`,
      h1: `${n} ${s.name}`,
      body: [STORE_LINE],
      sitemap: true,
      priority: '0.6',
      crumb: n,
      trail: [[s.name, '/services/' + s.id]],
      links: posts.filter((p) => p.area === a).map(link),
    };
  }
  const dev = seo.pages['/services/' + s.device];
  if (dev) (dev.links ||= []).push(['/services/' + s.id, s.name, s.short]);
  if (seo.pages['/services']) (seo.pages['/services'].links ||= []).push(['/services/' + s.id, s.name, s.short]);
}
for (const post of blog) {
  seo.pages[post.path] = {
    title: post.title + ' | 세이프픽스',
    description: post.description,
    h1: post.title,
    body: [],
    sitemap: true,
    priority: '0.6',
    crumb: post.title,
    trail: [[post.serviceName, '/services/' + post.service], [post.areaName, `/services/${post.service}/${post.area}`]],
    qa: post.faq,
    article: post,
  };
}
if (seo.pages['/cases']) seo.pages['/cases'].links = blog.map(link);
const base = readFileSync(join(dist, 'index.html'), 'utf8');
const today = new Date().toISOString().slice(0, 10);

const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const nav = [
  ['/', '홈'],
  ['/about', '회사소개'],
  ['/services', '서비스'],
  ['/services/iphone', '아이폰수리'],
  ['/services/ipad', '아이패드수리'],
  ['/services/macbook', '맥북수리'],
  ['/services/watch', '애플워치수리'],
  ['/delivery', '택배수리'],
  ['/cases', '수리 사례'],
  ['/locations', '매장안내'],
  ['/faq', '자주 묻는 질문'],
  ['/contact', '상담문의'],
];

function render(path, page) {
  const canonical = seo.site + encodeURI(page.canonical || path);
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
  if (path.startsWith('/services/')) crumbs.push({ name: '서비스', url: seo.site + '/services' });
  for (const [name, p] of page.trail || []) crumbs.push({ name, url: seo.site + encodeURI(p) });
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
      ...(page.service.device ? { hasOfferCatalog: { '@type': 'OfferCatalog', name: page.service.name + ' 항목', itemListElement: page.service.items.map((n) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: page.service.device + ' ' + n } })) } } : {}),
    });
  }
  const art = page.article;
  if (art) {
    ld.push({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: art.title,
      description: art.description,
      datePublished: art.date,
      dateModified: art.updated,
      inLanguage: 'ko-KR',
      mainEntityOfPage: canonical,
      url: canonical,
      author: { '@type': 'Person', name: '세이프픽스 대표', jobTitle: '대표', description: '애플 기기 수리 경력 10년, 외주 없이 직접 수리', worksFor: { '@id': seo.site + '/#business' } },
      publisher: { '@id': seo.site + '/#business' },
      about: art.device ? { '@type': 'Thing', name: { iphone: '아이폰 수리', ipad: '아이패드 수리', macbook: '맥북 수리', watch: '애플워치 수리' }[art.device] } : undefined,
    });
    html = html.replace('<meta property="og:type" content="website">', '<meta property="og:type" content="article">');
  }
  if (qa.length) {
    ld.push({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: qa.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });
  }
  const ldTags = ld.map((d) => `<script type="application/ld+json">${JSON.stringify(d).replace(/</g, '\\u003c')}</script>`).join('');
  html = html.replace('</head>', ldTags + '</head>');
  const body = art
    ? `<main data-prerender><article><h1>${esc(art.title)}</h1><p>${esc(art.description)}</p><p><time datetime="${art.date}">${art.date}</time> · 세이프픽스 대표</p>${art.html}</article>` +
      `<nav><ul>${nav.map(([h, t]) => `<li><a href="${h}">${t}</a></li>`).join('')}</ul></nav></main>`
    : `<main data-prerender><h1>${esc(page.h1)}</h1>` +
    `<p>${esc(page.description)}</p>` +
    (page.body.length ? `<ul>${page.body.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>` : '') +
    (page.links?.length ? `<ul>${page.links.map(([h, t, d]) => `<li><a href="${encodeURI(h)}">${esc(t)}</a> — ${esc(d)}</li>`).join('')}</ul>` : '') +
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
  .map(([path, p]) => `  <url>\n    <loc>${seo.site}${encodeURI(path)}</loc>\n    <lastmod>${p.article ? p.article.updated : today}</lastmod>\n    <priority>${p.priority}</priority>\n  </url>`)
  .join('\n');
writeFileSync(join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
console.log('prerendered', Object.keys(seo.pages).length, 'pages');

// IndexNow: 배포(프로덕션 빌드)마다 Bing·네이버 등 IndexNow 참여 검색엔진에 바뀐 페이지를 바로 알립니다.
// (구글은 IndexNow를 지원하지 않아 서치콘솔에서 따로 요청해야 합니다.)
if (process.env.VERCEL_ENV === 'production') {
  const key = readFileSync(join(root, '.indexnow-key'), 'utf8').trim();
  const host = new URL(seo.site).host;
  const urlList = Object.entries(seo.pages).filter(([, p]) => p.sitemap).map(([path]) => seo.site + encodeURI(path));
  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ host, key, keyLocation: `${seo.site}/${key}.txt`, urlList }),
    });
    console.log('IndexNow', res.status, urlList.length, 'urls');
  } catch (e) {
    console.log('IndexNow skipped:', e.message);
  }
}
