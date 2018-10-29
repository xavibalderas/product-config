import React, { Component } from 'react';
import { Menu, Sidebar,Button,  Segment, Icon, List, Item} from 'semantic-ui-react';
import gql from 'graphql-tag';
import { Query } from "react-apollo";
import AvailabilityDisplay from './AvailabilityDisplay'
import queryReducer from '../tools/queryReducer';
import ReactGA from 'react-ga';


const hasReference = (element) => {
  return element.trim().length===8
}

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
  console.log(combination);
  console.log(products);

  return  combination[0].isValid ? _parseProductBenefits(products[combination[0].itemno]) : null;
  //benefits = _parseProductBenefits(products[combination.bed]);
  //return benefits;
}

const _parseProductBenefits = (product) => {
  console.log(product);
  let p=[];
  if (product.RetailItemCustomerBenefitList === undefined || product.RetailItemCustomerBenefitList === null){
    return [];
  }
  if (product.RetailItemCustomerBenefitList.RetailItemCustomerBenefit.length > 0){
      p = product.RetailItemCustomerBenefitList.RetailItemCustomerBenefit.map((benefit, index)=>{return <List.Item key = {index}>{benefit.CustomerBenefitText}</List.Item>})
  }
  return p;
}


class MenuContainer  extends Component {
  state = { info: false, stock: false, email: false }
  handleItemClick = (e, {name}) => {
    this.setState({[name]: true })
    this.registerAction(name);
  }

  registerAction = (name) => {

    switch (name) {
      case 'info':
        ReactGA.event({
          category: 'User',
          action: 'Check for product information'
        });
        break;

      case 'stock':
        ReactGA.event({
          category: 'User',
          action: 'Check for sales location'
        });
        break;

      default:

    }
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
          variables={{productList: queryReducer.reduceItems(this.props.combination), lang: 'de', store: '079'}}
          skip={v.stock===false}>

            {({ loading, error, data }) => {
              if (loading) return <p></p>;
              if (error) {return (<p> Error :</p> )}
              if(data.availability[0]==null) return <p>Error</p>
              return (
                <Segment basic clearing>
                <Item.Group divided>
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
