import React from 'react';

export type CharKind = 'phone' | 'tablet' | 'battery' | 'data';
export type Pose = 'wave' | 'point' | 'cheer' | 'hold';
export type Mood = 'happy' | 'wink' | 'wow';

const NAVY = '#0F263E';
const SW = 6;

type BodyDef = { body: React.ReactNode; face: [number, number]; shoulders: [number, number, number] };

function bodyFor(kind: CharKind): BodyDef {
  switch (kind) {
    case 'phone':
      return {
        face: [110, 104],
        shoulders: [58, 162, 136],
        body: (
          <>
            <rect x="58" y="26" width="104" height="182" rx="30" fill="#7CC4FF" stroke={NAVY} strokeWidth={SW} />
            <rect x="72" y="46" width="76" height="126" rx="16" fill="#F2FAFF" stroke={NAVY} strokeWidth={4} />
            <rect x="96" y="35" width="28" height="6" rx="3" fill={NAVY} />
            <circle cx="110" cy="190" r="7" fill="#F2FAFF" stroke={NAVY} strokeWidth={4} />
            {/* 반창고 */}
            <g transform="rotate(-35 148 52)">
              <rect x="128" y="42" width="42" height="18" rx="8" fill="#FFD9A8" stroke={NAVY} strokeWidth={3.5} />
              <rect x="143" y="44" width="12" height="14" rx="2" fill="#FFC27A" />
            </g>
            <path d="M80 60 L92 52" stroke="#fff" strokeWidth={5} strokeLinecap="round" />
          </>
        ),
      };
    case 'tablet':
      return {
        face: [110, 118],
        shoulders: [38, 182, 146],
        body: (
          <>
            <rect x="38" y="48" width="144" height="160" rx="26" fill="#FFE2B8" stroke={NAVY} strokeWidth={SW} />
            <rect x="52" y="62" width="116" height="122" rx="14" fill="#FFFCF5" stroke={NAVY} strokeWidth={4} />
            <circle cx="110" cy="196" r="5" fill={NAVY} />
            <path d="M62 76 L76 68" stroke="#fff" strokeWidth={5} strokeLinecap="round" />
          </>
        ),
      };
    case 'battery':
      return {
        face: [110, 88],
        shoulders: [60, 160, 128],
        body: (
          <>
            <rect x="90" y="18" width="40" height="20" rx="7" fill="#FFC93C" stroke={NAVY} strokeWidth={5} />
            <rect x="60" y="34" width="100" height="174" rx="28" fill="#FFFFFF" stroke={NAVY} strokeWidth={SW} />
            <rect x="72" y="122" width="76" height="74" rx="14" fill="#7EDB6A" stroke={NAVY} strokeWidth={4} />
            <path className="chr-bolt" d="M114 130 L96 162 H110 L104 186 L126 152 H112 Z" fill="#FFC93C" stroke={NAVY} strokeWidth={3.5} strokeLinejoin="round" />
            <path d="M74 50 L86 44" stroke="#DDEAF7" strokeWidth={5} strokeLinecap="round" />
          </>
        ),
      };
    case 'data':
      return {
        face: [110, 150],
        shoulders: [40, 180, 158],
        body: (
          <>
            <g className="chr-photo">
              <rect x="74" y="38" width="78" height="72" rx="10" fill="#fff" stroke={NAVY} strokeWidth={4.5} transform="rotate(-8 113 74)" />
              <circle cx="96" cy="60" r="8" fill="#FFC93C" stroke={NAVY} strokeWidth={3} />
              <path d="M82 98 L102 78 L116 90 L128 80 L144 96" fill="none" stroke={NAVY} strokeWidth={4} strokeLinejoin="round" strokeLinecap="round" />
            </g>
            <path d="M40 98 Q40 84 54 84 H90 L104 98 H166 Q180 98 180 112 V194 Q180 208 166 208 H54 Q40 208 40 194 Z" fill="#B9A6FF" stroke={NAVY} strokeWidth={SW} strokeLinejoin="round" />
            <rect x="40" y="114" width="140" height="94" rx="16" fill="#D9CEFF" stroke={NAVY} strokeWidth={SW} />
            <path d="M54 128 L66 122" stroke="#fff" strokeWidth={5} strokeLinecap="round" />
          </>
        ),
      };
  }
}

