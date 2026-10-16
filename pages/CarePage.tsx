import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Pause, Play, ShieldCheck, Phone } from 'lucide-react';
import { Character, CharKind, Sparkle } from '../components/Characters';
import { STORE } from '../store';
import { DEVICES } from '../devices';

type Kind = 'repair' | 'battery' | 'data';

const content = {
  repair: {
    label: 'REPAIR STUDIO',
    name: '수리하기',
    title: '고장 난 기기,',
    accent: '리퍼 대신 원래대로\n다시 고칠 수 있어요.',
    desc: '깨진 화면부터 충전 문제까지, 대표가 직접 하나씩 살펴볼게요.',
    badge: '오늘도 수리 준비 완료!',
    section: '어디가 불편한가요?',
    options: ['화면이 깨졌어요', '터치가 안 돼요', '충전이 안 돼요', '전원이 안 켜져요'],
    tips: [
      '파손된 부위와 기기 모델을 함께 알려주세요.',
      '터치가 되지 않는 위치와 발생 시점을 알려주세요.',
      '케이블을 연결했을 때의 반응을 알려주세요.',
      '마지막으로 정상 작동한 시점과 증상을 알려주세요.',
    ],
    note: '가능하다면 중요한 데이터를 먼저 백업해주세요. 수리 후 3개월 무상 보증(고객 과실 제외)을 드려요.',
  },
  battery: {
    label: 'ENERGY STATION',
    name: '배터리 교체',
    title: '금방 지치는 배터리,',
    accent: '충전할 시간!',
    desc: '사용 시간과 배터리 상태부터 차근차근 확인해요.',
    badge: '에너지 충전 중!',
    section: '배터리가 보내는 신호',
    options: ['너무 빨리 닳아요', '갑자기 꺼져요', '충전이 느려요', '배터리가 부풀었어요'],
    tips: [
      '평소 사용 시간과 배터리 성능 상태를 알려주세요.',
      '전원이 꺼질 때 표시된 잔량과 상황을 알려주세요.',
      '사용 중인 케이블과 충전기의 상태를 함께 확인해주세요.',
      '바로 사용과 충전을 멈추고, 누르거나 분해하지 마세요. 그대로 가져와 주세요.',
    ],
    note: '모델과 점검 결과에 따라 교체 가능 여부와 비용이 달라져요.',
  },
  data: {
    label: 'MEMORY QUEST',
    name: '데이터 상담',
    title: '소중한 기억을 위한,',
    accent: '작은 구조대.',
    desc: '사진과 기록이 걱정될 때, 현재 상태부터 알려주세요.',
    badge: '소중한 기록을 살피는 중',
    section: '어떤 상황인가요?',
    options: ['전원이 안 켜져요', '물에 빠졌어요', '사진이 사라졌어요', '백업이 궁금해요'],
    tips: [
      '반복해서 전원을 켜기보다 현재 증상과 기기 모델을 알려주세요.',
      '충전하거나 전원을 켜지 말고, 침수 시점과 상황을 알려주세요.',
      '새 데이터 저장이나 초기화를 피하고, 삭제 시점과 백업 유무를 확인해주세요.',
      '기기가 정상 작동하는지와 보관하려는 데이터 종류를 알려주세요.',
    ],
    note: '데이터 복구 가능 여부는 점검 후 확인하며, 복구를 보장하지는 않아요.',
  },
};

const sceneChar: Record<Kind, CharKind> = { repair: 'phone', battery: 'battery', data: 'data' };

function GameScene({ kind, device }: { kind: Kind; device?: string }) {
  const [paused, setPaused] = useState(false);
  const main: CharKind = DEVICES.find((d) => d.name === device)?.kind ?? sceneChar[kind];
  return (
    <div className={'game-scene ' + (paused ? 'is-paused' : '')}>
      <div className="scene-sun" />
      <Sparkle className="sp sp1" size={40} />
      <Sparkle className="sp sp2" size={24} color="#fff" />
      <div className="scene-items">
        <span className="item item-one">✚</span>
        <span className="item item-two">⚡</span>
        <span className="item item-three">★</span>
      </div>
      <Character kind={main} pose={kind === 'repair' ? 'hold' : 'cheer'} mood={kind === 'data' ? 'wink' : 'happy'} className="scene-chr" label={content[kind].name + ' 캐릭터'} />
      <div className="scene-ground" />
      <span className="scene-caption">
        <span className="live" />
        {content[kind].badge}
      </span>
      <button className="motion-toggle" onClick={() => setPaused(!paused)} aria-label={paused ? '캐릭터 움직임 재생' : '캐릭터 움직임 멈추기'} aria-pressed={paused}>
        {paused ? <Play size={16} /> : <Pause size={16} />}
      </button>
    </div>
  );
}

