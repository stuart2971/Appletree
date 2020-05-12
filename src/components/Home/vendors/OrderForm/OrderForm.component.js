import React from "react"
import { Header, Menu } from 'semantic-ui-react'


import "./OrderForm.css";
import SandwichOrderForm from "./SandwichOrderForm.component"
import FriesOrderForm from "./FriesOrderForm.component"


export default class OrderForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            orderType: "Sandwich"
        }
    }
    changeOrderType(e, { name }){ this.setState({ orderType: name }) }
    render(){  
        let orderType = this.state.orderType
        let orderForm = orderType == "Sandwich" ? <SandwichOrderForm /> : <FriesOrderForm />
        return(
            <section className="bg-lightGray section-padding">
                <div id="OrderForm"></div>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6 col-xl-5 mb-4 mb-md-0">
                            <div className="section-intro">
                                <h4 className="intro-title">Make an Order</h4>
                                <h2 className="mb-3">Create your own custom sandwich</h2>
                            </div>
                            <p>Please fill out all the blanks. A phone number will be required in order to confirm your order
                                once it has been made. </p>
                        </div>
                        <div className="col-md-6 offset-xl-2 col-xl-5">
                            <div className="search-wrapper">
                                <Header as='h1'>Make a Sandwich</Header>
                                <Menu tabular>
                                    <Menu.Item name='Sandwich' active={orderType === 'Sandwich'} onClick={this.changeOrderType.bind(this)} />
                                    <Menu.Item name='Fries' active={orderType === 'Fries'} onClick={this.changeOrderType.bind(this)} />
                                </Menu>
                                {orderForm}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}