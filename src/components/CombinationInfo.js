import React from 'react';
import { Header , Segment, Button, Table, Icon, Modal} from 'semantic-ui-react';
import './Header.css';

const _calculatePrice = (combination, products) => {
  let price = 0;
  price += hasReference(combination.bed) ? products[combination.bed].RetailItemCommPriceList.RetailItemCommPrice.Price : 0;
  price += hasReference(combination.mattress) ? products[combination.mattress].RetailItemCommPriceList.RetailItemCommPrice.Price * combination.mattress_qty : 0;
  price += hasReference(combination.slat) ? products[combination.slat].RetailItemCommPriceList.RetailItemCommPrice.Price * combination.slat_qty : 0;
  price += hasReference(combination.extra) ? products[combination.extra].RetailItemCommPriceList.RetailItemCommPrice.Price * combination.extra_qty : 0;
  return price;
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
    if (hasReference(combination.bed)===false) return null;
    return (
      <Segment basic>
        <Header as="h2">
          <Header.Subheader>{products[combination.bed].ProductTypeName}, {products[combination.bed].ValidDesignText}</Header.Subheader>
          {products[combination.bed].ProductName}
          <Header.Subheader>{products[combination.bed].ItemMeasureReferenceTextMetric}</Header.Subheader>
        </Header>

        <h1 className="product_price">CHF{products[combination.bed].RetailItemCommPriceList.RetailItemCommPrice.Price}</h1>
        <p>Komplettpreis: CHF{_calculatePrice(combination, products)} <Icon name="question" onClick={this.handleOpenPrice}/></p>
        {products[combination.bed].DesignerNameComm != null ? <p>Designed by: {products[combination.bed].DesignerNameComm}</p>:null}
        <p>{products[combination.bed].RetailItemCustomerBenefitSummaryText}</p>

        <Table singleLine basic='very'>
       <Table.Body>
          <Table.Row>
          {hasReference(combination.mattress) ? <SubProductInfo icon={true} article={products[combination.mattress]}/> : null}
          {hasReference(combination.slat) ? <SubProductInfo icon={true} article={products[combination.slat]}/> : null}
            </Table.Row>
        </Table.Body>
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
          <Table.Row>
            {hasReference(combination.bed) ? <Table.Cell textAlign="right">1x</Table.Cell> : null}
            {hasReference(combination.bed) ? <SubProductInfo icon={false} article={products[combination.bed]}/> : null}
            {hasReference(combination.bed) ? <Table.Cell><h3>CHF{products[combination.bed].RetailItemCommPriceList.RetailItemCommPrice.Price }</h3></Table.Cell> : null}
        </Table.Row>
        <Table.Row>
            {hasReference(combination.mattress) ? <Table.Cell textAlign="right">{combination.mattress_qty}x</Table.Cell> : null}
            {hasReference(combination.mattress) ? <SubProductInfo icon={false} article={products[combination.mattress]}/> : null}
            {hasReference(combination.mattress) ? <Table.Cell><h3>CHF{products[combination.mattress].RetailItemCommPriceList.RetailItemCommPrice.Price * combination.mattress_qty}</h3></Table.Cell> : null}
        </Table.Row>
        <Table.Row>
            {hasReference(combination.slat) ? <Table.Cell textAlign="right">{combination.slat_qty}x</Table.Cell> : null}
            {hasReference(combination.slat) ? <SubProductInfo icon={false} article={products[combination.slat]}/> : null}
            {hasReference(combination.slat) ? <Table.Cell><h3>CHF{products[combination.slat].RetailItemCommPriceList.RetailItemCommPrice.Price * combination.slat_qty}</h3></Table.Cell> : null}
        </Table.Row>
        <Table.Row>
            {hasReference(combination.extra) ? <Table.Cell textAlign="right">{combination.extra_qty}x</Table.Cell> : null}
            {hasReference(combination.extra) ? <SubProductInfo icon={false} article={products[combination.extra]}/> : null}
            {hasReference(combination.extra) ? <Table.Cell><h3>CHF{products[combination.extra].RetailItemCommPriceList.RetailItemCommPrice.Price * combination.extra_qty}</h3></Table.Cell> : null}
        </Table.Row>
        <Table.Row>
          <Table.Cell></Table.Cell><Table.Cell textAlign="right"><h3>Komplettpreis</h3></Table.Cell>
          <Table.Cell><h3>CHF{_calculatePrice(combination, products)}</h3></Table.Cell>
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
