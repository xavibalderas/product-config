import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions, TYPES } from '../store/actions';
import { Input, Form , Header, Button, Icon, Table} from 'semantic-ui-react'


class Settings extends Component {
  constructor(props){
    super(props);
    this.products = props.products;
    this.state = {
      products: props.products
    }
  }
  save() {
    console.log(this.products);
    console.log("Vamos a guardar");
    this.props.saveConfig(this.state.products);
    localStorage.setItem('products', JSON.stringify(this.state.products));

  }

  handleChange = (e, data) => {
    const pro = this.state.products.slice();
      if (typeof pro[data.data_index] !== undefined ) {
        pro[data.data_index][data.name] = data.value;
        this.setState({
          products: pro
        })
      }
      console.log(pro);

  }

  addCombination = () =>{
    this.setState({
      products: this.state.products.concat([
        {
          bed:'',
          mattress: '',
          mattress_qty: 1,
          slat: '',
          slat_qty: 1,
          extra: '',
          extra_qty: 0
        }
      ])
    });
  }

  removeCombination = (name) => {
    const pro = this.state.products.slice();
      if (typeof pro[name] !== undefined ) {
        pro.splice(name,1);
        this.setState({
          products: pro
        })
      }
  }

  render() {
    return(
      <div className="Header">
        <h2>Configuration</h2>
        <Table compact celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Bed</Table.HeaderCell>
              <Table.HeaderCell>Mattress</Table.HeaderCell>
              <Table.HeaderCell>Qty</Table.HeaderCell>
              <Table.HeaderCell>Slatts</Table.HeaderCell>
              <Table.HeaderCell>Qty</Table.HeaderCell>
              <Table.HeaderCell>Extra</Table.HeaderCell>
              <Table.HeaderCell>Qty</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.state.products.map((combination, index)=>{
              return (
                <Table.Row key = {index}>
                  <Table.Cell>
                    <Input
                    name = 'bed'
                    data_index = {index}
                    onChange = {this.handleChange}
                    placeholder = {combination.bed}
                    value = {combination.bed}
                    />
                  </Table.Cell>

                  <Table.Cell>
                    <Input
                    name = 'mattress'
                    data_index = {index}
                    onChange = {this.handleChange}
                    placeholder = {combination.mattress}
                    value = {combination.mattress}
                    />
                  </Table.Cell>

                  <Table.Cell>
                  <Input
                  name = 'mattress_qty'
                  data_index = {index}
                  onChange = {this.handleChange}
                  placeholder = {combination.mattress_qty}
                  value = {combination.mattress_qty}
                  />
                  </Table.Cell>

                  <Table.Cell>
                  <Input
                  name = 'slat'
                  data_index = {index}
                  onChange = {this.handleChange}
                  placeholder = {combination.slat}
                  value = {combination.slat}
                  />
                  </Table.Cell>

                  <Table.Cell>
                  <Input
                  name = 'slat_qty'
                  data_index = {index}
                  onChange = {this.handleChange}
                  placeholder = {combination.slat_qty}
                  value = {combination.slat_qty}
                  />
                  </Table.Cell>

                  <Table.Cell>
                  <Input
                  name = 'extra'
                  data_index = {index}
                  onChange = {this.handleChange}
                  placeholder = {combination.extra}
                  value = {combination.extra}
                  />
                  </Table.Cell>

                  <Table.Cell>
                  <Input
                  name = 'extra_qty'
                  data_index = {index}
                  onChange = {this.handleChange}
                  placeholder = {combination.extra_qty}
                  value = {combination.extra_qty}
                  />
                  </Table.Cell>

                </Table.Row>
              )

            })}
          </Table.Body>
          <Table.Footer fullWidth>
          <Table.Row>
            <Table.HeaderCell colSpan='7'>
              <Button icon labelPosition='left' primary size='small' onClick={() => this.addCombination()}>
                <Icon name='plus' /> Add Combination
              </Button>
            </Table.HeaderCell>
          </Table.Row>
          </Table.Footer>

        </Table>
        <Form>
            <Header as="h3">
              Bed Structure references
            </Header>
            {this.state.products.map((product, index)=>{
              return (
              <Form.Group key = {index} widths = '3'>
                <Form.Input
                name = {index}
                onChange = {this.handleChange}
                placeholder = {product}
                value = {product}/>

                <Button icon onClick={() => this.removeCombination(index)}>
                  <Icon name='minus' />
                </Button>
              </Form.Group>
              )
            })}
            <Button icon onClick={() => this.addCombination()}>
              <Icon name='plus' />
            </Button>
        <Form.Button onClick={() => this.save()}>Save</Form.Button>
          <Form.Button onClick={() => this.props.onLogOut()}>Log out</Form.Button>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
    products: state.settings.products
});

const mapDispatchToProps = dispatch => {
  return {
    onLogOut: () => {
      dispatch(actions.logInOut(false));
      dispatch(actions.accessSetup(false))
    },
    saveConfig: (products) => {
      console.log("Guardo");
      console.log(products);
      dispatch(actions.saveConfig(products))
    }
  }
}

const  SettingsContainer =  connect(mapStateToProps, mapDispatchToProps)(Settings);
export default SettingsContainer
