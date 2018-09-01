import React, { Component } from 'react';
import { Sidebar, Segment, Icon} from 'semantic-ui-react'


class SideBarContainer  extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <Sidebar
        as={Segment}
        animation='overlay'
        vertical
        width='wide'
        visible={this.props.visible}
      >
      <Segment basic floated={'right'}>

        <Icon color={'grey'} size={'large'} name='close' onClick />

      </Segment>
      <Segment basic>

        <p>fsdhkfhsdfd</p>

      </Segment>
      </Sidebar>
    )
  }

}

export default SideBarContainer
