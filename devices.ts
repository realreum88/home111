import type { CharKind } from './components/Characters';

// 수리 기기와 항목. 바뀌면 여기만 고치면 메인·수리하기 화면에 함께 반영됩니다.
export const DEVICES: { id: string; name: string; kind: CharKind; tone: string; items: string[] }[] = [
  { id: 'iphone', name: '아이폰', kind: 'phone', tone: 'blue', items: ['화면', '카메라', '뒷면 깨짐', '배터리', '충전 안 됨'] },
  { id: 'ipad', name: '아이패드', kind: 'tablet', tone: 'peach', items: ['화면', '휘어짐', '전원 안 켜짐', '충전 불량', '배터리'] },
  { id: 'macbook', name: '맥북', kind: 'laptop', tone: 'yellow', items: ['화면', '키보드', '배터리', '충전 불량'] },
  { id: 'watch', name: '애플워치', kind: 'watch', tone: 'lilac', items: ['화면', '뒷면 깨짐', '배터리'] },
];

export const deviceById = (id?: string) => DEVICES.find((d) => d.id === id || (id === 'display' && d.id === 'iphone'));
