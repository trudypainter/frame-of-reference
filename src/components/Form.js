import React, { useEffect } from "react";

const Form = ({ step, setStep }) => {
  return (
    <>
      {step === 1 && (
        <div className="text-center w-full h-screen flex justify-center items-center transition-opacity duration-3000 opacity-100">
          The form will go here.
        </div>
      )}
    </>
  );
};

export default Form;
