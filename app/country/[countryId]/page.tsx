import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Country } from "../../../interfaces";
import countriesServices from "../../../services/countries";

export default async function ({ params }: { params: { countryId: string } }) {
  const data = await countriesServices.fetchCountry(params.countryId);

  return (
    <main>
      {/* Your content here using countryData */}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}
