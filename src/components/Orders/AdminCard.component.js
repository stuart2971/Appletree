import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react'
import axios from "axios";

const AdminCard = ({name, address, phoneNumber, sandwichType, cheeseType, spice, toppings, price, id, isAdmin, queue, imgFile}) => {
  let adminButtons;
  if(isAdmin){
    adminButtons = (
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='green'>
            Completed
          </Button>
          <Button basic color='red'>
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
            <Image floated='right' size='mini' src={"/images/Orders/ProfileImages/" + imgFile} />
            <Card.Header>{name}</Card.Header>
            <Card.Meta>{address}, {phoneNumber} <br /> Queue: {queue}</Card.Meta>
            <Card.Description>
            <hr />
              {spice == "None"? "": spice} {sandwichType.charAt(0).toUpperCase() + sandwichType.slice(1)} with {cheeseType}
              <br />
              {toppings.map((topping) => {
                return topping + " "
              })}
              <br />
              ${price}
            </Card.Description>
          </Card.Content>
          {adminButtons}
        </Card>
      </Card.Group>
    )
}
const deleteOrder = (id) =>{
  axios.delete(`/orders/remove/${id}`)
    .then( (response, err) => {
        console.log(this.state.orders)
    })
    .catch(function (error) {
        console.log(error)
    })
    .finally(function () {
        // always executed
    }); 
}
export default AdminCard