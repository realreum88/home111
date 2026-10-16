import React, { useEffect, useState } from 'react';
import CarePage from './pages/CarePage';
import { HashRouter, Link, Routes, Route, useLocation, useParams, Navigate } from 'react-router-dom';
import {
  ArrowRight,
  ChevronLeft,
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
} from 'lucide-react';
import { Character, CharKind, StoreArt, Sparkle } from './components/Characters';
import { DEVICES, deviceById } from './devices';
import { STORE } from './store';



const perks = [
  { Icon: Wrench, t: '대표가 직접 수리', d: '상담부터 수리까지 한 사람이 책임져요' },
  { Icon: Eye, t: '부품 직접 확인', d: '어떤 부품을 쓰는지 눈으로 보여드려요' },
  { Icon: ShieldCheck, t: '3개월 무상 보증', d: '같은 증상이 다시 생기면 무상으로 (고객 과실 제외)' },
  { Icon: Zap, t: '어려운 수리도 당일', d: '휨 복원·메인보드·충전단자까지' },
  { Icon: FileText, t: '여행자 보험 서류', d: '해외 파손 시 견적서·영수증·사진 준비' },
  { Icon: Truck, t: '전국 택배 · 퀵 접수', d: '멀리 계셔도 맡기실 수 있어요' },
];

const faqs: [string, string][] = [
  ['수리 비용은 어떻게 확인하나요?', '모델과 증상에 따라 작업 범위가 달라져요. 기기 상태를 먼저 확인한 뒤 비용과 소요 시간을 안내해드리고, 동의하신 경우에만 진행합니다.'],
  ['수리 후 보증이 있나요?', '수리 후 같은 증상이 다시 나타나면 3개월 동안 무상으로 봐드려요. 떨어뜨리거나 물에 빠뜨린 경우처럼 고객 과실은 제외됩니다.'],
  ['영업시간이 어떻게 되나요?', `${STORE.hours} 운영해요. ${STORE.hoursNote}. 방문 전에 전화나 네이버 톡톡으로 미리 연락 주시면 기다리지 않으셔도 돼요.`],
  ['멀리 살아도 맡길 수 있나요?', '네, 전국 택배 수리와 퀵 접수가 가능해요. 보내시기 전에 먼저 연락 주시면 포장과 접수 방법을 알려드려요.'],
  ['해외여행 중에 기기가 파손됐어요.', '여행자 보험 청구에 필요한 견적서, 영수증, 수리 사진 등을 준비해드려요. 상담할 때 보험 청구 예정이라고 말씀해주세요.'],
  ['방문 전에 무엇을 준비하나요?', '기기 모델명, 증상, 이전 수리 이력을 알려주세요. 가능하다면 중요한 데이터를 미리 백업해주세요.'],
  ['침수되거나 전원이 안 켜지면 어떻게 하나요?', '충전과 반복적인 전원 켜기를 피하고 그대로 가져와 주세요. 상태를 점검한 뒤 가능 여부를 안내해드려요.'],
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
function DaangnBadge() {
  return <span className="mark-badge daangn">당근</span>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  useEffect(() => setOpen(false), [loc.pathname]);
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
            <Link to="/faq">자주 묻는 질문</Link>
          </span>
        </div>
      </div>
      <div className="navigation shell">
        <Brand />
        <nav className={open ? 'nav-links is-open' : 'nav-links'} aria-label="주 메뉴">
          <Link to="/services">수리하기</Link>
          <Link to="/delivery">택배수리</Link>
          <Link to="/reviews">수리후기</Link>
          <Link to="/locations">매장안내</Link>
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
          <Link to="/services">수리 안내</Link>
          <Link to="/delivery">택배수리</Link>
          <Link to="/reviews">수리후기</Link>
          <Link to="/locations">매장 안내</Link>
          <Link to="/faq">자주 묻는 질문</Link>
          <Link to="/contact">상담 준비</Link>
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
    desc: '아이폰부터 아이패드까지. 대표가 직접, 오늘 바로 고쳐드려요.',
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
                <Check size={18} /> 3개월 무상 보증
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
      </div>

      <div className="shell home-content">
        <section id="services">
          <SectionTitle badge="SELECT STAGE" title={<>어떤 기기를 <em>맡기시나요?</em></>} to="/services" />
          <ServiceCards />
        </section>

        <section className="perks-wrap">
          <SectionTitle badge="WHY SAFEFIX" title={<>세이프픽스를 <em>믿고 맡기는 이유</em></>} />
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
            <div className="review-score">
              <span className="stars">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} size={30} fill="#FFC93C" strokeWidth={2.4} />
                ))}
              </span>
              <b>5.0</b>
            </div>
            <h3>당근 이웃 후기 15개, 모두 별 다섯 개</h3>
            <p>배터리 교체, 아이패드 액정·프레임 수리 등 실제 이웃들의 후기를 확인해보세요.</p>
            <div className="review-links">
              <ExtLink href={STORE.daangn} className="pill-link">
                <DaangnBadge /> 당근 후기 보기 <ExternalLink size={16} />
              </ExtLink>
              <ExtLink href={STORE.naver} className="pill-link">
                <NaverBadge /> 네이버 리뷰 보기 <ExternalLink size={16} />
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
              <span>보증</span>수리 후 3개월 무상 보증을 드려요 (고객 과실 제외)
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
  return <CarePage kind="repair" />;
}
function Detail() {
  const { serviceId } = useParams();
  return (
    <CarePage
      kind={serviceId === 'battery' ? 'battery' : serviceId === 'data' ? 'data' : 'repair'}
      device={deviceById(serviceId)?.name}
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
            <li>건물 3층 304호예요. 엘리베이터를 이용해주세요.</li>
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
          <h3>📦 보내실 곳</h3>
          <p>
            {STORE.address} {STORE.addressDetail}
            <br />
            {STORE.name} ({STORE.phone})
          </p>
        </div>
        <a className="button" href={STORE.tel}>
          <Phone size={20} /> 택배 접수 전화하기
        </a>
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
      <PageHead badge="LET'S TALK" title={<>어디가 <em>불편한가요?</em></>} lead="편한 방법으로 연락 주세요. 미리 메모를 정리하면 더 빨라요." kind="phone" pose="wave" />
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
          <ExtLink href={STORE.daangn} className="panel way">
            <span className="way-ic daangn">🥕</span>
            <b>당근 채팅</b>
            <span>당근 매장에서</span>
          </ExtLink>
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
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
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
    </>
  );
}

export default function App() {
  return (
    <HashRouter>
      <Shell />
    </HashRouter>
  );
}
