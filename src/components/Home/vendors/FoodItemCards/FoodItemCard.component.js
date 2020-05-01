import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'

const FoodItemCard = ({imgUrl, title, subtitle, description, purchases}) => (
    <Card>
      <Image src={imgUrl} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{title}</Card.Header>
        <Card.Meta>
          <span className='date'>{subtitle}</span>
        </Card.Meta>
        <Card.Description>
          {description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a>
          <Icon name='user' />
          {purchases}
        </a>
      </Card.Content>
    </Card>
)

export default FoodItemCard