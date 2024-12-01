import { Box, Typography, Paper, Link } from '@mui/material';
import { useState } from 'react';
import { EventDetailsDialog } from './event-details-dialog';
import type { Event } from '../types';
import { categories } from '../event-category/event-category-list';

interface EventPickupProps {
  event: Event;
}

const boxStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  textAlign: 'left',
  color: 'black',
  width: '100%',
  padding: '24px',
  marginBottom: '24px',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  cursor: 'pointer', // クリック可能にするためのスタイル
};

const headerStyles = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  marginBottom: '16px',
};

const dateContainerStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '100%',
  marginTop: '16px',
};

export function EventPickup({ event }: EventPickupProps) {
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
      <Paper sx={boxStyles} onClick={handleOpenDialog}>
        <Box sx={headerStyles}>
          <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: '#333', flex: 1 }}>
            {event.name}
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ marginLeft: '16px', color: '#666', fontSize: '1.2rem' }}>
            {categoryLabel}対応
          </Typography>
        </Box>
        <Box sx={dateContainerStyles}>
          <Box>
            <Typography component="div" sx={{ fontWeight: 'bold', color: '#333' }}>
              開催期間 {new Date(event.startDateTime).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })} {new Date(event.startDateTime).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })} 〜 {new Date(event.endDateTime).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })} {new Date(event.endDateTime).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}
            </Typography>
          </Box>
        </Box>
        <Link href={event.link} target="_blank" rel="noopener" sx={{ marginTop: '8px', color: '#1e88e5', fontWeight: 'bold' }}>
          {event.linkName}
        </Link>
      </Paper>
      {/* イベント詳細ダイアログ */}
      <EventDetailsDialog event={event} open={dialogOpen} onClose={handleCloseDialog} />
    </>
  );
}