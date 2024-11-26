import { Dialog, DialogTitle, DialogContent, Typography, Link } from '@mui/material';
import { categories } from '../event-category/event-category-list';
import type { Event } from '../types';

interface EventDetailsDialogProps {
  event: Event;
  open: boolean;
  onClose: () => void;
}

export function EventDetailsDialog({ event, open, onClose }: EventDetailsDialogProps) {
  if (!event) return null;

  const categoryLabel = categories.find(category => category.value === event.category)?.label || '不明';

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{event.name}</DialogTitle>
      <DialogContent>
        <Typography variant="body1" sx={{ marginBottom: '16px' }}>カテゴリ: {categoryLabel}</Typography>
        <Typography variant="body1" sx={{ marginBottom: '16px' }}>
          開催期間: {new Date(event.startDateTime).toLocaleString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })} 〜 {new Date(event.endDateTime).toLocaleString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: '16px' }}>概要: {event.summary}</Typography>
        <Typography variant="body2" color="textSecondary" component="div" sx={{ marginBottom: '16px' }}>
          {event.description.split('\n').map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </Typography>
        {/* リンクが存在する場合のみ表示 */}
        {event.link && (
          <Typography color="textSecondary" sx={{ marginTop: '16px' }}>
            リンク: <Link href={event.link} target="_blank" rel="noopener">{event.linkName}</Link>
          </Typography>
        )}
      </DialogContent>
    </Dialog>
  );
}