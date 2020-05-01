import React from 'react'
import { Grid, Image, Segment } from 'semantic-ui-react'
import FoodItemCard from './FoodItemCard.component'

const CardGrid = () => (
  <Grid doubling columns={4}>
    <Grid.Column>
      <FoodItemCard imgUrl="/images/featured1.jpg" title="Falafel Bowl" subtitle="$" description="Falafel bowl filled with lettuce, tomato, onion on top of rice" purchases="0" />
    </Grid.Column>
    <Grid.Column>
      <FoodItemCard imgUrl="/images/featured2.jpg" title="Beef Sandwich" subtitle="$" description="Whole wheat pita filled with 3oz premium ground beef patty" purchases="0" />
    </Grid.Column>
    <Grid.Column>
      <FoodItemCard imgUrl="/images/featured3.jpg" title="Poutine" subtitle="$" description="Fresh thick cut fries with graded mozzerella and beef gravy" purchases="0" />
    </Grid.Column>
    <Grid.Column>
      <FoodItemCard imgUrl="/images/chicken_sandwich.JPG" title="Chicken Sandwich" subtitle="$" description="Whole wheat pita filled with 3oz premium chicken" purchases="0" />
    </Grid.Column>
  </Grid>
)

export default CardGrid