import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { EventCardForPC, EventCategory, filterEvents, EventPickup } from '../feature/event';
import type { Event } from '../feature/event';

export function EventBoardForPC() {
  // イベントデータを管理するためのステート
  const [ongoingEvents, setOngoingEvents] = useState<Event[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // 初期イベントデータを取得
  useEffect(() => {
    const initialEvents = filterEvents();
    setOngoingEvents(initialEvents.filter(event => event.status === 0));
    setUpcomingEvents(initialEvents.filter(event => event.status === 1));
    if (initialEvents.length > 0) {
      setSelectedEvent(initialEvents[Math.floor(Math.random() * initialEvents.length)]);
    }
  }, []);

  // カテゴリ変更時に呼び出される関数
  const handleCategoryChange = (category: number) => {
    const filteredEvents = filterEvents(category);
    setOngoingEvents(filteredEvents.filter(event => event.status === 0));
    setUpcomingEvents(filteredEvents.filter(event => event.status === 1));
    if (filteredEvents.length > 0) {
      setSelectedEvent(filteredEvents[Math.floor(Math.random() * filteredEvents.length)]);
    } else {
      setSelectedEvent(null);
    }
  };

  // イベントリストを表示するコンポーネント
  const EventList = ({ title, events }: { title: string; events: Event[] }) => (
    <Box display="flex" flexDirection="column" flex="1" overflow="auto" mb="16px">
      {events.length > 0 ? (
        events.map((event, index) => <EventCardForPC key={index} event={event} />)
      ) : (
        <Typography variant="body2" color="textSecondary">
          {title}はありません
        </Typography>
      )}
    </Box>
  );

  return (
    <Box display="flex" height="100vh" overflow="hidden">
      {/* カテゴリ選択コンポーネント */}
      <EventCategory onCategoryChange={handleCategoryChange} />
      {/* イベントを表示するコンテナ */}
      <Box display="flex" flexDirection="column" ml="20%" p="16px" width="80%" height="100vh" overflow="hidden">
        {/* ランダムにピックアップされたイベントを表示 */}
        {selectedEvent && <EventPickup event={selectedEvent} />}
        <Box display="flex" >
          <Box display="flex"  width="50%" >
            <Typography variant="h6" color="primary">
              開催中のイベント
            </Typography>
          </Box>
          <Box display="flex"  width="50%" >
            <Typography variant="h6" color="primary">
              開催予定のイベント
            </Typography>
          </Box>
        </Box>
        <Box display="flex" flexDirection="row" overflow="auto">
          {/* 開催中のイベントを表示するコンテナ */}
          <EventList title="開催中のイベント" events={ongoingEvents} />
          {/* 開催予定のイベントを表示するコンテナ */}
          <EventList title="開催予定のイベント" events={upcomingEvents} />
        </Box>
      </Box>
    </Box>
  );
}