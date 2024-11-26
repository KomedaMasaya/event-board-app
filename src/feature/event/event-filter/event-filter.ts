import eventData from '../event-data.json';
import { Event } from '../types';

// オーバーロードシグネチャ
// 引数なしの場合のシグネチャ
export function filterEvents(): Event[];
// 引数としてカテゴリ番号を受け取る場合のシグネチャ
export function filterEvents(category: number): Event[];

// 実装シグネチャ
// イベントをカテゴリで絞り込む関数
export function filterEvents(category?: number): Event[] {
  const now = new Date();

  // カテゴリでフィルタリング
  const filteredEvents = (eventData as Event[]).filter(event => {
    if (category !== undefined && category !== 0) {
      return event.category === category;
    }
    return true;
  });

  // 現在開催中のものとまだ開催されていないもののみフィルター
  const upcomingOrOngoingEvents = filteredEvents.filter(event => new Date(event.endDateTime) >= now);

  // イベントにstatusフィールドを追加
  const eventsWithStatus = upcomingOrOngoingEvents.map(event => {
    const status = new Date(event.startDateTime) <= now && now <= new Date(event.endDateTime) ? 0 : 1;
    return { ...event, status };
  });

  // イベントを年月日時順にソート
  eventsWithStatus.sort((a, b) => new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime());

  return eventsWithStatus;
}