import React, { Component } from 'react';
import { Header , Grid, Segment, Item} from 'semantic-ui-react'
import MenuContainer from './MenuContainer';
import { connect } from 'react-redux';
import CombinationInfo from './CombinationInfo';
import OptionsSelector from './OptionsSelector';
import queryReducer from '../tools/queryReducer';
import ServicesContainer from './Services';



const mapStateToProps = (state) => ({
  combinations: state.settings.combinations,
  items: state.data.items,
  selectedCombination: state.data.selectedCombination
});


class CarrierDisplay extends Component {


  render() {
    const combination = this.props.combinations[this.props.selectedCombination];
        return (
          <Grid>
          <Grid.Row>
            <Grid.Column width={1}>
              <MenuContainer combination={combination} products = {this.props.products}/>
            </Grid.Column>
            <Grid.Column width={15}>
            <Grid>
            <Grid.Row>
              <Grid.Column width={11}>
                <CombinationInfo combination={combination} products = {this.props.products}/>
                {this.props.combinations.length > 1 ? <OptionsSelector products = {this.props.products}/> : null }
              </Grid.Column>
              <Grid.Column  width={5}>
              <Segment basic color='blue'>
                <Header as="h5">
                Du kannst alles selber machen, du musst aber nicht
                </Header>
                <Item.Group>
                      <ServicesContainer combination={combination} products = {this.props.products}/>
                  </Item.Group>
                </Segment>
              </Grid.Column>
              </Grid.Row>



            </Grid>
            </Grid.Column>
          </Grid.Row>

          </Grid>


        );
    }
}

const  Display =  connect(mapStateToProps)(CarrierDisplay);
export default Display
