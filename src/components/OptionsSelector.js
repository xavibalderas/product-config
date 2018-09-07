import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Segment, Header, Card} from 'semantic-ui-react';
import { actions } from '../store/actions';


class CardCombination extends Component {

  handleCardClick = (e, {name}) => {
      this.props.selectCombination(name);
  }
  render() {
    
    if (this.props.products[this.props.combination.bed.toUpperCase()] === undefined) {
      return null;
    }
    return (
      <Card
      link
      onClick = {this.handleCardClick}
      name={this.props.index}>
        <Card.Content>
        <Card.Header>{this.props.products[this.props.combination.bed.toUpperCase()].ProductName}</Card.Header>
        <Card.Description>
          {this.props.products[this.props.combination.bed.toUpperCase()].ValidDesignText}, {this.props.products[this.props.combination.bed.toUpperCase()].ItemMeasureReferenceTextMetric}
        </Card.Description>
        </Card.Content>
      </Card>
    );
  }

}

/*
<SelectedCombination combination = {combinations[selectedCombination]} products = {products}/>
*/
const mapDispatchToProps = dispatch => {
  return {
    selectCombination: (combination) => {
      dispatch(actions.selectCombination(combination));
    }
  }
}

const  CardCombinationRoot =  connect(null, mapDispatchToProps)(CardCombination);


const hasReference = (element) => {
  return element.trim().length===8 || element.trim().length===9
}


const mapStateToProps = (state) => ({
  combinations: state.settings.combinations,
  items: state.data.items,
  selectedCombination: state.data.selectedCombination
});

const RootOptionsSelector = ({combinations, items, selectedCombination, products }) => (
  <Segment basic color='yellow'>
    <Header as="h5">
      Alle weiteren Möglichkeiten
    </Header>
    <Card.Group itemsPerRow={4}>
      {combinations.map((element, index) => {
        return (index !== selectedCombination) && (hasReference(element.bed)) ? <CardCombinationRoot key={index} combination={element} index={index} products={products}/> : null
      })}
    </Card.Group>

  </Segment>
);

const  OptionsSelector =  connect(mapStateToProps)(RootOptionsSelector);
export default OptionsSelector;
