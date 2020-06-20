import React, {useState} from "react"
import { Header, Grid } from 'semantic-ui-react'


import "./OrderForm.css";
import OrderForm from "./OrderForm.component"
import SandwichAnimation from "./vendors/SandwichAnimation.component"


export default function OrderFormContainer(){
    const [orderType, setOrderType] = useState("Sandwich")
    const [sandwich, setSandwich] = useState({toppings: [], spice: ""})
    const [width, setWidth] = React.useState(window.innerWidth);
    const breakpoint = 1200;
    React.useEffect(() => {
        window.addEventListener("resize", () => setWidth(window.innerWidth));
      }, []);
    return(
        <section className="bg-lightGray section-padding" style={{height: "110vh"}}>
            <div className="container">
                {width > breakpoint ? 
                    <SandwichAnimation sandwich={sandwich} /> : 
                    <div>
                        <div className="section-intro">
                            <h4 className="intro-title">Make an Order</h4>
                            <h2 className="mb-3">Create your own custom sandwich</h2>
                        </div>
                        <p>Please fill out all the blanks. A phone number will be required in order to confirm your order once it has been made. </p> 
                    </div>
                }
                <OrderForm updateSandwich={setSandwich} />         
            </div>
        </section>
    )
}