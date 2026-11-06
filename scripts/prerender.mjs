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
const REGION_LINE = '접수 가능 지역: 서울 25개 구 전역, 인천 전역(제물포구·영종구·미추홀구·연수구·남동구·부평구·계양구·서구·검단구·강화군·옹진군), 경기 31개 시·군 전역, 강원 18개 시·군(택배), 부산·대구·대전·광주·울산·세종·충북·충남·전북·전남·경북·경남·제주(전국 택배). 특히 동작구(상도동/노량진/흑석동/동작동/사당동/신대방), 관악구(신림/서울대입구/낙성대동/삼성동), 서초구(반포동/방배동), 용산구(용산/이촌동), 영등포구(여의도), 마포구, 송파구, 강남구, 구로구, 금천구, 노원구, 인천 서구(청라)·계양구·부평구·연수구, 경기 수원·이천·광명·광주·용인·부천·평택·의왕·안양·양평, 강원 춘천·원주·철원, 부산·대구·대전·광주·울산에서 많이 찾아주세요. 먼 지역은 택배(편도 택배비)·퀵(손님 부담)으로 접수해요.';
const STORE_LINE = '서울 동작구 상도로47아길 44-1 동작청년창업지원센터 3층 304호 · 0507-1330-5340 · 중앙대·숭실대 도보 10분 · 무료 주차';
for (const s of SERVICES) {
  const warranty = s.warranty || '3개월';
  const posts = blog.filter((p) => p.service === s.id);
  const areas = [...new Map(posts.filter((p) => p.area).map((p) => [p.area, p.areaName])).entries()];
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
    trail: [[post.serviceName, '/services/' + post.service], ...(post.area ? [[post.areaName, `/services/${post.service}/${post.area}`]] : [])],
    qa: post.faq,
    article: post,
  };
}
if (seo.pages['/cases']) seo.pages['/cases'].links = blog.map(link);
const base = readFileSync(join(dist, 'index.html'), 'utf8');

// 네이버 블로그 최신 글을 빌드 때 받아 HTML에 넣어요 (자바스크립트를 실행하지 않는 AI 크롤러도 블로그 수리기 링크를 읽도록)
const strip = (h) => h.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/\s+/g, ' ').trim();
const pick = (xml, tag) => {
  const m = xml.match(new RegExp('<' + tag + '[^>]*>([\\s\\S]*?)</' + tag + '>'));
  return m ? m[1].replace(/^<!\[CDATA\[/, '').replace(/\]\]>$/, '').trim() : '';
};
let blogPosts = [];
try {
  const r = await fetch('https://rss.blog.naver.com/safefixx.xml', { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; SafefixSite/1.0)' }, signal: AbortSignal.timeout(8000) });
  const xml = await r.text();
  blogPosts = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].slice(0, 50).map(([, it]) => {
    const desc = pick(it, 'description');
    const text = strip(desc);
    return { title: strip(pick(it, 'title')), link: pick(it, 'link').replace(/\?fromRss.*$/, ''), date: pick(it, 'pubDate'), image: (desc.match(/<img[^>]+src=["']([^"']+)["']/) || [])[1] || '', summary: text.length > 90 ? text.slice(0, 90) + '…' : text };
  });
  console.log('blog rss', blogPosts.length);
} catch (e) {
  console.log('blog rss skipped:', e.message);
}
globalThis.__SAFEFIX_BLOG__ = blogPosts;
const { render: ssr } = await import(new URL('../dist-ssr/entry-server.js', import.meta.url).href);
const blogScript = blogPosts.length ? `<script>window.__SAFEFIX_BLOG__=${JSON.stringify(blogPosts).replace(/</g, '\\u003c')}</script>` : '';
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'");
const textOf = (h) => decode(h.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
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
  ['/contact', '견적문의'],
];

