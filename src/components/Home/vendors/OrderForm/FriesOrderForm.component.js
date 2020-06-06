import React, {useState} from "react"
import { Header, Input, Loader, Accordion } from 'semantic-ui-react'
import { NeuInput } from 'neumorphic-ui';

// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";

import { insertFries } from "./ProcessOrder";
import NextPrevButtons from "./vendors/NextPrevButtons.component";
import "./OrderForm.css"
// import CheckoutForm from "./PaymentSection.component"

// const promise = loadStripe("pk_test_7fLLDEMnamcBLNc24T2VCq5d");

export default function FriesOrderForm(){
    const [name, setName] = useState("")
    const [friesType, setFriesType] = useState("");
    const [spice, setSpice] = useState("a little");
    const [price, setPrice] = useState("0.00")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [address, setAddress] = useState("")
    const [onStep, setOnStep] = useState(0)
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [orderSuccessful, setOrderSuccessful] = useState(false);
    const assembleSandwich = () => {
        let fries = {
            name,
            friesType,
            spice,
            price,
            phoneNumber,
            address,
            takeout: true
        }
        if(isItTakeout()){
            fries.address = "Dine in.  Order #"; 
            fries.phoneNumber = Math.floor(Math.random() * 1000).toString()
            setPhoneNumber(fries.phoneNumber)
            fries.takeout = false;
        }
        setOrderPlaced(true)
        insertFries(fries, (res) => {
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
    const Level1Content = (
        <div>
            <div className="form-group">
                <Input fluid placeholder="First and Last Name" onChange={e => setName(e.target.value) } />
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
    const Level2Content = (
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
    const isItTakeout = () => {
        if(address === "" & phoneNumber === ""){
            return true
        }
        if(address !== "" & phoneNumber !== ""){
            if(phoneNumber.length === 10){
                return true
            }
        }
        return false
    }
    let isTakeout = isItTakeout()
    const Level3Content = (
        <div>
            <p className="inactiveText"><strong>ⓘ If your order is not a takeout order it will be assumed that you will be picking your order up at restaraunt location</strong></p>
            <Input className="margin10" fluid placeholder="Address" onChange={e => setAddress(noSpace(e.target.value))} />
            <Input className="margin10" fluid placeholder="Phone Number" icon="phone" onChange={e => setPhoneNumber(noSpace(e.target.value))} />
            <p style={{textAlign: "right"}}>I want my order to be <strong>{!isTakeout ? "delivered to me": "picked up at store location"}</strong></p>
            <NextPrevButtons canProceed={isTakeout} top="10px" step={onStep} next={() => NextStep([phoneNumber, address], false)} prev={() => PrevStep()} />
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
        { key: 'panel-1', title: `Step 1: Enter Personal Information ${onStep > 0 ? "✓": ""}`, content: { content: Level1Content } },
        { key: 'panel-2', title: `Step 2: Select Fries Type ${onStep > 1 ? "✓": ""}`, content: { content: Level2Content } },
        { key: 'panel-3', title: `Step 3: (Optional) Delivery Information ${onStep > 2 ? "✓": ""}`, content: { content: Level3Content } },
        { key: 'panel-4', title: 'Step 4: Choose Payment Method', content: { content: Level4Content } },
    ]
    const loadingMessages = [
        "Cutting Potatos...",
        "Deep Frying Fries...",
        "Salting Fries..."
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