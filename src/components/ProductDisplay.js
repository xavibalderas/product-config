import React from 'react';
import { connect } from 'react-redux';
import { actions, TYPES } from '../store/actions';
import LogInContainer from './Login.js';
import SettingsButtonContainer from './SettingsButton.js';
import { Loader} from 'semantic-ui-react'
import gql from 'graphql-tag';
import { Query } from "react-apollo";


const mapStateToProps = (state) => ({
  accessSetup: state.settings.accessSetup,
  isFetching: state.settings.isFetching,
  products: state.settings.products
});

const GET_INFO_PRODUCT = gql`
query product($partNumber: String!, $lang: String!) {
  product(partNumber: $partNumber, lang: $lang)  {
    partNumber
    name
    type
    normalPrice
    secondPrice
    priceDisclaimer
    familyPrice_startDate
    familyPrice_endDate
    familyPrice_price
    familyPrice_disclaimer
    lang
    info
  }
}
`

const ProductDisplay = ({accessSetup, isFetching, products}) => (

            <div className="Header">
              <h2>Product display</h2>
              <p></p>
              {products.map((product, index)=>{
                return <p key={index}>{product}</p>
              })}
              { accessSetup ? <LogInContainer/> : <SettingsButtonContainer/> }
              { isFetching ? <Loader active/> : null }

              <Query
              query={GET_INFO_PRODUCT}
              variables={{partNumber: products[0], lang: 'en'}} >

            {({ loading, error, data }) => {
              if (loading) return <p></p>;
              if (error) return <p>Error :</p>;
              console.log(data);
              return (
                <p>{data.product.name}</p>
              );
            }}

            </Query>
            </div>
);

 const  ProductDisplayList =  connect(mapStateToProps)(ProductDisplay);
 export default ProductDisplayList
