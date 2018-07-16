import React, { Component } from 'react';
import './Configurator.css'

class Configurator extends Component {
    render() {
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
                <div class="defaultproduct1">
                    140x200cm
                </div>


                <div class="droplabel2">
                    Color
                </div>
                <div class="defaultproduct2">
                    Birch
                </div>


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

                <img src={ require('../img/main-screen-landscape-triangle@2x.png')} alt="" class="triangle1" />
                <img src={ require('../img/main-screen-landscape-triangle@2x.png')} alt="" class="triangle2" />
                <img src={ require('../img/main-screen-landscape-triangle@2x.png')} alt="" class="triangle3" />
                <img src={ require('../img/main-screen-landscape-triangle@2x.png')} alt="" class="triangle4" />


            </div>
        );
    }
}

export default Configurator