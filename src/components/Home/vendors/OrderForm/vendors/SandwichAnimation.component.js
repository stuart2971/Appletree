import React, {useState} from "react"

import "./SandwichAnimation.css"

//Animation works by having a fixed starting position and then adds class to image to make it fall

export default function SandwichAnimation({sandwich}){
    return (
        <div style={{position: "relative"}}>
            <img style={{ marginLeft: `291px`, marginTop: `20px`, transform: `scale(22)` }} className="abs" src={`images/Home/SandwichAnimation/back.png`} />
                {sandwich.sandwichType === "burger" ? <Topping x="310" y="-10" scale="42" file="patty"/> : <div></div>}
                {sandwich.sandwichType === "chicken" ? <Topping x="280" y="-45" scale="18" file="chicken"/> : <div></div>}
                {sandwich.sandwichType === "falafel" ? <Topping x="260" y="20" scale="43" file="falafel"/> : <div></div>}

                {sandwich.cheeseType === "cheddar" ? <Topping x="260" y="20" scale="42" file="cheddar"/> : <div></div>}
                {sandwich.cheeseType === "mozzarella" ? <Topping x="260" y="20" scale="36" file="mozzarella"/> : <div></div>}
                {sandwich.cheeseType === "feta" ? <Topping x="310" y="-10" scale="25" file="feta"/> : <div></div>}

                {sandwich.toppings.includes("lettuce") ? <Topping x="260" y="20" scale="28" file="lettuce"/> : <div></div>}
                {sandwich.toppings.includes("tomato") ? <Topping x="260" y="5" scale="34" file="tomato"/> : <div></div>}
                {sandwich.toppings.includes("cucumber") ? <Topping x="280" y="60" scale="35" file="cucumber"/> : <div></div>}
                {sandwich.toppings.includes("onion") ? <Topping x="270" y="50" scale="29" file="onion"/> : <div></div>}

                {sandwich.spice !== "none" && sandwich.spice !== "" ? <Topping x="275" y="-30" scale="23" file="hot"/> : <div></div>}
            <img style={{ marginLeft: `180px`, transform: `scale(21)`}} className="abs" src={`images/Home/SandwichAnimation/front.png`} />
        </div>
    )
}

function Topping({x, y, scale, file}){   
    return <img style={{
            marginLeft: `${x}px`, 
            marginTop: `${y}px`, 
            transform: `scale(${scale})`
        }} className="abs sandwichAnimation" src={`images/Home/SandwichAnimation/${file}.png`} />    
}