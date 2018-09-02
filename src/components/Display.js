import React, { Component } from 'react';
import { Header , Grid, Segment} from 'semantic-ui-react'
import MenuContainer from './MenuContainer';
import { connect } from 'react-redux';
import CombinationInfo from './CombinationInfo';
import OptionsSelector from './OptionsSelector';
import Slider from "react-slick";


const mapStateToProps = (state) => ({
  combinations: state.settings.combinations,
  items: state.data.items,
  selectedCombination: state.data.selectedCombination
});


class CarrierDisplay extends Component {
  constructor(props){
      super(props)
  }

  render() {
    const combination = this.props.combinations[this.props.selectedCombination];
    const settingsSlider = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    console.log(this.props.products);
        return (
          <Grid >
          <Grid.Row>
            <Grid.Column width={1}>
              <MenuContainer combination={combination} products = {this.props.products}/>
            </Grid.Column>
            <Grid.Column width={15}>
            <Grid>
            <Grid.Row>
              <Grid.Column width={11}>
                <CombinationInfo combination={combination} products = {this.props.products}/>
                <OptionsSelector products = {this.props.products}/>
                <Slider {...settingsSlider}>
                  {this.props.products[combination.bed].RetailItemImageList.RetailItemImage.map((element, index)=>{
                    
                  })}
                </Slider>
              </Grid.Column>
              <Grid.Column  width={5}>
              <Segment basic color='blue'>
                <Header as="h5">
                  You can do it yourself, but you don't have to
                </Header>
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
