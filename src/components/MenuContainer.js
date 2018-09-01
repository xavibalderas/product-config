import React, { Component } from 'react';
import { Menu, Sidebar,Button,  Segment, Icon} from 'semantic-ui-react';



class MenuContainer  extends Component {
  state = { visible: false }

  handleItemClick = () => {
    this.setState({ visible: !this.state.visible })
    console.log("fdsfsfdsfsdf");
  }

  render(){
    const { visible } = this.state
    return(
      <div>
        <Menu borderless  icon vertical fixed={'left'}>
          <Menu.Item name='info' onClick={this.handleItemClick} >
            <Icon color={'grey'} size={'large'} name='info' />
          </Menu.Item>
          <Menu.Item name='info' >
            <Icon color={'grey'} size={'large'} name='shop' />
          </Menu.Item>
          <Menu.Item name='info' >
            <Icon color={'grey'} size={'large'} name='envelope' />
          </Menu.Item>
          <Menu.Item name='info' >
            <Icon color={'grey'} size={'large'} name='language' />
          </Menu.Item>
        </Menu>
        <Sidebar
          as={Segment}
          animation='overlay'
          vertical
          width='wide'
          visible={visible}
        >
        <Button attached='top' icon onClick={this.handleItemClick}>
          <Icon color={'grey'} size={'large'} name='close' />
          </Button>
        <Segment basic clearing>

          <p>fsdhkfhsdfd</p>

        </Segment>
        </Sidebar>



</div>
    )
  }
}

export default MenuContainer
