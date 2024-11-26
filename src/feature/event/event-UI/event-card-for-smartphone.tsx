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
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  textAlign: 'left',
  color: 'black',
  width: '100%',
  padding: '8px',
  marginBottom: '8px',
  borderBottom: '1px solid #ddd',
  cursor: 'pointer', // クリック可能にするためのスタイル
};

const contentStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  width: '100%',
};

const dateCategoryContainerStyles = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  marginTop: '8px',
};

const dateStyles = {
  textAlign: 'center',
  flex: 1,
  marginLeft: '8px',
};

const categoryStyles = {
  flex: 1,
};

export function EventCardForSmartphone({ event }: EventCardProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  function handleOpenDialog() {
    setDialogOpen(true);
  }

  function handleCloseDialog() {
    setDialogOpen(false);
  }

  const categoryLabel = categories.find(category => category.value === event.category)?.label || '不明';

  return (
    <>
      <Box sx={boxStyles} onClick={handleOpenDialog}>
        <Box sx={contentStyles}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            {event.name}
          </Typography>
          <Box sx={dateCategoryContainerStyles}>
            <Typography variant="body2" color="textSecondary" sx={categoryStyles}>
              {categoryLabel}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={dateStyles}>
              {new Date(event.startDateTime).toLocaleString('ja-JP', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}
            </Typography>
          </Box>
        </Box>
      </Box>
      {/* イベント詳細ダイアログ */}
      <EventDetailsDialog event={event} open={dialogOpen} onClose={handleCloseDialog} />
    </>
  );
}