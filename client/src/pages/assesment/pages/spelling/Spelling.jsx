import React, { useState } from 'react'
import { questions } from './assets/questions/questions';
import SpellQuestion from './components/SpellQuestion';


const Spelling = () => {
  const [score, setScore] = useState(0);
  let user = JSON.parse(localStorage.getItem('user'))
  const [test, setTest] = useState({
    name: 'spell-test',
    category: 'Specific Language Impairment',
    score: score
  })
  const [start, setStart] = useState(false);
  const [question, setQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const size = questions.length;

  const startAssessment = () => {
    setStart(true);
  }

  const checkAnswer = (answer, correctAnswer) => {
    const correct = answer.toLowerCase() === correctAnswer.toLowerCase();
    if (correct) {
      setScore(score + 1);
    }
    console.log(score);
  }

  const finishTest = async () => {
    setShowResult(true);
    setTest({ ...test, score: score })
    const result = await fetch(`https://rose-upset-raven.cyclic.app/api/addTest/${user._id}`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json'
      },
      body: JSON.stringify(test),
    })
    const response = await result.json();
    console.log(response)
    setStart(false);
  }

  // calculate percentage of correct answers
  const percentage = (score / size) * 100;




  return (
    <>
      {(!start && !showResult) && <div style={{ marginTop: '200px' }}>
        <h1 className="heading">SPELLSCREEN: Free spelling test</h1>
        <div style={{ width: '50%', margin: '3rem auto', textAlign: "center" }}>
          <h3>Test your spelling skills</h3>
          <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            This is a free spelling test. You will be asked to spell out the words
            in the text. You will be given a short time to spell each word.
          </p>
          <p>
            You will be given a short time to spell each word. If you do not spell
            the word correctly, you will be given a chance to correct your spelling.
            If you do not spell the word correctly, you will be given a chance to
            correct your spelling.
          </p>
          <div style={{ margin: '2rem auto' }}><button className="grade" onClick={startAssessment} style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem' }}>Start</button></div>
        </div>
      </div>}
      {
        start && <SpellQuestion question={questions[question]} checkAnswer={checkAnswer} next={setQuestion} size={size} index={question} showResult={finishTest} />
      }
      {
        showResult && <div style={{ margin: '200px 0', display: 'flex', whiteSpace: 'nowrap', justifyContent: 'center' }}><h3>Your score is {percentage}%</h3></div>
      }
    </>
  );
}

export default Spelling
