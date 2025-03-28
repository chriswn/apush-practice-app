import React from 'react';
import { 
  Box, 
  LinearProgress, 
  Typography, 
  Chip 
} from '@mui/material';
import { AccessTime } from '@mui/icons-material';

const Progress = ({ current, total, timeRemaining }) => {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  
  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="subtitle1">
          Progress: {current} / {total}
        </Typography>
        <Chip 
          icon={<AccessTime />}
          label={`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}
          color="primary"
          variant="outlined"
        />
      </Box>
      <LinearProgress 
        variant="determinate" 
        value={(current / total) * 100} 
        sx={{ height: 8, borderRadius: 4 }}
      />
    </Box>
  );
};

export default Progress;