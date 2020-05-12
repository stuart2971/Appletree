import React from "react"
import { Header, Dropdown, Input, Checkbox, Segment, Form, Loader, Label, Radio } from 'semantic-ui-react'


export default class FriesOrderForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            name: "",
            phoneNumber: "",
            address: "",
            spice: "None",
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

    render(){
        let isTakeout = this.state.takeout ?
            <div><div className="form-group">
                <Input fluid placeholder="Address" onChange={this.updateTextBox.bind(this)} />
            </div>
            <div className="form-group">
                <Input fluid placeholder="Phone Number" icon="phone" onChange={this.updateTextBox.bind(this)} />
            </div></div> : <div></div>
        let spiceLevel = this.state.friesType == "spicy" ? 
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
        </Segment> : <div></div>
        return(
            <div>
                <div className="form-group">
                    <Checkbox label='Takeout' onChange={this.triggerTakeout.bind(this)}/>
                    <Input fluid placeholder="First and Last Name" onChange={this.updateTextBox.bind(this)} />
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
                    </div>
                </div>
                {spiceLevel}
                <Header as='h3'>Price: ${this.state.price}</Header>

                <div id="order_button" className="form-group form-group-position">
                    <button className="button border-0">Order Now</button>
                </div>
            </div>
        )
    }
}