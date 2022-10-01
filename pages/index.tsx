import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import penPic from "../public/favicon.png";

import { words, AdjetiveResult } from "../services/airtable";

interface MuyData {
  results: AdjetiveResult[];
}

const Home: NextPage<MuyData> = ({ results }) => {
  console.log(results);

  return (
    <div className="flex h-screen justify-center items-center bg-gray-900">
      <div className="flex flex-col items-center mb-16 sm:text-center sm:mb-0">
        <Image src={penPic} alt="Pen Ilustration" width={50} height={50} />

        <p className="text-gray-400 text-center">
          Combine &quot;muy&quot; con un adjetivo simple y obtenga una forma más
          concisa del adjetivo.
        </p>

        <div className="flex space-around space-x-2 my-5 text-center font-bold">
          <p className="text-xl lg:text-4xl xl:text-5xl text-gray-500">muy</p>

          <p className="text-xl lg:text-4xl xl:text-5xl text-gray-500">+</p>

          <input
            id="input"
            placeholder="loading..."
            type="text"
            className="px-1 lg:text-4xl xl:text-5xl bg-gray-700"
          />

          <p className="text-xl lg:text-4xl xl:text-5xl">=</p>

          <p className="text-xl lg:text-4xl xl:text-5xl text-gray-500">
            loading...
          </p>
        </div>
      </div>

      <Head>
        <title>Pierde el Muy</title>
      </Head>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<MuyData> = async () => {
  return {
    props: { results: await words() },
  };
};

export default Home;
