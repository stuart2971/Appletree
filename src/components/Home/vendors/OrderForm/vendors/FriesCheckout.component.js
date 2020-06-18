import React from "react"
import { Card } from 'semantic-ui-react'

export default function FriesCheckout({ fries, itemNumber }){
    function capitalize(word) { 
        if(word) return word[0].toUpperCase() + word.slice(1); 
    }
    return(
        <div style={{borderBottom: "1px solid rgba(0, 0, 0, 0.2)", padding: "15px"}}>
            <h5>Item #{itemNumber + 1}: {fries.friesType === "regular" || fries.friesType === "spicy" || fries.friesType === "belgian" ? capitalize(fries.friesType) + " Fries" : capitalize(fries.friesType)}</h5>
            <div style={{opacity: "0.7"}}>
                {fries.friesType === "spicy" ? <span>Spice: {capitalize(fries.spice)}</span> : <div></div>}
                {fries.friesType === "belgian" ? <span>Mayo: {capitalize(fries.mayoType)}</span> : <div></div>}
                <br />
                <span>Cost: {fries.price}</span>
            </div>
        </div>        
    )
}