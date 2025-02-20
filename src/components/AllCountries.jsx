import "./AllCountries.css"
import { useState, useEffect, useRef } from "react"

function RegionItem({country, sendStateName}) {
    const [wasClicked, setWasClicked] = useState(true);    
    return (
        <div className="font2 regionItem"
            onClick={() => {
                setWasClicked(prev => !prev);
                sendStateName([country, !wasClicked]);
                }}
             style={wasClicked ? {backgroundColor: "#282B30", borderRadius: "10px", border: "1px", padding: "7px"} : {}}>
            {country}
        </div>
    )
}

function InfoCountry({flag, name, population, area, region}) {
    return (
        <div className="infoCountry">
            <div className="flag"
                 style={{backgroundImage: `url(${flag})`}}></div> 
            <span>{name}</span>
            <span>{population}</span>
            <span>{area}</span>      
            <span>{region}</span>
        
        </div>
    )
}

export default function AllCountries() {
    const regions = ["Americas", "Antarctic", "Africa", "Asia", "Europe", "Oceania"];
    const [countries, setCountries] = useState([]);
    const [filters, setFilters] = useState({
        sortby: "population",
        region: {
            Americas: true,
            Antarctic: true,
            Africa: true,
            Asia: true,
            Europe: true,
            Oceania: true
        },
        status: {
            unMember: true,
            independent: true
        }
    });
    const [countriesFiltered, setCountriesFiltered] = useState([]);

    //Obtener datos de la api
    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all?fields=name,flags,population,area,region")
          .then(Response => Response.json())
          .then(data => {
            setCountries(data);
          })
    }, []);

    function updateFilters(data) { 
        if (data === "population" || data === "area" || data === "name") {
            setFilters((prev) => ({ ...prev, sortby: data }));
        } else if (data[1] === "member" || data[1] === "independent") {
            setFilters((prev) => ({
                ...prev,
                status: {
                    ...prev.status,
                    [data[1]]: data[0]
                }
            }))
        } else {
            setFilters((prev) => ({
                ...prev,
                region: {
                    ...prev.region,
                    [data[0]]: data[1]
                }
            }))
        }
            

    }

    useEffect(() => {
        
        var countriesFilter = countries.filter((country) => 
            filters.region[country.region]
        );

        
        
                
        setCountriesFiltered(countriesFilter);
    }, [filters, countries]);

    return(
        <div className="allCountriesContainer">
            <div className="headerAllCountries">
                <span className="font2">Found {countriesFiltered.length} countries</span>            
                <input className="font3" type="text" placeholder="Search by Name, Region, Subregion" />
            </div>
            <div className="leftContainer">
                <span>Sort by</span>    
                <select id="optionsSelect"
                        onChange={(e) => {updateFilters(e.target.value)}}>
                    <option value="population" defaultValue>Population</option>
                    <option value="name">Name</option>
                    <option value="area">Area</option>
                </select>
                
                <span>Region</span>
                <div className="regionItemsContainer">
                    {regions.map((item, index) => (
                        <RegionItem key={index} 
                                    country={item}
                                    sendStateName={updateFilters} />
                    ))}
                </div>

                <span>Status</span>

                <div className="statusItem">
                    <input onChange={(e) => updateFilters([e.target.checked, "unMember"])}
                           type="checkbox" />
                    <div>Member of the United Nations</div>
                </div>

                <div className="statusItem">
                    <input  onChange={(e) => updateFilters([e.target.checked, "independent"])}
                            type="checkbox" />
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
                
                <div className="contriesContainer">
                    {countriesFiltered.map((item, index) => (
                        <InfoCountry 
                        key={index}
                        flag={item.flags.svg}
                        name={item.name.common}
                        population={item.population}
                        area={item.area}
                        region={item.region}
                        />
                    ))}
                </div>
            </div>
            
        </div>
    )
}

