import React from 'react'
import { Button, Card, Image, Icon } from 'semantic-ui-react'
import axios from "axios";

export default class AdminFriesCard extends React.Component{
  completeCard(){
    axios.put(`/fries/update/${this.props.order._id}`)
      .then((res, err) => {
        console.log(res, err)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  deleteCard(){
    axios.delete(`/fries/remove/${this.props.order._id}`)
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
    let personContact = order.phoneNumber.length < 10 ? `${order.address}Order #${order.phoneNumber}`:`${order.address}, ${order.phoneNumber}`
    return(
      <Card.Group>
        <Card>
          <Card.Content>
            <Image floated='right' size='mini' src={"/images/Orders/ProfileImages/" + this.props.imgFile} />
            <Card.Header>{order.name}{order.isCompleted ? <Icon name="check circle" />: <div></div>}</Card.Header>
            <Card.Meta> {personContact}<br /> Queue: {this.props.queue}</Card.Meta>
            <Card.Description>
            <hr />
              {order.friesType == "spicy"? `${order.spice} spicy`: order.friesType} fries
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