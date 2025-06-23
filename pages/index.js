
import Head from 'next/head';
import TennisAttendance from './tennis';

export default function Home() {
  return (
    <>
      <Head>
        <title>טניס יום שני</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <TennisAttendance />
      </main>
    </>
  );
}
