import React, {useState} from "react"
import { Header, Input, Loader, Accordion } from 'semantic-ui-react'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import "./OrderForm.css"

import { insertFries } from "./ProcessOrder";
import NextPrevButtons from "./vendors/NextPrevButtons.component";
import CheckoutForm from "./vendors/CheckoutForm.component"

const promise = loadStripe("pk_live_jJHt0rweBXTMfZRtpLqaB9PO");

export default function FriesOrderForm(){
    const [name, setName] = useState("")
    const [friesType, setFriesType] = useState("");
    const [spice, setSpice] = useState("a little");
    const [price, setPrice] = useState("0.00")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [address, setAddress] = useState("")
    const [onStep, setOnStep] = useState(0)
    const [isTakeout, setIsTakeout] = useState(false)
    const [validTakeout, setValidTakeout] = useState(false) 
    const assembleFries = () => {
        let fries = {
            name,
            friesType,
            spice,
            price,
            phoneNumber,
            address,
            takeout: isTakeout
        }
        if(!fries.takeout){
            fries.address = "Dine in.  Order #"; 
            fries.phoneNumber = Math.floor(Math.random() * 1000).toString()
        }
        insertFries(fries, (res) => {
            if(res.status == 200)
                console.log("CREATE BANNER TO SEE ORDER")
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
    const noSpace = (text) => {
        return text.split(" ").join("")
    }
    const spiceTypeContent = (
        <div style={{ display: "inline-block" }}>
            <div className={spice === "little" ? "sandwichOptionSelected" :"sandwichOption"} onClick={() => {
                setSpice("little")
                setOnStep(onStep + 1)
            }}>
                <span>🌶️</span>
            </div>
            <div className={spice === "medium" ? "sandwichOptionSelected" :"sandwichOption"} onClick={() => {
                setSpice("medium")
                setOnStep(onStep + 1)
            }}>
                <span>🌶️🌶️</span>
            </div>
            <div className={spice === "hot" ? "sandwichOptionSelected" :"sandwichOption"} onClick={() => {
                setSpice("hot")
                setOnStep(onStep + 1)
            }}>
                <span>🌶️🌶️🌶️</span>
            </div>
        </div>
    )
    const isValidTakeout = () => {
        if(address !== "" & phoneNumber !== ""){
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
            <div style={{float: "right", marginTop: "-15px"}}>

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
            </div>
            {isTakeout ? 
                <form autofill="off">
                <Input className="margin10" fluid placeholder="Address" onChange={e => {
                    setAddress(noSpace(e.target.value))
                    setValidTakeout(isValidTakeout())
                }} />
                <Input className="margin10" fluid placeholder="Phone Number" icon="phone" onChange={e => {
                    setPhoneNumber(noSpace(e.target.value))
                    setValidTakeout(isValidTakeout())
                }} /></form>: 
                <div></div>
            }
            <NextPrevButtons canProceed={!isTakeout || (isTakeout && validTakeout)} top="10px" step={onStep} next={() => NextStep([phoneNumber, address], false)} prev={() => PrevStep()} />
        </div>
    )
    const Level2Content = (
        <div>
            <div className="form-group">
                <Input fluid placeholder="Name" onChange={e => setName(e.target.value) } />
                <NextPrevButtons canProceed={noSpace(name) !== ""} step={onStep} top="18px" next={() => NextStep([name], true)} prev={() => PrevStep()} />
            </div>         
        </div>
    )
    const canProceed = () => {
        if(friesType !== ""){
            if(friesType === "spicy"){
                if(spice !== "")
                    return true;
            }else return true
        }
        return false;
    }
    
    const Level3Content = (
        <div>
            Customize your own sandwich
            <div style={{ display: "inline-block" }}>
            <div className={friesType === "regular" ? "sandwichOptionSelected" :"sandwichOption"} onClick={() => {
                setOnStep(onStep + 1)
                setFriesType("regular")
                setPrice("4.50")
            }}>
                <span>Regular</span>
            </div>
            <div className={friesType === "spicy" ? "sandwichOptionSelected" :"sandwichOption"} onClick={() =>{ 
                setFriesType("spicy")
                setPrice("5.00")
            }}>
                <span>Spicy</span>
            </div>
            <div className={friesType === "belgian" ? "sandwichOptionSelected" :"sandwichOption"} onClick={() => {
                setOnStep(onStep + 1)
                setFriesType("belgian")
                setPrice("5.50")
            }}>
                <span>Belgian</span>
            </div>
            <div className={friesType === "poutine" ? "sandwichOptionSelected" :"sandwichOption"} onClick={() => {
                setOnStep(onStep + 1)
                setFriesType("poutine")
                setPrice("6.00")
            }}>
                <span>Poutine</span>
            </div>
        </div>
            {friesType === "spicy" ? spiceTypeContent : <div></div>}
            <NextPrevButtons canProceed={friesType !== ""} step={onStep} top="10px" next={() => NextStep([friesType], true)} prev={() => PrevStep()} />
        </div>
    )
    
    const Level4Content = (
        <div>
            <h2>Cost: ${price}</h2>
            <Elements stripe={promise}>
                {onStep === 3 ? <CheckoutForm price={parseFloat(price) * 100} onComplete={assembleFries}/> : <div></div>}
            </Elements>
            <NextPrevButtons canProceed={false} top="10px" step={onStep} next={() => NextStep([name], true)} prev={() => PrevStep()} />
        </div>
    )
    const rootPanels = [
        { key: 'panel-1', title: `Step 1: Pickup or Delivery ${onStep > 0 ? "✓": ""}: ${isTakeout ? "Delivery" : "Pickup"}`, content: { content: Level1Content } },
        { key: 'panel-2', title: `Step 2: Name for the Order ${onStep > 1 ? "✓": ""}: ${name}`, content: { content: Level2Content } },
        { key: 'panel-3', title: `Step 3: Select Fries Type ${onStep > 2 ? "✓": ""}: ${friesType}`, content: { content: Level3Content } },
        { key: 'panel-4', title: `Step 4: Choose Payment Method: $${price}`, content: { content: Level4Content } },
    ]
    return(
        <div>
            <Accordion activeIndex={onStep} panels={rootPanels} styled />
        </div>
    )
}