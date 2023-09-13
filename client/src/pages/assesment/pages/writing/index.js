import React, { useState } from "react";
import { randomPara } from "./data";

const Writing = () => {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  let user = JSON.parse(localStorage.getItem("user"));
  let rand = Math.floor(Math.random() * 5);
  const [res, setres] = useState(null);
  const [para, setPara] = useState(randomPara[rand]);
  const recognitionRef = React.useRef();
  const [test, setTest] = useState({
    name: "speech",
    category: "language and verbal ability",
    score: 0,
  });

  const calculateMatchPercentage = ()=> {
    const words1 = para.split(" ");
    const words2 = transcript.split(" ");
    let matchCount = 0;

     words1.forEach((word1) => {
      if (words2.includes(word1)) {
        matchCount++;
      }
    });
    const matchPercentage =  (matchCount / words1.length) * 100;
    setTest({ ...test, score : matchPercentage.toFixed(2)});
    return matchPercentage;
  }

  const handleListen = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Your browser doesn't support speech recognition");
    } else {
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onstart = () => {
        setIsListening(true);
      };

      recognitionRef.current.onresult = (event) => {
        let interimTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            setTranscript(
              (prevTranscript) => prevTranscript + result[0].transcript
            );
          } else {
            interimTranscript += result[0].transcript;
          }
        }
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error(event);
      };

      recognitionRef.current.start();
    }
  };

  const handleStop = () => {
    recognitionRef.current.stop();
    setIsListening(false);
  };

  const handleSubmit = async () => {
    setres(calculateMatchPercentage().toFixed(2));

    const response = await fetch(
      `https://rose-upset-raven.cyclic.app/api/addTest/${user._id}`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify(test),
      }
    );
    const result = await response.json();
    console.log(result);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "200px",
        }}
      >
        <div className="m-5">{para}</div>
      </div>
      <div style={{ textAlign: "center" }}>
        <button
          className="btn btn-primary-outline"
          onClick={handleListen}
          disabled={isListening}
        >
          {isListening ? "Listening..." : "Start"}
        </button>
        <button
          className="btn btn-primary-outline"
          onClick={handleStop}
          disabled={!isListening}
        >
          Stop
        </button>
        <p className="mt-2 mb-2">{transcript}</p>
        <button onClick={handleSubmit} className="btn btn-primary mt-2 mb-2">
          Submit
        </button>
        <h1>{res}</h1>
      </div>
    </>
  );
};

export default Writing;
