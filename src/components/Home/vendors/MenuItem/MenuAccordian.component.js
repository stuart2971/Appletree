import React, { Component } from 'react'
import { Accordion, Icon } from 'semantic-ui-react'

import SandwichGrid from './SandwichGrid.component';
import FriesGrid from './FriesGrid.component';
import BeveragesGrid from "./BeveragesGrid.component";

export default class MenuAccordian extends Component {
  state = { activeIndex: 0 }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  render() {
    const { activeIndex } = this.state

    return (
      <Accordion>
        <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
          <Icon name='dropdown' />
          Sandwiches
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          <SandwichGrid />
        </Accordion.Content>

        <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
          <Icon name='dropdown' />
          Fries
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 1}>
          <FriesGrid />
        </Accordion.Content>

        <Accordion.Title active={activeIndex === 2} index={2} onClick={this.handleClick}>
          <Icon name='dropdown' />
          Beverages and other items.  
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 2}>
          <BeveragesGrid />
        </Accordion.Content>
      </Accordion>
    )
  }
}