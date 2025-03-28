import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

// Add this to handleAnswerSelect
const saveProgress = async (userId, questionId, answerIndex) => {
  try {
    await setDoc(doc(db, 'users', userId, 'progress', questionId.toString()), {
      answer: answerIndex,
      timestamp: new Date()
    });
  } catch (error) {
    console.error("Error saving progress: ", error);
  }
};

// Call it when an answer is selected
const handleAnswerSelect = (questionId, answerIndex) => {
  const newAnswers = [...selectedAnswers];
  newAnswers[questionId] = answerIndex;
  setSelectedAnswers(newAnswers);
  
  if (auth.currentUser) {
    saveProgress(auth.currentUser.uid, questionId + 1, answerIndex);
  }
};