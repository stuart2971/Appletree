import React from "react"
import { Grid, Divider, Statistic } from 'semantic-ui-react'

import AdminCard from "./vendors/AdminCard.component"


export default class AdminPage extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        let sandwiches = this.props.sandwiches
        return(
            <div>
                <section className="section-margin">
                    <div className="container">
                        <div className="section-intro mb-75px">
                            <h4 className="intro-title">Food Orders in Progress</h4>
                            <h2>Your order will be shown here</h2>
                        </div>
                        <Statistic size={"large"}>
                            <Statistic.Label>Order Next: </Statistic.Label>
                            <Statistic.Value>#{this.props.nextInQueue}</Statistic.Value>
                        </Statistic>
                        <Divider horizontal>Sandwiches</Divider>
                            <Grid stackable columns={3}>
                                {sandwiches.map((order, index) => 
                                    <Grid.Column>
                                    <AdminCard 
                                        order={order} 
                                        isAdmin={true}
                                        queue={index+1}
                                        imgFile={this.props.profileImages[order.imageProfileNumber]}/>
                                    </Grid.Column>)
                                }
                                
                            </Grid>
                        <Divider horizontal>Fries</Divider>
                        <Divider horizontal>Completed Orders</Divider>
                        <Grid stackable columns={3}>
                            {this.props.completedOrders.map((order, index) => 
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