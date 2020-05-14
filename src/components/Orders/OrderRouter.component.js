import React from "react"
import axios from "axios"
import Pusher from 'pusher-js';

import CustomerPage from "./CustomerPage.component"
import AdminPage from "./AdminPage.component"

export default class OrderRouter extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            password: "",
            sandwiches: [],
            fries: [],
            completedOrders: [],
            profileImages: ["ade.jpg", "chris.jpg", "daniel.jpg", "elliot.jpg", "matthew.png", "molly.png", "nan.jpg", "patrick.png", "rachel.png", "steve.jpg", "stevie.jpg", "veronika.jpg", "christian.jpg", "helen.jpg"],
            nextInQueue: []
        }
    }
    componentWillMount(){
        let url = this.props.location.pathname
        let password = url.substring(url.lastIndexOf("/")+1)
        this.setState({ password })
        axios.get('/sandwich/show')
            .then((response, err) => {
                this.insertOrders(response.data, this.state.sandwiches, "sandwiches")
                if(err) console.log(err)
            })

        axios.get('/fries/show')
            .then((response, err) => {
                this.insertOrders(response.data, this.state.fries, "fries")
                if(err) console.log(err)
            })
    }
    findOrderById(id){
        //Try to find a way to retrieve the documents faster by entering another parameter indicating which array to check first
        let orderArr = {}
        let sandwiches = this.state.sandwiches
        for(let i = 0; i < sandwiches.length; i++){
            if(sandwiches[i]._id == id) {
                orderArr.arrName = "sandwiches";
                orderArr.arr = sandwiches;
                orderArr.index = i;                
                return orderArr;
            }
        }
        let fries = this.state.fries
        for(let i = 0; i < fries.length; i++){
            if(fries[i]._id == id) {
                orderArr.arrName = "fries";
                orderArr.arr = fries;
                orderArr.index = i;                
                return orderArr;
            }
        }
        for(let i = 0; i < this.state.completedOrders.length; i++){
            if(this.state.completedOrders[i]._id == id) {
                orderArr.arrName = "completedOrders";
                orderArr.arr = this.state.completedOrders;
                orderArr.index = i;                
                return orderArr;
            }
        }
    }
    insertOrders(orders, orderArr, orderType){
        let orderArray = orderArr;
        let completedOrders = this.state.completedOrders
        for(let i = 0; i < orders.length; i++){
            let order = orders[i]
            if(order.isCompleted) completedOrders.push(order)
            else orderArray.push(order)
        }
        if(orderType == "sandwiches") this.setState({ sandwiches: orderArray, completedOrders })
        else if(orderType == "fries") this.setState({ fries: orderArray, completedOrders }) 
        this.updateNextInQueue()
    }
    deleteOrder(id){
        let orderArrayData = this.findOrderById(id)
        orderArrayData.arr.splice(orderArrayData.index, 1)
        if(orderArrayData.arrName == "sandwiches") this.setState({ sandwiches: orderArrayData.arr })
        else if(orderArrayData.arrName == "fries") this.setState({ fries: orderArrayData.arr })
        else if(orderArrayData.arrName == "completedOrders") this.setState({ completedOrders: orderArrayData.arr })
        this.updateNextInQueue()
    }
    completeOrder(id){
        let orderArrayData = this.findOrderById(id);
        let completedOrders = this.state.completedOrders
        orderArrayData.arr[orderArrayData.index].isCompleted = true;
        completedOrders.push(orderArrayData.arr[orderArrayData.index])

        if(orderArrayData.arrName == "sandwiches") {
            let sandwiches = this.state.sandwiches
            sandwiches.splice(orderArrayData.index, 1)
            this.setState({ sandwiches, completedOrders })
        }
        if(orderArrayData.arrName == "fries") {
            let fries = this.state.fries
            fries.splice(orderArrayData.index, 1)
            this.setState({ fries, completedOrders })
        }
        this.updateNextInQueue()
    }
    componentDidMount(){
        let pusher = new Pusher('bebb9d52f8b135fdd6d0', {
            cluster: 'us2'
        });
        let sandwichChannel = pusher.subscribe('sandwichChange');
        sandwichChannel.bind('update', (data) => this.completeOrder(data._id));
        sandwichChannel.bind('delete', (data) => this.deleteOrder(data._id));
        sandwichChannel.bind('insert', (data) => this.insertOrders([data.insertData], this.state.sandwiches, "sandwiches"));

        let friesChannel = pusher.subscribe('friesChange');
        friesChannel.bind('update', (data) => this.completeOrder(data._id));
        friesChannel.bind('delete', (data) => this.deleteOrder(data._id));
        friesChannel.bind('insert', (data) => this.insertOrders([data.insertData], this.state.fries, "fries"));
    }
    updateNextInQueue(){
        let sandwiches = this.state.sandwiches
        for(let i = 0; i < sandwiches.length; i++)
            if(!sandwiches[i].takeout){ this.setState({ nextInQueue: sandwiches[i].phoneNumber });return; }
    }
    render(){
        if(this.state.password == "password"){
            return <AdminPage 
                        sandwiches={this.state.sandwiches}
                        fries={this.state.fries}
                        profileImages={this.state.profileImages} 
                        completedOrders={this.state.completedOrders}
                        nextInQueue={this.state.nextInQueue}/>
        }else{
            return <CustomerPage 
                        sandwiches={this.state.sandwiches} 
                        fries={this.state.fries}
                        profileImages={this.state.profileImages} 
                        password={this.state.password} 
                        completedOrders={this.state.completedOrders}
                        nextInQueue={this.state.nextInQueue}/>
        }
        
    }
}