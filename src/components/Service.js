import React, { useEffect, useState, useRef } from "react";

const Service = ({ step, setStep }) => {
  const questions = [
    "Describe the service you want to create.",
    "Who are the key players?",
    "What is your name?",
    "What is your email?",
  ];

  const [messages, setMessages] = useState([]);
  const [userAnswer, setUserAnswer] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [delayComplete, setDelayComplete] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);
  const [finalMessageTyped, setFinalMessageTyped] = useState(false);
  const [inputFadeIn, setInputFadeIn] = useState(false);
  const [manifestationClicked, setManifestationClicked] = useState(false);
  const inputRef = useRef(null);

  const handleUserAnswer = (event) => {
    if (event.key === "Enter") {
      console.log("enter");

      // if not final message typed
      if (!finalMessageTyped) {
        setInputFadeIn(false);
      }

      // if the user has typed the final message, then we don't want to do anything
      if (finalMessageTyped) {
        return;
      }

      setTypingComplete(false);
      setMessages((prev) => [...prev, { text: userAnswer, isUser: true }]);
      setUserAnswer("");
      setDelayComplete(false); // reset the delayComplete state
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion((prev) => prev + 1);
      }
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    if (!delayComplete) {
      const initialDelayId = setTimeout(() => {
        setDelayComplete(true);
      }, 100);

      return () => clearTimeout(initialDelayId);
    }

    if (typingComplete) {
      return;
    }

    const timerId = setTimeout(() => {
      if (typedText === questions[currentQuestion]) {
        setMessages((prev) => [
          ...prev,
          { text: questions[currentQuestion], isUser: false },
        ]);
        setTypingComplete(true);
        setTypedText("");
        setTimeout(() => {
          setInputFadeIn(true);
        }, 200);
      } else {
        setTypedText(
          (prevText) => prevText + questions[currentQuestion][prevText.length]
        );
      }
    }, 30);

    return () => clearTimeout(timerId);
  }, [delayComplete, typedText, currentQuestion]);

  const handleTextAreaChange = (event) => {
    setUserAnswer(event.target.value);
    // if the question is the last question, set the final message typed to true
    if (currentQuestion + 1 === questions.length) {
      setFinalMessageTyped(true);
    }
  };

  const handleManifestationClicked = () => {
    setManifestationClicked(true);
    setTimeout(() => {
      setStep(7);
    }, 3000);
  };

  return (
    <div className={`bg-black text-white w-[400px] pt-8 max-w-11/12 font-mono`}>
      <div
        className={`fixed top-0 left-0  w-screen bg-black
        transition-opacity duration-3000 
        ${manifestationClicked ? "opacity-100 h-screen" : "opacity-0 h-0"}
      `}
      ></div>
      {messages.map((message, index) => (
        <p
          key={index}
          className={message.isUser ? "text-gray-400 mt-1 mb-8" : ""}
        >
          {message.text}
        </p>
      ))}
      <p>{typedText} </p>
      {typingComplete && (
        <textarea
          type="text"
          placeholder="Type your answer here..."
          className={`text-gray-400 my-1 placeholder-gray-400 w-full 
          resize-none bg-black border-0 focus:outline-none caret-gray-200 
          transition-opacity duration-1000 ${
            inputFadeIn ? "opacity-100" : "opacity-0"
          }`}
          value={userAnswer}
          onChange={(e) => handleTextAreaChange(e)}
          onKeyDown={handleUserAnswer}
          ref={inputRef}
          autoFocus
        />
      )}
      {finalMessageTyped && (
        <div
          onClick={() => handleManifestationClicked()}
          className="border-2 p-4 hover:cursor-pointer hover:bg-gray-800 border-white text-center"
        >
          Send Manifestaion
        </div>
      )}
    </div>
  );
};

export default Service;
