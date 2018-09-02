import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from '../store/actions';
import { Input, Form ,Radio, Button, Icon, Table, Grid} from 'semantic-ui-react'

class Settings extends Component {
  constructor(props){
    super(props);
    this.combinations = props.combinations;
    this.state = {
      combinations: props.combinations
    }
  }
  save() {
    this.props.saveConfig(this.state.combinations);
    this.props.selectCombination(0);
    localStorage.setItem('products', JSON.stringify(this.state.combinations));

  }

  handleChange = (e, data) => {
    const pro = this.state.combinations.slice();
      if (typeof pro[data.data_index] !== undefined ) {
        pro[data.data_index][data.name] = data.value;
        this.setState({
          combinations: pro
        })
      }      
  }

  addCombination = () =>{
    this.setState({
      combinations: this.state.combinations.concat([
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
    const pro = this.state.combinations.slice();
      if (typeof pro[name] !== undefined ) {
        pro.splice(name,1);
        this.setState({
          combinations: pro
        })
      }
  }

  render() {
    return(
      <div >
      <Grid>
        <Grid.Row>
        <Grid.Column width={16}>
        <h2>Configuration</h2>
        <Table compact celled size="small" basic='very' collapsing>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Default</Table.HeaderCell>
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
            {this.state.combinations.map((combination, index)=>{
              return (
                <Table.Row key = {index}>
                <Table.Cell collapsing>
                <Radio
                           toggle
                           name='defaultCombination'
                           value='this'
                  />
                </Table.Cell>
                  <Table.Cell collapsing>
                    <Input
                    name = 'bed'
                    data_index = {index}
                    onChange = {this.handleChange}
                    placeholder = {combination.bed}
                    value = {combination.bed}

                    />
                  </Table.Cell>

                  <Table.Cell collapsing>
                    <Input
                    name = 'mattress'
                    data_index = {index}
                    onChange = {this.handleChange}
                    placeholder = {combination.mattress}
                    value = {combination.mattress}
                    />
                  </Table.Cell>

                  <Table.Cell collapsing>
                  <Input
                  name = 'mattress_qty'
                  data_index = {index}
                  onChange = {this.handleChange}
                  placeholder = {combination.mattress_qty}
                  value = {combination.mattress_qty}
                  />
                  </Table.Cell>

                  <Table.Cell collapsing>
                  <Input
                  name = 'slat'
                  data_index = {index}
                  onChange = {this.handleChange}
                  placeholder = {combination.slat}
                  value = {combination.slat}
                  />
                  </Table.Cell>

                  <Table.Cell collapsing>
                  <Input
                  name = 'slat_qty'
                  data_index = {index}
                  onChange = {this.handleChange}
                  placeholder = {combination.slat_qty}
                  value = {combination.slat_qty}
                  />
                  </Table.Cell>

                  <Table.Cell collapsing>
                  <Input
                  name = 'extra'
                  data_index = {index}
                  onChange = {this.handleChange}
                  placeholder = {combination.extra}
                  value = {combination.extra}
                  />
                  </Table.Cell>

                  <Table.Cell collapsing>
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
        <Form.Button onClick={() => this.save()}>Save</Form.Button>
          <Form.Button onClick={() => this.props.onLogOut()}>Log out</Form.Button>
          </Grid.Column>
          </Grid.Row>
          </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => ({
    combinations: state.settings.combinations
});

const mapDispatchToProps = dispatch => {
  return {
    onLogOut: () => {
      dispatch(actions.logInOut(false));
      dispatch(actions.accessSetup(false))
    },
    saveConfig: (combinations) => {
      dispatch(actions.saveConfig(combinations));
      dispatch(actions.configLoaded(combinations));
      dispatch(actions.itemsLoaded(combinations));
    },
    selectCombination: (combination) => {
      dispatch(actions.selectCombination(combination));
    }
  }
}

const  SettingsContainer =  connect(mapStateToProps, mapDispatchToProps)(Settings);
export default SettingsContainer
