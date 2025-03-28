import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Radio, 
  RadioGroup, 
  FormControlLabel, 
  FormControl, 
  Button, 
  Box,
  Divider
} from '@mui/material';
import { ArrowBack, ArrowForward, Send } from '@mui/icons-material';

const Question = ({ 
  question, 
  selectedAnswer, 
  onAnswerSelect, 
  onNext, 
  onPrev, 
  onSubmit, 
  isLastQuestion 
}) => {
  return (
    <Card elevation={3}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Question {question.id}
        </Typography>
        
        <Typography variant="body1" paragraph>
          {question.question}
        </Typography>
        
        {question.image && (
          <Box sx={{ my: 2, textAlign: 'center' }}>
            <img 
              src={question.image} 
              alt="Question context" 
              style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'contain' }}
            />
          </Box>
        )}
        
        <FormControl component="fieldset" sx={{ width: '100%', mt: 2 }}>
          <RadioGroup
            value={selectedAnswer !== undefined ? selectedAnswer : null}
            onChange={(e) => onAnswerSelect(question.id - 1, parseInt(e.target.value))}
          >
            {question.options.map((option, index) => (
              <FormControlLabel
                key={index}
                value={index}
                control={<Radio />}
                label={option}
                sx={{ 
                  my: 0.5,
                  borderRadius: 1,
                  bgcolor: selectedAnswer === index ? 'action.selected' : 'background.paper',
                  '&:hover': {
                    bgcolor: 'action.hover'
                  }
                }}
              />
            ))}
          </RadioGroup>
        </FormControl>
        
        <Divider sx={{ my: 3 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={onPrev}
            disabled={question.id === 1}
          >
            Previous
          </Button>
          
          {isLastQuestion ? (
            <Button
              variant="contained"
              color="primary"
              endIcon={<Send />}
              onClick={onSubmit}
            >
              Submit Exam
            </Button>
          ) : (
            <Button
              variant="contained"
              endIcon={<ArrowForward />}
              onClick={onNext}
            >
              Next
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default Question;