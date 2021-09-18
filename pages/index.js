import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Pinnacle Project</title>
        <meta name="description" content="Built at Pinnacle 2021" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-7xl text-green-500 font-extrabold">Hello World</h1>
    </div>
  );
}
