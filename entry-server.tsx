// 빌드 전용: 각 주소의 화면을 미리 HTML로 그려서, 자바스크립트를 실행하지 않는 검색봇·AI 크롤러도 전체 내용을 읽게 합니다.
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Shell } from './App';

export function render(url: string) {
  return renderToString(
    <StaticRouter location={url}>
      <Shell />
    </StaticRouter>,
  );
}
