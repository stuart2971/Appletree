import React from "react"

export default class MenuItem extends React.Component{
    render(){
        return(
            <div className="row">
                <div className="media align-items-center food-card">
                    <img className="mr-3 mr-sm-4 menu_item" src={this.props.imgUrl} />
                    <div className="media-body">
                        <div className="d-flex justify-content-between food-card-title">
                            <h4>{this.props.title}</h4>
                            <h3 className="price-tag">${this.props.price}</h3>
                        </div>
                        <p>{this.props.description}</p>
                    </div>
                </div>
            </div>
        )
    }
}