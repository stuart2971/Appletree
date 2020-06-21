import React, {useState} from "react"
import { Header, Grid } from 'semantic-ui-react'


import "./OrderForm.css";
import OrderForm from "./OrderForm.component"
import SandwichAnimation from "./vendors/SandwichAnimation.component"


export default function OrderFormContainer(){
    const [sandwiches, setSandwiches] = useState([ {toppings: [], spice: ""} ])
    const [width, setWidth] = useState(window.innerWidth);
    const breakpoint = 1200;
    React.useEffect(() => {
        window.addEventListener("resize", () => setWidth(window.innerWidth));
    }, []);
    function updateSandwiches(items){
        let arr = [...items]
        setSandwiches(arr);
    }
    function renderSandwichAnimation(){
        return sandwiches.map((sandwich, index) => {
            return <div>{sandwich.orderType === "sandwich" ? <SandwichAnimation top={index} s={sandwich} />: <div></div>}</div>
        })
    }
    return(
        <section className="section-padding orderFormContainer">
            <div className="container">
                {width > breakpoint ? 
                    <div style={{marginTop: "200px", float: "left", width: "100px", height: "100px"}}>
                        {renderSandwichAnimation()}
                    </div>
                    : <div>
                        <div className="section-intro">
                            <h4 className="intro-title">Make an Order</h4>
                            <h2 className="mb-3">Create your own custom sandwich</h2>
                        </div>
                        <p>Please fill out all the blanks. A phone number will be required in order to confirm your order once it has been made. </p> 
                    </div>
                }
                <OrderForm updateSandwiches={updateSandwiches} />         
            </div>
        </section>
    )
}