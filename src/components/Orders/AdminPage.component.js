import React from "react"
import { Grid, Divider, Statistic } from 'semantic-ui-react'

import AdminSandwichCard from "./vendors/AdminSandwichCard.component"
import AdminFriesCard from "./vendors/AdminFriesCard.component"

export default class AdminPage extends React.Component{
    constructor(props){
        super(props)
    }
    SortCompletedOrders(){
        return this.props.completedOrders.map((order, index) =>{ 
            console.log(order.sandwichType)
            if(order.sandwichType == undefined){
                return (
                <AdminFriesCard 
                    order={order} 
                    isAdmin={true}
                    queue={index+1}
                    imgFile={this.props.profileImages[order.imageProfileNumber]}/>
                )
            }else{
                return (
                    <AdminSandwichCard 
                        order={order} 
                        isAdmin={true}
                        queue={index+1}
                        imgFile={this.props.profileImages[order.imageProfileNumber]}/>
                    ) 
            }
            
        });
    }
    render(){
        let sandwiches = this.props.sandwiches
        let fries = this.props.fries
        return(
            <div>
                <section className="section-margin">
                    <div className="container">
                        <div className="section-intro mb-75px">
                            <h4 className="intro-title">Food Orders in Progress</h4>
                            <h2>Your order will be shown here</h2>
                        </div>
                        <Statistic size={"large"}>
                            <Statistic.Label>Now Serving: </Statistic.Label>
                            <Statistic.Value>#{this.props.nextInQueue}</Statistic.Value>
                        </Statistic>
                        <Divider horizontal>Sandwiches</Divider>
                            <Grid stackable columns={3}>
                                {sandwiches.map((order, index) => 
                                    <Grid.Column>
                                    <AdminSandwichCard 
                                        order={order} 
                                        isAdmin={true}
                                        queue={index+1}
                                        imgFile={this.props.profileImages[order.imageProfileNumber]}/>
                                    </Grid.Column>)
                                }
                                
                            </Grid>
                        <Divider horizontal>Fries</Divider>
                            <Grid columns={3}>
                                {fries.map((order, index) => 
                                    <Grid.Column>
                                    <AdminFriesCard 
                                        order={order} 
                                        isAdmin={true}
                                        queue={index+1}
                                        imgFile={this.props.profileImages[order.imageProfileNumber]}/>
                                    </Grid.Column>)
                                }
                            </Grid>
                        <Divider horizontal>Completed Orders</Divider>
                        <Grid stackable columns={3}>
                            {this.SortCompletedOrders()}
                        </Grid>
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