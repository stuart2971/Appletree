import React from "react"
import { Grid, Divider, Statistic } from 'semantic-ui-react'

import AdminSandiwchCard from "./vendors/AdminSandwichCard.component"
import CustomerSandwichCard from "./vendors/CustomerSandwichCard.component"
import AdminFriesCard from "./vendors/AdminFriesCard.component"
import CustomerFriesCard from "./vendors/CustomerFriesCard.component"

export default class CustomerPage extends React.Component{
    render(){
        let sandwiches = this.props.sandwiches.map((order, index) => {
            if(order.phoneNumber === this.props.password )
                return <Grid.Column><AdminSandiwchCard order={order} isAdmin={false} queue={index+1} imgFile={this.props.profileImages[order.imageProfileNumber]}/></Grid.Column>
            else
                return <Grid.Column><CustomerSandwichCard name={order.name} queue={index+1} imgFile={this.props.profileImages[order.imageProfileNumber]} isCompleted={false}/></Grid.Column>
        })
        let fries = this.props.fries.map((order, index) => {
            if(order.phoneNumber === this.props.password )
                return <Grid.Column><AdminFriesCard order={order} isAdmin={false} queue={index+1} imgFile={this.props.profileImages[order.imageProfileNumber]}/></Grid.Column>
            else
                return <Grid.Column><CustomerFriesCard name={order.name} queue={index+1} imgFile={this.props.profileImages[order.imageProfileNumber]} isCompleted={false}/></Grid.Column>
        })
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
                            {sandwiches}
                        </Grid>
                        <Divider horizontal>Fries</Divider>
                        <Grid stackable columns={3}>
                            {fries}
                        </Grid> 
                        <Divider horizontal>Completed Orders</Divider>
                        <Grid stackable columns={3}>
                            {this.props.completedOrders.map((order, index) => 
                                <Grid.Column>
                                <CustomerSandwichCard
                                    name={order.name} 
                                    queue={index+1}
                                    imgFile={this.props.profileImages[order.imageProfileNumber]}
                                    isCompleted={true}/>
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