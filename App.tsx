import React, { useEffect, useState } from 'react';
import CarePage from './pages/CarePage';
import { BrowserRouter, Link, Routes, Route, useLocation, useParams, Navigate } from 'react-router-dom';
import {
  ArrowRight,
  ChevronLeft,
  ChevronDown,
  ChevronRight,
  Plus,
  MapPin,
  MessageCircle,
  Menu,
  X,
  Check,
  Copy,
  Phone,
  Clock,
  Star,
  Gift,
  ShieldCheck,
  Wrench,
  Zap,
  Eye,
  FileText,
  Truck,
  GraduationCap,
  ExternalLink,
  CalendarCheck,
  Award,
  Play,
} from 'lucide-react';
import { Character, CharKind, StoreArt, Sparkle } from './components/Characters';
import { DEVICES, deviceById } from './devices';
import SEO from './seo.json';
import BLOG from './blog.generated.json';
import SERVICES from './services.json';
import { STORE } from './store';



const perks = [
  { Icon: Wrench, t: '대표가 직접 수리', d: '상담부터 수리까지 한 사람이 책임져요' },
  { Icon: Eye, t: '부품 직접 확인', d: '어떤 부품을 쓰는지 눈으로 보여드려요' },
  { Icon: ShieldCheck, t: '수리 후 무상 보증', d: '아이패드 액정 1개월 · 그 밖의 수리 3개월 (고객 과실 제외)' },
  { Icon: Zap, t: '어려운 수리도 당일', d: '휨 복원·메인보드·충전단자까지' },
  { Icon: FileText, t: '여행자 보험 서류', d: '해외 파손 시 견적서·영수증·사진 준비' },
  { Icon: Truck, t: '전국 택배 · 퀵 접수', d: '멀리 계셔도 맡기실 수 있어요' },
];

const faqs = SEO.faq as [string, string][];

function Brand() {
  return (
    <Link className="brand" to="/" aria-label="세이프픽스 홈">
      <span className="brand-symbol">
        <Plus size={24} strokeWidth={3.5} />
      </span>
      <span className="brand-text">
        safe<b>fix</b>
        <small>세이프픽스 상도점</small>
      </span>
    </Link>
  );
}

function ExtLink({ href, className, children, label }: { href: string; className?: string; children: React.ReactNode; label?: string }) {
  return (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer" aria-label={label}>
      {children}
    </a>
  );
}

