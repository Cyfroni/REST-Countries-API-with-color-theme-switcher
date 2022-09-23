import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import "./App.scss";
import CountryTile from "./CountryTile";

export type Country = {
  name: string;
  population: number;
  region: string;
  capital: string[];
  flag: string;
};

export const countriesLoader = async () => {
  const response = await fetch(`https://restcountries.com/v3.1/all`);
  const data = await response.json();

  const countries = data.map((val: any) => ({
    name: val.name.common,
    population: val.population,
    region: val.region,
    capital: val.capital,
    flag: val.flags.svg,
  }));
  return { countries };
};

const REGIONS = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

function Countries() {
  const [region, setRegion] = useState("");
  const countries = (useLoaderData() as any).countries as Country[];
  const [countryFilter, setCountryFilter] = useState("");

  const countriesFiltered = countries
    .filter((c) => !region || c.region === region)
    .filter((c) =>
      c.name.toLowerCase().startsWith(countryFilter.toLowerCase())
    );

  return (
    <>
      <div className="actions">
        <div className="actions__search">
          <input
            type="text"
            placeholder="Search for a country..."
            value={countryFilter}
            onChange={(e) => setCountryFilter(e.target.value)}
          />
        </div>
        <div className="actions__select">
          <select
            name="regions"
            id="regions"
            onChange={(e) => setRegion(e.target.value)}
          >
            <option value="" hidden>
              Filter by Region
            </option>
            {REGIONS.map((val) => (
              <option value={val} key={val}>
                {val}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="countries">
        {countriesFiltered.map((c) => (
          <CountryTile country={c} key={c.name}></CountryTile>
        ))}
      </div>
    </>
  );
}

export default Countries;