export default function CarePage({ kind = 'repair', device }: { kind?: Kind; device?: string }) {
  const c = content[kind];
  const [selected, setSelected] = useState<number | null>(null);
  useEffect(() => setSelected(null), [kind, device]);
  const selectedText = selected === null ? '' : c.options[selected];
  const next = '/contact?' + new URLSearchParams({ service: device || c.name, symptom: selectedText }).toString();

  return (
    <div className={'care-page care-' + kind}>
      <section className="care-hero">
        <div className="hero-dots" />
        <div className="shell care-hero-inner">
          <div className="care-copy">
            <div className="hero-tag">✚ SAFEFIX / {c.label}</div>
            <h1>
              {device ? device + '도,' : c.title}
              <br />
              <em>{c.accent.split('\n').map((l, k) => <React.Fragment key={k}>{k > 0 && <br />}{l}</React.Fragment>)}</em>
            </h1>
            <p>{c.desc}</p>
            <div className="hero-actions">
              <Link to={kind === 'repair' ? '/cases' : next} className="button">
                ▶ {kind === 'repair' ? '수리 작업 사례 보기' : kind === 'battery' ? '배터리 상담 준비하기' : '데이터 상담 준비하기'}
              </Link>
              <a href={STORE.tel} className="button ghost">
                <Phone size={20} /> 전화하기
              </a>
            </div>
          </div>
          <GameScene kind={kind} device={device} />
        </div>
      </section>

      <div className="shell care-content">
        <section>
          <div className="section-title">
            <div>
              <span className="badge">CHOOSE YOUR {kind === 'repair' ? 'DEVICE' : 'SYMPTOM'}</span>
              <h2>{kind === 'repair' ? '어떤 기기를 맡기시나요?' : c.section}</h2>
            </div>
            <span className="section-hint">{kind === 'repair' ? '◀ 기기를 선택해주세요 ▶' : '◀ 가장 가까운 증상을 골라주세요 ▶'}</span>
          </div>

          {kind === 'repair' ? (
            <div className="service-grid">
              {DEVICES.map(({ name, id, kind: ck, items, tone }, i) => (
                <Link key={id} to={'/services/' + id} className={'service-card ' + tone + (device && name === device ? ' is-current' : '')}>
                  <span className="stage-tag">TYPE {i + 1}</span>
                  <div className="service-art">
                    <Character kind={ck} pose={i % 2 ? 'point' : 'wave'} mood={i === 3 ? 'wink' : 'happy'} />
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
          ) : (
            <div className="symptom-grid">
              {c.options.map((option, i) => (
                <button key={option} aria-pressed={selected === i} className={'panel symptom-card ' + (selected === i ? 'selected' : '')} onClick={() => setSelected(i)}>
                  <span className="symptom-number">{i + 1}</span>
                  <strong>{option}</strong>
                  <span className="selection-dot">{selected === i && <Check size={20} strokeWidth={3.5} />}</span>
                </button>
              ))}
            </div>
          )}

          {kind !== 'repair' && (
            <div className="symptom-tip" role="status">
              <span className="tip-ic">💡</span>
              <p>{selected === null ? '증상을 선택하면 상담 전에 준비할 내용을 알려드려요.' : c.tips[selected]}</p>
              {selected !== null && (
                <Link to={next} className="tip-go">
                  이 증상으로 상담 <ArrowRight size={18} />
                </Link>
              )}
            </div>
          )}
        </section>

        <section className="care-journey">
          <div className="section-title">
            <div>
              <span className="badge">HOW TO PLAY</span>
              <h2>{kind === 'data' ? '상태 확인부터, 신중하게.' : '복잡하지 않아요. 세 단계면 돼요.'}</h2>
            </div>
          </div>
          <div className="journey-track">
            {[
              ['1', '모델과 증상 알려주기', '전화·톡톡·방문 중 편한 방법으로 지금 상태를 알려주세요.'],
              ['2', '점검과 안내 확인하기', kind === 'data' ? '복구 가능 여부와 작업 범위를 확인해요.' : '작업 범위와 비용을 먼저 확인해요.'],
              ['3', kind === 'data' ? '진행 여부 결정하기' : '동의한 수리 진행하기', kind === 'data' ? '안내받은 내용을 바탕으로 결정해요.' : '수리 후 관련 기능을 함께 점검해요.'],
            ].map(([n, t, d]) => (
              <div className="panel" key={n}>
                <span className="j-no">{n}</span>
                <div>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="care-bottom">
          <p>
            <ShieldCheck size={24} />
            {c.note}
          </p>
          <Link to={next} className="button">
            ▶ 상담 준비하기
          </Link>
        </div>
      </div>
    </div>
  );
}
