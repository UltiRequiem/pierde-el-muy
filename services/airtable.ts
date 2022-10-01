import Airtable from "airtable";
import { AssertionError } from "assert";

Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.API_KEY,
});

const view = "production";

const base = Airtable.base(process.env.API_BASE);

const assertIsAdjetiveResult = (data: unknown[]): data is AdjetiveResult[] => {
  for (const result of data) {
    if (typeof result !== "object") {
      return false;
    }
  }

  return true;
};

export async function words(): Promise<AdjetiveResult[]> {
  const response = await base(view).select({ view }).all();

  const fields = response.map(({ fields: { standard, ...rest } }) => {
    return {
      standard,
      magnifieds: Object.values(rest),
    };
  });

  if (!assertIsAdjetiveResult(fields)) {
    throw new AssertionError({
      message: "The structure got from Airtable is incorrect.",
    });
  }

  return fields;
}

export interface AdjetiveResult {
  standard: string;
  magnifieds: string[];
}