function Face({ x, y, mood }: { x: number; y: number; mood: Mood }) {
  return (
    <g>
      <ellipse cx={x - 30} cy={y + 14} rx="9" ry="5.5" fill="#FF8FA3" opacity=".75" />
      <ellipse cx={x + 30} cy={y + 14} rx="9" ry="5.5" fill="#FF8FA3" opacity=".75" />
      {mood === 'wow' ? (
        <>
          <circle cx={x - 17} cy={y} r="10" fill={NAVY} />
          <circle cx={x + 17} cy={y} r="10" fill={NAVY} />
          <circle cx={x - 14} cy={y - 4} r="3.5" fill="#fff" />
          <circle cx={x + 20} cy={y - 4} r="3.5" fill="#fff" />
          <ellipse cx={x} cy={y + 20} rx="7" ry="8" fill={NAVY} />
        </>
      ) : (
        <>
          <g className="chr-eye">
            <ellipse cx={x - 17} cy={y} rx="9" ry="11.5" fill={NAVY} />
            <circle cx={x - 14} cy={y - 5} r="3.6" fill="#fff" />
          </g>
          {mood === 'wink' ? (
            <path d={`M${x + 9} ${y + 1} Q${x + 17} ${y - 9} ${x + 25} ${y + 1}`} fill="none" stroke={NAVY} strokeWidth={5} strokeLinecap="round" />
          ) : (
            <g className="chr-eye">
              <ellipse cx={x + 17} cy={y} rx="9" ry="11.5" fill={NAVY} />
              <circle cx={x + 20} cy={y - 5} r="3.6" fill="#fff" />
            </g>
          )}
          <path d={`M${x - 11} ${y + 14} Q${x} ${y + 30} ${x + 11} ${y + 14} Z`} fill={NAVY} strokeLinejoin="round" />
          <ellipse cx={x} cy={y + 22} rx="5" ry="3" fill="#FF7A7A" />
        </>
      )}
    </g>
  );
}

function Hand({ x, y }: { x: number; y: number }) {
  return <circle cx={x} cy={y} r="12" fill="#fff" stroke={NAVY} strokeWidth={5} />;
}

function Arms({ pose, s }: { pose: Pose; s: [number, number, number] }) {
  const [l, r, y] = s;
  const arm = (d: string) => <path d={d} fill="none" stroke={NAVY} strokeWidth={8} strokeLinecap="round" />;
  const left =
    pose === 'cheer' ? (
      <g className="chr-arm-l">
        {arm(`M${l} ${y} Q${l - 26} ${y - 20} ${l - 24} ${y - 52}`)}
        <Hand x={l - 24} y={y - 58} />
      </g>
    ) : (
      <g className="chr-arm-l">
        {arm(`M${l} ${y} Q${l - 24} ${y + 14} ${l - 22} ${y + 40}`)}
        <Hand x={l - 22} y={y + 46} />
      </g>
    );
  let right: React.ReactNode;
  if (pose === 'wave' || pose === 'cheer') {
    right = (
      <g className="chr-arm-r chr-wave" style={{ transformOrigin: `${r}px ${y}px` }}>
        {arm(`M${r} ${y} Q${r + 28} ${y - 18} ${r + 24} ${y - 52}`)}
        <Hand x={r + 24} y={y - 58} />
      </g>
    );
  } else if (pose === 'point') {
    right = (
      <g className="chr-arm-r">
        {arm(`M${r} ${y} Q${r + 24} ${y - 4} ${r + 40} ${y - 24}`)}
        <Hand x={r + 44} y={y - 30} />
        <path d={`M${r + 50} ${y - 38} L${r + 60} ${y - 50}`} stroke={NAVY} strokeWidth={7} strokeLinecap="round" />
      </g>
    );
  } else {
    right = (
      <g className="chr-arm-r">
        {arm(`M${r} ${y} Q${r + 26} ${y + 10} ${r + 18} ${y + 38}`)}
        <Hand x={r + 16} y={y + 44} />
        {/* 작은 드라이버 */}
        <g transform={`rotate(25 ${r + 16} ${y + 44})`}>
          <rect x={r + 12} y={y + 12} width="8" height="26" rx="3" fill="#C9D3DF" stroke={NAVY} strokeWidth={3} />
          <rect x={r + 8} y={y + 46} width="16" height="22" rx="6" fill="#FD6731" stroke={NAVY} strokeWidth={3.5} />
        </g>
      </g>
    );
  }
  return (
    <>
      {left}
      {right}
    </>
  );
}

