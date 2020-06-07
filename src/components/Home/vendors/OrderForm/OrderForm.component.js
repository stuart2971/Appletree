import React, {useState} from "react"
import { Header, Menu } from 'semantic-ui-react'


import "./OrderForm.css";
import SandwichOrderForm from "./SandwichOrderForm.component"
import FriesOrderForm from "./FriesOrderForm.component"
import SandwichAnimation from "./vendors/SandwichAnimation.component"


export default function OrderForm(){
    const [orderType, setOrderType] = useState("Sandwich")
    const [sandwich, setSandwich] = useState({toppings: [], spice: ""})
    const [width, setWidth] = React.useState(window.innerWidth);
    const breakpoint = 992;
    React.useEffect(() => {
        window.addEventListener("resize", () => setWidth(window.innerWidth));
      }, []);
    return(
        <section className="bg-lightGray section-padding">
            <div id="OrderForm"></div>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-6 col-xl-5 mb-4 mb-md-0">
                        {width > breakpoint ? <SandwichAnimation sandwich={sandwich} />: <div></div>}
                    </div>
                    <div className="col-md-6 offset-xl-2 col-xl-5">
                        <div className="search-wrapper">
                            <Header as='h1'>Make a Sandwich</Header>
                            <Menu tabular>
                                <Menu.Item name='Sandwich' active={orderType === 'Sandwich'} onClick={() => setOrderType("Sandwich")} />
                                <Menu.Item name='Fries' active={orderType === 'Fries'} onClick={() => setOrderType("Fries")} />
                            </Menu>
                            {orderType === "Sandwich" ? <SandwichOrderForm updateSandwich={setSandwich} /> : <FriesOrderForm />}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}