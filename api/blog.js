// Vercel 서버리스 함수: 네이버 블로그 RSS에서 최신 글을 가져와 JSON으로 돌려줍니다.
// 브라우저에서 네이버 RSS를 직접 읽으면 CORS로 막히기 때문에 서버에서 대신 읽습니다.
const FEED = 'https://rss.blog.naver.com/safefixx.xml';

const pick = (xml, tag) => {
  const m = xml.match(new RegExp('<' + tag + '[^>]*>([\\s\\S]*?)</' + tag + '>'));
  if (!m) return '';
  return m[1].replace(/^<!\[CDATA\[/, '').replace(/\]\]>$/, '').trim();
};
const strip = (html) =>
  html.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/\s+/g, ' ').trim();

export default async function handler(req, res) {
  try {
    const r = await fetch(FEED, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; SafefixSite/1.0)' } });
    if (!r.ok) throw new Error('feed ' + r.status);
    const xml = await r.text();
    const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].slice(0, 6).map(([, it]) => {
      const desc = pick(it, 'description');
      const img = (desc.match(/<img[^>]+src=["']([^"']+)["']/) || [])[1] || '';
      const text = strip(desc);
      return {
        title: strip(pick(it, 'title')),
        link: pick(it, 'link').replace(/\?fromRss.*$/, ''),
        date: pick(it, 'pubDate'),
        image: img,
        summary: text.length > 90 ? text.slice(0, 90) + '…' : text,
      };
    });
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    res.status(200).json({ items });
  } catch (e) {
    res.setHeader('Cache-Control', 's-maxage=300');
    res.status(200).json({ items: [], error: String(e) });
  }
}
