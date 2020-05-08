import React from 'react'
import { Grid } from 'semantic-ui-react'
import ChefCard from './ChefCard.component'

const ChefCardGrid = () => (
  <Grid doubling centered columns={3}>
    <Grid.Column>
      <ChefCard imgUrl="/images/Home/chef-2.jpg" title="Christie Sychangco" subtitle="Owner" description="Keep the stove on low.  It only needs to be on high to bring the temperature up" />
    </Grid.Column>
    <Grid.Column>
      <ChefCard imgUrl="/images/Home/chef-1.jpg" title="Henry Fong" subtitle="Owner" description="Make sure you wash your own plate and clean up after yourself"/>
    </Grid.Column>
  </Grid>
)

export default ChefCardGrid