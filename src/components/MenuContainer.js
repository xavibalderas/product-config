import React, { Component } from 'react';
import { Menu, Sidebar,Button,  Segment, Icon, List, Item} from 'semantic-ui-react';
import gql from 'graphql-tag';
import { Query } from "react-apollo";
import AvailabilityDisplay from './AvailabilityDisplay'

const GET_AVAILABILITY_PRODUCT = gql`
query availability($productList: [String]!, $lang: String!, $store: String!) {
  availability(productList: $productList, lang: $lang, store: $store)  {
    partNumber
    availableStock
    findItList{
      findIt{
        partNumber
        quantity
        type
        box
        shelf
      }
    }
  }
}
`


const _parseBenefits = (combination, products) => {
  let benefits = [];
  benefits = _parseProductBenefits(products[combination.bed]);
  return benefits;
}

const _parseProductBenefits = (product) => {
  let p=[];
  if (product.RetailItemCustomerBenefitList.RetailItemCustomerBenefit.length > 0){
      p = product.RetailItemCustomerBenefitList.RetailItemCustomerBenefit.map((benefit, index)=>{return <List.Item key = {index}>{benefit.CustomerBenefitText}</List.Item>})
  }
  return p;
}

const _productsItemNumber = (combination) => {
  return [combination.bed, combination.mattress, combination.extra, combination.slat];
}

class MenuContainer  extends Component {
  state = { info: false, stock: false, email: false }
  handleItemClick = (e, {name}) => {
    this.setState({[name]: true })
  }
hideSidebar= ()=>{
  this.setState({ info: false, stock: false, email: false });
}
  render(){
    const v = {
      info: this.state.info,
      stock: this.state.stock,
      email: this.state.email
    }
    return(
      <div>
        <Menu borderless  icon vertical fixed={'left'}>
          <Menu.Item name='info' onClick={this.handleItemClick} >
            <Icon color={'grey'} size={'large'} name='info' />
          </Menu.Item>
          <Menu.Item name='stock' onClick={this.handleItemClick}>
            <Icon color={'grey'} size={'large'} name='shop' />
          </Menu.Item>
        {/*  <Menu.Item name='email' >
            <Icon color={'grey'} size={'large'} name='envelope' />
          </Menu.Item>
          <Menu.Item name='info' >
            <Icon color={'grey'} size={'large'} name='language' />
          </Menu.Item> */}
        </Menu>
        <Sidebar
          as={Segment}
          animation='overlay'
          vertical
          width='wide'
          visible={v.info}
        >
        <Button className="close-button" attached='top' compact circular icon onClick={this.hideSidebar}>
          <Icon color={'grey'} size={'large'} name='close' />
          </Button>
        <Segment basic clearing>
          <List>
            {_parseBenefits(this.props.combination, this.props.products)}
          </List>
        </Segment>
        </Sidebar>

        <Sidebar
          as={Segment}
          animation='overlay'
          vertical
          width='wide'
          visible={v.stock}
        >
        <Button attached='top' icon onClick={this.hideSidebar}>
          <Icon color={'grey'} size={'large'} name='close' />
          </Button>
        <Query
          query={GET_AVAILABILITY_PRODUCT}
          variables={{productList: _productsItemNumber(this.props.combination), lang: 'de', store: '079'}}
          skip={v.stock===false}>

            {({ loading, error, data }) => {
              if (loading) return <p></p>;
              if (error) {console.log(error); return <p> Error :</p> ;}
              if(data.availability[0]==null) return <p>Error</p>
              return (
                <Segment basic clearing>
                <Item.Group>
                  {data.availability.map((element, index)=> <AvailabilityDisplay key={index} product={element} productInfo = {this.props.products[element.partNumber]}/>)}
                </Item.Group>
                </Segment>
              );
              //return (<Availability products = {data.availability}/>); //return
            }}
        </Query>



        </Sidebar>

</div>
    )
  }
}

export default MenuContainer
