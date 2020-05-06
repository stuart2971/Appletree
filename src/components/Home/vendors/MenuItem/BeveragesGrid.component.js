import React from 'react'
import { Grid } from 'semantic-ui-react'
import MenuItem from './MenuItem.component'

const BeveragesGrid = () => (
  <Grid doubling columns={2}>
    <Grid.Column>
        <MenuItem title="Can of pop" description="Cold.Cold.Cold.Cold. Cold.Cold.Cold.Cold. Cold.Cold.Cold.Cold.Cold. Cold.Cold.Cold.Cold.Cold." price="1.29" imgUrl="/images/pop.png"/>
    </Grid.Column>
    <Grid.Column>
        <MenuItem title="Freezie" description="Cold.Cold.Cold.Cold.Cold.Cold.Cold.Cold.Cold." price="0.99" imgUrl="/images/freezie.jpg"/>
    </Grid.Column>
  </Grid> 
)

export default BeveragesGrid;