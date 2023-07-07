import React, { useEffect, useState, useRef } from "react";

const Form = ({ step, setStep }) => {
  const introductionText = `What will you create?`;

  const [typedText, setTypedText] = useState("");
  const [buttonVisible, setButtonVisible] = useState(false);
  const [delayComplete, setDelayComplete] = useState(false);
  const currentTextIndex = useRef(0);

  useEffect(() => {
    // Initial delay of 3 seconds before typing starts
    const initialDelayId = setTimeout(() => {
      setDelayComplete(true); // Set delay as complete
    }, 1000); // 1 second delay

    return () => clearTimeout(initialDelayId); // Clear timeout on unmount
  }, []);

  useEffect(() => {
    if (!delayComplete) return; // Don't do anything if the initial delay isn't complete

    let timeoutLength = 30; // Speed up when deleting

    const timerId = setTimeout(() => {
      if (typedText === introductionText) {
        setButtonVisible(true); // Set the button as visible
      } else {
        setTypedText(
          (prevText) => prevText + introductionText[prevText.length]
        ); // Increase the length of the text
      }
    }, timeoutLength);

    return () => clearTimeout(timerId); // Clear timeout on unmount
  }, [delayComplete, typedText, introductionText]);

  return (
    <>
      <div
        className={`fixed h-screen w-full p-12 flex  items-center flex-col  `}
      >
        <div className="bg-black text-white w-[400px] pt-8 max-w-11/12 font-mono">
          <p>{typedText}</p>
          <p className="text-green-400">_</p>
        </div>

        <div
          className={`flex flex-wrap max-w-11/12 w-[400px] mt-24 justify-center space-x-4 font-mono transition-opacity duration-3000 ${
            buttonVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="hover:cursor-pointer hover:bg-gray-800 p-4 my-2 border-2 border-white">
            Product
          </div>
          <div className="hover:cursor-pointer hover:bg-gray-800 p-4 my-2 border-2 border-white">
            Service
          </div>
          <div className="hover:cursor-pointer hover:bg-gray-800 p-4 my-2 border-2 border-white">
            API
          </div>
          <div className="hover:cursor-pointer hover:bg-gray-800 p-4 my-2 border-2 border-white">
            Invention
          </div>
          <div className="hover:cursor-pointer hover:bg-gray-800 p-4 my-2 border-2 border-white">
            Solution
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
