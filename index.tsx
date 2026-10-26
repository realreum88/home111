import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
// 예전 주소(/#/cases 등)로 들어오면 새 주소(/cases)로 바꿔줍니다.
if (location.hash.startsWith('#/')) history.replaceState(null, '', location.hash.slice(1));
createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);
