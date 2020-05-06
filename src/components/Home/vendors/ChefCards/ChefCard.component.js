import React from 'react'
import { Card, Image } from 'semantic-ui-react'

const ChefCard = ({imgUrl, title, subtitle, description, purchases}) => (
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
    </Card>
)

export default ChefCard