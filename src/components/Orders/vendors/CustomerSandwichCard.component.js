import React from 'react'
import { Card, Image } from 'semantic-ui-react'

const CustomerSandwichCard = ({ name, queue, imgFile }) => {
    return(
      <Card.Group>
        <Card>
          <Card.Content>
            <Image floated='right' size='mini' src={"/images/Orders/ProfileImages/" + imgFile} />
            <Card.Header>{name}</Card.Header>
            <Card.Meta>Queue: {queue}</Card.Meta>
          </Card.Content>
        </Card>
      </Card.Group>
    )
}
export default CustomerSandwichCard