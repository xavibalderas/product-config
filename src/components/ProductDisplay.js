import React, { Component }from 'react';
import { connect } from 'react-redux';
import { actions, TYPES } from '../store/actions';
import LogInContainer from './Login.js';
import SettingsButtonContainer from './SettingsButton.js';
import { Loader} from 'semantic-ui-react'
import gql from 'graphql-tag';
import { Query } from "react-apollo";
import ProductInfo from './ProductInfo';


const mapStateToProps = (state) => ({
  accessSetup: state.settings.accessSetup,
  isFetching: state.settings.isFetching,
  combinations: state.settings.combinations,
  items: state.data.items,
  productsInfo: state.data.productsInfo
});

const GET_INFO_PRODUCT = gql`
query products($productList: [String]!, $lang: String!) {
  products(productList: $productList, lang: $lang)  {
    ItemNo
    ProductName
    ProductTypeName
    ValidDesignText
    OnlineSellable
    BreathTakingItem
    NewsType
    DesignerNameComm
    RetailItemCustomerBenefitSummaryText
    ItemMeasureReferenceTextMetric
    RetailItemCommPriceList{
      RetailItemCommPrice{
        Price
        CurrencyCode
      }
    }
    GPRCommSelectionCriteriaSelectionList{
      GPRCommSelectionCriteriaSelection{
        SelectionCriteriaCode
        SelectionCriteriaName
        SelectionCriteriaValue
      }
    }
  }
}
`

const filtersReduce = (products) => {
  console.log(products.length);
  if (products.length == 0) return
  const selectors = {}
  let filters = {};
  products.forEach((element, index)=>{
    const selectionCriteriaList = element.GPRCommSelectionCriteriaSelectionList.GPRCommSelectionCriteriaSelection;
    const partNumber = element.ItemNo;
    selectionCriteriaList.reduce((accumulator, currentValue)=>{
      const criteriaCode = currentValue.SelectionCriteriaCode;
      if (filters.hasOwnProperty(criteriaCode)){
        const position = filters[criteriaCode].findIndex((element) => {return element.value == currentValue.SelectionCriteriaValue});
        if (position !== -1) {
          filters[criteriaCode][position].ItemNo.push(partNumber)
        } else {
          filters[criteriaCode].push({
            value: currentValue.SelectionCriteriaValue,
            ItemNo: [partNumber]
          });
        }// position !== undedfined

      } else {
        filters[criteriaCode] = [{
          value: currentValue.SelectionCriteriaValue,
          ItemNo: [partNumber]
        }];
      }
      return;
    }, {}); //reduce
  });
  console.log(filters);

}

const mapProducts = (productsInfo) => {
  let result = {};
  console.log(productsInfo);
  productsInfo.forEach((element, index)=>{
    result[element.ItemNo] = element;
  });
  console.log(result);
  return result;
}

class ProductDisplay extends Component {
  constructor(props){
    super(props);
    this.productsInfo = {}
  }

render() {
  return(
  <div>
    { this.props.accessSetup ? <LogInContainer/> : <SettingsButtonContainer/> }
    { this.props.isFetching ? <Loader active/> : null }
    {console.log(this.props.items)}

    <Query
      query={GET_INFO_PRODUCT}
      variables={{productList: this.props.items, lang: 'en'}} >

        {({ loading, error, data }) => {
          if (loading) return <p></p>;
          if (error) {console.log(error); return <p>Error :</p>;}
          if(data.products[0]==null) return <p>Error</p>
          //filtersReduce(data.products);
          this.productsInfo = mapProducts(data.products);
          return (
            <ProductInfo combinations = {this.props.combinations} products = {this.productsInfo}/>
          ); //return
        }}
    </Query>
  </div>)
}
};

 const  ProductDisplayList =  connect(mapStateToProps)(ProductDisplay);
 export default ProductDisplayList
