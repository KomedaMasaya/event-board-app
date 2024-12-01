import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { CssBaseline } from '@mui/material';
import { EventBoardForPC } from './page/event-board-for-pc';
import { EventBoardForSmartphone } from './page/event-board-for-smartphone';
import './main.css';
import styled from 'styled-components';

const AppContainer = styled.div`
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [loading, setLoading] = useState(true); // アニメーションの状態を管理

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // ページロード時に3秒後にアニメーションを終了させる
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500);

    window.addEventListener('resize', handleResize);
    
    // クリーンアップ
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AppContainer>
      {loading ? (
        <div className="loading-screen">
          <div className="loading-title">
            <span className="letter">イ</span>
            <span className="letter">ベ</span>
            <span className="letter">ン</span>
            <span className="letter">ト</span>
            <span className="letter">ボ</span>
            <span className="letter">ー</span>
            <span className="letter">ド</span>
            <span className="letter small">f</span>
            <span className="letter small">o</span>
            <span className="letter small">r</span>
            <span className="letter small">V</span>
            <span className="letter small">R</span>
            <span className="letter small">C</span>
          </div>
        </div>
      ) : (
        <div>
          {isMobile ? <EventBoardForSmartphone /> : <EventBoardForPC />}
        </div>
      )}
    </AppContainer>
  );

}


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CssBaseline />
    <App />
  </StrictMode>,
);