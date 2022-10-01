import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import randomItem from "random-item";
import { useEffect, useState } from "react";
import penPic from "../public/favicon.png";

import { AdjetiveResult, words } from "../services/airtable";

interface MuyData {
  results: AdjetiveResult[];
}

const notAddedYet = "Aún no agregado";
const loading = "loading...";

const Home: NextPage<MuyData> = ({ results }) => {
  const [input, setInput] = useState(loading);
  const [adjetive, setAdjetive] = useState(loading);

  useEffect(() => {
    if (!results) {
      return;
    }

    const random = randomItem(results);

    setInput(random.standard);
    setAdjetive(randomItem(random.magnifieds));
  }, [results]);

  const findMagnified = (word: string) => {
    const result = results.find((obj) => obj.standard === word);

    if (!result) {
      return undefined;
    }

    return randomItem(result.magnifieds);
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-900">
      <div className="flex flex-col items-center">
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
            placeholder={input}
            onInput={({ target }) => {
              const { value } = target as HTMLInputElement;

              setInput(value);

              const result = findMagnified(value);

              result ? setAdjetive(result) : setAdjetive(notAddedYet);
            }}
            type="text"
            className="px-1 lg:text-4xl xl:text-5xl bg-gray-700"
          />

          <p className="text-xl lg:text-4xl xl:text-5xl">=</p>

          <p
            className={`text-xl lg:text-4xl xl:text-5xl ${
              adjetive === notAddedYet ? "text-red-900" : "text-gray-500"
            }`}
          >
            {adjetive}
          </p>
        </div>

        <div>
          <button
            type="button"
            onClick={() => {
              const result = findMagnified(input);

              result ? setAdjetive(result) : setAdjetive(notAddedYet);
            }}
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Obtener/Actualizar resultado
          </button>
          <button
            type="button"
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            onClick={() => {
              const random = randomItem(results);

              setInput(random.standard);
              setAdjetive(randomItem(random.magnifieds));
            }}
          >
            Aleatorio
          </button>
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
