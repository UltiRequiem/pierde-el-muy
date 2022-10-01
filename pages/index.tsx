import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import penPic from "../public/favicon.png";

import { words, AdjetiveResult } from "../services/airtable";

interface MuyData {
  results: AdjetiveResult[];
}

const Home: NextPage<MuyData> = ({ results }) => {
  return (
    <div className="flex h-screen justify-center items-center bg-gray-900">
      <div className="flex flex-col items-center mb-16 sm:text-center sm:mb-0">
        <Image src={penPic} alt="Pen Ilustration" width={50} height={50} />

        <p className="text-gray-400 text-center">
          Combine &quot;muy&quot; con un adjetivo simple y obtenga una forma más
          concisa del adjetivo.
        </p>

        <div className="flex space-around space-x-2 my-5 text-center">
          <p className="font-bold text-xl sm:text-2xl  lg:text-4xl xl:text-5xl font-bold text-gray-500 font-serif">
            muy
          </p>

          <p className="font-bold text-xl sm:text-2xl  lg:text-4xl xl:text-5xl font-bold text-gray-500 font-serif">
            +
          </p>

          <input
            id="input"
            placeholder="loading..."
            type="text"
            className="border-b-2 font-sans text-xl sm:text-2xl lg:text-4xl xl:text-5xl font-bold transition duration-200 bg-gray-700 appearance-none focus:outline-none"
          />

          <p className="text-xl sm:text-4xl  lg:text-4xl xl:text-5xl font-bold">
            =
          </p>

          <div>
            <p className="text-xl sm:text-2xl  lg:text-4xl xl:text-5xl font-bold text-gray-500 font-serif">
              loading...
            </p>
          </div>
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
