import React from 'react'
import { Grid } from 'semantic-ui-react'
import MenuItem from './MenuItem.component'

const FriesGrid = () => (
  <Grid doubling columns={2}>
    <Grid.Column>
        <MenuItem title="The Works" description="Fresh cut fries topped with cheese, sour cream, ground beef, tomatos, and onion" price="4.99" imgUrl="/images/the_works.jpg"/>
    </Grid.Column>
    <Grid.Column>
        <MenuItem title="The Works" description="Fresh cut fries topped with cheese, sour cream, ground beef, tomatos, and onion" price="4.99" imgUrl="/images/the_works.jpg"/>
    </Grid.Column>
  </Grid>
)

export default FriesGrid;