export function Character({
  kind,
  pose = 'wave',
  mood = 'happy',
  className = '',
  label,
}: {
  kind: CharKind;
  pose?: Pose;
  mood?: Mood;
  className?: string;
  label?: string;
}) {
  const b = bodyFor(kind);
  return (
    <svg viewBox="-10 -10 250 280" className={'chr ' + className} role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      <ellipse cx="110" cy="252" rx="62" ry="9" fill={NAVY} opacity=".14" className="chr-shadow" />
      <g className="chr-body">
        {/* 다리 */}
        <rect x="84" y="200" width="16" height="34" rx="7" fill={NAVY} />
        <rect x="120" y="200" width="16" height="34" rx="7" fill={NAVY} />
        <path d="M74 238 Q74 226 90 226 H100 V244 H80 Q74 244 74 238 Z" fill="#FD6731" stroke={NAVY} strokeWidth={4.5} strokeLinejoin="round" />
        <path d="M146 238 Q146 226 130 226 H120 V244 H140 Q146 244 146 238 Z" fill="#FD6731" stroke={NAVY} strokeWidth={4.5} strokeLinejoin="round" />
        <Arms pose={pose} s={b.shoulders} />
        {b.body}
        <Face x={b.face[0]} y={b.face[1]} mood={mood} />
      </g>
    </svg>
  );
}

/** 작은 매장 건물 일러스트 */
export function StoreArt({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 260 220" className={'store-art ' + className} aria-hidden="true">
      <ellipse cx="130" cy="206" rx="110" ry="9" fill={NAVY} opacity=".14" />
      <rect x="34" y="72" width="192" height="130" rx="10" fill="#FFF6EB" stroke={NAVY} strokeWidth={6} />
      <path d="M24 74 L44 30 H216 L236 74 Z" fill="#FD6731" stroke={NAVY} strokeWidth={6} strokeLinejoin="round" />
      <path d="M68 30 L58 74 M100 30 L96 74 M132 30 V74 M164 30 L168 74 M196 30 L206 74" stroke="#fff" strokeWidth={6} opacity=".9" />
      <path d="M24 74 Q46 96 68 74 Q90 96 112 74 Q134 96 156 74 Q178 96 200 74 Q222 96 236 74" fill="#FD6731" stroke={NAVY} strokeWidth={6} strokeLinejoin="round" />
      <rect x="54" y="112" width="70" height="56" rx="8" fill="#BFE3FF" stroke={NAVY} strokeWidth={5} />
      <path d="M64 124 L80 116" stroke="#fff" strokeWidth={5} strokeLinecap="round" />
      <rect x="146" y="112" width="56" height="90" rx="8" fill="#FFC93C" stroke={NAVY} strokeWidth={5} />
      <circle cx="190" cy="160" r="5" fill={NAVY} />
      <rect x="92" y="2" width="76" height="34" rx="10" fill={NAVY} />
      <text x="130" y="26" textAnchor="middle" fontSize="18" fontWeight="900" fill="#fff" fontFamily="Noto Sans KR, sans-serif">
        safe<tspan fill="#FFC93C">fix</tspan>
      </text>
    </svg>
  );
}

export function Sparkle({ className = '', color = '#FFC93C', size = 36 }: { className?: string; color?: string; size?: number }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={'sparkle ' + className} aria-hidden="true">
      <path d="M50 0 C55 35 65 45 100 50 C65 55 55 65 50 100 C45 65 35 55 0 50 C35 45 45 35 50 0Z" fill={color} />
    </svg>
  );
}
