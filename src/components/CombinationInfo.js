import React from 'react';
import { Header , Segment, Table, Icon} from 'semantic-ui-react';
import './Header.css';

const _calculatePrice = (combination, products) => {
  let price = 0;
  price += products[combination.bed].RetailItemCommPriceList.RetailItemCommPrice.Price;
  price += products[combination.mattress].RetailItemCommPriceList.RetailItemCommPrice.Price * combination.mattress_qty;
  price += products[combination.slat].RetailItemCommPriceList.RetailItemCommPrice.Price * combination.slat_qty;
  price += products[combination.extra].RetailItemCommPriceList.RetailItemCommPrice.Price * combination.extra_qty;
  return price;
}


const CombinationInfo = ({combination, products}) =>
<Segment basic>
  <Header as="h2">
    <Header.Subheader>{products[combination.bed].ProductTypeName}, {products[combination.bed].ValidDesignText}</Header.Subheader>
    {products[combination.bed].ProductName}
    <Header.Subheader>{products[combination.bed].ItemMeasureReferenceTextMetric}</Header.Subheader>
  </Header>

  <h1 className="product_price">CHF{_calculatePrice(combination, products)}</h1>
  {products[combination.bed].DesignerNameComm != null ? <p>Designed by: {products[combination.bed].DesignerNameComm}</p>:null}
  <p>{products[combination.bed].RetailItemCustomerBenefitSummaryText}</p>

  <Table singleLine basic='very'>
  <Table.Header>
   <Table.Row>
     <Table.HeaderCell>{products[combination.mattress].ProductTypeName}</Table.HeaderCell>
     <Table.HeaderCell>{products[combination.slat].ProductTypeName}</Table.HeaderCell>
   </Table.Row>
 </Table.Header>
 <Table.Body>
    <Table.Row>
      <Table.Cell>
      <Header as='h4' image>
        <Icon  link color={'grey'} name="info" size="tiny"/>
        <Header.Content>
          {products[combination.mattress].ProductName}
          <Header.Subheader>{products[combination.mattress].ValidDesignText}</Header.Subheader>
        </Header.Content>
      </Header>
      </Table.Cell>
      <Table.Cell>
      <Header as='h4' image>
        <Icon link color={'grey'} name="info"/>
        <Header.Content>
          {products[combination.slat].ProductName}
          <Header.Subheader>{products[combination.slat].ValidDesignText}</Header.Subheader>
        </Header.Content>
      </Header>
      </Table.Cell>
      </Table.Row>
  </Table.Body>
  </Table>

</Segment>

export default CombinationInfo
