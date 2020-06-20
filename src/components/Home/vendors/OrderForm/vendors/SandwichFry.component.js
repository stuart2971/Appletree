import React, {useState, useEffect} from "react";
import { Accordion, Menu, Icon, Input } from 'semantic-ui-react'

import "../OrderForm.css"

export default function SandwichFry({item, itemNumber, updateItems, removeItem}){
    //Global options
    const [option, setOption] = useState(0);
    const [spice, setSpice] = useState("")
    const [price, setPrice] = useState("0.00")
    const [orderType, setOrderType] = useState("sandwich")
    const [name, setName] = useState("")
    //Sandwich options
    const [sandwichType, setSandwichType] = useState("")
    const [cheeseType, setCheeseType] = useState("")
    const [toppings, setToppings] = useState([])
    //Fries option
    const [friesType, setFriesType] = useState("");
    const [mayoType, setMayoType] = useState("")

    useEffect(() => {
        setName(item.name)
        setSandwichType(item.sandwichType)
        setCheeseType(item.cheeseType)
        setToppings(item.toppings)
        setSpice(item.spice)
    }, [item]);

    function capitalize(word) { 
        if(word) return word[0].toUpperCase() + word.slice(1); 
    }
    //Any new states that is part of the order should be put here
    const resetStates = () => {
        setSandwichType("")
        setCheeseType("")
        setToppings([])
        setFriesType("")
        setSpice("none")
        setPrice("")
        setMayoType("none")
    }
    const changeOrderType = (orderType) => {
        setOrderType(orderType);
        resetStates()
        updateItems(itemNumber, {name: "", toppings: []})
        setOption(0);
    }
    const goToNextStep = () => {
        setOption(option + 1)
    }
    const changeSandwichType = (sandwichType, price) => {
        setSandwichType(sandwichType)
        setPrice(price)
        updateItems(itemNumber, {name, sandwichType, cheeseType, spice, toppings, price, orderType: "sandwich" })
        goToNextStep()
    }
    const changeCheeseType = (cheeseType) => {
        setCheeseType(cheeseType)
        updateItems(itemNumber, {name, sandwichType, cheeseType, spice, toppings, price, orderType: "sandwich" })
        goToNextStep()
    }
    const changeSpice = (spice) => {
        setSpice(spice)
        updateItems(itemNumber, {name, sandwichType, cheeseType, spice, toppings, price, orderType: "sandwich" })
        goToNextStep()
    }
    const changeVeggie = (veggie) => {
        let newVeggies = toppings.includes(veggie) ? toppings.filter(topping => topping !== veggie) : toppings.concat([veggie])
        setToppings(newVeggies)
        updateItems(itemNumber, {name, sandwichType, cheeseType, spice, toppings: newVeggies, price, orderType: "sandwich" })
    }
    const changeFriesType = (friesType, spice, mayoType, price) => {
        setFriesType(friesType)
        setMayoType(mayoType)
        setPrice(price)
        updateItems(itemNumber, {name, friesType, spice, mayoType, price, orderType: "fries" })
    }

    let panels = []
    if(orderType === "sandwich"){ 
        const sandwichTypeContent = (
            <div style={{ display: "inline-block" }}>
                <div className={sandwichType === "burger" ? "sandwichOptionSelected" :"sandwichOption"} onClick={() => changeSandwichType("burger", "4.87")}>
                    <span>Burger</span>
                </div>
                <div className={sandwichType === "chicken" ? "sandwichOptionSelected" :"sandwichOption"} onClick={() => changeSandwichType("chicken", "4.87")}>
                    <span>Chicken</span>
                </div>
                <div className={sandwichType === "falafel" ? "sandwichOptionSelected" :"sandwichOption"} onClick={() => changeSandwichType("falafel", "3.81")}>
                    <span>Falafel</span>
                </div>
            </div>
        )
        const cheeseTypeContent = (
            <div style={{ display: "inline-block" }}>
                <div className={cheeseType === "none" ? "sandwichOptionSelected" :"sandwichOption"} onClick={() => changeCheeseType("none")}>
                    <span>None</span>
                </div>
                <div className={cheeseType === "cheddar" ? "sandwichOptionSelected" :"sandwichOption"} onClick={() => changeCheeseType("cheddar")}>
                    <span>Cheddar</span>
                </div>
                <div className={cheeseType === "mozzarella" ? "sandwichOptionSelected" :"sandwichOption"} onClick={() => changeCheeseType("mozzarella")}>
                    <span>Mozzarella</span>
                </div>
                <div className={cheeseType === "feta" ? "sandwichOptionSelected" :"sandwichOption"} onClick={() => changeCheeseType("feta")}>
                    <span>Feta</span>
                </div>
            </div>
        )
        const spiceTypeContent = (
            <div style={{ display: "inline-block" }}>
                <div className={spice === "none" ? "sandwichOptionSelected" :"sandwichOption"} onClick={() => changeSpice("none") }>
                    <span>None</span>
                </div>
                <div className={spice === "little" ? "sandwichOptionSelected" :"sandwichOption"} onClick={() => changeSpice("little")}>
                    <span>🌶️</span>
                </div>
                <div className={spice === "medium" ? "sandwichOptionSelected" :"sandwichOption"} onClick={() => changeSpice("medium")}>
                    <span>🌶️🌶️</span>
                </div>
                <div className={spice === "hot" ? "sandwichOptionSelected" :"sandwichOption"} onClick={() => changeSpice("hot")}>
                    <span>🌶️🌶️🌶️</span>
                </div>
            </div>
        )
        const veggiesTypeContent = (
            <div style={{ display: "inline-block" }}>
                <div className={toppings.includes("lettuce") ? "sandwichOptionSelected" :"sandwichOption"} onClick={() => changeVeggie("lettuce")}>
                    <span>Lettuce</span>
                </div>
                <div className={toppings.includes("tomato") ? "sandwichOptionSelected" :"sandwichOption"} onClick={() => changeVeggie("tomato")}>
                    <span>Tomato</span>
                </div>
                <div className={toppings.includes("cucumber") ? "sandwichOptionSelected" :"sandwichOption"} onClick={() => changeVeggie("cucumber")}>
                    <span>Cucumber</span>
                </div>
                <div className={toppings.includes("onion") ? "sandwichOptionSelected" :"sandwichOption"} onClick={() => changeVeggie("onion")}>
                    <span>Onion</span>
                </div>
            </div>
        )
        panels = [
            { key: 'panel-2a', title: `Sandwich Type ${sandwichType !== "" ? "✓": ""}: ${sandwichType !== "" && sandwichType !== undefined ? capitalize(sandwichType): "Not Chosen"}`, content: {content: sandwichTypeContent} },
            { key: 'panel-2b', title: `Cheese Type ${cheeseType !== "" ? "✓": ""}: ${cheeseType !== "" && cheeseType !== undefined? capitalize(cheeseType): "Not Chosen"}`, content: {content: cheeseTypeContent} },
            { key: 'panel-2c', title: `Spice Level ${spice !== "" && spice !== undefined? "✓": ""}: ${spice !== "" && spice !== undefined ? capitalize(spice) : "Not Chosen"}`, content: {content: spiceTypeContent} },
            { key: 'panel-2d', title: `Veggies: ${toppings.length === 0 ? "None" : toppings.map(topping => " " + capitalize(topping))}`, content: {content: veggiesTypeContent} }
        ]
    }else if(orderType === "fries"){
        const spiceTypeContent = (
            <div style={{ display: "inline-block" }}>
                <hr />
                <div className={spice === "little" ? "sandwichOptionSelected" :"sandwichOption"} onClick={() => {
                    setSpice("little")
                    updateItems(itemNumber, {name, friesType, spice: "little", mayoType: "none", price, orderType: "fries"})
                }}>
                    <span>🌶️</span>
                </div>
                <div className={spice === "medium" ? "sandwichOptionSelected" :"sandwichOption"} onClick={() => {
                    setSpice("medium")
                    updateItems(itemNumber, {name, friesType, spice: "medium", mayoType: "none", price, orderType: "fries"})
                }}>
                    <span>🌶️🌶️</span>
                </div>
                <div className={spice === "hot" ? "sandwichOptionSelected" :"sandwichOption"} onClick={() => {
                    setSpice("hot")
                    updateItems(itemNumber, {name, friesType, spice: "hot", mayoType: "none", price, orderType: "fries"})
                }}>
                    <span>🌶️🌶️🌶️</span>
                </div>
            </div>
        )
        const mayoTypeContent = (
            <div style={{ display: "inline-block" }}>
                <hr />
                <div className={mayoType === "garlic" ? "sandwichOptionSelected" :"sandwichOption"} onClick={() => {
                    setMayoType("garlic")
                    updateItems(itemNumber, {name, friesType, spice: "none", mayoType: "garlic", price, orderType: "fries"})
                }}>
                    <span>Garlic Mayo</span>
                </div>
                <div className={mayoType === "spicy" ? "sandwichOptionSelected" :"sandwichOption"} onClick={() => {
                    setMayoType("spicy")
                    updateItems(itemNumber, {name, friesType, spice: "none", mayoType: "spicy", price, orderType: "fries"})
                }}>
                    <span>Spicy Mayo</span>
                </div>
            </div>
        )
        const fryOptions = (
            <div>
                <div style={{ display: "inline-block" }}>
                    <div className={friesType === "regular" ? "sandwichOptionSelected" :"sandwichOption"} onClick={() => changeFriesType("regular", "none", "none", "4.50")}>
                        <span>Regular</span>
                    </div>
                    <div className={friesType === "spicy" ? "sandwichOptionSelected" :"sandwichOption"} onClick={() => changeFriesType("spicy", spice, "none", "5.00")}>
                        <span>Spicy</span>
                    </div>
                    <div className={friesType === "belgian" ? "sandwichOptionSelected" :"sandwichOption"} onClick={() => changeFriesType("belgian", "none", mayoType, "5.50")}>
                        <span>Belgian</span>
                    </div>
                    <div className={friesType === "poutine" ? "sandwichOptionSelected" :"sandwichOption"} onClick={() => changeFriesType("poutine", "none", "none","6.00")}>
                        <span>Poutine</span>
                    </div>
                </div>
                {friesType === "spicy" ? spiceTypeContent : <div></div>}
                {friesType === "belgian" ? mayoTypeContent : <div></div>}
            </div>
        )
        panels = [
            { key: 'panel-1a', title: `Fries Type: 
                                        ${friesType === undefined || friesType === "" ? "Not Chosen" : capitalize(friesType)} 
                                        ${spice === undefined || spice === "none" || !spice? "" : `(${capitalize(spice)})`} 
                                        ${mayoType === undefined || mayoType === "none" || !mayoType ? "": `(${capitalize(mayoType)} Mayo)`}`
                                        , content: {content: fryOptions} },
        ]
    }
    const handleTitleClick = (e, itemProps) => {
        const { index } = itemProps
        const { activeIndex } = {option}
        const newIndex = activeIndex === index ? -1 : index
        setOption(newIndex)
    }
    return (
        
        <div style={{margin: "10px 50px 10px 50px", display: "block"}}>  
            <form autofill="off">
                <label onClick={() => { removeItem(itemNumber) }} style={{float: "left", marginTop: "3px"}}><Icon name="delete" />This item belongs to </label>
                <input className="NameInput" value={name} fluid placeholder="(Enter a Name)" onChange={e => {
                    setName(e.target.value)
                    updateItems(itemNumber, {name: e.target.value, sandwichType, cheeseType, spice, toppings, price, orderType})
                } } />
            </form>
            <div style={name.split(" ").join("") === "" ? {opacity: "0.2", pointerEvents: "none"}: {opacity: "1"}}>
                <Menu fluid width={2}>
                        <Menu.Item name='Sandwich' active={orderType === 'sandwich'} onClick={() => changeOrderType("sandwich")} />
                        <Menu.Item name='Fries' active={orderType === 'fry'} onClick={() => { changeOrderType("fries") }} />
                </Menu>
                <Accordion.Accordion style={{width: "100%", float: "right", marginBottom: "20px", marginTop: "0px"}} activeIndex={option} panels={panels} onTitleClick={handleTitleClick}/>
            </div>
        </div>
    )
}
