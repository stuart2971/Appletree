import React from "react"
import axios from "axios"

import CustomerPage from "./CustomerPage.component"
import AdminPage from "./AdminPage.component"

export default class OrderRouter extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            orders: [],
            profileImages: ["ade.jpg", "chris.jpg", "daniel.jpg", "elliot.jpg", "matthew.png", "molly.png", "nan.jpg", "patrick.png", "rachel.png", "steve.jpg", "stevie.jpg", "veronika.jpg"]
        }
    }
    componentWillMount(){
        axios.get('/orders/show')
        .then((response, err) => {
            this.setState({ orders: response.data })
            if(err) console.log(err)
        })
        .catch(function (error) {
            console.log(error)
        })
    }
    render(){
        let url = this.props.location.pathname
        let password = url.substring(url.lastIndexOf("/")+1)
        console.log(this.state.orders)
        if(password == "password"){
            return <AdminPage orders={this.state.orders} profileImages={this.state.profileImages} />
        }else{
            return <CustomerPage orders={this.state.orders} profileImages={this.state.profileImages} password={password} />
        }
        
    }
}