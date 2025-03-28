// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Header from './components/Header';
import Question from './components/Question';
import Progress from './components/Progress';
import Results from './components/Results';
import { questions } from './data/questions';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(55 * 60); // 55 minutes in seconds

  useEffect(() => {
    if (timeRemaining > 0 && !showResults) {
      const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0) {
      setShowResults(true);
    }
  }, [timeRemaining, showResults]);

  const handleAnswerSelect = (questionId, answerIndex) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[questionId] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitExam = () => {
    setShowResults(true);
  };

  const handleRestartExam = () => {
    setSelectedAnswers([]);
    setCurrentQuestion(0);
    setShowResults(false);
    setTimeRemaining(55 * 60);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        {showResults ? (
          <Results 
            questions={questions}
            selectedAnswers={selectedAnswers}
            onRestart={handleRestartExam}
          />
        ) : (
          <>
            <Progress 
              current={currentQuestion + 1}
              total={questions.length}
              timeRemaining={timeRemaining}
            />
            <Question
              question={questions[currentQuestion]}
              selectedAnswer={selectedAnswers[currentQuestion]}
              onAnswerSelect={handleAnswerSelect}
              onNext={handleNextQuestion}
              onPrev={handlePrevQuestion}
              onSubmit={handleSubmitExam}
              isLastQuestion={currentQuestion === questions.length - 1}
            />
          </>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;