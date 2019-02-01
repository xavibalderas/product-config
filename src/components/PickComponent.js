
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from '../store/actions';
import { Header , Grid, Segment, Item} from 'semantic-ui-react'


const mapStateToProps = (state) => ({
  selectedCombination: state.data.selectedCombination,
  services: state.settings.config.services
});



class Pick extends Component {

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
        <Item.Image size='tiny' src='/images/delivery.jpg' />
        <Item.Content>
          <Item.Header as='a'>fsdfsdfsd</Item.Header>
          <Item.Description>
            dsadsa
          </Item.Description>
        </Item.Content>
      </Item>
    );
  }
}


const  PickComponent =  connect(mapStateToProps)(Pick);
export default PickComponent
