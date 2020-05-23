import React from "react";
import axios from "axios";
import { Grid, Image, Input } from 'semantic-ui-react'

import "../AdminOrderFormStyles.css"


export default class AdminSandwichOrderForm extends React.Component{
    constructor(props){
        super(props);
        this.state  = {
            name: "",
            sandwichType: "",
            cheeseType: "",
            spice: "",
            lettuce: false,
            tomato: false,
            cucumber: false,
            onion: false,
            price: "",
            orderAttempts: 0
        }
    }
    updateName(e, data) { this.setState({ name: data.value }) }
    SendOrder(){
        let {lettuce, tomato, cucumber, onion, orderAttempts, ...order} = this.state;
        if(order.name == "" |
           order.sandwichType == "" | 
           order.cheeseType == "" | 
           order.spice == ""){
               this.setState({ orderAttempts: this.state.orderAttempts + 1 })
               return
        }
        order.toppings = []
        if(this.state.lettuce) order.toppings.push("Lettuce")
        if(this.state.tomato) order.toppings.push("Tomato")
        if(this.state.cucumber) order.toppings.push("Cucumber")
        if(this.state.onion) order.toppings.push("Onion")
        order.address = "Dine in.  Order #";
        order.phoneNumber = Math.floor(Math.random() * 1000).toString();
        order.takeout = false;
        order.date = new Date();
        axios.post('https://appletree-express-server.herokuapp.com/sandwich/add', order)
            .then( (response, err) =>{
                this.setState({
                    name: "", 
                    sandwichType: "", 
                    cheeseType: "", 
                    spice: "", 
                    lettuce: false,
                    tomato: false,
                    cucumber: false,
                    onion: false,
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
        return(
            <div style={{padding: "30px"}}>
            <div style={{width:"50%", float:"left"}}>
            <Input value={this.state.name} className={this.state.name.split(" ").join("") == "" & attempts ? "missing_field": ""} fluid placeholder="First and Last Name" onChange={this.updateName.bind(this)} />
            <Grid columns="equal">
                <Grid.Row className={this.state.sandwichType == "" & attempts ? "missing_field": ""}>
                    <Grid.Column><Image className={this.state.sandwichType == "burger" ? "selected": ""} onClick={() => this.setState({ sandwichType: "burger", price: "4.87" })} src="/images/Home/featured2.jpg"/></Grid.Column>
                    <Grid.Column><Image className={this.state.sandwichType == "chicken" ? "selected": ""} onClick={() => this.setState({ sandwichType: "chicken", price: "4.87" })} src="/images/Home/chicken_sandwich.JPG"/></Grid.Column>
                    <Grid.Column><Image className={this.state.sandwichType == "falafel" ? "selected": ""} onClick={() => this.setState({ sandwichType: "falafel", price: "3.81" })} src="/images/Home/falafel.jpg"/></Grid.Column>
                </Grid.Row>
                <Grid.Row className={this.state.cheeseType == "" & attempts ? "missing_field": ""}>
                    <Grid.Column><Image className={this.state.cheeseType == "none" ? "selected": ""} onClick={() => this.setState({ cheeseType: "none" })} src="/images/Home/none.png"/></Grid.Column>
                    <Grid.Column><Image className={this.state.cheeseType == "cheddar" ? "selected": ""} onClick={() => this.setState({ cheeseType: "cheddar" })} src="/images/Home/cheddar.jpg"/></Grid.Column>
                    <Grid.Column><Image className={this.state.cheeseType == "mozzarella" ? "selected": ""} onClick={() => this.setState({ cheeseType: "mozzarella" })} src="/images/Home/mozzarella.jpg"/></Grid.Column>
                    <Grid.Column><Image className={this.state.cheeseType == "feta" ? "selected": ""} onClick={() => this.setState({ cheeseType: "feta" })} src="/images/Home/feta.jpg"/></Grid.Column>
                </Grid.Row>
                <Grid.Row className={this.state.spice == "" & attempts ? "missing_field": ""}>
                    <Grid.Column><h1 className={this.state.spice == "None" ? "selected": ""} onClick={() => this.setState({ spice: "None" })}>Not Spicy</h1></Grid.Column>
                    <Grid.Column><h1 className={this.state.spice == "A little spicy" ? "selected": ""} onClick={() => this.setState({ spice: "A little spicy" })}>A little Spicy</h1></Grid.Column>
                    <Grid.Column><h1 className={this.state.spice == "Medium Spicy" ? "selected": ""} onClick={() => this.setState({ spice: "Medium Spicy" })}>Medium</h1></Grid.Column>
                    <Grid.Column><h1 className={this.state.spice == "Spicy" ? "selected": ""} onClick={() => this.setState({ spice: "Spicy" })}>Spicy</h1></Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column><Image className={this.state.lettuce ? "selected": ""} onClick={() => this.setState({ lettuce: !this.state.lettuce })} src="/images/Home/lettuce.jpg"/></Grid.Column>
                    <Grid.Column><Image className={this.state.tomato ? "selected": ""} onClick={() => this.setState({ tomato: !this.state.tomato })} src="/images/Home/tomato.jpeg"/></Grid.Column>
                    <Grid.Column><Image className={this.state.cucumber ? "selected": ""} onClick={() => this.setState({ cucumber: !this.state.cucumber })} src="/images/Home/cucumber.jpg"/></Grid.Column>
                    <Grid.Column><Image className={this.state.onion? "selected": ""} onClick={() => this.setState({ onion: !this.state.onion })} src="/images/Home/onion.jpeg"/></Grid.Column>
                </Grid.Row>
            <button className="button border-0" onClick={this.SendOrder.bind(this)}>Send Order</button>

            </Grid>
            
            </div>
            <div style={{float:"right"}}>
                <h1>Sandwich</h1>
                <h3>Name {this.state.name}</h3>
                <h3>Sandwich Type: {this.state.sandwichType}</h3>
                <h3>Cheese Type: {this.state.cheeseType}</h3>
                <h3>Spice Level: {this.state.spice}</h3>
                <h3>Toppings: {this.state.lettuce ? "Lettuce": ""} {this.state.tomato ? "Tomato": ""} {this.state.cucumber ? "Cucumber": ""} {this.state.onion ? "Onion": ""}</h3>
                <h3>Price: ${this.state.price}</h3>
            </div>
            <br />
            </div>
        )
    }
}