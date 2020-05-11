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
            completedOrders: [],
            profileImages: ["ade.jpg", "chris.jpg", "daniel.jpg", "elliot.jpg", "matthew.png", "molly.png", "nan.jpg", "patrick.png", "rachel.png", "steve.jpg", "stevie.jpg", "veronika.jpg", "christian.jpg", "helen.jpg"],
            nextInQueue: ""
        }
    }
    componentWillMount(){
        let url = this.props.location.pathname
        let password = url.substring(url.lastIndexOf("/")+1)
        this.setState({ password })
        axios.get('/orders/show')
            .then((response, err) => {
                let completedOrders = this.state.completedOrders;
                let sandwiches = this.state.sandwiches;
                for(let i = 0; i < response.data.length; i++){
                    let order = response.data[i]
                    if(order.isCompleted) completedOrders.push(order);
                    else sandwiches.push(order);
                }
                this.setState({ completedOrders, sandwiches })
                this.updateNextInQueue()
                if(err) console.log(err)
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    findOrderById(id){
        //return the array and index of order
        let orderArr = {}
        let sandwiches = this.state.sandwiches
        for(let i = 0; i < sandwiches.length; i++){
            //While looping through the array, update the value of nextInQueue
            if(!sandwiches[i].takeout) this.setState({ nextInQueue: sandwiches[i].phoneNumber }) 
            if(sandwiches[i]._id == id) {
                orderArr.arrName = "sandwiches";
                orderArr.arr = sandwiches;
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
    addToSandwiches(order){
        let sandwiches = this.state.sandwiches;
        sandwiches.push(order);
        this.setState({ sandwiches })
        this.updateNextInQueue()
    }
    deleteOrder(id){
        let orderArrayData = this.findOrderById(id)
        orderArrayData.arr.splice(orderArrayData.index, 1)
        if(orderArrayData.arrName == "sandwiches") this.setState({ sandwiches: orderArrayData.arr })
        if(orderArrayData.arrName == "completedOrders") this.setState({ completedOrders: orderArrayData.arr })
        this.updateNextInQueue()
    }
    completeOrder(id){
        let orderArrayData = this.findOrderById(id);

        let completedOrders = this.state.completedOrders
        orderArrayData.arr[orderArrayData.index].isCompleted = true;
        completedOrders.push(orderArrayData.arr[orderArrayData.index])
        this.setState({ completedOrders })

        if(orderArrayData.arrName == "sandwiches") {
            let sandwiches = this.state.sandwiches
            sandwiches.splice(orderArrayData.index, 1)
            this.setState({ sandwiches })
        }
        this.updateNextInQueue()
    }
    componentDidMount(){
        let pusher = new Pusher('bebb9d52f8b135fdd6d0', {
            cluster: 'us2'
        });
        let channel = pusher.subscribe('orders');
        channel.bind('update', (data) => this.completeOrder(data._id));
        channel.bind('delete', (data) => this.deleteOrder(data._id));
        channel.bind('insert', (data) => this.addToSandwiches(data.insertData));
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
                        profileImages={this.state.profileImages} 
                        completedOrders={this.state.completedOrders}
                        nextInQueue={this.state.nextInQueue}/>
        }else{
            return <CustomerPage 
                        sandwiches={this.state.sandwiches} 
                        profileImages={this.state.profileImages} 
                        password={this.state.password} 
                        completedOrders={this.state.completedOrders}
                        nextInQueue={this.state.nextInQueue}/>
        }
        
    }
}