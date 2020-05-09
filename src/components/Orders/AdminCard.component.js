import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react'
import axios from "axios";

export default class AdminCard extends React.Component{
  completeCard(){
    axios.put(`/orders/update/${this.props.order._id}`)
      .then((res, err) => {
        console.log(res, err)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  deleteCard(){
    axios.delete(`/orders/remove/${this.props.order._id}`)
      .then( (res, err) => {
          console.log(res, err)
      })
      .catch(function (err) {
          console.log(err)
      })
  }
  render(){
    let order = this.props.order;
    let adminButtons, completeButton;
    if(!order.isCompleted) completeButton = <Button onClick={this.completeCard.bind(this)} basic color='green'> Completed </Button>; 
    if(this.props.isAdmin){
      adminButtons = (
        <Card.Content extra>
          <div className='ui two buttons'>
            {completeButton}
            <Button basic color='red' onClick={this.deleteCard.bind(this)}>
              Delete
            </Button>
          </div>
        </Card.Content>
      )
    }
    return(
      <Card.Group>
        <Card>
          <Card.Content>
            <Image floated='right' size='mini' src={"/images/Orders/ProfileImages/" + this.props.imgFile} />
            <Card.Header>{order.name}</Card.Header>
            <Card.Meta>{order.address}, {order.phoneNumber} <br /> Queue: {this.props.queue}</Card.Meta>
            <Card.Description>
            <hr />
              {order.spice == "None"? "": order.spice} {order.sandwichType.charAt(0).toUpperCase() + order.sandwichType.slice(1)} with {order.cheeseType}
              <br />
              {order.toppings.map((topping) => {
                return topping + " "
              })}
              <br />
              ${order.price}
            </Card.Description>
          </Card.Content>
          {adminButtons}
        </Card>
      </Card.Group>
    )
  }
}
// const deleteOrder = (id) =>{
//   
// }
// function completeOrder(id){
//   console.log("Pressed", id)
// }
