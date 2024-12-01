import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { EventCardForSmartphone, EventCategoryForSmartphone, filterEvents } from '../feature/event';
import type { Event } from '../feature/event';

export function EventBoardForSmartphone() {
  // イベントデータを管理するためのステート
  const [events, setEvents] = useState<Event[]>([]);
 
  // 初期イベントデータを取得
  useEffect(() => {
    const initialEvents = filterEvents();
    setEvents(initialEvents);
  }, []);

  // カテゴリ変更時に呼び出される関数
  const handleCategoryChange = (category: number) => {
    const filteredEvents = filterEvents(category);
    setEvents(filteredEvents);
  };

  // イベントリストを表示するコンポーネント
  const EventList = ({ events }: { events: Event[] }) => (
    <Box display="flex" flexDirection="column" flex="1" overflow="auto" mb="16px">
      {events.length > 0 ? (
        events.map((event, index) => <EventCardForSmartphone key={index} event={event} />)
      ) : (
        <Typography variant="body2" color="textSecondary">
          イベントはありません
        </Typography>
      )}
    </Box>
  );

  return (
    <Box display="flex" flexDirection="column" height="100vh" overflow="hidden">
      {/* カテゴリ選択コンポーネント */}
      <EventCategoryForSmartphone onCategoryChange={handleCategoryChange} />
      <Typography variant="h6" color="primary" mt="56px">
        イベント一覧
      </Typography>
      {/* イベントを表示するコンテナ */}
      <Box display="flex" flexDirection="column" overflow="auto">
        {/* 開催中のイベントを表示するコンテナ */}
        <EventList events={events} />
      </Box>
    </Box>
  );
}