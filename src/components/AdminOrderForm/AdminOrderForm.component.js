import React from "react";
import { Tab } from 'semantic-ui-react'

import AdminSandwichOrderForm from "./vendors/AdminSandwichOrderForm.component"
import AdminFriesOrderForm from "./vendors/AdminFriesOrderForm.component"


const panes = [
    { menuItem: 'Sandwiches', render: () => <AdminSandwichOrderForm /> },
    { menuItem: 'Fries', render: () => <AdminFriesOrderForm /> }
  ]

export default class AdminOrderForm extends React.Component{
    render(){
        return(
            <Tab panes={panes}/>
        )
    }
}