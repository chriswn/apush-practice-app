import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Chip
} from '@mui/material';
import { CheckCircle, Cancel, RestartAlt } from '@mui/icons-material';

const Results = ({ questions, selectedAnswers, onRestart }) => {
  const correctAnswers = questions.reduce((count, question, index) => {
    return count + (selectedAnswers[index] === question.correctAnswer ? 1 : 0);
  }, 0);
  
  const percentage = Math.round((correctAnswers / questions.length) * 100);
  
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom align="center">
        Exam Results
      </Typography>
      
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h2" color={percentage >= 70 ? 'success.main' : 'error.main'}>
          {percentage}%
        </Typography>
        <Typography variant="subtitle1">
          {correctAnswers} out of {questions.length} correct
        </Typography>
      </Box>
      
      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Question</TableCell>
              <TableCell>Your Answer</TableCell>
              <TableCell>Correct Answer</TableCell>
              <TableCell>Skill</TableCell>
              <TableCell>Key Concept</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {questions.map((question, index) => {
              const isCorrect = selectedAnswers[index] === question.correctAnswer;
              return (
                <TableRow key={index}>
                  <TableCell>#{index + 1}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {isCorrect ? <CheckCircle color="success" /> : <Cancel color="error" />}
                      <Typography sx={{ ml: 1 }}>
                        {selectedAnswers[index] !== undefined 
                          ? question.options[selectedAnswers[index]] 
                          : 'Unanswered'}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{question.options[question.correctAnswer]}</TableCell>
                  <TableCell>
                    <Chip label={question.skill} size="small" />
                  </TableCell>
                  <TableCell>
                    <Chip label={question.keyConcept} size="small" variant="outlined" />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Box sx={{ textAlign: 'center' }}>
        <Button
          variant="contained"
          size="large"
          startIcon={<RestartAlt />}
          onClick={onRestart}
        >
          Restart Exam
        </Button>
      </Box>
    </Paper>
  );
};

export default Results;