const collected = {};
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
  // 실제 화면을 HTML로 그려 넣어요
  const app = ssr(path);
  // 페이지별 구조화 데이터 (검색엔진·AI가 페이지 성격을 정확히 이해하도록) — 화면에 실제로 보이는 Q&A·진행 과정에서 뽑아요
  const shownQa = [...app.matchAll(/<details[^>]*>\s*<summary>([\s\S]*?)<\/summary>\s*<p>([\s\S]*?)<\/p>\s*<\/details>/g)].map(([, q, a]) => [textOf(q).replace(/^Q\s*/, ''), textOf(a)]);
  const qa = page.article ? page.qa || [] : shownQa.length ? shownQa : page.qa || [];
  collected[path] = { qa: shownQa };
  const steps = [...(app.match(/<ol class="step-cards">([\s\S]*?)<\/ol>/)?.[1] || '').matchAll(/<h3>([\s\S]*?)<\/h3>\s*<p>([\s\S]*?)<\/p>/g)].map(([, n, d]) => [textOf(n), textOf(d)]);
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
      ...(art.images?.length ? { image: art.images.map((x) => (x.startsWith('http') ? x : seo.site + x)) } : {}),
      mainEntityOfPage: canonical,
      url: canonical,
      author: { '@type': 'Person', name: '세이프픽스 대표', jobTitle: '대표', description: '애플 기기 수리 경력 10년, 외주 없이 직접 수리', worksFor: { '@id': seo.site + '/#business' } },
      publisher: { '@id': seo.site + '/#business' },
      about: art.device ? { '@type': 'Thing', name: { iphone: '아이폰 수리', ipad: '아이패드 수리', macbook: '맥북 수리', watch: '애플워치 수리' }[art.device] } : undefined,
    });
    html = html.replace('<meta property="og:type" content="website">', '<meta property="og:type" content="article">');
  }
  if (steps.length) {
    ld.push({ '@context': 'https://schema.org', '@type': 'HowTo', name: (page.crumb && path !== '/' ? page.crumb : '세이프픽스 수리') + ' 진행 과정', inLanguage: 'ko-KR', step: steps.map(([n, d], i) => ({ '@type': 'HowToStep', position: i + 1, name: n, text: d })) });
  }
  if (path === '/') {
    ld.push({ '@context': 'https://schema.org', '@type': 'WebSite', name: '세이프픽스', alternateName: '세이프픽스 아이폰 아이패드수리 상도점', url: seo.site + '/', inLanguage: 'ko-KR', publisher: { '@id': seo.site + '/#business' } });
  }
  if (qa.length) {
    ld.push({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: qa.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });
  }
  const ldTags = ld.map((d) => `<script type="application/ld+json">${JSON.stringify(d).replace(/</g, '\\u003c')}</script>`).join('');
  html = html.replace('</head>', ldTags + '</head>');
  const body = app;
  html = html.replace('<div id="root"></div>', `<div id="root">${body}</div>`).replace('</head>', blogScript + '</head>');
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

