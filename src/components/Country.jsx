import "./Country.css"
import PropTypes from "prop-types"
import { useEffect, useState } from "react"
export default function Country({ dataCountry }){

    return (
        <div className="countryContainer">
            <div className="imgCountry"
                 style={{ backgroundImage: `url(${dataCountry.flags.png})` }}></div>

            <h1>h1</h1>
        </div>
    )
}

Country.propTypes = {
    dataCountry: PropTypes.object
}