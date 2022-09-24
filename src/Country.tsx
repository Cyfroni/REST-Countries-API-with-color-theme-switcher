import { Link, useLoaderData, useNavigate } from "react-router-dom";
import "./Country.scss";

type loaderParams = {
  params: { countryName: string };
};

export const countryLoader = async ({ params }: loaderParams) => {
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
  const navigate = useNavigate();

  return (
    <>
      <button className="back-button" onClick={() => navigate(-1)}>
        Back
      </button>
      <div className="country-full">
        <div className="country-full__flag">
          <img src={country.flag} alt="" />
        </div>
        <div className="country-full__header">
          <h2>{country.name}</h2>
        </div>
        <div className="country-full__details">
          <p>
            <span className="country-full__label">Native Name:</span>
            {country.officialName}
          </p>
          <p>
            <span className="country-full__label">Populaton:</span>
            {country.population}
          </p>
          <p>
            <span className="country-full__label">Region:</span>
            {country.region}
          </p>
          <p>
            <span className="country-full__label">Sub Region:</span>
            {country.subregion}
          </p>
          <p>
            <span className="country-full__label">Capital:</span>
            {country.capital}
          </p>
        </div>
        <div className="country-full__details">
          <p>
            <span className="country-full__label">Top Level Domain:</span>
            {country.tld}
          </p>
          <p>
            <span className="country-full__label">Currencies:</span>
            {country.currencies.join(", ")}
          </p>
          <p>
            <span className="country-full__label">Languages:</span>
            {country.languages.join(", ")}
          </p>
        </div>
        <div className="country-full__neighbours">
          <span className="country-full__label">Border Countries:</span>
          <ul>
            {country.neighbours?.map((n) => (
              <li key={n}>
                <Link to={`/countries/${n}`}>{n}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
