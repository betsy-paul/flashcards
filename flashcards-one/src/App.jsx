import './App.css';
import whale from './assets/whale+fish.png';
import digipoainr from './assets/digipoainr.png';
import image from './assets/image.png';
import image2 from './assets/image2.png';
import image3 from './assets/image3.png';
import image4 from './assets/image4.png';

import {useState, useRef} from 'react';



// // also: 
// import React from 'react';
// const [count, setCount] = React.useState(0);
// // is the same as
// import { useState } from 'react';
// const [count, setCount] = useState(0);


const App = () => {

  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const toggleFlip = () => setFlipped(!flipped);
  const [selected, setSelected] = useState(null);
  const [guessString, setGuessString] = useState('');
  const inputRef = useRef();
  const [feedback, setFeedback] = useState('');
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);

  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const quizData = [
  { img: whale, answer: 'AI' , 
    info: 'This image was gotten from the internet, and took about 2 minutes to create.' , 
    className: "quiz-image"},
  { img: digipoainr, answer: 'Human' , 
    info: 'This image was created in 2021, the artist is a Reddit user but has now deleted their account',
    className: "quiz-image"},
  { img: image, answer: 'Human', 
    info: 'Credits for this image go to an Alexei Vladimirovich Shevchuk',
    className: "quiz-image"},
  { img: image3, answer: 'AI' , 
    info: 'Notice the glossiness of the image? This is a common trait of AI generated images.', 
    className: "quiz-image"},
  { img: image2, answer: 'Human', 
    info: 'The artist goes by the name of "Peijin Yang". Notice a watermark anywhere?',
    className: "quiz-image"},
  { img: image4, answer: 'AI' , className: "quiz-image",
    info: 'This image was created in less than 10 minutes (including the watermark), notice the blended fingers? do not be fooled by the water mark. of course this one is obvious, but AI is notoriously bad at limbs and fingers.',
  },
  ];

  const [shuffledQuizData, setShuffledQuizData] = useState(() => shuffleArray(quizData));

  const [answeredFlags, setAnsweredFlags] = useState(Array(quizData.length).fill(false));

  const endings = {
    isFirst: index === 0,
    isLast: index === shuffledQuizData.length - 1,
  };

  const answer = (userGuess) => {
    setSelected(userGuess);

    if (answeredFlags[index]) {
      return; // Prevent multiple answers
    }
    
    const updatedFlags = [...answeredFlags];
    updatedFlags[index] = true;
    setAnsweredFlags(updatedFlags);
    // Set anweredflags to true to prevent answerung again
    
    if (shuffledQuizData[index].answer === userGuess) {
      setScore(score + 1);
      setStreak((prev) => {
        const nextStreak = prev + 1;
        setMaxStreak((max) => Math.max(max, nextStreak));
        return nextStreak;
      });
      } else {
      setStreak(0);
  }
  };

  const next = () => {
    if (index < shuffledQuizData.length -1) { // disabled should catch everything else tbh
      const nextI = index + 1;
      setIndex(nextI);
      setFlipped(false);
      setSelected(null); // Reset selected answer for the next question
      setGuessString(''); // Reset guess string
      setFeedback(''); // Reset feedback
    } else {
      setShowResult(true);
      setGuessString(''); // Reset guess string
      setFeedback(''); // Reset feedback
    }
  };

  const previous = () => {
    const previousI = index - 1;
    if (previousI < 0) {
      setIndex(0);
      setFlipped(false);
      setSelected(null); // Reset selected answer for the previous question
      setGuessString(''); // Reset guess string
      setFeedback(''); // Reset feedback
    } else {
      setIndex(previousI);
      setFlipped(false);
      setGuessString(''); // Reset guess string
      setFeedback(''); // Reset feedback
    }
  };

  const evalGuess = (guessString) => {
    guessString = guessString.trim().toLowerCase();
    if (guessString === 'ai') {
      answer('AI');
    } else if (guessString === 'human') {
      answer('Human');
    } else {
      setFeedback('Invalid guess. Please guess "AI" or "Human".');
    }
  };

  return (!showResult ? (
    <>
    <div className="header">
      <h1> Art Detective </h1>
      <h4> With the rise of AI in creative spaces, how well can you spot if an image is man-made or AI generated? <br></br>
        Stuck? Click on the image for a hint! <br></br>
        Total Questions: {shuffledQuizData.length}
      </h4>

      <h2> Score: {score}</h2>
      <h4> Streak: {streak} (Max: {maxStreak})</h4>

    </div>

    <div>
      <input
        type="text"
        name="searchBar"
        id="guessBar"
        placeholder="AI or Human?"
        value={guessString}
        color="black"
        onChange={(e) => setGuessString(e.target.value)}
        ref={inputRef}
      />

      <button onClick={() => evalGuess(inputRef.current.value)} disabled={answeredFlags[index]}>
        Submit
      </button>
    </div>


    <div className="flashcard-container" onClick={toggleFlip}>
      <div className={`flashcard ${flipped ? 'flipped' : ''}`}>
        <div className="flashcard-face front">
          <img
            src={shuffledQuizData[index].img}
            alt="Flashcard"
            className="quiz-image"
          />
        </div>
        <div className="flashcard-face back">
          <p>{shuffledQuizData[index].info}</p>
        </div>
      </div>
    </div>

    {answeredFlags[index] && selected && (
      <div className="feedback-text">
        You answered: {selected}. That is {shuffledQuizData[index].answer === selected ? 'correct!' : 'incorrect.'}
      </div>
    )}

    {feedback && <div className="feedback-text invalid">{feedback}</div>}

      <div className="button-group">
        <button onClick={() => answer('AI')} disabled={answeredFlags[index]}> AI
        </button>

        <button onClick={() => answer('Human')} disabled={answeredFlags[index]}>Human</button>
      </div>

      <div className="footer">
          {!endings.isFirst && (
          <button onClick={previous}>Previous</button>
        )}

        {!endings.isLast ? (
          <button onClick={next}>Next</button>
          ) : (
          <button onClick={() => setShowResult(true)}>Submit</button>
        )}

        <button onClick={() => {
            setShuffledQuizData(shuffleArray(quizData));
            setIndex(0);
            setScore(0);
            setShowResult(false);
            setFlipped(false);
            setAnsweredFlags(Array(shuffledQuizData.length).fill(false)); // Reset answered flags
            setSelected(null); // Reset selected answer
            setGuessString(''); // Reset guess string
            setFeedback(''); // Reset feedback
            setStreak(0); // Reset streak
            setMaxStreak(0); // Reset max streak
          }}>
            Restart
        </button>

      </div>
    </>
  ) : (
    <>
      <h2>Your Score: {score} / {shuffledQuizData.length} </h2>
      <button onClick={() => {
        setShuffledQuizData(shuffleArray(quizData));
        setIndex(0);
        setScore(0);
        setShowResult(false);
        setFlipped(false);
        setAnsweredFlags(Array(shuffledQuizData.length).fill(false)); // Reset answered flags
        setSelected(null); // Reset selected answer
        setGuessString(''); // Reset guess string
        setFeedback(''); // Reset feedback
        setStreak(0); // Reset streak
        setMaxStreak(0); // Reset max streak
      }}>
        Restart?
      </button>
    </>
  ))
}


export default App