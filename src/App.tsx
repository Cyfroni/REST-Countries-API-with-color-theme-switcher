import { useEffect, useState } from "react";
import "./App.scss";
import CountryTile from "./CountryTile";

export type Country = {
  name: string;
  population: number;
  region: string;
  capital: string[];
  flag: string;
};

const REGIONS = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [region, setRegion] = useState("");
  const [countryFilter, setCountryFilter] = useState("");

  const loadCountries = async () => {
    const source = region ? `region/${region}` : "all";
    const response = await fetch(`https://restcountries.com/v3.1/${source}`);
    const data = await response.json();

    setCountries(
      data.map((val: any) => ({
        name: val.name.common,
        population: val.population,
        region: val.region,
        capital: val.capital,
        flag: val.flags.svg,
      }))
    );
  };

  useEffect(() => {
    loadCountries();
  }, [region]);

  const countriesFiltered = countries.filter((c) =>
    c.name.toLowerCase().startsWith(countryFilter.toLowerCase())
  );

  return (
    <div className="App">
      <header>
        <h1>Where in the world?</h1>
        <button>Dark mode</button>
      </header>
      <main>
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
      </main>
    </div>
  );
}

export default App;
