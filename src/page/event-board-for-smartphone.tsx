import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { EventCardForSmartphone, EventCategoryForSmartphone, filterEvents } from '../feature/event';
import type { Event } from '../feature/event';

export function EventBoardForSmartphone() {
  // イベントデータを管理するためのステート
  const [ongoingEvents, setOngoingEvents] = useState<Event[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);

  // 初期イベントデータを取得
  useEffect(() => {
    const initialEvents = filterEvents();
    setOngoingEvents(initialEvents.filter(event => event.status === 0));
    setUpcomingEvents(initialEvents.filter(event => event.status === 1));
  }, []);

  // カテゴリ変更時に呼び出される関数
  const handleCategoryChange = (category: number) => {
    const filteredEvents = filterEvents(category);
    setOngoingEvents(filteredEvents.filter(event => event.status === 0));
    setUpcomingEvents(filteredEvents.filter(event => event.status === 1));
  };

  // イベントリストを表示するコンポーネント
  const EventList = ({ title, events }: { title: string; events: Event[] }) => (
    <Box display="flex" flexDirection="column" flex="1" overflow="auto" mb="16px">
      <Typography variant="h6" color="primary">
        {title}
      </Typography>
      {events.length > 0 ? (
        events.map((event, index) => <EventCardForSmartphone key={index} event={event} />)
      ) : (
        <Typography variant="body2" color="textSecondary">
          {title}はありません
        </Typography>
      )}
    </Box>
  );

  return (
    <Box display="flex" flexDirection="column" height="100vh" overflow="hidden">
      {/* カテゴリ選択コンポーネント */}
      <EventCategoryForSmartphone onCategoryChange={handleCategoryChange} />
      {/* イベントを表示するコンテナ */}
      <Box display="flex" flexDirection="column" mt="56px" p="16px" overflow="auto">
        {/* 開催中のイベントを表示するコンテナ */}
        <EventList title="開催中のイベント" events={ongoingEvents} />
        {/* 開催予定のイベントを表示するコンテナ */}
        <EventList title="開催予定のイベント" events={upcomingEvents} />
      </Box>
    </Box>
  );
}