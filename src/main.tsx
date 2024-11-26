import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { CssBaseline } from '@mui/material';
import { EventBoardForPC } from './page/event-board-for-pc';
import { EventBoardForSmartphone } from './page/event-board-for-smartphone';
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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <AppContainer>
      {isMobile ? <EventBoardForSmartphone /> : <EventBoardForPC />}
    </AppContainer>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CssBaseline />
    <App />
  </StrictMode>,
);