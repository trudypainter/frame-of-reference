import Image from "next/image";
import Head from "next/head";
import TerminalSimulator from "@/components/Terminal";
import { useState } from "react";
import Form from "@/components/Form";

export default function Home() {
  // use state to keep track of the step of the user journey
  const [step, setStep] = useState(0);

  return (
    <>
      <Head>
        <title>Frame of Reference</title>
      </Head>
      <main
        className={`flex min-h-screen flex-col items-center justify-between  `}
      >
        <TerminalSimulator step={step} setStep={setStep} />
        {step === 1 && <Form step={step} setStep={setStep} />}
      </main>
    </>
  );
}
