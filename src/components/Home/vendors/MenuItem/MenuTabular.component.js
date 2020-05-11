import React from 'react'
import { Tab } from 'semantic-ui-react'

import SandwichGrid from './SandwichGrid.component';
import FriesGrid from './FriesGrid.component';
import BeveragesGrid from "./BeveragesGrid.component";

const panes = [
  { menuItem: 'Sandwiches', render: () => <SandwichGrid /> },
  { menuItem: 'Fries', render: () => <FriesGrid /> },
  { menuItem: 'Beverages', render: () => <BeveragesGrid /> },
]

const MenuTabular = () => (
  <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} />
)

export default MenuTabular