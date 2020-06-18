import React from "react"
import { Card } from 'semantic-ui-react'

export default function SandwichCheckout({ sandwich, itemNumber }){
    function capitalize(word) { 
        if(word) return word[0].toUpperCase() + word.slice(1); 
    }
    return(
        <div style={{borderBottom: "1px solid rgba(0, 0, 0, 0.2)", padding: "15px"}}>
            <h5>Item #{itemNumber + 1}: {capitalize(sandwich.sandwichType)} Sandwich</h5>
            <div style={{opacity: "0.7"}}>
                <span>Cheese: {capitalize(sandwich.cheeseType)}</span>
                <br />
                <span>Spice: {capitalize(sandwich.spice)}</span>
                <br />
                <span>Veggies: {sandwich.toppings.length === 0 ? "None" : 
                sandwich.toppings.map(topping => {
                    return <span>{capitalize(topping)} </span>
                })}</span>
                <br />
                <span>Cost: {sandwich.price}</span>
            </div>
        </div>        
    )
}