
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from '../store/actions';
import { Header , Grid, Segment, Item} from 'semantic-ui-react'


const mapStateToProps = (state) => ({
  selectedCombination: state.data.selectedCombination,
  services: state.settings.config.services
});



class AssenblyContinental extends Component {

  constructor(props) {
    super(props);
    console.log(this.props.services);
  }

  resetCombination(){
    console.log(this.combination);
    this.combination.actual="";
  }

  render(){
    return(
      <Item >
        <Item.Image size='tiny' src='/images/assembly.png' />
        <Item.Content>
          <Item.Header as='a'>Montageservice</Item.Header>
          <Item.Description>
            <h3>180.- pro Boxspringbett</h3>
          </Item.Description>
        </Item.Content>
      </Item>
    );
  }
}


const  AssemblycontComponent =  connect(mapStateToProps)(AssenblyContinental);
export default AssemblycontComponent
