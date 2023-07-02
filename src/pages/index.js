import Image from "next/image";
import Head from "next/head";
import TerminalSimulator from "@/components/Terminal";

export default function Home() {
  return (
    <>
      <Head>
        <title>Frame of Reference</title>
      </Head>
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-24 `}
      >
        <TerminalSimulator />
      </main>
    </>
  );
}
