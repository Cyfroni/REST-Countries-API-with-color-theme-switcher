import React from "react";
import { Link } from "react-router-dom";
import { Country } from "./Countries";
import "./CountryTile.scss";

type props = { country: Country };

export default function CountryTile({ country }: props) {
  return (
    <Link to={`countries/${country.name}`}>
      <article className="country-tile">
        <div className="country-tile__flag">
          <img src={country.flag} alt="" />
        </div>
        <div className="country-tile__details">
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
    </Link>
  );
}
