import React from 'react';
import { Header , Segment, Button, Table, Icon, Modal} from 'semantic-ui-react';
import './Header.css';

const _calculatePrice = (combination, products) => {

  return combination.reduce((accumulator, currentValue) => {
    let price = accumulator;
    let i_price = 0;
    if (currentValue.isValid && products.hasOwnProperty(currentValue.itemno)){
      i_price = products[currentValue.itemno].RetailItemCommPriceList.RetailItemCommPrice.Price * currentValue.qty;
    }
    return price + i_price;
  }, 0)

}

const hasReference = (element) => {
  return (element.trim().length===8 || element.trim().length===9)
}

const SubProductInfo = ({icon, article}) => (
  <Table.Cell>
  <Header as='h4' image>
    {icon ? <Icon link color={'grey'} name="info" size="tiny"/> : null }
    <Header.Content>
      <Header.Subheader>{article.ProductTypeName}</Header.Subheader>
      {article.ProductName}
      <Header.Subheader>{article.ValidDesignText}</Header.Subheader>
    </Header.Content>
  </Header>
  </Table.Cell>

);


class CombinationInfo extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      modalPrice: false
    }
  }

  handleOpenPrice = ()=>{
    this.setState({modalPrice: true});
  }

    handleClosePrice = ()=>{
      this.setState({modalPrice: false});
    }

  render() {
    const combination = this.props.combination;
    const products = this.props.products;
    if (combination.length === 0) return null;
    const main = combination[0].itemno;
    if (!combination[0].isValid) return null;
    return (
      <Segment basic>
        <Header as="h2">
          <Header.Subheader>{products[main].ProductTypeName}, {products[main].ValidDesignText}</Header.Subheader>
          {products[main].ProductName}
          <Header.Subheader>{products[main].ItemMeasureReferenceTextMetric}</Header.Subheader>
        </Header>

        <h1 className="product_price">{products[main].RetailItemCommPriceList.RetailItemCommPrice.Price}</h1>
        <p>Komplettpreis: {_calculatePrice(combination, products)} <Icon name="question" onClick={this.handleOpenPrice}/></p>
        {products[main].DesignerNameComm != null ? <p>Designed by: {products[main].DesignerNameComm}</p>:null}
        <p>{products[main].RetailItemCustomerBenefitSummaryText}</p>

        <Table singleLine basic='very'>
      {/* <Table.Body>
          <Table.Row>
          {hasReference(combination.mattress) ? <SubProductInfo icon={true} article={products[combination.mattress]}/> : null}
          {hasReference(combination.slat) ? <SubProductInfo icon={true} article={products[combination.slat]}/> : null}
            </Table.Row>
        </Table.Body> */}
        </Table>

        <Modal
        open={this.state.modalPrice}
        onClose={this.handleClosePrice}
        dimmer="inverted"
        size='large'
        closeIcon
        >
        <Header icon='list' content='Komplettpreis' />
        <Modal.Content>
        <Table singleLine basic='very'>
       <Table.Body>
       {combination.map((item, key)=>{
         if (!products.hasOwnProperty(item.itemno)) return null;
         return(
           <Table.Row key={key}>
             {item.isValid ? <Table.Cell textAlign="right">{item.qty}x</Table.Cell> : null}
             {item.isValid ? <SubProductInfo icon={false} article={products[item.itemno]}/> : null}
             {item.isValid ? <Table.Cell><h3>{products[item.itemno].RetailItemCommPriceList.RetailItemCommPrice.Price }</h3></Table.Cell> : null}
         </Table.Row>
         )
       })}
        <Table.Row>
          <Table.Cell></Table.Cell><Table.Cell textAlign="right"><h3>Komplettpreis</h3></Table.Cell>
          <Table.Cell><h3>{_calculatePrice(combination, products)}</h3></Table.Cell>
        </Table.Row>

        </Table.Body>
        </Table>


        </Modal.Content>
      </Modal>

      </Segment>
    );
  }

}


export default CombinationInfo
