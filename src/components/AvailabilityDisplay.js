import React from 'react';
import {List, Table} from 'semantic-ui-react';


const SelfServe = ({findIt}) => (
  <Table singleLine basic='very'>
  <Table.Header>
   <Table.Row>
     <Table.HeaderCell>Row</Table.HeaderCell>
     <Table.HeaderCell>Cell</Table.HeaderCell>
   </Table.Row>
 </Table.Header>
 <Table.Body>
    <Table.Row>
      <Table.Cell>{findIt.box}</Table.Cell>
      <Table.Cell>{findIt.shelf}</Table.Cell>
      </Table.Row>
  </Table.Body>
  </Table>
);


const AvailabilityDisplay = ({product, productInfo}) => (
<List.Item>
  <List.Content>
    <List.Header>{productInfo.ProductName}</List.Header>
    <List.Description>
      {product.findItList.findIt.type === 'BOX_SHELF' ? <SelfServe findIt={product.findItList.findIt}/> : null}
    </List.Description>
  </List.Content>
</List.Item>

);

export default AvailabilityDisplay;
