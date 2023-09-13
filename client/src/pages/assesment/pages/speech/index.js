import React, { useState } from 'react';

function SpeechToTextConverter() {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  
  const handleListen = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Your browser doesn't support speech recognition");
    } else {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      
      recognition.onstart = () => {
        setIsListening(true);
      };
      
      recognition.onresult = event => {
        const resultIndex = event.resultIndex;
        const transcript = event.results[resultIndex][0].transcript;
        setTranscript(transcript);
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognition.onerror = event => {
        console.error(event);
      };
      
      recognition.start();
    }
  };
  
  return (
    <div style={{margin:'100px'}}>

      <button onClick={handleListen}>{isListening ? 'Stop' : 'Start'}</button>
      <p>{transcript}</p>
    </div>
  );
}

export default SpeechToTextConverter;