// llms.txt / llms-full.txt: ChatGPT·Perplexity·Claude 같은 AI가 사이트를 한 번에 이해하도록, 실제 사이트 데이터로 매번 새로 만들어요
{
  const REVIEWS = JSON.parse(readFileSync(join(root, 'reviews.json'), 'utf8'));
  const S = seo.site;
  const u = (p) => S + encodeURI(p);
  const devName = LABEL;
  const head = readFileSync(join(root, 'public', 'llms.txt'), 'utf8').split('\n## 수리 항목')[0].trim();
  const lines = [head, ''];
  lines.push('## 수리 서비스 (수리 종류별)');
  for (const d of Object.keys(devName)) {
    lines.push(`### ${devName[d]} 수리 — ${u('/services/' + d)}`);
    for (const s of SERVICES.filter((x) => x.device === d)) lines.push(`- [${s.name}](${u('/services/' + s.id)}): ${s.short} · 무상 보증 ${s.warranty || '3개월'}`);
  }
  lines.push('', '## 수리 원칙', '- 외주 없이 대표가 상담부터 수리·출고 점검까지 직접 한다(수리 경력 10년).', '- 과잉진단 없이 꼭 필요한 수리만 안내한다. 점검 후 비용과 소요 시간을 먼저 안내하고, 동의한 경우에만 수리한다.', '- 리퍼(기기 교체) 대신 원래 기기를 다시 고친다.', '- 무상 보증: 아이패드 액정 1개월, 그 밖의 수리 3개월(고객 과실 제외).');
  const ipadSteps = collected['/services/ipad-screen']?.steps || [];
  if (ipadSteps.length) lines.push('', '## 아이패드 수리 진행 과정', ...ipadSteps.map(([n, d], i) => `${i + 1}. ${n} — ${d}`));
  lines.push('', '## 접수 방법과 지역', '- 매장 방문: 중앙대·숭실대 도보 약 10분, 무료 주차.', '- 전국 택배: 택배비 편도 부담, 수리 후 우체국 택배로 보통 1~2일.', '- 퀵 접수: 퀵 비용은 손님 부담.', '- ' + REGION_LINE);
  lines.push('', '## 신뢰 근거', `- 네이버 리뷰 평점 ${'4.97'} · 1,693개, 당근 이웃 후기 5.0 · 15개 (https://map.naver.com/p/entry/place/1604948429?placePath=%2Freview)`, '- 2025 동작구 ESG 민관협력 사업 공식 선정, 동작구와 "순환경제 모바일케어 플랫폼 × 세이프픽스"를 실제 실행한 첫 아이폰 수리점', '- 현대카드·포스코 임직원 전용 수리 혜택 협력 업체');
  lines.push('', '## 실제 손님 후기 (네이버 리뷰 발췌)', ...REVIEWS.map((r) => `- ${r.service} (${r.name}, ★${r.score}): ${r.text.replace(/\s+/g, ' ').slice(0, 160)}${r.text.length > 160 ? '…' : ''}`));
  const homeQa = collected['/']?.qa || [];
  if (homeQa.length) lines.push('', '## 자주 묻는 질문', ...homeQa.map(([q, a]) => `- Q. ${q}\n  A. ${a}`));
  if (blog.length) lines.push('', '## 홈페이지 수리 사례', ...blog.map((p) => `- [${p.title}](${u(p.path)}): ${p.description}`));
  if (blogPosts.length) lines.push('', '## 블로그 수리기 (네이버 블로그, 최신순)', ...blogPosts.slice(0, 30).map((p) => `- [${p.title}](${p.link})`));
  lines.push('', '## 주요 페이지', `- 회사소개: ${S}/about`, `- 서비스 전체: ${S}/services`, `- 수리사례: ${S}/cases`, `- 견적문의: ${S}/contact`, `- 택배수리: ${S}/delivery`, `- 매장 위치: ${S}/locations`, `- 자주 묻는 질문: ${S}/faq`, `- 전체 내용(상세): ${S}/llms-full.txt`);
  writeFileSync(join(dist, 'llms.txt'), lines.join('\n') + '\n');
  // 상세판: 서비스별 증상·확인 사항·진행 과정·Q&A 전부
  const full = [lines.join('\n'), '', '# 서비스별 상세'];
  for (const s of SERVICES) {
    const c = collected['/services/' + s.id] || {};
    full.push('', `## ${s.name} — ${u('/services/' + s.id)}`, `- 이런 증상: ${s.symptoms.join(' / ')}`);
    if (s.points?.length) full.push(...s.points.map((x) => `- 수리하며 확인하는 것: ${x}`));
    if (c.steps?.length) full.push(`- 진행 과정: ${c.steps.map(([n]) => n).join(' → ')}`);
    if (c.qa?.length) full.push(...c.qa.map(([q, a]) => `- Q. ${q} A. ${a}`));
  }
  writeFileSync(join(dist, 'llms-full.txt'), full.join('\n') + '\n');
  console.log('llms.txt', lines.length, 'lines / llms-full.txt', full.length, 'lines');
}

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
