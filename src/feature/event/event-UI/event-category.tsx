import { Box, Button, Divider } from '@mui/material';
import { useState } from 'react';
import { categories } from '../event-category/event-category-list';

interface EventCategoryProps {
  onCategoryChange: (value: number) => void;
}

export function EventCategory({ onCategoryChange }: EventCategoryProps) {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const handleCategoryClick = (value: number) => {
    setSelectedCategory(value);
    onCategoryChange(value);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="stretch"
      width="20%"
      sx={{
        position: 'fixed',
        left: 0,
        top: 0,
        height: '100vh',
        backgroundColor: '#f5f5f5',
        boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* カテゴリリストをループしてボタンを生成 */}
      {categories.map((category, index) => (
        <Box key={category.value} width="100%" flex="1">
          <Button
            variant={selectedCategory === category.value ? 'contained' : 'outlined'}
            onClick={() => handleCategoryClick(category.value)}
            sx={{ width: '100%', height: '100%', border: 'none', borderRadius: 0 }}
          >
            {category.label}
          </Button>
          {index < categories.length - 1 && <Divider />}
        </Box>
      ))}
    </Box>
  );
}