import React, {useState} from "react"
import { Input, Accordion, Message, Grid } from 'semantic-ui-react'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import "./OrderForm.css"

import { insertSandwich, insertFries } from "./ProcessOrder";
import NextPrevButtons from "./vendors/NextPrevButtons.component";
import CheckoutForm from "./vendors/CheckoutForm.component"
import SandwichFry from "./vendors/SandwichFry.component"
import SandwichCheckout from "./vendors/SandwichCheckout.component";
import FriesCheckout from "./vendors/FriesCheckout.component";


const promise = loadStripe("pk_test_7fLLDEMnamcBLNc24T2VCq5d");

export default function OrderForm({updateSandwich}){
    const [name, setName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [address, setAddress] = useState("")
    const [isTakeout, setIsTakeout] = useState(false)
    const [price, setPrice] = useState("0.00")
    const [items, setItems] = useState([{toppings: []}])
    
    const [itemBlank, setItemBlank] = useState(0)
    const [orderSuccessful, setOrderSuccessful] = useState(false)
    const [onStep, setOnStep] = useState(0)
    const [validTakeout, setValidTakeout] = useState(false)

    const postOrders = () => {
        let orderInfo = {
            name,
            phoneNumber,
            address,
            takeout: isTakeout
        }
        if(!orderInfo.takeout){
            let OrderNumber =  Math.floor(Math.random() * 10000).toString()
            orderInfo.address = "Dine in.  Order #"; 
            orderInfo.phoneNumber = OrderNumber
            setPhoneNumber(OrderNumber)
        }
        for(let i = 0; i < items.length; i++){
            orderInfo.name = `${name} #${i + 1}`
            let completeOrder = {...items[i], ...orderInfo}
            if(items[i].sandwichType !== undefined){
                insertSandwich(completeOrder, (res) => {
                    if(res.status == 200)
                        setOrderSuccessful(true)
                });
            }
            if(items[i].friesType !== undefined){
                console.log(items[i])
                insertFries(completeOrder, (res) => {
                    if(res.status == 200)
                        setOrderSuccessful(true)
                });
            }
        }
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
    const redirect = () => {
        let path = window.location.href
        window.location = path.substring(0, path.lastIndexOf("/")) + "/ShowOrders/" + phoneNumber
    }
    const noSpace = (text) => {
        return text.split(" ").join("")
    }
    const isValidTakeout = () => {
        if(address !== "" && phoneNumber !== ""){
            //adds one to length because it checks the length before updating the state.  IDK how to fix.  
            if(phoneNumber.length + 1 === 10){
                return true
            }
        }
        return false
    }
    const updateItems = (index, item) => {
        let arr = items;
        arr.splice(index, 1, item);
        setItems(arr);
        areItemsCompleted()
    }
    const calculatePrice = () => {
        let price = 0;
        for(let i = 0; i < items.length; i++){
            price += parseFloat(items[i].price)
        }
        return price.toFixed(2);
    }
    const areItemsCompleted = () => {
        console.log(items)
        for(let i = 0; i < items.length; i++){
            let item = items[i];
            if(item.orderType === "sandwich"){
                if(item.sandwichType === "" ||
                    item.cheeseType === "" ||
                    item.spice === ""){
                    setItemBlank(i)
                    return;
                }
            }
            console.log(item)
            if(item.orderType === "fries"){
                if(item.friesType === "" ||
                (item.friesType === "spicy" && item.spice === "") ||
                (item.friesType  === "belgian" && item.mayoType === "none")){
                    setItemBlank(i)
                    return;
                }
            }
            if(item.orderType === undefined){
                setItemBlank(i)
                return;
            }
        }
        setItemBlank(-1)
    }
    const removeItem = (index) => {
        let arr = items;
        arr.splice(index, 1)
        setItems(arr)
        areItemsCompleted()
    }
    const Level1Content = (
        <div>
        <div style={{verticalAlign: "middle", display: "inline-block"}}>
            <span style={{float: "left"}}>I want my order to be </span>
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
                    }} />
                </form>: 
                <div></div>
            }
            <NextPrevButtons canProceed={!isTakeout || (isTakeout && validTakeout)} top="10px" step={onStep} next={() => NextStep([phoneNumber, address], false)} prev={() => PrevStep()} />
        </div>
    )
    
    const Level2Content = (
        <div>
            <div className="form-group">
                <form autofill="off">
                    <Input fluid placeholder="Name" onChange={e => setName(e.target.value) } />
                </form>
                <NextPrevButtons canProceed={noSpace(name) !== ""} step={onStep} top="18px" next={() => NextStep([name], true)} prev={() => PrevStep()} />
            </div>         
        </div>
    )
    const Level3Content = (
        <div className="itemOptions">
            <Grid columns={1} centered>
                <Grid.Row>
                    {items.map((item, index) => {
                        return <SandwichFry item={item} removeItem={removeItem} itemNumber={index} updateItems={updateItems} />
                    })}
                    
                    <div className="addItemOption" onClick={() => {
                        setItems( items.concat([{toppings: []}]))
                        setItemBlank(items.length - 1)
                    }}>
                        <span>+ Add Item</span>
                    </div>
                    <NextPrevButtons canProceed={itemBlank === -1} step={onStep} top="10px" next={() => NextStep([], true)} prev={() => PrevStep()} />
                </Grid.Row>
            </Grid>
        </div>
    )
    
    const Level4Content = (
        <div>
            <h3>Your Items ({items.length})</h3>
            {items.map((item, index) => {
                if(item.sandwichType !== undefined){
                    return <SandwichCheckout sandwich={item} itemNumber={index} />
                }else{
                    return <FriesCheckout fries={item} itemNumber={index} />
                }
            })}
            <h2>Cost: ${calculatePrice()}</h2>
            <Elements stripe={promise}>
                {onStep === 3 ? <CheckoutForm price={parseFloat(calculatePrice()) * 100} onComplete={postOrders}/> : <div></div>}
            </Elements>
            {orderSuccessful ? 
                <Message positive onClick={redirect}>
                    <Message.Header>Order Placed!</Message.Header>
                    <p>Click here to go <b>see your order</b></p>
                </Message>:
                <div></div>
            }
            <NextPrevButtons canProceed={false} top="10px" step={onStep} prev={() => PrevStep()} />
        </div>
    )
    const rootPanels = [
        { key: 'panel-1', title: `Step 1: Pickup or Delivery ${onStep > 0 ? "✓": ""}: ${isTakeout ? "Delivery" : "Pickup"}`, content: { content: Level1Content } },
        { key: 'panel-2', title: `Step 2: Name for the Order ${onStep > 1 ? "✓": ""}: ${name}`, content: { content: Level2Content } },
        { key: 'panel-3', title: `Step 3: Build your Sandwich ${onStep > 2 ? "✓": ""}`, content: { content: Level3Content } },
        { key: 'panel-4', title: `Step 4: Enter Payment Details: $${price}`, content: { content: Level4Content } },
    ]
    return(
        <div className="OrderForm">
            <Accordion activeIndex={onStep} panels={rootPanels} styled />
        </div>
    )
}