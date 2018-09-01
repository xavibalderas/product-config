import React, { Component } from 'react';
import { Header } from 'semantic-ui-react'
//import './Header.css'

class ProductInfo extends Component {

    constructor(props){
      super(props);
    }

    render() {
        console.log(this.props);
        return (
          <div>
            <Header as="h2">
              {this.props.products[this.props.combinations[0].bed].ProductName}
              <Header.Subheader>{this.props.products[this.props.combinations[0].bed].ProductTypeName}, {this.props.products[this.props.combinations[0].bed].ValidDesignText}</Header.Subheader>
            </Header>
            <p>{this.props.products[this.props.combinations[0].bed].RetailItemCustomerBenefitSummaryText}</p>
            <p>{this.props.products[this.props.combinations[0].bed].RetailItemCommPriceList.RetailItemCommPrice.Price}</p>
            <p>{this.props.products[this.props.combinations[0].mattress].ProductName}</p>
            <p>{this.props.products[this.props.combinations[0].slat].ProductName}</p>
            <p>{this.props.products[this.props.combinations[0].extra].ProductName}</p>
          </div>

        );
    }
}

export default ProductInfo
