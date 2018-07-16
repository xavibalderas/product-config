import React, { Component } from 'react';
import './Rightpanel.css'

class Rightpanel extends Component {
    render() {
        return (
            <div className="Rightpanel">

                <img src={ require('../img/main-screen-landscape-line.png')} alt="" class="titleline" />

                <div class="youcandoityourse">
                    You can do it yourself,
                    <br/>
                    but you don’t have to
                </div>

                <div class="delivery">
                    <img src={ require('../img/main-screen-landscape-delivery@2x.png')} alt="" class="delivery1" />
                </div>
                
                <div class="wedeliver">
                    We deliver
                </div>
                <div class="seemoreondelivery">
                    See more on
                    <br/>
                    Delivery service
                </div>
                <div class="seemoreonassembly">
                    See more on
                    <br/>
                    Assembly service
                </div>
                <div class="weassemble">
                    We assemble
                </div>
                <div class="pricedelivery">
                    + CHF 99.00
                </div>
                <div class="priceassembly">
                    + CHF 99.00
                </div>

                <div class="assembleicon">
                    <img src={ require('../img/main-screen-landscape-fill-1 1@2x.png')} alt="" class="part1" />
                    <img src={ require('../img/main-screen-landscape-fill-3 1@2x.png')} alt=""  class="part2" />
                    <img src={ require('../img/main-screen-landscape-fill-4@2x.png')} alt=""  class="part3" />
                    <img src={ require('../img/main-screen-landscape-fill-5 1@2x.png')} alt=""  class="part4" />
                </div>

            </div>
        );
    }
}

export default Rightpanel