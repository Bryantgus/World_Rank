import "./AllCountries.css"
import { useState, useEffect, useRef } from "react"

function RegionItem({country}) {
    const [wasClicked, setWasClicked] = useState(true);

    return (
        <div className="font2 regionItem"
            onClick={() => {setWasClicked(prev => !prev)}}
             style={wasClicked ? {backgroundColor: "#282B30", borderRadius: "10px", border: "1px", padding: "7px"} : {}}>
            {country}
        </div>
    )
}

function InfoCountry({flag, name, population, area, region}) {
    return (
        <div className="infoCountryContainer">
            <div>
                <img src={flag} alt="flag" />
            </div> 
            <span>{name}</span>
            {/* <span>{population}</span>
            <span>{area}</span>      
            <span>{region}</span> */}
        
        </div>
    )
}

export default function AllCountries() {
    const regions = ["Americas", "Antartic", "Africa", "Asia", "Europe", "Oceania"];
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all?fields=name,flags,population,area,region")
          .then(Response => Response.json())
          .then(data => {
            setCountries(data);
          })
    }, []);
    return(
        <div className="allCountriesContainer">
            <div className="headerAllCountries">
                <span className="font2">Found 234 countries</span>            
                <input className="font3" type="text" placeholder="Search by Name, Region, Subregion" />
            </div>
            <div className="leftContainer">
                <span>Sort by</span>    
                <select id="optionsSelect">
                    <option value="opcion1" defaultValue>Population</option>
                    <option value="opcion2">Name</option>
                    <option value="opcion3">Area</option>
                </select>
                
                <span>Region</span>
                <div className="regionItemsContainer">
                    {regions.map((item, index) => (
                        <RegionItem key={index} country={item} />
                    ))}
                </div>

                <span>Status</span>

                <div className="statusItem">
                    <input type="checkbox" />
                    <div>Member of the United Nations</div>
                </div>

                <div className="statusItem">
                    <input type="checkbox" />
                    <div>Independent</div>
                </div>

            </div>

            <div className="rightContainer">
                <div className="titlesContainer">
                    <span>Flag</span>
                    <span>Name</span>
                    <span>Poputalation</span>
                    <span>Area (km²)</span>
                    <span>Region</span>
                </div>

                <div className="line"></div>
                <InfoCountry 
                    
                    flag={"item.flags.svg"}
                    name={"item.name.common"}
                    population={"item.population"}
                    area={"item.area"}
                    region={"item.region"}/>
                {/* {countries.map((item, index) => (
                    <InfoCountry 
                    key={index}
                    flag={item.flags.svg}
                    name={item.name.common}
                    population={item.population}
                    area={item.area}
                    region={item.region}/>
                ))} */}
            </div>
            
        </div>
    )
}

