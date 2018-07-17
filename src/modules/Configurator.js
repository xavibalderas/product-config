import React, { Component } from 'react';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import './Configurator.css'

const sizeOptions = [
    '140x200cm','180x200cm','105x20cm'
]
const colorOptions = [
    'Birch','two','three'
]

const defaultSizeOption = sizeOptions[0]
const defaultColorOption = colorOptions[0]

class Configurator extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sizeSelected: sizeOptions[0],
            colorSelected: colorOptions[0]
        }
        this._onSelectSize = this._onSelectSize.bind(this)
        this._onSelectColor = this._onSelectColor.bind(this)
    }

    _onSelectSize (option) {
        console.log('Size selected:', option.label)
        this.setState({sizeSelected: option})
    }
    _onSelectColor (option) {
        console.log('Color selected: ', option.label)
        this.setState({colorSelected: option})
    }
    
    render() {
        const defaultSizeOption = this.state.sizeSelected
        const defaultColorOption = this.state.colorSelected

        const placeHolderValueSize = typeof this.state.sizeSelected === 'string' ? this.state.sizeSelected : this.state.sizeSelected.label
        return (
            <div className="Configurator">

                <div class="title">
                    Configure the product
                </div>
                <img src={ require('../img/main-screen-landscape-line-copy-2.png')} alt="" class="titleline" />
                <div class="wrenchicon">
                    wrench
                </div>

                
                <div class="droplabel1">
                    Size
                </div>
                <Dropdown className="sizedrop"
                    menuClassName="menudrop"
                    options={sizeOptions}
                    onChange={this._onSelectSize}
                    value={defaultSizeOption}
                    placeholder="Select and option" 
                />


                <div class="droplabel2">
                    Color
                </div>
                <Dropdown className="colordrop"
                    menuClassName="menudrop"
                    options={colorOptions}
                    onChange={this._onSelectColor}
                    value={defaultColorOption}
                    placeholder="Select and option" 
                />


                <div class="droplabel3">
                    Slatted bed
                </div>
                <div class="defaultproduct3">
                    Lönset
                </div>


                <div class="droplabel4">
                    Mattress
                </div>
                <div class="defaultproduct4">
                    Hamarvik
                </div>

                <div class="productimage">
                    <div class="mask">
                    </div>
                    <img src={ require('../img/main-screen-landscape-0405436pe566702s5-1.png')} alt="" class="image" />
                </div>



            </div>
        );
    }
}

export default Configurator