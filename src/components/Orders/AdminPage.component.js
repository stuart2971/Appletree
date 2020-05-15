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
            if(order.sandwichType == undefined){
                return (
                    <Grid.Column>
                        <AdminFriesCard 
                            order={order} 
                            isAdmin={true}
                            queue={index+1}
                            imgFile={this.props.profileImages[order.imageProfileNumber]}/>
                    </Grid.Column>
                )
            }else{
                return (
                    <Grid.Column>
                        <AdminSandwichCard 
                            order={order} 
                            isAdmin={true}
                            queue={index+1}
                            imgFile={this.props.profileImages[order.imageProfileNumber]}/>
                    </Grid.Column>
                ) 
            }
            
        });
    }
    renderNextInQueue(sandwiches, fries){
        if(sandwiches.length != 0 & fries.length != 0){
        let sandwichNextInQueue = sandwiches[0].phoneNumber;
        let friesNextInQueue = fries[0].phoneNumber
        return (
            <Grid columns={2} divided>
                <Grid.Row>
                    <Grid.Column>
                        <h1>Upcoming Sandwich: {sandwichNextInQueue.length < 10 ? `#${sandwichNextInQueue}`: `Takeout.  Phone #${sandwichNextInQueue}`}</h1>
                    </Grid.Column>
                    <Grid.Column>
                        <h1>Upcoming Fries: {friesNextInQueue.length < 10 ? `#${friesNextInQueue}`: `Takeout.  Phone #${friesNextInQueue}`}</h1>
                    </Grid.Column>
                </Grid.Row>
                
                <Grid.Row>
                    <Grid.Column>
                        <AdminSandwichCard 
                            order={sandwiches[0]} 
                            isAdmin={true}
                            queue={"In Progress"}
                            imgFile={this.props.profileImages[sandwiches[0].imageProfileNumber]}/>
                    </Grid.Column>
                    <Grid.Column>
                        <AdminFriesCard 
                            order={fries[0]} 
                            isAdmin={true}
                            queue={"In Progress"}
                            imgFile={this.props.profileImages[fries[0].imageProfileNumber]}/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
        }else return <div></div>
    }
    render(){
        let sandwiches = this.props.sandwiches
        let fries = this.props.fries
        console.log(sandwiches)
        return(
            <div>
                <section className="section-margin">
                    <div className="container">
                        <div className="section-intro mb-75px">
                            <h4 className="intro-title">Food Orders in Progress</h4>
                            <h2>Your order will be shown here</h2>
                        </div>
                        {this.renderNextInQueue(sandwiches, fries)}
                        
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