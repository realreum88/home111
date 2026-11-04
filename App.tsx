import React, { useEffect, useState } from 'react';
import CarePage from './pages/CarePage';
import { BrowserRouter, Link, Routes, Route, useLocation, useParams, Navigate } from 'react-router-dom';
import {
  ArrowRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
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
import ABOUT from './about.json';
import REVIEWS from './reviews.json';
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
const HOME_SECTIONS: [string, string][] = [
  ['process', '진행 과정'],
  ['cost', '비용 기준'],
  ['promise', '3대 원칙'],
  ['area', '접수·지역'],
  ['faq', 'Q&A'],
  ['request', '상담 신청'],
];

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
  const [homeOpen, setHomeOpen] = useState(false);
  const loc = useLocation();
  useEffect(() => {
    setOpen(false);
    setSvcOpen(false);
    setHomeOpen(false);
  }, [loc.pathname, loc.hash]);
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
          <div className={homeOpen ? 'nav-drop nav-drop-home is-open' : 'nav-drop nav-drop-home'}>
            <Link to="/" className={'nav-drop-top' + (loc.pathname === '/' ? ' is-active' : '')}>홈</Link>
            <button className="nav-drop-toggle" aria-label="홈 바로가기 펼치기" aria-expanded={homeOpen} onClick={() => setHomeOpen(!homeOpen)}>
              <ChevronDown size={18} />
            </button>
            <div className="nav-sub">
              {HOME_SECTIONS.map(([id, t]) => (
                <Link key={id} to={{ pathname: '/', hash: '#' + id }} onClick={() => setOpen(false)}>
                  {t}
                </Link>
              ))}
            </div>
          </div>
          <Link to="/about" className={loc.pathname === '/about' ? 'is-active' : ''}>회사소개</Link>
          <div className={svcOpen ? 'nav-drop is-open' : 'nav-drop'}>
            <Link to="/services" className={'nav-drop-top' + (loc.pathname.startsWith('/services') ? ' is-active' : '')}>서비스</Link>
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
          <Link to="/cases" className={loc.pathname === '/cases' ? 'is-active' : ''}>수리사례</Link>
          <Link to="/contact" className={loc.pathname === '/contact' ? 'is-active' : ''}>견적문의</Link>
          <div className="nav-ext">
            <ExtLink href={STORE.blog} label="네이버 블로그">BLOG</ExtLink>
            <ExtLink href={STORE.clip} label="네이버 클립">CLIP</ExtLink>
            <ExtLink href={STORE.kakao} label="카카오톡 채널">KAKAO</ExtLink>
          </div>
          <Link to={{ pathname: '/', hash: '#request' }} className="nav-cta" onClick={() => setOpen(false)}>
            <CalendarCheck size={22} /> 견적 문의하기
          </Link>
          <a href={STORE.tel} className="nav-call">
            <Phone size={18} /> {STORE.phone}
          </a>
          <button className="nav-close" aria-label="메뉴 닫기" onClick={() => setOpen(false)}>
            <ChevronUp size={26} strokeWidth={3} />
          </button>
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
          <Link to="/contact">견적문의</Link>
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
      <div className="shell inner-page svc-page home-extra">
        <StepCards title="세이프픽스 수리" accent="진행 과정" lead="연락부터 출고 점검까지, 이 순서로 진행해요." steps={STEPS} />
        <CostBasis name="세이프픽스 수리" />
        <Principles />
        <ServiceArea name="세이프픽스" />
        <FaqTabs items={faqItems()} />
        <RequestForm />
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

const IPAD_STEPS: [string, string][] = [
  ['점검 및 진단', '증상을 듣고 기기를 열어 원인을 정확히 찾아요. 점검 후 비용과 시간을 먼저 안내해요.'],
  ['수리 전 기능 테스트', '수리 전에 터치·충전·카메라 등 다른 기능의 상태를 먼저 확인해 기록해요.'],
  ['수리·새 부품 교체 후 정상 작동 확인', '수리하거나 새 부품으로 교체한 뒤 바로 정상 작동하는지 확인해요.'],
  ['최종 점검', '충방전, 터치, 해상도, 애플펜슬, 버벅거림, 전·후면 카메라까지 하나씩 다시 확인해요.'],
  ['출고', '점검을 마친 기기를 돌려드려요. 택배 접수는 우체국 택배로 보내드려요.'],
];
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

// ===== 서비스 페이지 공통 섹션 (참고: 대표 소개 · 정밀 프로세스 · 비용 기준 · 3대 원칙 · 카테고리 Q&A · 지역 안내 · 상담 신청) =====
type Faq = { cat: string; q: string; a: string };
const FAQ_CATS = ['예약 & 비용', '수리 과정', '보증 & 사후 관리', '방문 & 택배', '특수 상황'];
function faqItems(s?: Svc): Faq[] {
  const w = s ? warrantyOf(s) : '';
  const name = s ? s.name : '수리';
  return [
    { cat: '예약 & 비용', q: `${name} 비용은 어떻게 정해지나요?`, a: '모델과 증상에 따라 작업 범위가 달라져요. 기기 상태를 먼저 확인한 뒤 비용과 소요 시간을 안내하고, 동의하신 경우에만 수리해요.' },
    { cat: '예약 & 비용', q: '예약하고 가야 하나요?', a: `${STORE.hours} 운영하고, 일요일·공휴일은 예약제예요. 방문 전에 전화나 네이버 톡톡으로 미리 연락 주시면 기다리지 않으셔도 돼요.` },
    { cat: '수리 과정', q: '필요 없는 수리까지 권하지 않나요?', a: '과잉진단 없이 꼭 필요한 수리만 안내해요. 점검 결과와 비용을 먼저 설명드리고, 동의하신 경우에만 수리해요.' },
    { cat: '수리 과정', q: '외주로 보내지 않나요?', a: '외주 없이 대표가 상담부터 수리, 출고 점검까지 직접 해요.' },
    ...(s?.points?.length ? [{ cat: '수리 과정', q: `${s.name}, 수리할 때 무엇을 확인하나요?`, a: s.points.join(' ') }] : []),
    { cat: '보증 & 사후 관리', q: `${name} 후 보증이 있나요?`, a: s ? `네, 수리 후 ${w} 동안 같은 증상이 다시 나타나면 무상으로 봐드려요. 떨어뜨리거나 물에 빠뜨린 경우처럼 고객 과실은 제외돼요.` : '수리 후 같은 증상이 다시 나타나면 무상으로 봐드려요. 아이패드 액정 교체는 1개월, 그 밖의 수리는 3개월이에요(고객 과실 제외).' },
    { cat: '보증 & 사후 관리', q: '방문 전에 무엇을 준비하나요?', a: '기기 모델명, 증상, 이전 수리 이력을 알려주세요. 가능하다면 중요한 데이터를 미리 백업해주세요.' },
    { cat: '방문 & 택배', q: '중앙대·숭실대에서 가까운가요?', a: '네, 중앙대와 숭실대 모두 걸어서 약 10분 거리예요. 방문 전에 연락 주시면 기다리지 않으셔도 돼요.' },
    { cat: '방문 & 택배', q: '어디에 있나요? 주차되나요?', a: `${STORE.address} ${STORE.addressDetail}에 있어요. 중앙대·숭실대에서 걸어서 약 10분이고, 무료 주차가 가능해요.` },
    { cat: '방문 & 택배', q: '멀리 있어도 맡길 수 있나요?', a: '네, 전국 택배 수리와 퀵 접수가 가능해요. 택배비는 편도만 부담하시면 되고, 퀵 비용은 손님 부담이에요. 점검 후 비용을 안내하고 동의하시면 수리해서 우체국 택배로 보내드려요. 보통 1~2일 걸려요.' },
    { cat: '특수 상황', q: '침수되거나 전원이 안 켜지면 어떻게 하나요?', a: '충전과 반복적인 전원 켜기를 피하고 그대로 가져와 주세요. 상태를 점검한 뒤 가능 여부를 안내해드려요.' },
    { cat: '특수 상황', q: '해외여행 중에 기기가 파손됐어요.', a: '여행자 보험 청구에 필요한 견적서, 영수증, 수리 사진 등을 준비해드려요. 상담할 때 보험 청구 예정이라고 말씀해주세요.' },
  ];
}

function SectionHead({ eyebrow, title, accent, lead }: { eyebrow: string; title: React.ReactNode; accent?: string; lead?: string }) {
  return (
    <div className="sec-head">
      <span className="sec-eyebrow">{eyebrow}</span>
      <h2>
        {title} {accent && <mark>{accent}</mark>}
      </h2>
      {lead && <p>{lead}</p>}
    </div>
  );
}

function CeoCard() {
  const c = ABOUT as { ceoName: string; greeting: string[]; photo: string; photoCaption: string };
  if (!c.greeting.length) return null;
  return (
    <section className="full">
      <div className="panel ceo">
        <div className="ceo-text">
          <h2>
            세이프픽스 대표 {c.ceoName && <mark>{c.ceoName}</mark>}입니다.
          </h2>
          <div className="ceo-msg">
            {c.greeting.map((l, i) => (l ? <p key={i}>{l}</p> : <br key={i} />))}
          </div>
        </div>
        {c.photo && (
          <figure className="ceo-photo">
            <img src={c.photo} alt={`세이프픽스 대표${c.ceoName ? ' ' + c.ceoName : ''}`} loading="lazy" />
            <figcaption>{c.photoCaption}</figcaption>
          </figure>
        )}
      </div>
    </section>
  );
}

function StepCards({ title, accent, lead, steps }: { title: string; accent: string; lead: string; steps: [string, string][] }) {
  return (
    <section className="full" id="process">
      <SectionHead eyebrow="PROCESS" title={title} accent={accent} lead={lead} />
      <ol className="step-cards">
        {steps.map(([t, d], i) => (
          <li key={t} className="panel">
            <div className="step-top">
              <span className="step-pill">STEP {String(i + 1).padStart(2, '0')}</span>
              <span className="step-check">
                <Check size={20} strokeWidth={3} />
              </span>
            </div>
            <h3>{t}</h3>
            <p>{d}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function CostBasis({ name }: { name: string }) {
  const left: [string, string][] = [
    ['기기 모델', '같은 수리라도 모델마다 부품과 작업 방법이 달라요.'],
    ['증상과 손상 범위', '어디까지 손상됐는지, 다른 부품까지 영향이 갔는지 확인해요.'],
    ['부품 종류', '어떤 부품을 쓰는지 미리 설명드리고, 눈으로 확인하실 수 있게 보여드려요.'],
  ];
  const right = ['기기 모델명 (설정 › 일반 › 정보에서 확인할 수 있어요)', '언제부터 어떤 증상이 생겼는지, 떨어뜨림·침수 여부', '이전에 다른 곳에서 수리한 이력', '중요한 데이터 백업 여부'];
  return (
    <section className="full" id="cost">
      <SectionHead eyebrow="BEFORE REPAIR" title={`${name},`} accent="비용을 정하는 기준" lead="점검 후 비용을 먼저 안내드리고, 동의하신 경우에만 수리해요." />
      <div className="panel basis">
        <div className="basis-col">
          <h3>비용을 확인할 때 보는 항목</h3>
          {left.map(([t, d]) => (
            <div key={t} className="basis-item">
              <h4>{t}</h4>
              <p>{d}</p>
            </div>
          ))}
        </div>
        <div className="basis-col alt">
          <h3>상담할 때 함께 알려 주세요</h3>
          <ul>
            {right.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Principles({ warranty }: { warranty?: string }) {
  const items: [React.ReactNode, string, string[]][] = [
    [<Wrench size={30} />, '대표 직접 수리', ['외주로 기기를 넘기는 일은 없어요.', '상담부터 수리, 출고 점검까지 대표가 직접 해요.']],
    [<FileText size={30} />, '동의한 수리만', ['과잉진단 없이 꼭 필요한 수리만 안내해요.', '점검 후 비용을 먼저 말씀드리고, 동의하신 경우에만 수리해요.']],
    [<ShieldCheck size={30} />, '수리 후 무상 보증', [warranty ? `수리 후 ${warranty} 동안 같은 증상이 생기면 무상으로 봐드려요.` : '아이패드 액정 1개월, 그 밖의 수리 3개월 무상 보증.', '고객 과실(낙하·침수)은 제외돼요.']],
  ];
  return (
    <section className="full" id="promise">
      <SectionHead eyebrow="PROMISE" title="세이프픽스가 약속하는" accent="3대 수리 원칙" />
      <div className="principles">
        {items.map(([ic, t, ds], i) => (
          <div key={t} className={'panel principle' + (i === 1 ? ' hi' : '')}>
            <span className="principle-ic">{ic}</span>
            <h3>{t}</h3>
            {ds.map((d) => (
              <p key={d}>{d}</p>
            ))}
          </div>
        ))}
      </div>
      <p className="principle-proof">
        <Star size={18} /> 네이버 리뷰 평점 {STORE.reviews.naver.score} · {STORE.reviews.naver.count}개 · 당근 이웃 후기 {STORE.reviews.daangn.score}
      </p>
    </section>
  );
}

function FaqTabs({ items }: { items: Faq[] }) {
  const [cat, setCat] = useState('전체');
  const [more, setMore] = useState(false);
  const cats = ['전체', ...FAQ_CATS.filter((c) => items.some((f) => f.cat === c))];
  const all = cat === '전체' ? items : items.filter((f) => f.cat === cat);
  const shown = more ? all : all.slice(0, 3);
  return (
    <section className="full" id="faq">
      <SectionHead eyebrow="Q&A" title="가장 많이 물어보시는" accent="안심 Q&A" lead="궁금한 카테고리를 골라보세요." />
      <div className="faq-tabs" role="tablist">
        {cats.map((c) => (
          <button key={c} role="tab" aria-selected={cat === c} className={cat === c ? 'on' : ''} onClick={() => { setCat(c); setMore(false); }}>
            {c}
          </button>
        ))}
      </div>
      <div className="faq-list">
        {shown.map((f, i) => (
          <details key={f.q} className="panel" open={i === 0}>
            <summary>
              <span className="q">Q</span>
              {f.q}
              <Plus size={24} strokeWidth={3} />
            </summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
      {all.length > 3 && (
        <button className="faq-more-btn" aria-expanded={more} onClick={() => setMore(!more)}>
          {more ? '접기' : `질문 ${all.length - 3}개 더보기`} {more ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      )}
      <div className="panel faq-cta">
        <b>💡 찾으시는 답변이 없으신가요?</b>
        <a className="button" href={STORE.tel}>
          <Phone size={18} /> 전화로 물어보기
        </a>
      </div>
    </section>
  );
}

function ServiceArea({ name }: { name: string }) {
  const cards: [string, string, string, React.ReactNode, string[]][] = [
    ['VISIT', '매장 방문', '중앙대·숭실대 도보 10분', <MapPin size={34} />, [`${STORE.address} ${STORE.addressDetail}`, '무료 주차 가능', `영업 ${STORE.hours} (${STORE.hoursNote})`]],
    ['DELIVERY', '전국 택배', '우체국 택배로 1~2일', <Truck size={34} />, ['먼저 연락 주시면 포장·접수 방법을 알려드려요.', '점검 후 비용 안내, 동의하시면 수리해요.', '수리 후 우체국 택배로 보내드려요.', '택배비는 편도만 부담하시면 돼요.']],
    ['QUICK', '퀵 접수', '급하실 때', <Zap size={34} />, ['퀵으로도 접수할 수 있어요.', '퀵 비용은 손님 부담이에요.', '보내시기 전에 먼저 연락 주세요.']],
  ];
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="full" id="area">
      <SectionHead eyebrow="SERVICE AREA" title={`${name},`} accent="어디서든 맡기세요" lead="방법을 누르면 자세한 안내가 펼쳐져요." />
      <div className="area-cards">
        {cards.map(([en, t, sub, ic, lines], i) => (
          <div key={t} className={'panel area-card' + (open === i ? ' on' : '')}>
            <button aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)}>
              <span className="area-ic">{ic}</span>
              <span className="area-txt">
                <small>{en}</small>
                <b>
                  {t} <ChevronDown size={22} />
                </b>
                <em>{sub}</em>
              </span>
            </button>
            {open === i && (
              <ul>
                {lines.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
      <p className="muted area-note">
        <Link to="/delivery">택배 수리 자세히 보기 →</Link>
      </p>
      <Regions name={name} />
    </section>
  );
}

function RequestForm({ service }: { service?: string }) {
  const [f, setF] = useState({ model: '', symptom: '', way: '매장 방문', date: '', memo: '' });
  const [msg, setMsg] = useState('');
  const [note, setNote] = useState('');
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setF({ ...f, [k]: e.target.value });
  const text = `[세이프픽스 수리 상담]\n수리: ${service || '-'}\n모델: ${f.model}\n증상: ${f.symptom}\n접수 방법: ${f.way}\n희망 일정: ${f.date || '-'}\n요청사항: ${f.memo || '-'}`;
  const sms = `sms:${STORE.phone.replace(/-/g, '')}${/iPhone|iPad|Mac/.test(typeof navigator === 'undefined' ? '' : navigator.userAgent) ? '&' : '?'}body=${encodeURIComponent(msg)}`;
  return (
    <section className="full" id="request">
      <div className="request">
        <h2>
          아이폰 · 아이패드 · 맥북 수리
          <br />
          상담 신청
        </h2>
        <p>모델과 증상만 적어주시면 점검이 필요한지 먼저 말씀드려요.</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setMsg(text);
            setNote('');
          }}
        >
          <label>
            <span>
              기기 모델 <i>*</i>
            </span>
            <input required value={f.model} onChange={set('model')} placeholder="예: 아이패드 에어 5, 아이폰 15 프로" />
          </label>
          <label>
            접수 방법
            <select value={f.way} onChange={set('way')}>
              <option>매장 방문</option>
              <option>택배 접수</option>
              <option>퀵 접수</option>
            </select>
          </label>
          <label className="wide">
            <span>
              증상 <i>*</i>
            </span>
            <textarea required rows={3} value={f.symptom} onChange={set('symptom')} placeholder="예: 떨어뜨린 뒤 화면 아래쪽 터치가 안 돼요" />
          </label>
          <label>
            희망 일정
            <input value={f.date} onChange={set('date')} placeholder="예: 이번 주 토요일 오후" />
          </label>
          <label>
            추가 요청사항
            <input value={f.memo} onChange={set('memo')} placeholder="예: 데이터 꼭 살려야 해요, 보험 서류 필요" />
          </label>
          <button className="button wide">▶ 상담 내용 만들기</button>
        </form>
        {msg && (
          <div className="request-out" role="status">
            <pre>{msg}</pre>
            <div className="delivery-actions">
              <a className="button" href={sms}>
                <MessageCircle size={18} /> 문자로 보내기
              </a>
              <button
                className="button ghost-dark"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(msg);
                    setNote('복사했어요. 카카오톡 채팅창에 붙여넣어 주세요.');
                  } catch {
                    setNote('내용을 길게 눌러 복사해주세요.');
                  }
                  window.open(STORE.kakaoChat, '_blank', 'noopener');
                }}
              >
                <KakaoBubble size={18} /> 카카오톡으로 보내기
              </button>
            </div>
            {note && <p>{note}</p>}
          </div>
        )}
        <p className="request-note">입력한 내용은 이 화면에서만 정리되고, 버튼을 누르셔야 세이프픽스로 전달돼요.</p>
      </div>
    </section>
  );
}

// 서비스 가능 지역 (가까운 곳은 방문, 먼 곳은 택배·퀵). hot = 실제로 손님이 많이 찾아주시는 동네 (대표 확인)
type Region = { key: string; en: string; name: string; count: string; how: string; list: string[]; hot?: Record<string, string[]> };
const REGIONS: Region[] = [
  {
    key: 'seoul', en: 'SEOUL', name: '서울', count: '25개 구', how: '방문 · 택배 · 퀵',
    list: ['강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구'],
    hot: { 동작구: ['상도동', '노량진', '흑석동', '동작동', '사당동', '신대방'], 관악구: ['신림', '서울대입구', '낙성대동', '삼성동'], 서초구: ['반포동', '방배동'], 용산구: ['용산', '이촌동'], 영등포구: ['여의도'] },
  },
  {
    key: 'incheon', en: 'INCHEON', name: '인천', count: '9개 구 · 2개 군', how: '방문 · 택배 · 퀵',
    list: ['제물포구', '영종구', '미추홀구', '연수구', '남동구', '부평구', '계양구', '서구', '검단구', '강화군', '옹진군'],
    hot: { 서구: ['청라'] },
  },
  {
    key: 'gyeonggi', en: 'GYEONGGI', name: '경기', count: '28개 시 · 3개 군', how: '방문 · 택배 · 퀵',
    list: ['수원시', '성남시', '고양시', '용인시', '부천시', '안산시', '안양시', '남양주시', '화성시', '평택시', '의정부시', '시흥시', '파주시', '광명시', '김포시', '군포시', '광주시', '이천시', '양주시', '오산시', '구리시', '안성시', '포천시', '의왕시', '하남시', '여주시', '동두천시', '과천시', '양평군', '가평군', '연천군'],
    hot: { 양평군: ['양평'] },
  },
  {
    key: 'gangwon', en: 'GANGWON', name: '강원', count: '7개 시 · 11개 군', how: '택배',
    list: ['춘천시', '원주시', '강릉시', '동해시', '태백시', '속초시', '삼척시', '홍천군', '횡성군', '영월군', '평창군', '정선군', '철원군', '화천군', '양구군', '인제군', '고성군', '양양군'],
    hot: { 춘천시: ['춘천'], 원주시: ['원주'], 철원군: ['철원'] },
  },
  {
    key: 'nation', en: 'NATIONWIDE', name: '전국', count: '광역시 · 도', how: '택배',
    list: ['부산', '대구', '대전', '광주', '울산', '세종', '충북', '충남', '전북', '전남', '경북', '경남', '제주'],
  },
];
const REGION_TEXT = REGIONS.map((r) => `${r.name}(${r.list.join('/')})`).join(', ');

function Regions({ name }: { name: string }) {
  const [open, setOpen] = useState<string | null>('seoul');
  const cur = REGIONS.find((r) => r.key === open);
  return (
    <div className="regions">
      <h3 className="regions-title">
        <MapPin size={22} /> {name}, 지역별 접수 안내
      </h3>
      <p className="regions-lead">지역을 누르면 시·구가 펼쳐져요. 주황색은 실제로 많이 찾아주시는 곳이에요.</p>
      <div className="region-cards">
        {REGIONS.map((r) => (
          <div key={r.key} className={'panel region-card' + (open === r.key ? ' on' : '')}>
            <button aria-expanded={open === r.key} onClick={() => setOpen(open === r.key ? null : r.key)}>
              <small>{r.en}</small>
              <b>
                {r.name} <ChevronDown size={22} />
              </b>
              <em>{r.count}</em>
            </button>
          </div>
        ))}
      </div>
      {cur && (
        <div className="panel region-detail">
          <p className="region-how">
            <b>{cur.name}</b> 접수 방법: {cur.how}
          </p>
          <div className="region-chips">
            {cur.list.map((g) => {
              const hot = cur.hot?.[g];
              return (
                <span key={g} className={'region-chip' + (hot ? ' hot' : '')}>
                  {g}
                  {hot && hot.join('') !== g.replace(/[시군구]$/, '') && <small>{hot.join(' · ')}</small>}
                </span>
              );
            })}
          </div>
        </div>
      )}
      <p className="region-note">
        <Clock size={16} /> 지역별 지점이 아니에요. 상도동 매장 한 곳에서 대표가 직접 수리하고, 먼 곳은 택배(편도 택배비)·퀵(손님 부담)으로 맡기실 수 있어요.
      </p>
    </div>
  );
}

type Review = { name: string; source: string; device?: string; service?: string; score?: string; text: string; tags?: string[]; image?: string };
function ReviewText({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  const long = text.length > 110;
  return (
    <>
      <p className={'review-text' + (long && !open ? ' clamp' : '')}>{text}</p>
      {long && (
        <button className="review-toggle" onClick={() => setOpen(!open)}>
          {open ? '접기' : '전체 보기'}
        </button>
      )}
    </>
  );
}
function ReviewSection({ device }: { device?: string }) {
  const [more, setMore] = useState(false);
  const sorted = [...(REVIEWS as Review[])].sort((x, y) => Number(y.device === device) - Number(x.device === device));
  // 처음 보이는 3개 안에 아이패드 액정수리 후기를 항상 넣어요
  const pin = sorted.find((r) => r.service === '아이패드 액정수리');
  const all = pin && sorted.indexOf(pin) > 2 ? [...sorted.slice(0, 2).filter((r) => r !== pin), pin, ...sorted.slice(2).filter((r) => r !== pin)] : sorted;
  const list = more ? all : all.slice(0, 3);
  return (
    <section className="full" id="reviews">
      <div className="stars" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} size={40} />
        ))}
      </div>
      <SectionHead eyebrow="REVIEW" title="직접 맡겨보신" accent="손님들의 후기" lead="저희가 아닌, 실제로 수리를 맡기신 손님들의 이야기예요." />
      <div className="review-scores big">
        <ExtLink href={STORE.naverReview} className="panel score-card">
          <NaverBadge />
          <b>{STORE.reviews.naver.score}</b>
          <span>네이버 리뷰 {STORE.reviews.naver.count}개</span>
        </ExtLink>
        <ExtLink href={STORE.daangn} className="panel score-card">
          <DaangnBadge />
          <b>{STORE.reviews.daangn.score}</b>
          <span>당근 이웃 후기 {STORE.reviews.daangn.count}개</span>
        </ExtLink>
      </div>
      {list.length > 0 && (
        <div className="review-grid">
          {list.map((r, i) => (
            <div key={i} className="panel review-item">
              {r.image && <img src={r.image} alt="" loading="lazy" />}
              <div className="review-head">
                <b>{r.name}</b>
                <small>{r.source}</small>
              </div>
              {r.service && (
                <p className="review-svc">
                  {r.service} {r.score && <span>★ {r.score}</span>}
                </p>
              )}
              <ReviewText text={r.text} />
              {r.tags && (
                <div className="review-tags">
                  {r.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {all.length > 3 && (
        <button className="faq-more-btn" aria-expanded={more} onClick={() => setMore(!more)}>
          {more ? '접기' : `후기 ${all.length - 3}개 더보기`} {more ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      )}
      <div className="delivery-actions bridge-more">
        <ExtLink className="button" href={STORE.naverReview}>
          네이버 리뷰 전체 보기 <ExternalLink size={18} />
        </ExtLink>
      </div>
    </section>
  );
}

const SECTION_TABS: [string, string][] = [
  ['cases', '수리 사례'],
  ['reviews', '후기'],
  ['process', '진행 과정'],
  ['cost', '비용 기준'],
  ['promise', '3대 원칙'],
  ['faq', 'Q&A'],
  ['area', '접수·지역'],
  ['request', '상담 신청'],
];
function SectionNav() {
  const [cur, setCur] = useState('');
  useEffect(() => {
    const onScroll = () => {
      let c = '';
      for (const [id] of SECTION_TABS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 220) c = id;
      }
      setCur(c);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <nav className="sec-nav" aria-label="이 페이지 바로가기" ref={(n: HTMLElement | null) => {
      const on = n?.querySelector<HTMLElement>('a.on');
      if (n && on) n.scrollTo({ left: on.offsetLeft - 20, behavior: 'smooth' });
    }}>
      {SECTION_TABS.map(([id, t]) => (
        <a
          key={id}
          href={'#' + id}
          className={cur === id ? 'on' : ''}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
        >
          {t}
        </a>
      ))}
    </nav>
  );
}

function ToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const f = () => setShow(window.scrollY > 900);
    window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);
  if (!show) return null;
  return (
    <button className="to-top" aria-label="맨 위로" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
      <ChevronUp size={26} strokeWidth={3} />
    </button>
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
        <SectionNav />

        <section className="full">
          <SectionHead eyebrow="CHECK" title={`${svc.name},`} accent="내 기기 먼저 확인해 보세요" lead="이런 증상이 하나라도 있다면 점검을 받아보세요." />
          <div className="symptom-list">
            {svc.symptoms.map((t) => (
              <div key={t} className="panel symptom-row">
                <Check size={22} strokeWidth={3} /> {t}
              </div>
            ))}
          </div>
        </section>

        {posts.length > 0 && (
          <section className="full">
            <SectionHead eyebrow="REAL CASES" title={svc.name} accent="실제 수리 사례" />
            <PostCards posts={posts} />
          </section>
        )}

        <ServiceBlog svc={svc} />

        <ReviewSection device={svc.device} />

        <CeoCard />

        {svc.points && svc.points.length > 0 && (
          <section className="full">
            <SectionHead eyebrow="REPAIR NOTE" title={`${svc.name},`} accent="수리하면서 꼭 확인하는 것" />
            <div className="panel note-box">
              <ul>
                {svc.points.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <StepCards title={svc.name} accent={svc.device === 'ipad' ? '작업 범위 및 정밀 프로세스' : '진행 과정'} lead={svc.device === 'ipad' ? '수리 전 기능 테스트부터 최종 점검까지, 빠짐없이 확인해요.' : '연락부터 출고 점검까지, 이 순서로 진행해요.'} steps={svc.device === 'ipad' ? IPAD_STEPS : STEPS} />

        <CostBasis name={svc.name} />

        <Principles warranty={warrantyOf(svc)} />

        <FaqTabs items={faqItems(svc)} />

        <ServiceArea name={svc.name} />

        {areas.length > 0 && (
          <section className="full">
            <SectionHead eyebrow="AREA" title="지역별" accent={`${svc.name} 사례`} />
            <div className="area-links">
              {areas.map(([a, n]) => (
                <Link key={a} to={`/services/${svc.id}/${a}`} className="pill-link">
                  <MapPin size={16} /> {n} {svc.name}
                </Link>
              ))}
            </div>
          </section>
        )}

        <RequestForm service={svc.name} />

        <section className="full">
          <SectionHead eyebrow="MORE" title={`다른 ${label} 수리`} />
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
        <CeoCard />
        <ReviewSection />
        <Principles />
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

// 네이버 블로그 글을 한 번만 불러와 여러 화면에서 같이 씁니다.
let blogCache: Promise<BlogPost[]> | null = null;
function useBlog() {
  const [posts, setPosts] = useState<BlogPost[] | null>(null);
  useEffect(() => {
    let alive = true;
    blogCache ||= fetch('/api/blog')
      .then((r) => (r.ok ? r.json() : { items: [] }))
      .then((d) => (Array.isArray(d.items) ? d.items : []))
      .catch(() => []);
    blogCache.then((items) => alive && setPosts(items));
    return () => {
      alive = false;
    };
  }, []);
  return posts;
}
const DEVICE_WORDS: Record<string, string[]> = { iphone: ['아이폰', 'iphone'], ipad: ['아이패드', 'ipad'], macbook: ['맥북', 'macbook'], watch: ['애플워치', '애플 워치', 'apple watch'] };
// 블로그 글 제목으로 어떤 서비스 글인지 분류해요 (기기 이름 + 수리 키워드)
function blogService(title: string): Svc | undefined {
  const t = title.toLowerCase();
  let best: Svc | undefined;
  let top = 0;
  for (const s of SVCS as (Svc & { keywords?: string[] })[]) {
    if (!DEVICE_WORDS[s.device].some((w) => t.includes(w))) continue;
    const score = (s.keywords || []).reduce((n, k) => n + (t.includes(k.toLowerCase()) ? k.length : 0), 0);
    if (score > top) {
      top = score;
      best = s;
    }
  }
  return best;
}
function blogDevice(title: string) {
  const t = title.toLowerCase();
  return Object.keys(DEVICE_WORDS).find((d) => DEVICE_WORDS[d].some((w) => t.includes(w)));
}
const fmtDate = (d: string) => {
  const t = new Date(d);
  return isNaN(t.getTime()) ? '' : `${t.getFullYear()}.${String(t.getMonth() + 1).padStart(2, '0')}.${String(t.getDate()).padStart(2, '0')}`;
};

function BlogCards({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="post-grid">
      {posts.map((p) => (
        <React.Fragment key={p.link}>
          <ExtLink href={p.link} className="panel post-card blog-card">
            <div className="blog-thumb">
              {p.image ? <img src={p.image} alt="" loading="lazy" referrerPolicy="no-referrer" /> : <div className="blog-thumb-empty">SAFEFIX</div>}
              <span className="blog-tag">블로그 수리기</span>
            </div>
            <div className="post-body">
              <small>{fmtDate(p.date)}</small>
              <h3>{p.title}</h3>
            </div>
          </ExtLink>
        </React.Fragment>
      ))}
    </div>
  );
}

// "위에 보여드린 사례는 일부예요. 전체 수리 과정이 궁금하시다면?" + 블로그 수리기 카드
function BlogBridge({ posts, lead = '위에 보여드린 사례는 실제 수리한 기기의 일부예요.' }: { posts: BlogPost[] | null; lead?: string }) {
  return (
    <section className="full" id="cases">
      <div className="panel bridge">
        <h2>{lead}</h2>
        <p>전체 수리 과정이 궁금하시다면??</p>
        <span className="bridge-arrows" aria-hidden="true">
          <ChevronDown size={40} strokeWidth={3.5} />
          <ChevronDown size={30} strokeWidth={3.5} />
        </span>
      </div>
      {posts === null ? (
        <p className="muted">블로그 수리기를 불러오는 중이에요…</p>
      ) : posts.length ? (
        <BlogCards posts={posts} />
      ) : (
        <div className="panel tip-box">
          <p>분해부터 부품 교체, 마무리 점검까지 블로그에 사진으로 기록하고 있어요.</p>
        </div>
      )}
      <div className="delivery-actions bridge-more">
        <ExtLink className="button" href={STORE.blog}>
          블로그 수리기 전체 보기 <ExternalLink size={18} />
        </ExtLink>
        <ExtLink className="button ghost-dark" href={STORE.clip}>
          <Play size={18} /> 클립 수리 영상 보기
        </ExtLink>
      </div>
    </section>
  );
}

function ServiceBlog({ svc }: { svc: Svc }) {
  const all = useBlog();
  const posts = all && all.filter((p) => blogService(p.title)?.id === svc.id).slice(0, 6);
  const fallback = all && all.filter((p) => blogDevice(p.title) === svc.device).slice(0, 3);
  return <BlogBridge posts={posts && (posts.length ? posts : fallback)} lead={`위에 보여드린 ${svc.name} 사례는 일부예요.`} />;
}

function Cases() {
  const [filter, setFilter] = useState('all');
  const blog = useBlog();
  const svcOf = (id: string) => (id === 'all' ? null : svcById(id));
  const sel = svcOf(filter);
  const home = sel ? COLUMNS.filter((p) => p.service === sel.id) : COLUMNS;
  const blogPosts = blog && (sel ? blog.filter((p) => blogService(p.title)?.id === sel.id) : blog);
  const count = (id: string) => COLUMNS.filter((p) => p.service === id).length + (blog ? blog.filter((p) => blogService(p.title)?.id === id).length : 0);
  return (
    <>
      <PageHead badge="REPAIR CASES" title={<>직접 고친 기록, <em>그대로 보여드려요.</em></>} lead="대표가 직접 진단하고 고친 수리 사례를 서비스별로 모았어요." kind="laptop" pose="point" />
      <div className="shell inner-page">
        <section className="full">
          <SectionTitle badge="GALLERY" title="서비스별 수리 사례" />
          <p className="muted">보고 싶은 수리를 골라보세요.</p>
          <div className="filter-grid" role="tablist" aria-label="서비스별 수리 사례">
            <button role="tab" aria-selected={filter === 'all'} className={filter === 'all' ? 'chip on' : 'chip'} onClick={() => setFilter('all')}>
              전체
            </button>
            {SVCS.map((s) => (
              <button key={s.id} role="tab" aria-selected={filter === s.id} className={filter === s.id ? 'chip on' : 'chip'} onClick={() => setFilter(s.id)}>
                {s.name}
                {count(s.id) > 0 && <small>{count(s.id)}</small>}
              </button>
            ))}
          </div>
        </section>

        {home.length > 0 && (
          <section className="full">
            <SectionTitle badge="SAFEFIX CASES" title={sel ? `${sel.name} 사례` : '홈페이지 수리 사례'} to={sel ? '/services/' + sel.id : undefined} label={sel ? `${sel.name} 안내` : undefined} />
            <PostCards posts={home} showService />
          </section>
        )}

        <BlogBridge
          posts={blogPosts}
          lead={home.length ? '위에 보여드린 사례는 실제 수리한 기기의 일부예요.' : sel ? `${sel.name} 수리 과정, 블로그에 기록했어요.` : '실제 수리 과정을 블로그에 하나하나 기록했어요.'}
        />
        {sel && blogPosts && blogPosts.length === 0 && (
          <p className="muted">
            아직 {sel.name} 사례를 정리하는 중이에요. <Link to={'/services/' + sel.id}>{sel.name} 안내 보기</Link>
          </p>
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
        <FaqTabs items={faqItems()} />
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
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const t = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
    return () => clearTimeout(t);
  }, [pathname, hash]);
  useEffect(() => {
    if (!window.location.hash) window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
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
      <ToTop />
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
