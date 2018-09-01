import React, { Component } from 'react';
import './Header.css'

class Header extends Component {

    constructor(props){
      super(props);
    }

    render() {
        return (
            <div className="Header">

                <div className="producttype">
                    Bed frame, pine
                </div>

                <div className="productname">
                    {this.props.product[0].ProductName}
                </div>

                <div className="price">
                    CHF 9999.99
                </div>

                <div className="optionsdisclaimer">
                    The price reflects selected options
                </div>

                <div className="rating">
                    ☆☆☆☆☆
                </div>

                <div className="productdescription">
                    TARVA bed frame is a modern example of Scandinavian furniture tradition – a simple design and untreated wood. A timeless expression mixes nicely with a variety of other styles and furniture.
                </div>

                <div className="newicon">
                    <img src={ require('../img/main-screen-landscape-fill-1@2x.png')} alt="" class="fill1" />
                    <img src={ require('../img/main-screen-landscape-fill-3@2x.png')} alt="" class="fill2" />
                    <img src={ require('../img/main-screen-landscape-fill-5@2x.png')} alt="" class="fill3" />
                    <img src={ require('../img/main-screen-landscape-fill-7@2x.png')} alt="" class="fill4" />
                </div>


            </div>
        );
    }
}

export default Header
