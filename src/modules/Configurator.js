import React, { Component } from 'react';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import './Configurator.css'

const sizeOptions = [
    '140x200cm','180x200cm','105x20cm'
]
const colorOptions = [
    'Birch','Pine','White'
]
const slattOptions = [
    'Lönset','Frikandel','idk'
]
const matressOptions = [
    'Hamarvik','Kartoffel','Paprika'
]

class Configurator extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sizeSelected: sizeOptions[0],
            colorSelected: colorOptions[0],
            slattSelected: slattOptions[0],
            matressSelected: matressOptions[0],
        }
        this._onSelectSize = this._onSelectSize.bind(this)
        this._onSelectColor = this._onSelectColor.bind(this)
        this._onSelectSlatt = this._onSelectSlatt.bind(this)
        this._onSelectMatress = this._onSelectMatress.bind(this)
    }

    _onSelectSize (option) {
        console.log('Size selected:', option.label)
        this.setState({sizeSelected: option})
    }
    _onSelectColor (option) {
        console.log('Color selected: ', option.label)
        this.setState({colorSelected: option})
    }
    _onSelectSlatt (option) {
        console.log('Slatt selected:',option.label)
        this.setState({slattSelected: option})
    }
    _onSelectMatress (option) {
        console.log('Matress selected:', option.label)
        this.setState({matressSelected: option})
    }
    
    render() {
        const defaultSizeOption = this.state.sizeSelected
        const defaultColorOption = this.state.colorSelected
        const defaultSlattOption = this.state.slattSelected
        const defaultMatressOption = this.state.matressSelected

       //const placeHolderValueSize = typeof this.state.sizeSelected === 'string' ? this.state.sizeSelected : this.state.sizeSelected.label

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
                    placeholder="Select an option" 
                />


                <div class="droplabel2">
                    Color
                </div>
                <Dropdown className="colordrop"
                    menuClassName="menudrop"
                    options={colorOptions}
                    onChange={this._onSelectColor}
                    value={defaultColorOption}
                    placeholder="Select an option" 
                />


                <div class="droplabel3">
                    Slatted bed
                </div>
                <Dropdown className='slattdrop'
                    menuClassName="menudrop"
                    options={slattOptions}
                    onChange={this._onSelectSlatt}
                    value={defaultSlattOption}
                    placeholder="Select an option"
                />



                <div class="droplabel4">
                    Mattress
                </div>
                <Dropdown className='matressdrop'
                menuClassName='menudrop'
                options={matressOptions}
                onChange={this._onSelectMatress}
                value={defaultMatressOption}
                placeholder="Select an option"
                />




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