function NaverBadge() {
  return <span className="mark-badge naver">N</span>;
}
function KakaoBadge() {
  return <span className="mark-badge kakao">톡</span>;
}
function KakaoBubble({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3C6.5 3 2 6.6 2 11c0 2.8 1.8 5.3 4.6 6.7L5.6 21.5c-.1.4.3.7.6.5l4.4-2.9c.5.1.9.1 1.4.1 5.5 0 10-3.6 10-8.1S17.5 3 12 3z" fill="currentColor" />
    </svg>
  );
}
function DaangnBadge() {
  return <span className="mark-badge daangn">당근</span>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const [svcOpen, setSvcOpen] = useState(false);
  const loc = useLocation();
  useEffect(() => {
    setOpen(false);
    setSvcOpen(false);
  }, [loc.pathname]);
  return (
    <header className="site-header">
      <div className="utility">
        <div className="shell">
          <span>
            <Clock size={16} /> 영업 {STORE.hours} · {STORE.hoursNote}
          </span>
          <span className="utility-links">
            <ExtLink href={STORE.naver}>네이버 플레이스</ExtLink>
            <ExtLink href={STORE.daangn}>당근 매장</ExtLink>
            <ExtLink href={STORE.kakao}>카카오 채널</ExtLink>
            <Link to="/faq">자주 묻는 질문</Link>
          </span>
        </div>
      </div>
      <div className="navigation shell">
        <Brand />
        <nav className={open ? 'nav-links is-open' : 'nav-links'} aria-label="주 메뉴">
          <Link to="/about">회사소개</Link>
          <div className={svcOpen ? 'nav-drop is-open' : 'nav-drop'}>
            <Link to="/services" className="nav-drop-top">서비스</Link>
            <button className="nav-drop-toggle" aria-label="서비스 목록 펼치기" aria-expanded={svcOpen} onClick={() => setSvcOpen(!svcOpen)}>
              <ChevronDown size={18} />
            </button>
            <div className="nav-mega">
              {Object.entries(DEVICE_LABEL).map(([d, n]) => (
                <div key={d} className="nav-mega-col">
                  <Link to={'/services/' + d} className="nav-mega-head">{n}</Link>
                  <div className="nav-mega-grid">
                    {SVCS.filter((s) => s.device === d).map((s) => (
                      <Link key={s.id} to={'/services/' + s.id}>{s.name}</Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Link to="/cases">수리사례</Link>
          <Link to="/contact">상담문의</Link>
          <a href={STORE.tel} className="nav-call">
            <Phone size={18} /> {STORE.phone}
          </a>
        </nav>
        <a href={STORE.tel} className="header-cta">
          <Phone size={19} /> 전화 상담
        </a>
        <button className="menu-toggle" aria-label={open ? '메뉴 닫기' : '메뉴 열기'} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-top">
        <div>
          <Brand />
          <p className="footer-desc">아이폰 · 아이패드 · 애플워치 · 맥북 수리</p>
        </div>
        <div className="footer-links">
          <Link to="/about">회사소개</Link>
          <Link to="/services">서비스</Link>
          <Link to="/cases">수리사례</Link>
          <Link to="/contact">상담문의</Link>
          <Link to="/delivery">택배수리</Link>
          <Link to="/reviews">수리후기</Link>
          <Link to="/locations">매장 안내</Link>
          <Link to="/faq">자주 묻는 질문</Link>
          <ExtLink href={STORE.kakao}>카카오톡 채널</ExtLink>
        </div>
      </div>
      <div className="shell footer-info">
        <p>
          <strong>{STORE.name}</strong>
          <br />
          {STORE.address} {STORE.addressDetail}
          <br />
          전화 <a href={STORE.tel}>{STORE.phone}</a> · 영업 {STORE.hours} ({STORE.hoursNote})
        </p>
        <div className="footer-ext">
          <ExtLink href={STORE.naver} className="pill-link">
            <NaverBadge /> 네이버 플레이스
          </ExtLink>
          <ExtLink href={STORE.daangn} className="pill-link">
            <DaangnBadge /> 당근 매장
          </ExtLink>
        </div>
      </div>
      <div className="shell footer-bottom">© {new Date().getFullYear()} SAFEFIX. All rights reserved.</div>
    </footer>
  );
}

function SectionTitle({ badge, title, to, label = '더보기' }: { badge?: string; title: React.ReactNode; to?: string; label?: string }) {
  return (
    <div className="section-title">
      <div>
        {badge && <span className="badge">{badge}</span>}
        <h2>{title}</h2>
      </div>
      {to && (
        <Link to={to} className="more-link">
          {label}
          <ChevronRight size={18} />
        </Link>
      )}
    </div>
  );
}

function ServiceCards() {
  return (
    <div className="service-grid">
      {DEVICES.map(({ id, name, items, kind, tone }, i) => (
        <Link to={'/services/' + id} className={'service-card ' + tone} key={id}>
          <span className="stage-tag">STAGE {i + 1}</span>
          <div className="service-art">
            <Character kind={kind} pose={i % 2 ? 'point' : 'wave'} mood={i === 1 ? 'wink' : 'happy'} />
          </div>
          <div className="service-body">
            <h3>{name}</h3>
            <p>{items.map((t, k) => <React.Fragment key={t}>{k > 0 && ' · '}<span className="nowrap">{t}</span></React.Fragment>)}</p>
            <span className="go">
              선택하기 <ArrowRight size={18} />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

const slides: { tag: string; title: React.ReactNode; desc: string; cta: string; to: string; chars: [CharKind, CharKind]; bubble: string }[] = [
  {
    tag: 'HELLO, SAFEFIX',
    title: (
      <>
        고장 난 하루에,
        <br />
        <em>다시 미소를.</em>
      </>
    ),
    desc: '아이폰부터 아이패드, 맥북, 애플워치까지 외주 없이 신속하게 고쳐드려요.',
    cta: '내 기기 수리 알아보기',
    to: '/services',
    chars: ['phone', 'tablet'],
    bubble: '다시 만나서 반가워!',
  },
  {
    tag: 'POWER UP',
    title: (
      <>
        배터리 걱정은 줄이고,
        <br />
        <em>일상은 더 길게.</em>
      </>
    ),
    desc: '금방 닳는 배터리, 상태부터 꼼꼼히 확인해드려요.',
    cta: '배터리 교체 알아보기',
    to: '/services/battery',
    chars: ['battery', 'phone'],
    bubble: '에너지 충전 완료!',
  },
  {
    tag: 'SAVE YOUR MEMORIES',
    title: (
      <>
        소중한 기록까지,
        <br />
        <em>함께 살펴볼게요.</em>
      </>
    ),
    desc: '물에 빠졌거나 전원이 안 켜져도, 증상부터 차근차근.',
    cta: '데이터 상담 알아보기',
    to: '/services/data',
    chars: ['data', 'tablet'],
    bubble: '사진은 내가 지킬게!',
  },
];

function Home() {
  const [slide, setSlide] = useState(0);
  const s = slides[slide];
  return (
    <>
      <section className="hero" aria-label="서비스 소개 배너">
        <div className="hero-dots" />
        <div className="hero-sun" />
        <Sparkle className="sp sp1" size={46} />
        <Sparkle className="sp sp2" size={26} color="#fff" />
        <Sparkle className="sp sp3" size={34} />
        <div className="shell hero-inner">
          <div className="hero-copy" key={'c' + slide}>
            <span className="hero-tag">{s.tag}</span>
            <h1>{s.title}</h1>
            <p>{s.desc}</p>
            <div className="hero-actions">
              <Link className="button" to={s.to}>
                ▶ {s.cta}
              </Link>
              <a className="button ghost" href={STORE.tel}>
                <Phone size={20} /> {STORE.phone}
              </a>
            </div>
            <ul className="hero-chips">
              <li>
                <Check size={18} /> 당일 수리
              </li>
              <li>
                <Check size={18} /> 무상 보증
              </li>
              <li>
                <Check size={18} /> 택배 · 퀵 접수
              </li>
            </ul>
          </div>
          <div className="hero-art" key={'a' + slide}>
            <div className="hero-stage" />
            <Character kind={s.chars[1]} pose="point" mood="wink" className="hero-chr back" />
            <Character kind={s.chars[0]} pose="wave" mood="happy" className="hero-chr front" label="수리 캐릭터" />
            <span className="bubble hero-bubble">{s.bubble}</span>
          </div>
        </div>
        <div className="shell slider-controls">
          <button aria-label="이전 배너" onClick={() => setSlide((slide + 2) % 3)}>
            <ChevronLeft size={22} />
          </button>
          {slides.map((_, i) => (
            <button key={i} className={'dot ' + (i === slide ? 'active' : '')} aria-label={'배너 ' + (i + 1)} aria-pressed={i === slide} onClick={() => setSlide(i)} />
          ))}
          <button aria-label="다음 배너" onClick={() => setSlide((slide + 1) % 3)}>
            <ChevronRight size={22} />
          </button>
        </div>
      </section>

      <div className="shell quickbar">
        <a href={STORE.tel} className="quick q-call">
          <span className="q-ic">
            <Phone size={28} />
          </span>
          <span>
            <small>바로 전화하기</small>
            <b>{STORE.phone}</b>
          </span>
        </a>
        <ExtLink href={STORE.naver} className="quick q-naver">
          <span className="q-ic">N</span>
          <span>
            <small>예약 · 톡톡 · 길찾기</small>
            <b>네이버 플레이스</b>
          </span>
        </ExtLink>
        <ExtLink href={STORE.daangn} className="quick q-daangn">
          <span className="q-ic">🥕</span>
          <span>
            <small>후기 · 쿠폰 · 단골 맺기</small>
            <b>당근 매장 보기</b>
          </span>
        </ExtLink>
        <ExtLink href={STORE.kakao} className="quick q-kakao">
          <span className="q-ic">
            <KakaoBubble size={30} />
          </span>
          <span>
            <small>1:1 상담 · 채널 추가</small>
            <b>카카오톡 채널</b>
          </span>
        </ExtLink>
      </div>

      <div className="shell home-content">
        <section id="services">
          <SectionTitle badge="SELECT STAGE" title={<>어떤 기기를 <em>맡기시나요?</em></>} to="/services" />
          <ServiceCards />
        </section>

        <section className="perks-wrap">
          <SectionTitle badge="WHY SAFEFIX" title={<>세이프픽스를 <em>믿고 맡기는 이유</em></>} />
          <div className="panel perk perk-feature">
            <span className="perk-ic">
              <Award size={36} strokeWidth={2.4} />
            </span>
            <div>
              <span className="badge orange">2025 동작구</span>
              <h3>동작구 ESG 민관협력 업체 선정</h3>
              <p>2025년 동작구 ESG 민관협력 업체로 선정됐어요. 버리지 않고 고쳐 쓰는 수리로 동작구와 함께하고 있어요.</p>
            </div>
          </div>
          <div className="perk-grid">
            {perks.map(({ Icon, t, d }) => (
              <div className="panel perk" key={t}>
                <span className="perk-ic">
                  <Icon size={32} strokeWidth={2.4} />
                </span>
                <div>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="perk-note">
            <GraduationCap size={22} /> 중앙대 · 숭실대 학생은 우대 혜택이 있어요. 학생증을 보여주세요!
          </p>
        </section>

        <section className="coupon">
          <div className="coupon-ticket">
            <span className="coupon-badge">
              <Gift size={20} /> BONUS ITEM
            </span>
            <h3>
              첫 방문 <em>10,000원 할인</em>
              <br />+ 아이패드 필름 증정
            </h3>
            <p>{STORE.couponUntil} · 당근 매장 쿠폰으로 받아가세요</p>
            <ExtLink href={STORE.daangn} className="button">
              🥕 당근에서 쿠폰 받기
            </ExtLink>
          </div>
          <div className="coupon-art">
            <Character kind="phone" pose="cheer" mood="wow" />
          </div>
        </section>

        <section id="locations">
          <SectionTitle badge="MAP" title={<>상도동에서 <em>만나요</em></>} to="/locations" label="매장 안내" />
          <LocationCard />
        </section>

        <section className="review-grid" id="reviews">
          <div className="panel review-card">
            <span className="badge">REAL REVIEW</span>
            <div className="review-scores">
              <div className="review-score-row">
                <NaverBadge />
                <span className="rs-name">네이버 리뷰</span>
                <Star size={24} fill="#FFC93C" strokeWidth={2.4} />
                <b>{STORE.reviews.naver.score}</b>
                <span className="rs-count">리뷰 {STORE.reviews.naver.count}개</span>
              </div>
              <div className="review-score-row">
                <DaangnBadge />
                <span className="rs-name">당근 이웃 후기</span>
                <Star size={24} fill="#FFC93C" strokeWidth={2.4} />
                <b>{STORE.reviews.daangn.score}</b>
                <span className="rs-count">후기 {STORE.reviews.daangn.count}개</span>
              </div>
            </div>
            <h3>
              네이버 리뷰 {STORE.reviews.naver.count}개, 평점 {STORE.reviews.naver.score}
            </h3>
            <p>당근 이웃 후기 {STORE.reviews.daangn.count}개도 모두 별 다섯 개예요. 배터리 교체, 아이패드 액정·프레임 수리 등 실제 고객 후기를 확인해보세요.</p>
            <div className="review-links">
              <ExtLink href={STORE.naverReview} className="pill-link">
                <NaverBadge /> 네이버 리뷰 보기 <ExternalLink size={16} />
              </ExtLink>
              <ExtLink href={STORE.daangn} className="pill-link">
                <DaangnBadge /> 당근 후기 보기 <ExternalLink size={16} />
              </ExtLink>
            </div>
          </div>
          <Link className="panel consult-card" to="/contact">
            <div className="consult-chr">
              <Character kind="tablet" pose="point" mood="happy" />
            </div>
            <div>
              <span className="badge orange">LET'S TALK</span>
              <h3>어디가 불편한가요?</h3>
              <p>모델과 증상을 미리 정리하면 상담이 훨씬 빨라져요.</p>
              <strong>
                상담 준비하기 <ArrowRight size={20} />
              </strong>
            </div>
          </Link>
        </section>

        <section className="notice-wrap">
          <SectionTitle badge="NOTICE" title="공지사항" to="/faq" label="자주 묻는 질문" />
          <div className="panel notice-list">
            <Link to="/faq" className="notice-row">
              <span>보증</span>무상 보증: 아이패드 액정 1개월, 그 밖의 수리 3개월 (고객 과실 제외)
              <ChevronRight size={20} />
            </Link>
            <Link to="/locations" className="notice-row">
              <span>영업</span>일요일·공휴일은 예약 후 방문해주세요
              <ChevronRight size={20} />
            </Link>
            <Link to="/contact" className="notice-row">
              <span>상담</span>방문 전 모델과 증상을 미리 정리해보세요
              <ChevronRight size={20} />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

function CopyAddress() {
  const [done, setDone] = useState(false);
  return (
    <button
      className="copy-btn"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(`${STORE.address} ${STORE.addressDetail}`);
          setDone(true);
          setTimeout(() => setDone(false), 1800);
        } catch {
          /* 복사 실패 시 무시 */
        }
      }}
    >
      {done ? <Check size={17} /> : <Copy size={17} />} {done ? '복사했어요' : '주소 복사'}
    </button>
  );
}

function LocationCard() {
  return (
    <div className="panel location-card">
      <div className="location-art">
        <StoreArt />
        <span className="pin">
          <MapPin size={30} strokeWidth={2.6} />
        </span>
      </div>
      <div className="location-info">
        <h3>{STORE.name}</h3>
        <dl>
          <div>
            <dt>
              <MapPin size={20} /> 주소
            </dt>
            <dd>
              {STORE.address}
              <br />
              {STORE.addressDetail}
              <CopyAddress />
            </dd>
          </div>
          <div>
            <dt>
              <Clock size={20} /> 영업
            </dt>
            <dd>
              {STORE.hours}
              <br />
              <span className="muted">{STORE.hoursNote}</span>
            </dd>
          </div>
          <div>
            <dt>
              <Phone size={20} /> 전화
            </dt>
            <dd>
              <a href={STORE.tel} className="tel">
                {STORE.phone}
              </a>
            </dd>
          </div>
        </dl>
        <div className="location-actions">
          <ExtLink href={STORE.naver} className="button naver-btn">
            <NaverBadge /> 네이버 지도 · 예약
          </ExtLink>
          <ExtLink href={STORE.daangn} className="button daangn-btn">
            <DaangnBadge /> 당근 매장
          </ExtLink>
        </div>
      </div>
    </div>
  );
}

function Services() {
  return (
    <CarePage
      kind="repair"
      extra={
        <section>
          <SectionTitle badge="SERVICE" title="어떤 수리가 필요하세요?" />
          <ServiceGrid />
        </section>
      }
    />
  );
}
function Detail() {
  const { serviceId } = useParams();
  const svc = svcById(serviceId);
  if (svc) return <ServicePage svc={svc} />;
  const dev = deviceById(serviceId);
  if (!dev) return <Navigate to="/services" replace />;
  const posts = COLUMNS.filter((p) => p.device === dev.id);
  return (
    <CarePage
      kind="repair"
      device={dev.name}
      extra={
        <>
          <section>
            <SectionTitle badge="SERVICE" title={<>{dev.name} 수리 서비스</>} />
            <ServiceGrid device={dev.id} />
          </section>
          {posts.length > 0 && (
            <section>
              <SectionTitle badge="REAL CASES" title={<>{dev.name} 수리 사례</>} to="/cases" label="전체 수리사례" />
              <PostCards posts={posts} showService />
            </section>
          )}
        </>
      }
    />
  );
}

function PageHead({ badge, title, lead, kind, pose }: { badge: string; title: React.ReactNode; lead: string; kind: CharKind; pose: 'wave' | 'point' | 'cheer' | 'hold' }) {
  return (
    <section className="page-head">
      <div className="hero-dots" />
      <div className="shell page-head-inner">
        <div>
          <span className="hero-tag">{badge}</span>
          <h1>{title}</h1>
          <p>{lead}</p>
        </div>
        <Character kind={kind} pose={pose} mood="happy" className="page-head-chr" />
      </div>
    </section>
  );
}

function Locations() {
  return (
    <>
      <PageHead badge="VISIT SAFEFIX" title={<>가까이에서 <em>만나요.</em></>} lead="상도동 동작청년창업지원센터 3층에 있어요." kind="tablet" pose="point" />
      <div className="shell inner-page">
        <LocationCard />
        <div className="panel tip-box">
          <h3>🧭 찾아오시는 길 팁</h3>
          <ul>
            <li>중앙대·숭실대에서 모두 걸어서 약 10분 거리예요.</li>
            <li>건물 3층 304호예요. 엘리베이터를 이용해주세요.</li>
            <li>무료 주차가 가능해요.</li>
            <li>일요일·공휴일은 예약제예요. 전화나 네이버 톡톡으로 먼저 연락 주세요.</li>
            <li>방문 전에 모델명과 증상, 데이터 백업 여부를 확인해주세요.</li>
          </ul>
        </div>
        <Link className="button" to="/faq">
          ▶ 방문 전 준비사항 보기
        </Link>
      </div>
    </>
  );
}

type Column = { slug: string; title: string; description: string; date: string; updated: string; service: string; serviceName: string; device: string; area: string; areaName: string; path: string; html: string; faq: [string, string][]; toc: string[] };
type Svc = { id: string; device: string; name: string; short: string; symptoms: string[]; points?: string[]; warranty?: string };
const COLUMNS = BLOG as unknown as Column[];
const SVCS = SERVICES as Svc[];
const svcById = (id?: string) => SVCS.find((s) => s.id === id);
const DEVICE_LABEL: Record<string, string> = { iphone: '아이폰', ipad: '아이패드', macbook: '맥북', watch: '애플워치' };
const DEVICE_KIND: Record<string, CharKind> = { iphone: 'phone', ipad: 'tablet', macbook: 'laptop', watch: 'watch' };
const dot = (d: string) => d.replace(/-/g, '.');
const warrantyOf = (s: Svc) => s.warranty || '3개월';
const svcTitle = (s: Svc) => `${s.name} 상도동 중앙대·숭실대 | 세이프픽스`;
const svcDesc = (s: Svc) => `${s.name}(${s.short}), 외주 없이 대표가 직접 진단하고 고쳐요. 중앙대·숭실대 도보 10분, 무료 주차, 수리 후 ${warrantyOf(s)} 무상 보증.`;

// 지역 목록 페이지 (/services/<서비스>/<지역>)
function areaMeta(service: string, area: string) {
  const s = svcById(service);
  const posts = COLUMNS.filter((p) => p.service === service && p.area === area);
  if (!s || !posts.length) return null;
  const name = posts[0].areaName;
  return {
    svc: s,
    name,
    posts,
    title: `${name} ${s.name} | 세이프픽스`,
    description: `${name}에서 맡기신 ${s.name} 사례를 모았어요. 대표가 직접 진단하고 고친 과정과 결과를 확인해보세요.`,
  };
}
function areasOf(service: string) {
  const m = new Map<string, string>();
  COLUMNS.filter((p) => p.service === service).forEach((p) => m.set(p.area, p.areaName));
  return [...m.entries()];
}

function PostCards({ posts, showService = false }: { posts: Column[]; showService?: boolean }) {
  return (
    <div className="post-grid">
      {posts.map((p) => (
        <Link key={p.path} to={p.path} className="panel post-card column-card">
          <div className="post-body">
            <small>
              {dot(p.date)}
              {showService && <span className="column-tag">{p.serviceName}</span>}
              <span className="column-tag area">{p.areaName}</span>
            </small>
            <h3>{p.title}</h3>
            <p>{p.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

function ServiceGrid({ device }: { device?: string }) {
  const devices = device ? [device] : Object.keys(DEVICE_LABEL);
  return (
    <div className="svc-groups">
      {devices.map((d) => (
        <div key={d} className="svc-group">
          {!device && <h3>{DEVICE_LABEL[d]} 수리</h3>}
          <div className="svc-grid">
            {SVCS.filter((s) => s.device === d).map((s) => (
              <Link key={s.id} to={'/services/' + s.id} className="panel svc-card">
                <b>{s.name}</b>
                <span>{s.short}</span>
                {COLUMNS.some((p) => p.service === s.id) && <em>사례 {COLUMNS.filter((p) => p.service === s.id).length}</em>}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function Crumbs({ items }: { items: [string, string?][] }) {
  return (
    <nav className="crumbs" aria-label="현재 위치">
      {items.map(([t, to], i) => (
        <React.Fragment key={t + i}>
          {i > 0 && <ChevronRight size={14} />}
          {to ? <Link to={to}>{t}</Link> : <span>{t}</span>}
        </React.Fragment>
      ))}
    </nav>
  );
}

function CtaPanel({ title, text, extra }: { title: string; text: string; extra?: React.ReactNode }) {
  return (
    <div className="panel article-cta">
      <h2>{title}</h2>
      <p>{text}</p>
      <div className="delivery-actions">
        <a className="button" href={STORE.tel}>
          <Phone size={18} /> 전화 상담 {STORE.phone}
        </a>
        <ExtLink className="button" href={STORE.booking}>
          <CalendarCheck size={18} /> 네이버 예약하기
        </ExtLink>
        {extra}
      </div>
    </div>
  );
}

const STEPS: [string, string][] = [
  ['모델과 증상 알려주기', '전화·톡톡·방문 중 편한 방법으로 지금 상태를 알려주세요.'],
  ['점검', '대표가 직접 기기를 열어 원인을 확인해요.'],
  ['비용·시간 안내', '작업 범위와 비용, 소요 시간을 먼저 안내해요.'],
  ['동의한 수리만 진행', '동의하신 경우에만 수리해요. 필요 없는 수리는 권하지 않아요.'],
  ['출고 전 기능 점검', '수리한 부분과 관련 기능을 하나씩 확인한 뒤 돌려드려요.'],
];

function svcFaq(s: Svc): [string, string][] {
  return [
    [`${s.name} 비용은 어떻게 정해지나요?`, '모델과 증상에 따라 작업 범위가 달라져요. 기기 상태를 먼저 확인한 뒤 비용과 소요 시간을 안내하고, 동의하신 경우에만 수리해요.'],
    [`${s.name} 후 보증이 있나요?`, `네, 수리 후 ${warrantyOf(s)} 동안 같은 증상이 다시 나타나면 무상으로 봐드려요. 떨어뜨리거나 물에 빠뜨린 경우처럼 고객 과실은 제외돼요.`],
    ['어디에 있나요? 주차되나요?', `${STORE.address} ${STORE.addressDetail}에 있어요. 중앙대·숭실대에서 걸어서 약 10분이고, 무료 주차가 가능해요.`],
    ['멀리 있어도 맡길 수 있나요?', '네, 전국 택배 수리가 가능해요. 점검 후 비용을 안내하고 동의하시면 수리해서 우체국 택배로 보내드려요. 보통 1~2일 걸려요.'],
  ];
}

function FaqList({ items }: { items: [string, string][] }) {
  return (
    <div className="faq-list">
      {items.map(([q, a], i) => (
        <details key={q} className="panel" open={i === 0}>
          <summary>
            <span className="q">Q</span>
            {q}
          </summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  );
}

function ServicePage({ svc }: { svc: Svc }) {
  const posts = COLUMNS.filter((p) => p.service === svc.id);
  const areas = areasOf(svc.id);
  const label = DEVICE_LABEL[svc.device];
  const siblings = SVCS.filter((s) => s.device === svc.device && s.id !== svc.id);
  return (
    <>
      <PageHead badge={`${label} 수리`} title={<>{svc.name}, <em>대표가 직접 고쳐요.</em></>} lead={`${svc.short}. 중앙대·숭실대 도보 10분, 외주 없이 대표가 직접 진단하고 수리해요.`} kind={DEVICE_KIND[svc.device]} pose="point" />
      <div className="shell inner-page svc-page">
        <Crumbs items={[['홈', '/'], ['서비스', '/services'], [label, '/services/' + svc.device], [svc.name]]} />

        <section className="full">
          <SectionTitle badge="CHECK" title={<>{svc.name}, 이런 증상이면 확인해 보세요</>} />
          <div className="symptom-list">
            {svc.symptoms.map((t) => (
              <div key={t} className="panel symptom-row">
                <Check size={20} /> {t}
              </div>
            ))}
          </div>
        </section>

        {svc.points && svc.points.length > 0 && (
          <section className="full">
            <SectionTitle badge="REPAIR NOTE" title={<>{svc.name}, 수리하면서 확인하는 것</>} />
            <div className="panel note-box">
              <ul>
                {svc.points.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <section className="full">
          <SectionTitle badge="REAL CASES" title={<>{svc.name} 실제 수리 사례</>} to={posts.length ? '/cases' : undefined} label="전체 수리사례" />
          {posts.length ? (
            <PostCards posts={posts} />
          ) : (
            <div className="panel tip-box">
              <p>홈페이지 사례를 정리하고 있어요. 그동안 블로그에 남긴 수리 기록을 확인해보세요.</p>
              <ExtLink className="button" href={STORE.blog}>
                블로그 수리 기록 보기 <ExternalLink size={18} />
              </ExtLink>
            </div>
          )}
        </section>

        <section className="full">
          <SectionTitle badge="PROCESS" title={<>{svc.name} 진행 과정</>} />
          <ol className="step-row">
            {STEPS.map(([t, d], i) => (
              <li key={t} className="panel">
                <span className="j-no">{String(i + 1).padStart(2, '0')}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="full">
          <SectionTitle badge="PROMISE" title="세이프픽스가 약속하는 것" />
          <div className="promise-grid">
            {[
              ['대표 직접 수리', '상담부터 수리까지 외주 없이 대표가 직접 해요. 수리 경력 10년.'],
              ['동의한 수리만', '점검 후 비용을 먼저 안내하고, 동의하신 경우에만 수리해요.'],
              [`무상 보증 ${warrantyOf(svc)}`, '같은 증상이 다시 생기면 무상으로 봐드려요 (고객 과실 제외).'],
              ['리뷰로 확인', `네이버 리뷰 평점 ${STORE.reviews.naver.score} · ${STORE.reviews.naver.count}개`],
            ].map(([t, d]) => (
              <div key={t} className="panel promise">
                <ShieldCheck size={26} />
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </section>

        {areas.length > 0 && (
          <section className="full">
            <SectionTitle badge="AREA" title={<>지역별 {svc.name} 사례</>} />
            <div className="area-links">
              {areas.map(([a, n]) => (
                <Link key={a} to={`/services/${svc.id}/${a}`} className="pill-link">
                  <MapPin size={16} /> {n} {svc.name}
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="full">
          <SectionTitle badge="Q&A" title={<>{svc.name}, 자주 묻는 질문</>} />
          <FaqList items={svcFaq(svc)} />
        </section>

        <CtaPanel title={`${svc.name}, 먼저 점검만 받아보셔도 괜찮아요`} text="증상만 알려주셔도 점검이 필요한지 먼저 말씀드려요. 점검 후 비용을 안내드리고, 동의하신 경우에만 수리해요." extra={<Link className="button" to="/delivery">택배 수리 안내</Link>} />

        <section className="full">
          <SectionTitle badge="MORE" title={<>다른 {label} 수리</>} to={'/services/' + svc.device} label={`${label} 수리 전체`} />
          <div className="svc-grid">
            {siblings.map((s) => (
              <Link key={s.id} to={'/services/' + s.id} className="panel svc-card">
                <b>{s.name}</b>
                <span>{s.short}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

function AreaPage() {
  const { serviceId = '', area = '' } = useParams();
  const m = areaMeta(serviceId, area);
  if (!m) return <Navigate to={`/services/${serviceId}`} replace />;
  const label = DEVICE_LABEL[m.svc.device];
  return (
    <>
      <PageHead badge="REPAIR CASES" title={<>{m.name} {m.svc.name}, <em>직접 고친 기록이에요.</em></>} lead={`${m.name}에서 맡기신 ${label}를 대표가 직접 진단하고 고쳤어요.`} kind={DEVICE_KIND[m.svc.device]} pose="point" />
      <div className="shell inner-page">
        <Crumbs items={[['홈', '/'], ['서비스', '/services'], [m.svc.name, `/services/${m.svc.id}`], [m.name]]} />
        <section className="full">
          <SectionTitle badge="REAL CASES" title={<>{m.name} {m.svc.name} 실제 작업 기록</>} />
          <PostCards posts={m.posts} />
        </section>
        <CtaPanel title={`${m.name}에서 ${m.svc.name}이 필요하신가요?`} text={`세이프픽스는 ${STORE.address} ${STORE.addressDetail}에 있어요. 중앙대·숭실대에서 걸어서 약 10분, 무료 주차가 가능해요.`} extra={<Link className="button" to={`/services/${m.svc.id}`}>{m.svc.name} 안내 보기</Link>} />
      </div>
    </>
  );
}

function PostPage() {
  const { serviceId = '', area = '', slug = '' } = useParams();
  const post = COLUMNS.find((p) => p.path === `/services/${serviceId}/${area}/${slug}`);
  if (!post) return <Navigate to={`/services/${serviceId}`} replace />;
  const areaPath = `/services/${post.service}/${post.area}`;
  const more = COLUMNS.filter((p) => p.service === post.service && p.path !== post.path).slice(0, 3);
  return (
    <div className="shell article-page">
      <Crumbs items={[['홈', '/'], ['서비스', '/services'], [post.serviceName, `/services/${post.service}`], [post.areaName, areaPath]]} />
      <article className="panel article">
        <header>
          <span className="badge">{post.areaName} · {post.serviceName}</span>
          <h1>{post.title}</h1>
          <p className="article-lead">{post.description}</p>
          <p className="article-meta">
            <time dateTime={post.date}>{dot(post.date)}</time>
            {post.updated !== post.date && <> · 수정 {dot(post.updated)}</>} · 글 세이프픽스 대표 (수리 경력 10년)
          </p>
        </header>
        <div className="article-body" dangerouslySetInnerHTML={{ __html: post.html }} />
        <p className="article-note">이 글은 대표가 직접 수리하며 확인한 내용을 AI의 도움을 받아 정리하고, 대표가 검수했어요.</p>
      </article>
      <CtaPanel title="내 기기도 한번 봐야 할까요?" text="증상만 알려주셔도 점검이 필요한지 먼저 말씀드려요. 점검 후 비용을 안내드리고, 동의하신 경우에만 수리해요." extra={<Link className="button" to={`/services/${post.service}`}>{post.serviceName} 안내 보기</Link>} />
      {more.length > 0 && (
        <section>
          <SectionTitle badge="MORE" title={<>다른 {post.serviceName} 사례</>} />
          <PostCards posts={more} />
        </section>
      )}
    </div>
  );
}

function About() {
  return (
    <>
      <PageHead badge="ABOUT SAFEFIX" title={<>외주 없이, <em>대표가 직접 고칩니다.</em></>} lead="상담부터 수리, 출고 점검까지 한 사람이 책임져요." kind="phone" pose="wave" />
      <div className="shell inner-page">
        <section className="full">
          <SectionTitle badge="PRINCIPLE" title="세이프픽스가 일하는 방식" />
          <div className="promise-grid">
            {[
              ['대표 직접 수리', '아이폰·아이패드·맥북·애플워치를 외주 없이 대표가 직접 수리해요. 수리 경력 10년.'],
              ['과잉진단 없이', '꼭 필요한 수리만 안내해요. 필요 없는 수리는 권하지 않아요.'],
              ['리퍼 대신 원래대로', '기기를 통째로 바꾸는 대신 원래 기기를 다시 고쳐 쓸 수 있게 수리해요.'],
              ['동의한 수리만', '점검 후 비용과 시간을 먼저 안내하고, 동의하신 경우에만 수리해요.'],
            ].map(([t, d]) => (
              <div key={t} className="panel promise">
                <Wrench size={26} />
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="full">
          <SectionTitle badge="TRUST" title="숫자와 기록으로 확인하세요" />
          <div className="promise-grid">
            <div className="panel promise">
              <Star size={26} />
              <h3>네이버 리뷰 {STORE.reviews.naver.score}</h3>
              <p>리뷰 {STORE.reviews.naver.count}개</p>
            </div>
            <div className="panel promise">
              <Star size={26} />
              <h3>당근 이웃 후기 {STORE.reviews.daangn.score}</h3>
              <p>후기 {STORE.reviews.daangn.count}개</p>
            </div>
            <div className="panel promise">
              <Award size={26} />
              <h3>2025 동작구 ESG 민관협력 업체</h3>
              <p>동작구와 함께하는 지역 수리점이에요.</p>
            </div>
            <div className="panel promise">
              <ShieldCheck size={26} />
              <h3>수리 후 무상 보증</h3>
              <p>아이패드 액정 1개월, 그 밖의 수리 3개월 (고객 과실 제외)</p>
            </div>
          </div>
        </section>
        <section className="full">
          <SectionTitle badge="SERVICE" title="수리 서비스" to="/services" label="서비스 전체" />
          <ServiceGrid />
        </section>
        <section className="full">
          <SectionTitle badge="VISIT" title="매장 안내" to="/locations" label="오시는 길" />
          <LocationCard />
        </section>
      </div>
    </>
  );
}

type BlogPost = { title: string; link: string; date: string; image: string; summary: string };

function Cases() {
  const [filter, setFilter] = useState('all');
  const [posts, setPosts] = useState<BlogPost[] | null>(null);
  useEffect(() => {
    let alive = true;
    fetch('/api/blog')
      .then((r) => (r.ok ? r.json() : { items: [] }))
      .then((d) => alive && setPosts(Array.isArray(d.items) ? d.items : []))
      .catch(() => alive && setPosts([]));
    return () => {
      alive = false;
    };
  }, []);
  const fmt = (d: string) => {
    const t = new Date(d);
    return isNaN(t.getTime()) ? '' : `${t.getFullYear()}.${String(t.getMonth() + 1).padStart(2, '0')}.${String(t.getDate()).padStart(2, '0')}`;
  };
  return (
    <>
      <PageHead badge="REPAIR CASES" title={<>직접 고친 기록, <em>그대로 보여드려요.</em></>} lead="대표가 직접 진단하고 고친 수리 사례를 하나하나 남기고 있어요." kind="laptop" pose="point" />
      <div className="shell inner-page">
        {COLUMNS.length > 0 && (
          <section className="full">
            <SectionTitle badge="SAFEFIX CASES" title="세이프픽스 수리 사례" />
            <div className="filter-chips" role="tablist">
              {['all', ...Object.keys(DEVICE_LABEL)].map((d) => (
                <button key={d} role="tab" aria-selected={filter === d} className={filter === d ? 'chip on' : 'chip'} onClick={() => setFilter(d)}>
                  {d === 'all' ? '전체' : DEVICE_LABEL[d]} ({d === 'all' ? COLUMNS.length : COLUMNS.filter((p) => p.device === d).length})
                </button>
              ))}
            </div>
            <PostCards posts={filter === 'all' ? COLUMNS : COLUMNS.filter((p) => p.device === filter)} showService />
          </section>
        )}
        <div className="case-links">
          <ExtLink href={STORE.blog} className="panel case-link blog">
            <span className="badge">BLOG</span>
            <h3>블로그 수리 작업 사례</h3>
            <p>분해부터 부품 교체, 마무리 점검까지 사진으로 기록했어요.</p>
            <span className="go">
              블로그 보러가기 <ExternalLink size={18} />
            </span>
          </ExtLink>
          <ExtLink href={STORE.clip} className="panel case-link clip">
            <span className="badge orange">CLIP</span>
            <h3>클립 수리 영상</h3>
            <p>짧은 영상으로 실제 작업 장면을 확인해보세요.</p>
            <span className="go">
              <Play size={18} /> 클립 영상 보러가기 <ExternalLink size={18} />
            </span>
          </ExtLink>
        </div>

        <div className="section-title">
          <div>
            <span className="badge">NEW POST</span>
            <h2>최근 올린 작업 사례</h2>
          </div>
        </div>
        {posts === null ? (
          <p className="muted">블로그 글을 불러오는 중이에요…</p>
        ) : posts.length === 0 ? (
          <div className="panel tip-box">
            <p>최신 글은 블로그에서 바로 확인해주세요.</p>
          </div>
        ) : (
          <div className="post-grid">
            {posts.map((p) => (
              <React.Fragment key={p.link}>
              <ExtLink href={p.link} className="panel post-card">
                {p.image && <img src={p.image} alt="" loading="lazy" referrerPolicy="no-referrer" />}
                <div className="post-body">
                  <small>{fmt(p.date)}</small>
                  <h3>{p.title}</h3>
                  {p.summary && <p>{p.summary}</p>}
                </div>
              </ExtLink>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function Reviews() {
  useEffect(() => {
    const t = setTimeout(() => document.getElementById('reviews')?.scrollIntoView({ behavior: 'instant' as ScrollBehavior, block: 'start' }), 60);
    return () => clearTimeout(t);
  }, []);
  return <Home />;
}

function Delivery() {
  const steps: [string, string][] = [
    ['먼저 연락 주세요', '전화나 네이버 톡톡으로 기기 모델과 증상을 알려주세요.'],
    ['안내받은 대로 보내주세요', '포장 방법과 접수 방법을 알려드려요. 안내에 맞춰 택배나 퀵으로 보내주세요.'],
    ['점검 후 비용 안내', '기기 상태를 확인한 뒤 비용과 소요 시간을 안내하고, 동의하신 경우에만 수리해요.'],
    ['우체국 택배로 돌려보내 드려요', '수리가 끝나면 우체국 택배로 보내드려요. 받으시기까지 보통 1~2일 걸려요.'],
  ];
  return (
    <>
      <PageHead badge="DELIVERY REPAIR" title={<>멀리 계셔도 <em>맡기실 수 있어요.</em></>} lead="전국 택배 수리와 퀵 접수가 가능해요." kind="phone" pose="wave" />
      <div className="shell inner-page narrow-page">
        <div className="delivery-steps">
          {steps.map(([t, d], i) => (
            <div key={t} className="panel tip-box">
              <h3>
                STEP {i + 1}. {t}
              </h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
        <div className="panel tip-box">
          <h3>🎁 이렇게 포장해주세요</h3>
          <ul>
            <li>기기를 뽁뽁이(에어캡)로 꼼꼼히 감싸주세요.</li>
            <li>케이스와 애플펜슬은 빼고 기기만 보내주세요.</li>
            <li>점검에 필요한 비밀번호를 종이에 적어 함께 넣어주세요.</li>
          </ul>
        </div>
        <div className="panel tip-box">
          <h3>💳 택배비 · 결제</h3>
          <ul>
            <li>택배비는 편도만 부담하시면 돼요.</li>
            <li>결제는 현금 또는 계좌이체로 받아요.</li>
          </ul>
        </div>
        <div className="panel tip-box">
          <h3>📦 보내실 곳</h3>
          <p>
            {STORE.address} {STORE.addressDetail}
            <br />
            {STORE.name} ({STORE.phone})
          </p>
        </div>
        <div className="delivery-actions">
          <a className="button" href={STORE.tel}>
            <Phone size={20} /> 택배 접수 전화하기
          </a>
          <ExtLink href={STORE.booking} className="button">
            <CalendarCheck size={20} /> 택배예약 접수하기
          </ExtLink>
        </div>
      </div>
    </>
  );
}

function FAQ() {
  return (
    <>
      <PageHead badge="GOOD TO KNOW" title={<>궁금한 점을 <em>모았어요.</em></>} lead="수리 전, 이것만 확인해주세요." kind="phone" pose="hold" />
      <div className="shell inner-page narrow-page">
        <div className="faq-list">
          {faqs.map(([q, a], i) => (
            <details key={q} className="panel" open={i === 0}>
              <summary>
                <span className="q">Q</span>
                {q}
                <Plus size={24} strokeWidth={3} />
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
        <div className="faq-more">
          <p>더 궁금한 점이 있으신가요?</p>
          <a className="button" href={STORE.tel}>
            <Phone size={20} /> 전화로 물어보기
          </a>
          <ExtLink href={STORE.naver} className="button ghost-dark">
            <NaverBadge /> 네이버 톡톡
          </ExtLink>
        </div>
      </div>
    </>
  );
}

function Contact() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const [model, setModel] = useState('');
  const [symptom, setSymptom] = useState(() => [params.get('service'), params.get('symptom')].filter(Boolean).join(' · '));
  const [memo, setMemo] = useState('');
  const [message, setMessage] = useState('');
  return (
    <>
      <PageHead badge="CONTACT" title={<>어디가 <em>불편한가요?</em></>} lead="전화·네이버 예약·카카오톡 중 편한 방법으로 연락 주세요." kind="phone" pose="wave" />
      <div className="shell inner-page narrow-page">
        <div className="contact-ways">
          <a href={STORE.tel} className="panel way">
            <span className="way-ic call">
              <Phone size={30} />
            </span>
            <b>전화 상담</b>
            <span>{STORE.phone}</span>
          </a>
          <ExtLink href={STORE.naver} className="panel way">
            <span className="way-ic naver">N</span>
            <b>네이버 톡톡 · 예약</b>
            <span>네이버 플레이스에서</span>
          </ExtLink>
          <ExtLink href={STORE.kakaoChat} className="panel way">
            <span className="way-ic kakao">
              <KakaoBubble size={26} />
            </span>
            <b>카카오톡 상담</b>
            <span>카카오 채널에서</span>
          </ExtLink>
          <ExtLink href={STORE.booking} className="panel way">
            <span className="way-ic call">
              <CalendarCheck size={28} />
            </span>
            <b>네이버 예약</b>
            <span>방문 시간 미리 잡기</span>
          </ExtLink>
        </div>
        <div className="case-links">
          <Link to="/delivery" className="panel case-link">
            <span className="badge">DELIVERY</span>
            <h3>멀리 계신가요? 택배 수리</h3>
            <p>전국 택배 접수. 점검 후 비용을 안내하고 동의하시면 수리해 우체국 택배로 보내드려요.</p>
            <span className="go">
              택배 수리 안내 <ArrowRight size={18} />
            </span>
          </Link>
          <Link to="/locations" className="panel case-link">
            <span className="badge orange">VISIT</span>
            <h3>직접 방문하기</h3>
            <p>중앙대·숭실대 도보 10분, 무료 주차 가능. {STORE.hours} ({STORE.hoursNote})</p>
            <span className="go">
              매장 위치 보기 <ArrowRight size={18} />
            </span>
          </Link>
        </div>

        <div className="panel memo-box">
          <h2>
            <span className="badge">MEMO</span> 상담 메모 만들기
          </h2>
          <p className="form-note">아래 내용은 이 화면에서 메모로만 정리되며 매장에 자동 전송되지 않아요. 만든 메모를 복사해서 문자나 톡톡으로 보내주세요.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setMemo(`세이프픽스 상담 메모\n모델: ${model}\n증상: ${symptom}`);
              setMessage('');
            }}
          >
            <label>
              기기 모델
              <input required value={model} onChange={(e) => setModel(e.target.value)} placeholder="예: 아이폰 15, 아이패드 에어 5" />
            </label>
            <label>
              불편한 증상
              <textarea required rows={4} value={symptom} onChange={(e) => setSymptom(e.target.value)} placeholder="언제부터 어떤 증상이 생겼나요?" />
            </label>
            <button className="button">▶ 상담 메모 만들기</button>
          </form>
          {memo && (
            <div className="memo" role="status">
              <h3>
                <Check size={22} /> 메모가 준비됐어요!
              </h3>
              <pre>{memo}</pre>
              <button
                className="copy-btn"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(memo);
                    setMessage('복사했어요. 문자나 톡톡에 붙여넣어 주세요.');
                  } catch {
                    setMessage('메모를 길게 눌러 직접 복사해주세요.');
                  }
                }}
              >
                <Copy size={18} /> 메모 복사
              </button>
              <p>{message}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function Shell() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    // 메뉴별 제목·설명·대표주소 (검색엔진용, seo.json에서 관리)
    const pages = SEO.pages as Record<string, { title: string; description: string; canonical?: string }>;
    let path = pathname;
    try {
      path = decodeURIComponent(pathname);
    } catch {}
    const key = path === '/services/display' ? '/services/iphone' : path.replace(/\/$/, '') || '/';
    const seg = key.split('/');
    const col = COLUMNS.find((p) => p.path === key);
    const area = seg.length === 4 && seg[1] === 'services' ? areaMeta(seg[2], seg[3]) : null;
    const svc = seg.length === 3 && seg[1] === 'services' ? svcById(seg[2]) : undefined;
    const page: { title: string; description: string; canonical?: string } = col
      ? { title: col.title + ' | 세이프픽스', description: col.description }
      : area || (svc ? { title: svcTitle(svc), description: svcDesc(svc) } : pages[key] || pages['/']);
    document.title = page.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', page.description);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', SEO.site + encodeURI(page.canonical || (pages[key] || col || area || svc ? key : '/')));
  }, [pathname]);
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:serviceId" element={<Detail />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/cases" element={<Cases />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/services/:serviceId/:area" element={<AreaPage />} />
          <Route path="/services/:serviceId/:area/:slug" element={<PostPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <a className="floating-contact" href={STORE.tel} aria-label={'전화 상담 ' + STORE.phone}>
        <Phone size={26} />
      </a>
      <ExtLink href={STORE.naver} className="floating-contact naver-float" label="네이버 톡톡 상담">
        <MessageCircle size={26} />
      </ExtLink>
      <ExtLink href={STORE.kakaoChat} className="floating-contact kakao-float" label="카카오톡 채널 상담">
        <KakaoBubble />
      </ExtLink>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  );
}
