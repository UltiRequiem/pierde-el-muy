import { useEffect, useState } from "react";
import randomItem from "random-item";
import { words, AdjetiveResult } from "../services/airtable";

import { GetServerSideProps, NextPage } from "next";

interface Data {
  results: AdjetiveResult[];
}

const Home: NextPage<Data> = ({ results }) => {
  const [adjetive, setAdjetive] = useState({
    standard: "confundido",
    magnified: "perplejo",
  });

  const [input, setInput] = useState("");

  const findMagnified = (simple: string) => {
    return results.find((obj) => obj.standard === simple)?.magnified ?? "";
  };

  useEffect(() => setAdjetive(randomItem(results)), [results]);

  return (
    <div className="">
      <h1 className="text-xl text-orange-900">trabajo en proceso</h1>
      <p>
        Combine &quot;muy&quot; con un adjetivo simple y obtenga un adjetivo
        conciso.
      </p>
      <h1 className="text-3xl font-bold underline">
        {" "}
        muy + {adjetive.standard} = {adjetive.magnified}
      </h1>
      ingresa tu busqueda <br />
      <input placeholder="rapido" onChange={(e) => setInput(e.target.value)} />
      <div></div>
      {input && <p>{findMagnified(input)}</p>}
      <a href="https://airtable.com/shr1Y5Mclp3WcVXoH">
        <button
          className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          type="button"
        >
          Actualiza la base de datos.
        </button>
      </a>
      <button
        className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        onClick={() => window.location.reload()}
        type="button"
      >
        Random
      </button>
      <div></div>
      todo
      <ul>
        <li>order html</li>
        <li>fuzzy finder</li>
        <li>input + initial load same place</li>
        <li>pretify</li>
      </ul>
      <footer className="bg-blue-500 text-lg">Eliaz Bobadilla 2022</footer>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Data> = async () => {
  return {
    props: { results: await words() },
  };
};

export default Home;
