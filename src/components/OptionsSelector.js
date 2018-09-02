import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Segment, Header, List} from 'semantic-ui-react'

const SelectedCombination = ({combination, products}) => (
<div></div>
);


const mapStateToProps = (state) => ({
  combinations: state.settings.combinations,
  items: state.data.items,
  selectedCombination: state.data.selectedCombination
});

const RootOptionsSelector = ({combinations, items, selectedCombination, products }) => (
  <Segment basic olor='blue'>
    <SelectedCombination combination = {combinations[selectedCombination]} products = {products}/>
  </Segment>
);

const  OptionsSelector =  connect(mapStateToProps)(RootOptionsSelector);
export default OptionsSelector;
