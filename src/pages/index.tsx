import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <div className="col-span-7 lg:col-span-8 flex-col lg:grid lg:grid-cols-8 lg:flex-row overflow-scroll lg:overflow-hidden hidden">
        <div className="col-span-4 border-r-[2px] border-slate-100 dark:border-neutral-800" />
        <div className="col-span-4" />
      </div>
    </>
  );
}
