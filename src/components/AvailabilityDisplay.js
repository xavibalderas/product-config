import React from 'react';
import { Table, Item} from 'semantic-ui-react';
import formatStringByPattern from 'format-string-by-pattern';


const SelfServe = ({findIt}) => (
  <Table compact='very' size='small' singleLine basic='very'>
  <Table.Header>
   <Table.Row verticalAlign="bottom">
     <Table.HeaderCell>Regal</Table.HeaderCell>
     <Table.HeaderCell>Fach</Table.HeaderCell>
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
<Item>
      <Item.Content>
        <Item.Header>{productInfo.ProductName}</Item.Header>
        <Item.Meta>
          {productInfo.ProductTypeName}<br/>
          {formatStringByPattern('000.000.00', productInfo.ItemNo)}
        </Item.Meta>
        <Item.Description>
          {product.findItList.findIt.type === 'BOX_SHELF' ? <SelfServe findIt={product.findItList.findIt}/> : null}
          {product.findItList.findIt.type === 'CONTACT_STAFF' ? <p>Bei Fragen zum Kauf und für weitere Informationen, wende dich bitte an unsere Mitarbeiter.</p> : null}

        </Item.Description>
    </Item.Content>
</Item>
);

export default AvailabilityDisplay;
