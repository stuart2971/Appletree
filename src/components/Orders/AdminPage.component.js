import React from "react"
import axios from "axios"
import { Grid, Divider } from 'semantic-ui-react'

import AdminCard from "./AdminCard.component"

export default class AdminPage extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        let orders = this.props.orders
        return(
            <div>
                <section className="section-margin">
                    <div className="container">
                        <div className="section-intro mb-75px">
                            <h4 className="intro-title">Food Orders in Progress</h4>
                            <h2>Your order will be shown here</h2>
                        </div>
                        <Divider horizontal>Sandwiches</Divider>
                        <div className="row">
                            <Grid stackable columns={3}>
                                {orders.map((order, index) => 
                                    <Grid.Column>
                                    <AdminCard 
                                        order={order} 
                                        isAdmin={true}
                                        queue={index+1}
                                        imgFile={this.props.profileImages[order.imageProfileNumber]}/>
                                    </Grid.Column>)
                                }
                                
                            </Grid>
                        </div>
                        <Divider horizontal>Fries</Divider>
                        <Divider horizontal>Completed Orders</Divider>
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