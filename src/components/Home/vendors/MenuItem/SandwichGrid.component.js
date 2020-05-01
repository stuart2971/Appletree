import React from 'react'
import { Grid } from 'semantic-ui-react'
import MenuItem from './MenuItem.component'

const SandwichGrid = () => (
  <Grid doubling columns={2}>
    <Grid.Column>
      <MenuItem title="Chicken Sandwich" description="Grilled chicken put inside a pita bread with assorted veggies and garlic mayo. " price="6.99" imgUrl="/images/chicken_sandwich.JPG"/>
      <MenuItem title="Beef Sandwich" description="Whole wheat pita filled with 3oz premium ground beef patty " price="6.99" imgUrl="/images/featured2.jpg"/>
    </Grid.Column>
    <Grid.Column>
      <MenuItem title="The Works" description="Fresh cut fries topped with cheese, sour cream, ground beef, tomatos, and onion" price="4.99" imgUrl="/images/the_works.jpg"/>
    </Grid.Column>
  </Grid>
)

export default SandwichGrid;