import React from "react";
import { Country } from "./App";

export default function CountryTile({ country }: { country: Country }) {
  return (
    <article className="country">
      <div className="country__flag">
        <img src={country.flag} alt="" />
      </div>
      <div className="country__details">
        <h2>{country.name}</h2>
        <p>
          <span>Population: </span>
          {country.population}
        </p>
        <p>
          <span>Region: </span>
          {country.region}
        </p>
        <p>
          <span>Capital: </span>
          {country.capital}
        </p>
      </div>
    </article>
  );
}