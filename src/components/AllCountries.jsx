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

function InfoCountry({flag, name, population, area, region, chargeInfoCountry}) {
    const [showSpan, setShowSpan] = useState(window.innerWidth >= 1024);
    const countryRef = useRef(null);
    useEffect(() => {
    const handleResize = () => {
      setShowSpan(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    
    // Limpiar el evento cuando el componente se desmonta
    return () => window.removeEventListener("resize", handleResize);
  }, []);

    return (
        <div className="infoCountry" onClick={() => chargeInfoCountry(countryRef.current.innerText )}
>
            <div className="flag"
                 style={{backgroundImage: `url(${flag})`}}></div> 
            <span ref={countryRef}>{name}</span>
            <span>{population}</span>
            <span>{area}</span>      
            {showSpan && <span>{region}</span>}
        
        </div>
    )
}

export default function AllCountries({ countries, chargeInfoCountry }) {
    const [showSpan, setShowSpan] = useState(window.innerWidth >= 1024);

    useEffect(() => {
    const handleResize = () => {
      setShowSpan(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    
    // Limpiar el evento cuando el componente se desmonta
    return () => window.removeEventListener("resize", handleResize);
    }, []);


    const regions = ["Americas", "Antarctic", "Africa", "Asia", "Europe", "Oceania"];
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
            unMember: false,
            independent: false
        }
    });
    const [filterWord, setFilterWord] = useState("");
    const [countriesFiltered, setCountriesFiltered] = useState([]);

    
    function updateFilters(data) { 
        if (data === "population" || data === "area" || data === "name") {
            setFilters((prev) => ({ ...prev, sortby: data }));
        } else if (data[1] === "unMember" || data[1] === "independent") {
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

        var countriesFilter = countries;
        countriesFilter = countriesFilter.filter((country) => country.name.common.toLowerCase().includes(filterWord.toLowerCase()));

        
        countriesFilter = countriesFilter.filter((country) => 
            filters.region[country.region]
        );

        if (filters.status.unMember) {
            countriesFilter = countriesFilter.filter((country) => country.unMember);
        }

        if (filters.status.independent) {
            countriesFilter = countriesFilter.filter((country) => country.independent);
        }

        if (filters.sortby === "name") {
            countriesFilter.sort((a, b) => a.name.common.localeCompare(b.name.common))  
        } 
        else if (filters.sortby === "population" || filters.sortby === "area") {
            countriesFilter.sort((a, b) => a[filters.sortby] - b[filters.sortby])
        }
        
        setCountriesFiltered(countriesFilter);
    }, [filters, countries, filterWord]);

    return(
        <div className="allCountriesContainer">
            <div className="headerAllCountries">
                <span className="font2">Found {countriesFiltered.length} countries</span>            
                <input className="font3" value={filterWord} type="text" placeholder="Search by Name, Region, Subregion" onChange={(e) => setFilterWord(e.target.value)} />
            </div>
            <div className="leftContainer">
                <span className="sortBy">Sort by</span>    
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
                    {showSpan && <span>Region</span>}
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
                        chargeInfoCountry={chargeInfoCountry}
                        />
                    ))}
                </div>
            </div>
            
        </div>
    )
}

