import React from "react"

import OrderItem from "./OrderItem.component"


export default class Orders extends React.Component{
    render(){
        return(
            <div>
                <section class="section-margin">
                    <div class="container">
                        <div class="section-intro mb-75px">
                            <h4 class="intro-title">Food Orders in Progress</h4>
                            <h2>Your order will be shown here</h2>
                        </div>
                        <div class="row">
                            <OrderItem />
                        </div>
                    </div>
                </section>
                <section class="cta-area text-center">
                    <div class="container">
                        <p>Some Trendy And Popular Courses Offerd</p>
                        <h2>Under repl enish give saying thing</h2>
                        <div class="white">
                            <a class="button" onclick="returnToOrder()">Order Now</a>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}