import React from "react"

import "./OrderForm.css";
//TODO: 
//Learn how to get jsx data from id or something (might wanna look into refs)
//Hook up the whole orderForm page to work properly


export default class OrderForm extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            spiciness: "Not spicy"
        }
    }
    updateSpiciness(e){
        let spiceLevels = ["Not spicy", "Sort of spicy", "Medium spicy", "Spicy", "Very spicy"]
        this.setState({
            spiciness: spiceLevels[e.target.value-1]
        })
    }
    makeSandwich(e){

    }
    render(){
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
                                <h3>Make a Sandwich</h3>

                                <div className="form-group">
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Your Name" id="name" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Phone Number" id="phone" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="input-group">
                                        <select className="custom-select" onchange="changePrice(this.value)" id="SandwichType">
                                            <option disabled selected value="">Please Choose a Sandwich Type</option>
                                            <option value="Burger">Burger</option>
                                            <option value="Chicken">Chicken</option>
                                            <option value="Falafel">Falafel</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="input-group">
                                        <select className="custom-select" id="cheese">
                                            <option disabled selected value="">Please Choose a Cheese Type</option>
                                            <option value="Cheddar">Cheddar</option>
                                            <option value="Mozzarella">Mozzarella</option>
                                            <option value="Feta">Feta</option>
                                            <option value="None">None</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="input-group">
                                        <div className="Spiciness">
                                            Spiciness:
                                            <input className="slider" onChange={(e) => {this.updateSpiciness(e, this.value)}} id="spiciness" type="range" min="1" max="5" defaultValue="1" name="spiceSlider"/>
                                                
                                            <span id="spiceIndicator">{this.state.spiciness}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="input-group">
                                        <div className="Toppings">
                                            Toppings:
                                            <br />
                                            <input className="topping" type="checkbox" id="topping1" value="Lettuce" name="topping" />
                                            Lettuce
                                            <br />
                                            <input className="topping" type="checkbox" id="topping2" value="Tomato" name="topping" />
                                            Tomato
                                            <br />
                                            <input className="topping" type="checkbox" id="topping3" value="Cucumber" name="topping" /> Cucumber
                                            <br />
                                            <input className="topping" type="checkbox" id="topping4" value="Onion" name="topping" />
                                            Onion
                                            <br />
                                        </div>
                                    </div>
                                </div>
                                <h4 className="white">Total Cost:</h4>
                                <h3 id="price">$0.00 </h3>
                                <div id="order_button" className="form-group form-group-position">
                                    <button className="button border-0" onclick="">Order Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}