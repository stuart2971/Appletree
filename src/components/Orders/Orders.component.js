import React from "react"
import axios from "axios"
import { Grid, Image, Segment } from 'semantic-ui-react'

import AdminCard from "./AdminCard.component"
import CustomerCard from "./CustomerCard.component"


export default class Orders extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            orders: [],
            profileImages: ["ade.jpg", "chris.jpg", "daniel.jpg", "elliot.jpg", "matthew.png", "molly.png", "nan.jpg", "patrick.png", "rachel.png", "steve.jpg", "stevie.jpg", "veronika.jpg"]
        }
    }
    componentWillMount(){
        axios.get('/orders/show')
        .then((response, err) => {
            this.setState({ orders: response.data });
            console.log(this.state.orders)
        })
        .catch(function (error) {
            console.log(error)
        })
        .finally(function () {
            // always executed
        }); 
    }
    render(){
        let url = window.location.href
        let password = url.substring(url.lastIndexOf("/")+1)
        let cards;
        console.log()
        cards = this.state.orders.map((order, index) => {
            if(order.phoneNumber == password | password == "password")
                return(<Grid.Column><AdminCard name={order.name}
                                  address={order.address} 
                                  phoneNumber={order.phoneNumber} 
                                  sandwichType={order.sandwichType} 
                                  cheeseType={order.cheeseType} 
                                  spice={order.spice} 
                                  toppings={order.toppings} 
                                  price={order.price} 
                                  id={order._id} 
                                  isAdmin={password == "password"}
                                  queue={index+1}
                                  imgFile={this.state.profileImages[order.imageProfileNumber]}/></Grid.Column>)
            else
                return <Grid.Column><CustomerCard name={order.name} queue={index+1} imgFile={this.state.profileImages[order.imageProfileNumber]}/></Grid.Column>
        })
        return(
            <div>
                <section className="section-margin">
                    <div className="container">
                        <div className="section-intro mb-75px">
                            <h4 className="intro-title">Food Orders in Progress</h4>
                            <h2>Your order will be shown here</h2>
                        </div>
                        <div className="row">
                            
                            <Grid stackable columns={3}>
                                {cards}
                            </Grid>
                        </div>
                    </div>
                </section>
                <section className="cta-area text-center">
                    <div className="container">
                        <p>Some Trendy And Popular Courses Offerd</p>
                        <h2>Under repl enish give saying thing</h2>
                        <div className="white">
                            <a className="button" >Order Now</a>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}