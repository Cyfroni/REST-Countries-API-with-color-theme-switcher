import React from "react";
import { useLoaderData } from "react-router-dom";
import { Country as Countrytype } from "./Countries";

export const countryLoader = async ({ params }) => {
  const response = await fetch(
    `https://restcountries.com/v3.1/name/${params.countryName}`
  );
  const data = await response.json();

  //   const countries = data.map((val: any) => ({
  //     name: val.name.common,
  //     population: val.population,
  //     region: val.region,
  //     capital: val.capital,
  //     flag: val.flags.svg,
  //   }));
  return { country: data };
};

export default function Country() {
  const country = (useLoaderData() as any).country[0];
  console.log(country);
  return <div>{country.name.common}</div>;
}
