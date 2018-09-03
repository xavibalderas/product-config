import React from 'react';
import { Header , Segment, Table, Icon} from 'semantic-ui-react';
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
  return element.trim().length===8
}

const SubProductInfo = ({article}) => (
  <Table.Cell>
  <Header as='h4' image>
    <Icon  link color={'grey'} name="info" size="tiny"/>
    <Header.Content>
      {article.ProductName}
      <Header.Subheader>{article.ValidDesignText}</Header.Subheader>
    </Header.Content>
  </Header>
  </Table.Cell>

);

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
     {hasReference(combination.mattress) ? <Table.HeaderCell>{products[combination.mattress].ProductTypeName}</Table.HeaderCell> : null }
     {hasReference(combination.slat) ? <Table.HeaderCell>{products[combination.slat].ProductTypeName}</Table.HeaderCell> : null }
   </Table.Row>
 </Table.Header>
 <Table.Body>
    <Table.Row>
    {hasReference(combination.mattress) ? <SubProductInfo article={products[combination.mattress]}/> : null}
    {hasReference(combination.slat) ? <SubProductInfo article={products[combination.slat]}/> : null}
      </Table.Row>
  </Table.Body>
  </Table>

</Segment>

export default CombinationInfo
