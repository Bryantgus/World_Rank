import "./Country.css"
import PropTypes from "prop-types"
import { useEffect, useState } from "react"
export default function Country({ dataCountry }){

    useEffect(() => {
        console.log(dataCountry)
    },[dataCountry]);

    return (
        <div className="countryContainer">
            <div className="imgCountry"
                style={{ backgroundImage: dataCountry[0].flags.svg ? `url(${dataCountry[0].flags.svg})` : ""}}></div>

            <h1>{dataCountry[0].name.common}</h1>
            <span>{dataCountry[0].name.official}</span>
            <div className="containerInfoItem">
                <div className="infoItem">
                    <span>Population</span>
                    <div className="lineH"></div>
                    <span>{dataCountry[0].population}</span>
                </div>
                <div className="infoItem">
                    <span>Area (km²)</span>
                    <div className="lineH"></div>
                    <span>{dataCountry[0].area}</span>
                </div>

                <div className="otherInfo">
                    
                </div>
            </div>
        </div>
    )
}

Country.propTypes = {
    dataCountry: PropTypes.object
}