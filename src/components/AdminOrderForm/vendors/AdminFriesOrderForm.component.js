import React from "react";
import axios from "axios";
import { Grid, Image, Input } from 'semantic-ui-react'

import "../AdminOrderFormStyles.css"


export default class AdminSandwichOrderForm extends React.Component{
    constructor(props){
        super(props);
        this.state  = {
            name: "",
            friesType: "",
            spice: "",
            price: "",
            orderAttempts: 0
        }
    }
    updateName(e, data) { this.setState({ name: data.value }) }
    SendOrder(){
        let {orderAttempts, ...order} = this.state;
        if(order.name == "" | order.friesType == "" ){
               this.setState({ orderAttempts: this.state.orderAttempts + 1 })
               return
        }
        order.address = "Dine in.  Order #";
        order.phoneNumber = Math.floor(Math.random() * 1000).toString();
        order.takeout = false;
        order.date = new Date();
        axios.post('/fries/add', order)
            .then( (response, err) =>{
                this.setState({
                    name: "", 
                    friesType: "", 
                    spice: "", 
                    price: "",
                    orderAttempts: 0
                })
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    render(){
        console.log(this.state)
        let attempts = this.state.orderAttempts > 0
        let spiceOptions = this.state.friesType == "spicy" ?
                            <Grid.Row className={this.state.spice == "" & attempts ? "missing_field": ""}>
                                <Grid.Column><h1 className={this.state.spice == "A little" ? "selected": ""} onClick={() => this.setState({ spice: "A little" })}>A little Spicy</h1></Grid.Column>
                                <Grid.Column><h1 className={this.state.spice == "Medium" ? "selected": ""} onClick={() => this.setState({ spice: "Medium" })}>Medium</h1></Grid.Column>
                                <Grid.Column><h1 className={this.state.spice == "Very" ? "selected": ""} onClick={() => this.setState({ spice: "Very" })}>Spicy</h1></Grid.Column>
                            </Grid.Row>:<div></div>
        return(
            <div style={{padding: "30px"}}>
            <div style={{width:"50%", float:"left"}}>
            <Input value={this.state.name} className={this.state.name.split(" ").join("") == "" & attempts ? "missing_field": ""} fluid placeholder="First and Last Name" onChange={this.updateName.bind(this)} />
            <Grid columns="equal">
                <Grid.Row className={this.state.friesType == "" & attempts ? "missing_field": ""}>
                    <Grid.Column><Image className={this.state.friesType == "regular" ? "selected": ""} onClick={() => this.setState({ friesType: "regular", spice: "None", price: "4.00" })} src="/images/Home/regular.jpeg"/></Grid.Column>
                    <Grid.Column><Image className={this.state.friesType == "spicy" ? "selected": ""} onClick={() => this.setState({ friesType: "spicy", spice: "", price: "4.50" })} src="/images/Home/spicyFries.jpg"/></Grid.Column>
                    <Grid.Column><Image className={this.state.friesType == "belgian" ? "selected": ""} onClick={() => this.setState({ friesType: "belgian", spice: "None", price: "5.00" })} src="/images/Home/belgian.jpg"/></Grid.Column>
                    <Grid.Column><Image className={this.state.friesType == "poutine" ? "selected": ""} onClick={() => this.setState({ friesType: "poutine", spice: "None", price: "5.50" })} src="/images/Home/poutine.jpg"/></Grid.Column>
                </Grid.Row>
                {spiceOptions}
            <button className="button border-0" onClick={this.SendOrder.bind(this)}>Send Order</button>

            </Grid>
            
            </div>
            <div style={{float:"right"}}>
                <h1>Sandwich</h1>
                <h3>Name {this.state.name}</h3>
                <h3>Fries Type: {this.state.friesType}</h3>
                {this.state.spice != "None"? <h3>Spice: {this.state.spice}</h3>: ""}
                <h3>Price: ${this.state.price}</h3>
            </div>
            <br />
            </div>
        )
    }
}