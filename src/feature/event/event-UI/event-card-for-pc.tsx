import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { EventDetailsDialog } from './event-details-dialog';
import type { Event } from '../types';
import { categories } from '../event-category/event-category-list';

interface EventCardProps {
  event: Event;
}

// 外側のBoxコンポーネントのスタイル
const boxStyles = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  textAlign: 'left',
  color: 'black',
  width: '100%',
  padding: '16px',
  marginBottom: '16px',
  borderBottom: '1px solid #ddd',
  cursor: 'pointer', // クリック可能にするためのスタイル
};

const contentStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
};

const dateStyles = {
  textAlign: 'center',
  width: '80px',
  height: '80px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#ffeb3b',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
};

export function EventCardForPC({ event }: EventCardProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const categoryLabel = categories.find(category => category.value === event.category)?.label || '不明';

  return (
    <>
      <Box sx={boxStyles} onClick={handleOpenDialog}>
        <Box sx={contentStyles}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            {event.name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {categoryLabel}
          </Typography>
          <Typography variant="body1">
            {event.summary}
          </Typography>
        </Box>
        <Box sx={dateStyles}>
          <Typography variant="h4" component="div">
            {new Date(event.startDateTime).toLocaleDateString('ja-JP', { month: '2-digit', day: '2-digit' })}
          </Typography>
          <Typography variant="body2">
            {new Date(event.startDateTime).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}
          </Typography>
        </Box>
      </Box>
      {/* イベント詳細ダイアログ */}
      <EventDetailsDialog event={event} open={dialogOpen} onClose={handleCloseDialog} />
    </>
  );
}