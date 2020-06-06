import React, {useState} from "react"
import { Header, Input, Loader, Accordion } from 'semantic-ui-react'
import { NeuInput } from 'neumorphic-ui';

// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";

import { insertSandwich } from "./ProcessOrder";
import NextPrevButtons from "./vendors/NextPrevButtons.component";
import "./OrderForm.css"
// import CheckoutForm from "./PaymentSection.component"

// const promise = loadStripe("pk_test_7fLLDEMnamcBLNc24T2VCq5d");

export default function SandwichOrderForm(){
    const [name, setName] = useState("")
    const [sandwichType, setSandwichType] = useState("")
    const [cheeseType, setCheeseType] = useState("")
    const [spice, setSpice] = useState("")
    const [toppings, setToppings] = useState([])
    const [price, setPrice] = useState("0.00")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [address, setAddress] = useState("")
    const [onStep, setOnStep] = useState(0)
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [orderSuccessful, setOrderSuccessful] = useState(false);
    const [isTakeout, setIsTakeout] = useState(false)
    const [validTakeout, setValidTakeout] = useState(false)
    const assembleSandwich = () => {
        let sandwich = {
            name,
            sandwichType, 
            cheeseType,
            spice,
            toppings,
            price,
            phoneNumber,
            address,
            takeout: isTakeout
        }
        if(!sandwich.takeout){
            sandwich.address = "Dine in.  Order #"; 
            sandwich.phoneNumber = Math.floor(Math.random() * 1000).toString()
        }
        setOrderPlaced(true)
        insertSandwich(sandwich, (res) => {
            console.log(res)
            if(res.status == 200)
                setOrderSuccessful(true)
        });
    }   
    const NextStep = (inputs, isRequired) => {
        let canProceed = true;
        for(let i = 0; i < inputs.length; i++){
            if(inputs[i].split(" ").join("") == ""){
                canProceed = false
            }
        }
        if(isRequired & !canProceed)
            return false;
        else if(!(isRequired & canProceed) | (isRequired & canProceed)){
            setOnStep(onStep + 1)
            return true
        }
    }
    const PrevStep = () => {
        if(onStep != 0) setOnStep(onStep - 1)
    }
    const toggleVeggie = (veggie) => {  
        let foundVeggie = false;
        if(toppings.includes(veggie)){
            // https://stackoverflow.com/questions/57341541/removing-object-from-array-using-hooks-usestate
            setToppings(toppings.filter(topping => topping !== veggie));
            foundVeggie = true;
        }
        if(!foundVeggie)
            setToppings(toppings.concat([veggie]))
    }  
    const [option, setOption] = useState(0);
    const handleTitleClick = (e, itemProps) => {
        const { index } = itemProps
        const { activeIndex } = {option}
        const newIndex = activeIndex === index ? -1 : index
        setOption(newIndex)
    }
    const noSpace = (text) => {
        return text.split(" ").join("")
    }
    const sandwichTypeContent = (
        <div style={{ display: "inline-block" }}>
            <div className={sandwichType === "burger" ? "sandwichOptionSelected" :"sandwichOption"} onClick={() => {
                setOption(option + 1)
                setSandwichType("burger")
                setPrice("4.87")
            }}>
                <span>Burger</span>
            </div>
            <div className={sandwichType === "chicken" ? "sandwichOptionSelected" :"sandwichOption"} onClick={() => {
                setOption(option + 1)
                setSandwichType("chicken")
                setPrice("4.87")
            }}>
                <span>Chicken</span>
            </div>
            <div className={sandwichType === "falafel" ? "sandwichOptionSelected" :"sandwichOption"} onClick={() => {
                setOption(option + 1)
                setSandwichType("falafel")
                setPrice("3.81")
            }}>
                <span>Falafel</span>
            </div>
        </div>
    )
    const cheeseTypeContent = (
        <div style={{ display: "inline-block" }}>
            <div className={cheeseType === "none" ? "sandwichOptionSelected" :"sandwichOption"} onClick={() => {
                setOption(option + 1)
                setCheeseType("none")
            }}>
                <span>None</span>
            </div>
            <div className={cheeseType === "cheddar" ? "sandwichOptionSelected" :"sandwichOption"} onClick={() => {
                setOption(option + 1)
                setCheeseType("cheddar")
            }}>
                <span>Cheddar</span>
            </div>
            <div className={cheeseType === "mozzarella" ? "sandwichOptionSelected" :"sandwichOption"} onClick={() => {
                setOption(option + 1)
                setCheeseType("mozzarella")
            }}>
                <span>Mozzarella</span>
            </div>
            <div className={cheeseType === "feta" ? "sandwichOptionSelected" :"sandwichOption"} onClick={() => {
                setOption(option + 1)
                setCheeseType("feta")
            }}>
                <span>Feta</span>
            </div>
        </div>
    )
    const spiceTypeContent = (
        <div style={{ display: "inline-block" }}>
            <div className={spice === "none" ? "sandwichOptionSelected" :"sandwichOption"} onClick={() => {
                setOption(option + 1)
                setSpice("none")
            }}>
                <span>None</span>
            </div>
            <div className={spice === "little" ? "sandwichOptionSelected" :"sandwichOption"} onClick={() => {
                setOption(option + 1)
                setSpice("little")
            }}>
                <span>🌶️</span>
            </div>
            <div className={spice === "medium" ? "sandwichOptionSelected" :"sandwichOption"} onClick={() => {
                setOption(option + 1)
                setSpice("medium")
            }}>
                <span>🌶️🌶️</span>
            </div>
            <div className={spice === "hot" ? "sandwichOptionSelected" :"sandwichOption"} onClick={() => {
                setOption(option + 1)
                setSpice("hot")
            }}>
                <span>🌶️🌶️🌶️</span>
            </div>
        </div>
    )
    const veggiesTypeContent = (
        <div style={{ display: "inline-block" }}>
            <div className={toppings.includes("lettuce") ? "sandwichOptionSelected" :"sandwichOption"} onClick={() => {
                toggleVeggie("lettuce")
            }}>
                <span>Lettuce</span>
            </div>
            <div className={toppings.includes("tomato") ? "sandwichOptionSelected" :"sandwichOption"} onClick={() => 
                toggleVeggie("tomato")
            }>
                <span>Tomato</span>
            </div>
            <div className={toppings.includes("cucumber") ? "sandwichOptionSelected" :"sandwichOption"} onClick={() => {
                toggleVeggie("cucumber")
            }}>
                <span>Cucumber</span>
            </div>
            <div className={toppings.includes("onion") ? "sandwichOptionSelected" :"sandwichOption"} onClick={() => {
                toggleVeggie("onion")
            }}>
                <span>Onion</span>
            </div>
        </div>
    )
    const isValidTakeout = () => {
        if(address !== "" && phoneNumber !== ""){
            //adds one to length because it checks the length before updating the state.  IDK how to fix.  
            if(phoneNumber.length + 1 === 10){
                return true
            }
        }
        return false
    }
    const Level1Content = (
        <div>
        <div style={{verticalAlign: "middle", display: "inline-block"}}>
            <p style={{float: "left", display: "inline-block"}}>I want my order to be </p>
                <div className={!isTakeout ? "sandwichOptionSelected" :"sandwichOption"} onClick={() => {
                    setIsTakeout(false);
                    setValidTakeout(true);
                }}>
                    <span>Pickup</span>
                </div>
                <div className={isTakeout ? "sandwichOptionSelected" :"sandwichOption"} onClick={() => {
                    setIsTakeout(true)
                    setValidTakeout(false);
                }}>
                    <span>Delivery</span>
                </div>
                
            </div>
            {isTakeout ? 
                <div>
                <Input className="margin10" fluid placeholder="Address" onChange={e => {
                    setAddress(noSpace(e.target.value))
                    setValidTakeout(isValidTakeout())
                }} />
                <Input className="margin10" fluid placeholder="Phone Number" icon="phone" onChange={e => {
                    setPhoneNumber(noSpace(e.target.value))
                    setValidTakeout(isValidTakeout())
                }} /></div>: 
                <div></div>
            }
            <NextPrevButtons canProceed={!isTakeout || (isTakeout && validTakeout)} top="10px" step={onStep} next={() => NextStep([phoneNumber, address], false)} prev={() => PrevStep()} />
        </div>
    )
    const level2Panels = [
        { key: 'panel-2a', title: `Sandwich Type: ${sandwichType}`, content: {content: sandwichTypeContent} },
        { key: 'panel-2b', title: `Cheese Type: ${cheeseType}`, content: {content: cheeseTypeContent} },
        { key: 'panel-2c', title: `Spice Level: ${spice}`, content: {content: spiceTypeContent} },
        { key: 'panel-2d', title: `Veggies: ${toppings.map(topping => " " + topping)}`, content: {content: veggiesTypeContent} }
    ]
    const Level2Content = (
        <div>
            <div className="form-group">
                <Input fluid placeholder="Name" onChange={e => setName(e.target.value) } />
                <NextPrevButtons canProceed={noSpace(name) !== ""} step={onStep} top="18px" next={() => NextStep([name], true)} prev={() => PrevStep()} />
            </div>         
        </div>
    )
    const Level3Content = (
        <div>
            Customize your own sandwich
            <Accordion.Accordion activeIndex={option} panels={level2Panels} onTitleClick={handleTitleClick}/>
            <NextPrevButtons canProceed={sandwichType !== "" & cheeseType !== "" & spice !== ""} step={onStep} top="10px" next={() => NextStep([sandwichType, cheeseType, spice], true)} prev={() => PrevStep()} />
        </div>
    )
    
    const Level4Content = (
        <div>
            Apple Payment<br />
            Google Payment<br />
            Credit Payment
            <NextPrevButtons canProceed={false} top="10px" step={onStep} next={() => NextStep([name], true)} prev={() => PrevStep()} />
        </div>
    )
    const rootPanels = [
        { key: 'panel-1', title: `Step 1: Pickup or Delivery ${onStep > 0 ? "✓": ""}: ${isTakeout ? "Delivery" : "Pickup"}`, content: { content: Level1Content } },
        { key: 'panel-2', title: `Step 2: Name for the Order ${onStep > 1 ? "✓": ""}: ${name}`, content: { content: Level2Content } },
        { key: 'panel-3', title: `Step 3: Build your Sandwich ${onStep > 2 ? "✓": ""}: ${sandwichType}`, content: { content: Level3Content } },
        { key: 'panel-4', title: 'Step 4: Choose Payment Method', content: { content: Level4Content } },
    ]
    const loadingMessages = [
        "Assembling Sandwich...",
        "Purchasing Ingredients...",
        "Herding Cattle...",
        "Feeding Chickens...",
        "Shaping Falafel"
    ]
    return(
        <div>
            <Accordion activeIndex={onStep} panels={rootPanels} styled />
            <Header as='h3'>Price: ${price}</Header>
            <div id="order_button" className="form-group form-group-position">
                {!orderSuccessful & orderPlaced ? 
                    <Loader active style={{color: "black"}}>{loadingMessages[Math.floor(Math.random() * loadingMessages.length)]}</Loader> : 
                    <button onClick={assembleSandwich} type="submit" className="NextPrevButton black NextPrevButton--quidel NextPrevButton--inverted nextStep" style={{opacity: "1", cursor: "pointer"}}>Order Now</button>
                }
            </div>
        </div>
    )
}