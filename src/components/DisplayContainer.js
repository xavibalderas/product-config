import React, { Component }from 'react';
import { connect } from 'react-redux';
import SettingsButtonContainer from './SettingsButton.js';
import { Loader} from 'semantic-ui-react'
import gql from 'graphql-tag';
import { Query } from "react-apollo";
import Display from './Display';
import queryReducer from '../tools/queryReducer';


const mapStateToProps = (state) => ({
  accessSetup: state.settings.accessSetup,
  isFetching: state.settings.isFetching,
  items: state.data.items,
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
    RetailItemCustomerBenefitList{
      RetailItemCustomerBenefit{
        CustomerBenefitText
        SortNo
      }
    }
    RetailItemImageList{
      RetailItemImage{
        ImageUsage
        ImageSize
        ImageUrl
        ImageWidth
        ImageHeight
        SortNo
        ImageType
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

/*const filtersReduce = (products) => {
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

}*/

const mapProducts = (productsInfo) => {
  let result = {};
  productsInfo.forEach((element, index)=>{
    result[element.ItemNo] = element;
  });
  return result;
}

class DisplayRoot extends Component {
  constructor(props){
    super(props);
    this.productsInfo = {}
  }

render() {

  return(
  <div>
    <SettingsButtonContainer/>
    { this.props.isFetching ? <Loader active/> : null }
    <Query
      query={GET_INFO_PRODUCT}
      variables={{productList: this.props.items, lang: 'de'}} >

        {({ loading, error, data }) => {
          if (loading) return <p></p>;
          if (error) {console.log(error); return <p> Error :</p> ;}
          if(data.products[0]==null) return <p>Error</p>
          //filtersReduce(data.products);
          queryReducer.reduce(data);
          this.productsInfo = mapProducts(data.products);
          return (<Display products = {this.productsInfo}/>); //return
        }}
    </Query>
  </div>)
}
};

 const  DisplayContainer =  connect(mapStateToProps)(DisplayRoot);
 export default DisplayContainer
