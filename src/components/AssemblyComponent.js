
import React, { Component } from 'react';
import {Item} from 'semantic-ui-react'


const _calculateServicePrice = (price) => {

  let _p = Math.round(100 + (price*0.17));
  return _p + '.-';
}

class AssemblyComponent extends Component {

  constructor(props) {
    super(props);
    console.log(this.props.services);
  }

  resetCombination(){
    console.log(this.combination);
    this.combination.actual="";
  }

  render(){
    const _p = _calculateServicePrice(this.props.price)

    return(
      <Item >
        <Item.Image size='tiny' src='/images/assembly.png' />
        <Item.Content>
          <Item.Header as='a'>Montageservice</Item.Header>
          <Item.Description>
            <h3>{_p}</h3>
            <small>(Basispauschale CHF 100.00 + 17% des Warenwerts)</small>
          </Item.Description>
        </Item.Content>
      </Item>
    );
  }
}


export default AssemblyComponent
