import React, { Component } from 'react';
import { Header , Grid, Menu, Icon, Segment} from 'semantic-ui-react'
import './Header.css'
import MenuContainer from './MenuContainer';

class ProductInfo extends Component {

    constructor(props){
      super(props);
    }

    render() {
        console.log(this.props);
        return (
<div>
          <Grid >
          <Grid.Row>
            <Grid.Column width={1}>
              <MenuContainer/>
            </Grid.Column>
            <Grid.Column width={11}>
            <Grid>

            <Grid.Row>
              <Grid.Column width={14}>
              <Segment basic>
              <Header as="h2">
  <Header.Subheader>{this.props.products[this.props.combinations[0].bed].ProductTypeName}, {this.props.products[this.props.combinations[0].bed].ValidDesignText}</Header.Subheader>
                {this.props.products[this.props.combinations[0].bed].ProductName}
              </Header>
              <h1>CHF{this.props.products[this.props.combinations[0].bed].RetailItemCommPriceList.RetailItemCommPrice.Price}</h1>
              <p>{this.props.products[this.props.combinations[0].bed].RetailItemCustomerBenefitSummaryText}</p>

              <p>{this.props.products[this.props.combinations[0].mattress].ProductName}</p>
              <p>{this.props.products[this.props.combinations[0].slat].ProductName}</p>
              <p>{this.props.products[this.props.combinations[0].extra].ProductName}</p>
</Segment>
              </Grid.Column>
              <Grid.Column  width={2}>
              <Segment basic>
                <p>hfhf</p>
                </Segment>
              </Grid.Column>
              </Grid.Row>



            </Grid>
            </Grid.Column>
          </Grid.Row>

          </Grid>



</div>

        );
    }
}

export default ProductInfo
