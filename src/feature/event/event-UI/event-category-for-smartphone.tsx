import { Box, Button, Divider } from '@mui/material';
import { useState } from 'react';
import { categories } from '../event-category/event-category-list';

interface EventCategoryProps {
  onCategoryChange: (value: number) => void;
}

export function EventCategoryForSmartphone({ onCategoryChange }: EventCategoryProps) {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const handleCategoryClick = (value: number) => {
    setSelectedCategory(value);
    onCategoryChange(value);
  };

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="stretch"
      width="100%"
      sx={{
        position: 'fixed',
        left: 0,
        top: 0,
        height: 'auto',
        width: '100%',
        backgroundColor: '#f5f5f5',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
      }}
    >
      {/* カテゴリリストをループしてボタンを生成 */}
      {categories.map((category, index) => (
        <Box key={category.value} flex="1" display="flex">
          <Button
            variant={selectedCategory === category.value ? 'contained' : 'outlined'}
            onClick={() => handleCategoryClick(category.value)}
            sx={{ width: '100%', height: '56px', border: 'none', borderRadius: 0 ,fontSize: 'clamp(0.7rem, 2.5vw, 1.2rem)',padding: '0 8px'}}
          >
            {category.label}
          </Button>
          {index < categories.length - 1 && (
            <Divider orientation="vertical" flexItem />
          )}
        </Box>
      ))}
    </Box>
  );
}