import React from "react"
import { Header, Dropdown, Input, Checkbox, Segment, Form } from 'semantic-ui-react'


import "./OrderForm.css";


export default class OrderForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            name: "",
            phone: "",
            sandwichType: "",
            cheeseType: "",
            isSpicy: false,
            toppings: [],
            price: 0,
            dropdownSandwichOptions: [
                {
                  key: 'chicken',
                  text: 'Chicken',
                  value: 'chicken',
                  image: { avatar: true, src: '/images/chicken_sandwich.JPG' },
                },
                {
                  key: 'burger',
                  text: 'Burger',
                  value: 'burger',
                  image: { avatar: true, src: '/images/featured2.jpg' },
                },
                {
                  key: 'falafel',
                  text: 'Falafel',
                  value: 'falafel',
                  image: { avatar: true, src: '/images/food1.png' },
                }
            ],
            dropdownCheeseOptions: [
            {
                key: 'Cheddar',
                text: 'Cheddar',
                value: 'Cheddar',
                image: { avatar: true, src: '/images/cheddar.jpg' },
            },
            {
                key: 'Mozzarella',
                text: 'Mozzarella',
                value: 'Mozzarella',
                image: { avatar: true, src: '/images/mozzarella.jpg' },
            },
            {
                key: 'Feta',
                text: 'Feta',
                value: 'Feta',
                image: { avatar: true, src: '/images/feta.jpg' },
            },
            {
                key: 'None',
                text: 'None',
                value: 'None',
                image: { avatar: true, src: '/images/none.png' },
                }
            ]
        }
    }
    assembleSandwich(){
        //Credits to https://stackoverflow.com/questions/34698905/how-can-i-clone-a-javascript-object-except-for-one-key
        let {dropdownSandwichOptions, dropdownCheeseOptions, ...sandwich} = this.state;
        console.log(sandwich)
    }
    updateTextBox(e, data){
        if(data.placeholder == "Name"){
            this.setState({ name: data.value })
        } 
        if(data.placeholder == "Phone Number"){
            this.setState({ phone: data.value })
        }
    }
    updateDropDown(e, data){
        if(data.placeholder == "Sandwich Type"){
            let sandwichPrice = data.value == "burger" | data.value == "chicken" ? 4.87 : 3.81;
            this.setState({ price: sandwichPrice, sandwichType: data.value })
        }
        if(data.placeholder == "Cheese Type"){
            this.setState({ cheeseType: data.value })
        }
    }
    updateCheckbox(e, data){
        if(data.label == "Spicy"){
            this.setState({ isSpicy: !this.state.isSpicy });
        }
        if(data.label == "Lettuce" | data.label == "Tomato" | data.label == "Cucumber" | data.label == "Onion"){
            let newToppings = this.state.toppings;
            if(newToppings.includes(data.label)){
                newToppings.splice(newToppings.indexOf(data.label), 1);
            }else{
                newToppings.push(data.label)
            }
            this.setState({ toppings: newToppings })
        }
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
                                <Header as='h1'>Make a Sandwich</Header>

                                <div className="form-group">
                                    <Input fluid placeholder="Name" onChange={this.updateTextBox.bind(this)} />
                                </div>
                                <div className="form-group">
                                    <Input fluid placeholder="Phone Number" icon="phone" onChange={this.updateTextBox.bind(this)} />
                                </div>
                                <div className="form-group">
                                    <div className="input-group">
                                        <Dropdown
                                        placeholder="Sandwich Type"
                                        fluid
                                        selection
                                        options={this.state.dropdownSandwichOptions}
                                        onChange={this.updateDropDown.bind(this)}
                                        />
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
                                    </div>
                                </div>
                                <Segment>
                                    <Checkbox label="Spicy" onChange={this.updateCheckbox.bind(this)} />
                                </Segment>
                                <div className="form-group">
                                <Segment>
                                    <Form>
                                        <Header as='h2'>Toppings</Header>
                                        <Form.Field>
                                        Selected value: <b>{this.state.value}</b>
                                        </Form.Field>
                                        <Form.Field>
                                            <Checkbox label='Lettuce' onChange={this.updateCheckbox.bind(this)}/>
                                        </Form.Field>
                                        <Form.Field>
                                            <Checkbox label='Tomato' onChange={this.updateCheckbox.bind(this)}/>
                                        </Form.Field>
                                        <Form.Field>
                                            <Checkbox label='Cucumber' onChange={this.updateCheckbox.bind(this)}/>
                                        </Form.Field>
                                        <Form.Field>
                                            <Checkbox label='Onion' onChange={this.updateCheckbox.bind(this)}/>
                                        </Form.Field>
                                    </Form>
                                </Segment>
                                </div>
                                <Header as='h3'>Price: ${this.state.price}</Header>
                                <div id="order_button" className="form-group form-group-position">
                                    <button className="button border-0" onClick={this.assembleSandwich.bind(this)}>Order Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}