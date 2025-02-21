import "./App.css"
import AllCountries from "./components/AllCountries"
import Country from "./components/Country"
import { useState, useEffect } from "react";
export default function App() {

  const [countries, setCountries] = useState([]);
  const [countrySelected, setCountrySelected] = useState("");
  const [dataCountry, setDataCountry] = useState({})
  function chargeInfoCountry(country) {
    setCountrySelected(country);    
  }

  //Obtener datos de la api
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,flags,population,area,region,independent,unMember")
      .then(Response => Response.json())
      .then(data => {
        setCountries(data);
      })
  }, []);

  useEffect(() => {

    let CountryFilter = countries.filter((country) => country.name.common === countrySelected );
    setDataCountry(CountryFilter);
    console.log(CountryFilter);
    
  },[countrySelected, countries])


  return (
    <div className="appContainer">
      <header>
        <div className="imgContainer">
          <img className="logo" src="/Logo.svg" alt="" />
        </div>
       
      </header>
    
    {countrySelected === "" ? 
    <AllCountries chargeInfoCountry={chargeInfoCountry} countries={countries}/> :
    <Country dataCountry={dataCountry} />}
    </div>
  )
}