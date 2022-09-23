import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import { Country as Countrytype } from "./Countries";

export const countryLoader = async ({ params }) => {
  let response = await fetch(
    `https://restcountries.com/v3.1/name/${params.countryName}`
  );
  if (!response.ok) {
    response = await fetch(
      `https://restcountries.com/v3.1/alpha/${params.countryName}`
    );
  }

  const data = (await response.json())[0];
  const country = {
    name: data.name.common,
    officialName: data.name.official,
    population: data.population,
    region: data.region,
    subregion: data.subregion,
    capital: data.capital,
    flag: data.flags.svg,
    tld: data.tld,
    currencies: Object.values(data.currencies).map((c) => c.name),
    languages: Object.values(data.languages),
    neighbours: data.borders,
  };
  return { country };
};

export default function Country() {
  const country = (useLoaderData() as any).country;
  return (
    <div>
      <h2>{country.name}</h2>
      <p>{country.officialName}</p>
      <p>{country.population}</p>
      <p>{country.region}</p>
      <p>{country.subregion}</p>
      <p>{country.capital}</p>
      <p>{country.tld}</p>
      <p>{country.currencies}</p>
      <p>{country.languages}</p>
      <ul>
        {country.neighbours.map((n) => (
          <li key={n}>
            <Link to={`/countries/${n}`}>{n}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
