import React, { Component } from 'react';
import './Leftpanel.css'
import Modal from 'react-modal';
import SlidingPane from 'react-sliding-pane';
import InputForm from './InputForm.js';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';

const divStyle = {
        backgroundColor     : 'rgba(255, 255, 255, 0.0)',
        top                 : '30px',
        height              : 'auto',
        width               : '350px',
        position            : 'absolute',
        margin              : '0',
        left                : '31px',
        msTransform         : 'rotate(0deg)', /* IE 9 */
        WebkitTransition    : 'rotate(0deg)', /* Chrome, Safari, Opera */
        transform           : 'rotate(0deg)',
        fontFamily          : 'Noto Sans',
        fontWeight          : '400',
        fontStyle           : 'normal',
        fontSize            : '24.0px',
        color               : 'rgba(0, 0, 0, 1.0)',
        textAlign           : 'left',
        lineHeight          : '33.0px',

};


class Leftpanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isINFOPaneOpen: false,
          isBUYPaneOpen: false,
          isMAILPaneOpen: false,
        };
      }

    componentDidMount() {
        Modal.setAppElement(this.el);
    }

    render() {
        

        return (
            <div className="Leftpanel">
                
                <button class= "btn1" onClick={ () => this.setState({ isINFOPaneOpen: true})}> <i className="fa fa-bars"></i>     
                </button>

                <SlidingPane className='infopanel'
                    overlayClassName='overlayinfo'
                    isOpen={ this.state.isINFOPaneOpen }
                    title='Product Information'
                    from='left'
                    width='400px'
                    onRequestClose={ () => this.setState({ isINFOPaneOpen: false }) }>

                    <div className="productinfo" style={divStyle}>
                    •	Made of solid wood, which is a hard-wearing and warm natural material.
                    <br/>
                    •	If you oil, wax, lacquer or stain the untreated solid wood surface it will be more durable and easy to care for.
                    <br/>
                    •	28 slats of layer-glued birch adjust to your body weight and increase the suppleness of the mattress.
                    <br/>
                    <br/>
                    <b>Environment</b>
                    <br/> <br/>
                    Bed frame:
                    <br/>
                    Renewable material (wood).
                    <br/>
                    We have clear requirements for all the wood we use, including a ban on illegally harvested wood. By 2020, we want all our wood to come from more sustainable sources, defined as certified or recycled.
                    <br/>
                    Slatted bed base:
                    <br/>
                    At least 50% (weight) of this product is made from renewable materials.
                    <br/>
                    </div>
                    
                </SlidingPane>

                <button class= "btn2" onClick={ () => this.setState({ isBUYPaneOpen: true})}> <i className="fa fa-shopping-cart"></i>     
                </button>
                <SlidingPane className='buypanel'
                    isOpen={ this.state.isBUYPaneOpen }
                    title='Buy Information'
                    from='left'
                    width='400px'
                    onRequestClose={ () => this.setState({ isBUYPaneOpen: false }) }>

                    <div className="buyinfo" style={divStyle}>

                    </div>

                </SlidingPane>


                <button class= "btn3" onClick={ () => this.setState({ isMAILPaneOpen: true})}> <i className="fa fa-envelope"></i>     
                </button>
                <SlidingPane className='sendpanel'
                    isOpen={ this.state.isMAILPaneOpen }
                    title='Send Configuration'
                    from='left'
                    width='400px'
                    onRequestClose={ () => this.setState({ isMAILPaneOpen: false }) }>

                    <div className="sendinfo" style={divStyle}>
                        <div class="wecansendyouall">
                            We can send you all the information of the combination in an email. So you can have it with you in your telephone, send to a friend, or check it later at home.
                        </div>
                        <br/>
                        <div class="writeyouremail">
                            Write your email:
                        </div>
                        <br/>
                        
                        <InputForm />

                    </div>

                </SlidingPane>

            </div>
        

        );
    }
}

export default Leftpanel;