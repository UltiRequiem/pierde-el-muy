import Airtable from "airtable";
import { useEffect, useState } from "react";
import randomItem from "random-item";

export default function Home({ results }) {
  const [adjetive, setAdjetive] = useState({
    standard: "confundido",
    magnified: "perplejo",
  });

  useEffect(() => setAdjetive(randomItem(results)), [results]);

  return (
    <h1 className="text-3xl font-bold underline">
      {" "}
      muy + {adjetive.standard} = {adjetive.magnified}
    </h1>
  );
}

export async function getServerSideProps() {
  Airtable.configure({
    endpointUrl: "https://api.airtable.com",
    apiKey: process.env.API_KEY,
  });

  const view = "production";

  const base = Airtable.base(process.env.API_BASE);

  const response = await base(view).select({ view }).all();

  const results = response.map((data) => data.fields);

  return {
    props: { results },
  };
}
