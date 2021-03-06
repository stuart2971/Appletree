import React from 'react'
import { Button, Card, Image, Icon, Label } from 'semantic-ui-react'
import axios from "axios";

export default class AdminFriesCard extends React.Component{
  completeCard(){
    axios.put(`https://appletree-express-server.herokuapp.com/fries/update/${this.props.order._id}`)
      .then((res, err) => {
        console.log(res, err)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  deleteCard(){
    axios.delete(`https://appletree-express-server.herokuapp.com/fries/remove/${this.props.order._id}`)
      .then( (res, err) => {
          console.log(res, err)
      })
      .catch(function (err) {
          console.log(err)
      })
  }
  capitalize(word) { 
    if(word) return word[0].toUpperCase() + word.slice(1); 
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
    let personContact = order.phoneNumber.length < 10 ? `${order.address}${order.phoneNumber}`:`${order.address}, ${order.phoneNumber}`
    return(
      <Card.Group>
        <Card>
          <Card.Content>
            <Image floated='right' size='mini' src={"/images/Orders/ProfileImages/" + this.props.imgFile} />
            <Card.Header style={{ display: "inline-block" }}>{this.capitalize(order.name) + "'s "} Fries {order.isCompleted ? <Icon name="check circle" />: <div></div>}</Card.Header>
            {order.takeout ? <Label color="red" horizontal>TAKEOUT</Label>: <div></div>}
            <Card.Meta> {personContact}<br /> Queue: {this.props.queue}</Card.Meta>
            <Card.Description>
            <hr />
              Fries Type: <b>{this.capitalize(order.friesType)}{order.friesType == "spicy"? `(${this.capitalize(order.spice)})` : ""} {order.friesType == "belgian"? `(${this.capitalize(order.mayoType)})`: ""}</b>
              <br />
              Price: ${order.price}
            </Card.Description>
          </Card.Content>
          {adminButtons}
        </Card>
      </Card.Group>
    )
  }
}