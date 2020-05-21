import React from "react"
import { Header, Dropdown, Input, Checkbox, Segment, Form, Loader, Label, Radio } from 'semantic-ui-react'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { insertSandwich } from "./ProcessOrder";
import CheckoutForm from "./PaymentSection.component"

const promise = loadStripe("pk_test_7fLLDEMnamcBLNc24T2VCq5d");

export default class SandwichOrderForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            name: "",
            phoneNumber: "",
            address: "",
            sandwichType: "",
            cheeseType: "",
            spice: "None",
            toppings: [],
            price: "0.00",
            takeout: false,
            dropdownSandwichOptions: [{
                  key: 'chicken',
                  text: 'Chicken',
                  value: 'chicken',
                  image: { avatar: true, src: '/images/Home/chicken_sandwich.JPG' },
                },{
                  key: 'burger',
                  text: 'Burger',
                  value: 'burger',
                  image: { avatar: true, src: '/images/Home/featured2.jpg' },
                },{
                  key: 'falafel',
                  text: 'Falafel',
                  value: 'falafel',
                  image: { avatar: true, src: '/images/Home/food1.png' },
                }
            ],
            dropdownCheeseOptions: [{
                key: 'Cheddar',
                text: 'Cheddar',
                value: 'Cheddar',
                image: { avatar: true, src: '/images/Home/cheddar.jpg' },
            },{
                key: 'Mozzarella',
                text: 'Mozzarella',
                value: 'Mozzarella',
                image: { avatar: true, src: '/images/Home/mozzarella.jpg' },
            },{
                key: 'Feta',
                text: 'Feta',
                value: 'Feta',
                image: { avatar: true, src: '/images/Home/feta.jpg' },
            },{
                key: 'None',
                text: 'None',
                value: 'None',
                image: { avatar: true, src: '/images/Home/none.png' },
                }
            ],
            orderSuccessful: false,
            orderAttempts: 0,
            orderPlaced: false,
            loaded:false
        }
    }
    paymentForm(){
        return CheckoutForm();
    }
    assembleSandwich(){
        //Credits to https://stackoverflow.com/questions/34698905/how-can-i-clone-a-javascript-object-except-for-one-key        
        //Gets state except for certain values
        
        let {dropdownSandwichOptions, dropdownCheeseOptions, loaded, ...sandwich} = this.state;
        if(!this.state.takeout){
            sandwich.address = "Dine in.  Order #"; 
            sandwich.phoneNumber = Math.floor(Math.random() * 1000).toString()
            this.setState({ phoneNumber: sandwich.phoneNumber })
        }
        if(sandwich.name.split(" ").join("") == "" |
           sandwich.phoneNumber.split(" ").join("") == "" | 
           sandwich.address.split(" ").join("") == "" |
           sandwich.sandwichType == "" | 
           sandwich.cheeseType == ""){
               this.setState({ orderAttempts: this.state.orderAttempts + 1 })
               return
        }
        
        this.setState({ orderPlaced: true})
        insertSandwich(sandwich, (res) => {
            if(res.status == 200)
                this.setState({ orderSuccessful: true})
        });
    }
    checkInput(emptyBlank){
        if(this.state.takeout & (this.state.address === "" | this.state.phoneNumber === "")) return
        if(emptyBlank & this.state.orderAttempts > 0)
            return <Label pointing>Please enter a value</Label>;
    }
    updateTextBox(e, data){
        if(data.placeholder == "First and Last Name")
            this.setState({ name: data.value });
        if(data.placeholder == "Phone Number")
            this.setState({ phoneNumber: data.value });
        if(data.placeholder == "Address")
            this.setState({ address: data.value });    
    }
    updateDropDown(e, data){
        if(data.placeholder == "Sandwich Type"){
            let sandwichPrice = data.value == "burger" | data.value == "chicken" ? "4.87" : "3.81";
            this.setState({ price: sandwichPrice, sandwichType: data.value })
        }
        if(data.placeholder == "Cheese Type"){
            this.setState({ cheeseType: data.value })
        }
    }
    updateToppings(e, data){
        let newToppings = this.state.toppings;
        if(newToppings.includes(data.label)){
            newToppings.splice(newToppings.indexOf(data.label), 1);
        }else{
            newToppings.push(data.label)
        }
        this.setState({ toppings: newToppings })
    }
    updateSpice (e, spice){ this.setState({ spice: spice.value }) }
    showOrderMessage(){
        
        if(this.state.orderSuccessful)
            return (
                <Segment inverted color='green' onClick={this.redirect.bind(this)}>
                    Order Placed.  Click here to go see your order
                </Segment>
            )
        if(!this.state.orderSuccessful & this.state.orderPlaced)
            return <Loader active inline />
    }
    redirect(){
        let path = window.location.href
        window.location = path.substring(0, path.lastIndexOf("/")) + "/ShowOrders/" + this.state.phoneNumber
    }
    triggerTakeout(){ this.setState({ takeout: !this.state.takeout }) }
    render(){
        let isTakeout = this.state.takeout ?
            <div><div className="form-group">
                <Input fluid placeholder="Address" onChange={this.updateTextBox.bind(this)} />
                {this.checkInput(this.state.address.split(" ").join("") === "")}
            </div>
            <div className="form-group">
                <Input fluid placeholder="Phone Number" icon="phone" onChange={this.updateTextBox.bind(this)} />
                {this.checkInput(this.state.phoneNumber.split(" ").join("") === "")}
            </div></div>:<div></div>
        
        return(
            <div>
                <div className="form-group">
                    <Checkbox label='Takeout' onChange={this.triggerTakeout.bind(this)}/>
                    <Input fluid placeholder="First and Last Name" onChange={this.updateTextBox.bind(this)} />
                    {this.checkInput(this.state.name.split(" ").join("") === "")}
                </div>
                {isTakeout}
                <div className="form-group">
                    <div className="input-group">
                        <Dropdown
                        placeholder="Sandwich Type"
                        fluid
                        selection
                        options={this.state.dropdownSandwichOptions}
                        onChange={this.updateDropDown.bind(this)}
                        />
                        {this.checkInput(this.state.sandwichType === "")}
                    </div>
                </div>
                <div className="form-group">
                    <div className="input-group">
                        <Dropdown
                        placeholder="Cheese Type"
                        fluid
                        selection
                        options={this.state.dropdownCheeseOptions}
                        onChange={this.updateDropDown.bind(this)}
                        />
                        {this.checkInput(this.state.cheeseType === "")}
                    </div>
                </div>

                <Segment>
                    <Form>
                        <Form.Field>Spice Level: </Form.Field>
                        <Form.Field>
                        <Radio
                            label='None'
                            name='radioGroup'
                            value='None'
                            checked={this.state.spice === 'None'}
                            onChange={this.updateSpice.bind(this)}
                        />
                        </Form.Field>
                        <Form.Field>
                        <Radio
                            label='A Little Spicy'
                            name='radioGroup'
                            value='A little spicy'
                            checked={this.state.spice === 'A little spicy'}
                            onChange={this.updateSpice.bind(this)}
                        />
                        </Form.Field>
                        <Form.Field>
                        <Radio
                            label='Medium Spicy'
                            name='radioGroup'
                            value='Medium spicy'
                            checked={this.state.spice === 'Medium spicy'}
                            onChange={this.updateSpice.bind(this)}
                        />
                        </Form.Field>
                        <Form.Field>
                        <Radio
                            label='Spicy'
                            name='radioGroup'
                            value='Spicy'
                            checked={this.state.spice === 'Spicy'}
                            onChange={this.updateSpice.bind(this)}
                        />
                        </Form.Field>
                    </Form>
                </Segment>

                <div className="form-group">
                <Segment>
                    <Form>
                        <Header as='h2'>Toppings</Header>
                        <Form.Field>
                        Selected value: <b>{this.state.value}</b>
                        </Form.Field>
                        <Form.Field>
                            <Checkbox label='Lettuce' onChange={this.updateToppings.bind(this)}/>
                        </Form.Field>
                        <Form.Field>
                            <Checkbox label='Tomato' onChange={this.updateToppings.bind(this)}/>
                        </Form.Field>
                        <Form.Field>
                            <Checkbox label='Cucumber' onChange={this.updateToppings.bind(this)}/>
                        </Form.Field>
                        <Form.Field>
                            <Checkbox label='Onion' onChange={this.updateToppings.bind(this)}/>
                        </Form.Field>
                    </Form>
                </Segment>
                </div>
                

                {this.showOrderMessage()}
                <Elements stripe={promise}>
                    <CheckoutForm />
                </Elements>
                <Header as='h3'>Price: ${this.state.price}</Header>

            </div>
        )
    }
}
// <div id="order_button" className="form-group form-group-position">
//     <button type="submit" className="button border-0" onClick={this.assembleSandwich.bind(this)}>Order Now</button>
// </div>