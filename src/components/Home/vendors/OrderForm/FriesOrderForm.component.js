import React from "react"
import { Header, Dropdown, Input, Checkbox, Segment, Form, Loader, Label, Radio } from 'semantic-ui-react'

import { insertFries } from "./ProcessOrder"

export default class FriesOrderForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            name: "",
            phoneNumber: "",
            address: "",
            spice: "A little",
            friesType: "",
            price: "0.00",
            takeout: false,
            orderSuccessful: false,
            orderAttempts: 0,
            orderPlaced: false,
            dropdownFriesOptions: [{
                  key: 'Regular',
                  text: 'Regular',
                  value: 'regular',
                  image: { avatar: true, src: '/images/Home/chicken_sandwich.JPG' },
                },{
                  key: 'Spicy',
                  text: 'Spicy',
                  value: 'spicy',
                  image: { avatar: true, src: '/images/Home/featured2.jpg' },
                },{
                  key: 'Belgian',
                  text: 'Belgian',
                  value: 'belgian',
                  image: { avatar: true, src: '/images/Home/food1.png' },
                },{
                    key: 'Poutine',
                    text: 'Poutine',
                    value: 'poutine',
                    image: { avatar: true, src: '/images/Home/food1.png' },
                }
            ]
        }
    }
    assembleFries(){
        let {orderAttempts, orderPlaced, orderSuccessful, dropdownFriesOptions, ...order} = this.state
        if(!this.state.takeout) {
            order.address = "Dine in.  ";
            order.phoneNumber = Math.floor(Math.random() * 1000).toString()
            this.setState({ phoneNumber: order.phoneNumber })
        }
        if(order.name.split(" ").join("") == "" |
           order.phoneNumber.split(" ").join("") == "" | 
           order.address.split(" ").join("") == "" |
           order.friesType == ""){
               this.setState({ orderAttempts: this.state.orderAttempts + 1 })
               return
        }
        console.log(order)
        this.setState({ orderPlaced: true})
        insertFries(order, (res) => {
            console.log(res)
            if(res.status == 200)
                this.setState({ orderSuccessful: true})
        })
    }
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
    updateTextBox(e, data){
        if(data.placeholder == "First and Last Name")
            this.setState({ name: data.value });
        if(data.placeholder == "Phone Number")
            this.setState({ phoneNumber: data.value });
        if(data.placeholder == "Address")
            this.setState({ address: data.value });    
    }
    updateDropDown(e, data){
        let price;
        if(data.value == "regular") price = "4.00";
        if(data.value == "spicy") price = "4.50";
        if(data.value == "belgian") price = "5.00";
        if(data.value == "poutine") price = "5.50";

        this.setState({ price, friesType: data.value })
    }
    triggerTakeout(){ this.setState({ takeout: !this.state.takeout }) }
    updateSpice (e, spice){ this.setState({ spice: spice.value }) }
    checkInput(emptyBlank){
        if(emptyBlank & this.state.orderAttempts > 0)
            return <Label pointing>Please enter a value</Label>;
    }
    render(){
        let isTakeout = this.state.takeout ?
            <div><div className="form-group">
                <Input fluid placeholder="Address" onChange={this.updateTextBox.bind(this)} />
                {this.checkInput(this.state.address.split(" ").join("") === "")}
            </div>
            <div className="form-group">
                <Input fluid placeholder="Phone Number" icon="phone" onChange={this.updateTextBox.bind(this)} />
                {this.checkInput(this.state.phoneNumber.split(" ").join("") === "")}
            </div></div> : <div></div>
        let spiceLevel = this.state.friesType == "spicy" ? 
        <Segment>
            <Form>
                <Form.Field>Spice Level: </Form.Field>
                <Form.Field>
                    <Radio
                        label='A Little Spicy'
                        name='radioGroup'
                        value='A little'
                        checked={this.state.spice === 'A little'}
                        onChange={this.updateSpice.bind(this)}
                    />
                </Form.Field>
                <Form.Field>
                    <Radio
                        label='Medium Spicy'
                        name='radioGroup'
                        value='Medium'
                        checked={this.state.spice === 'Medium'}
                        onChange={this.updateSpice.bind(this)}
                    />
                </Form.Field>
                <Form.Field>
                    <Radio
                        label='Spicy'
                        name='radioGroup'
                        value='Very'
                        checked={this.state.spice === 'Very'}
                        onChange={this.updateSpice.bind(this)}
                    />
                </Form.Field>
            </Form>
        </Segment> : <div></div>
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
                        placeholder="Type of Fries"
                        fluid
                        selection
                        options={this.state.dropdownFriesOptions}
                        onChange={this.updateDropDown.bind(this)}
                        />
                        {this.checkInput(this.state.friesType.split(" ").join("") === "")}  
                    </div>
                </div>
                {spiceLevel}
                <Header as='h3'>Price: ${this.state.price}</Header>
                {this.showOrderMessage()}
                <div id="order_button" className="form-group form-group-position">
                    <button className="button border-0" onClick={this.assembleFries.bind(this)}>Order Now</button>
                </div>
            </div>
        )
    }
}