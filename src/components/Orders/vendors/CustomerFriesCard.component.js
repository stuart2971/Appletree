import React from 'react'
import { Card, Image, Icon } from 'semantic-ui-react'

const CustomerFriesCard = ({ name, queue, imgFile, isCompleted }) => {
    return(
      <Card.Group>
        <Card>
          <Card.Content>
            <Image floated='right' size='mini' src={"/images/Orders/ProfileImages/" + imgFile} />
            <Card.Header>{name}{isCompleted ? <Icon name="check circle" />: <div></div>}</Card.Header>
            <Card.Meta>Queue: {queue}</Card.Meta>
          </Card.Content>
        </Card>
      </Card.Group>
    )
}
export default CustomerFriesCard