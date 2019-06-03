import React from 'react';
import { Header , Segment, Button, Table, Icon, Modal} from 'semantic-ui-react';
import './Header.css';
import queryReducer from '../tools/queryReducer';
import ReactGA from 'react-ga';


const _calculatePrice = (combination, products, family = false) => {
  if (family){
    console.log(combination);
    console.log(products);
  }
  return combination.reduce((accumulator, currentValue) => {
    let price = accumulator;
    let i_price = 0;
    if (currentValue.isValid && products.hasOwnProperty(currentValue.itemno)){
      if (!family && products[currentValue.itemno].RetailItemCommPriceList.RetailItemCommPrice.RetailPriceType=='IKEAFamilySalesUnitPrice'){
        i_price = products[currentValue.itemno].RetailItemCommPriceList.RetailItemCommPrice.PriceNotOffer * currentValue.qty;
      }else{
        i_price = products[currentValue.itemno].RetailItemCommPriceList.RetailItemCommPrice.Price * currentValue.qty;
      }
    }
    return price + i_price;
  }, 0)

}

const checkFamilyPrice =(products, combination) =>{
  var family = false;
  for (var i = 0; i < combination.length; i++) {
    if(products[combination[i].itemno].RetailItemCommPriceList.RetailItemCommPrice.RetailPriceType=='IKEAFamilySalesUnitPrice'){
      family = true;
    }
  }
  return family;
}

const checkMainFamily =(product) =>{
  return product.RetailItemCommPriceList.RetailItemCommPrice.RetailPriceType=='IKEAFamilySalesUnitPrice';
}

const familyPeriod = (products, combination) =>{
  let period = "";

  for (var i = 0; i < combination.length; i++) {
    if(products[combination[i].itemno].RetailItemCommPriceList.RetailItemCommPrice.RetailPriceType=='IKEAFamilySalesUnitPrice'){
      console.log(products[combination[i].itemno]);
      let priceField = products[combination[i].itemno].RetailItemCommPriceList.RetailItemCommPrice;
      let from = priceField.ValidFromDateTime;
      let to = priceField.ValidToDateTime;
      period = "Gültig vom " + from + ' bis ' + to;
    }
  }
  return period;
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

  registerAction = (name) => {

    switch (name) {
      case 'kompletpreis':
        ReactGA.event({
          category: 'User',
          action: 'Open complete price information'
        });
        break;
      default:
    }
  }

  handleOpenPrice = ()=>{
    this.setState({modalPrice: true});
    this.registerAction('kompletpreis');
  }

    handleClosePrice = ()=>{
      this.setState({modalPrice: false});
    }

  render() {
    const combination = this.props.combination;
    const products = this.props.products;
    if (combination.length === 0) return null;
    const main = combination[0].itemno;
    const family = checkMainFamily(products[main]);
    const familyCombination =checkFamilyPrice(products, combination);

    if (!combination[0].isValid) return null;
    return (
      <Segment basic>
        <Header as="h2">
          <Header.Subheader>{products[main].ProductTypeName}, {products[main].ValidDesignText}</Header.Subheader>
          {products[main].ProductName}
          <Header.Subheader>{products[main].ItemMeasureReferenceTextMetric}</Header.Subheader>
        </Header>
        {family == true &&
          <p className="family_claim">IKEA FAMILY Preis</p>
        }
        <h1 className="product_price">{queryReducer.formatPrice(products[main].RetailItemCommPriceList.RetailItemCommPrice.Price)}</h1>
        {family == true &&
          <p className="family_period">{familyPeriod(products, combination)}</p>
        }
        {familyCombination == true &&
          <p className="family_claim">IKEA FAMILY Preis</p>
        }
        <p><span className="complete_price">Komplettpreis: {queryReducer.formatPrice(_calculatePrice(combination, products, familyCombination))} <Icon name="question" onClick={this.handleOpenPrice}/></span>
        {familyCombination == true &&
          <span><br/><span className="normal_preis">Normalpreis: {queryReducer.formatPrice(_calculatePrice(combination, products))}</span><br/><span className="family_period">{familyPeriod(products, combination)}</span></span>
        }</p>

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
         let familyArt = checkMainFamily(products[item.itemno])
         return(
           <Table.Row key={key}>
             {item.isValid ? <Table.Cell textAlign="right">{item.qty}x</Table.Cell> : null}
             {item.isValid ? <SubProductInfo icon={false} article={products[item.itemno]}/> : null}
             {item.isValid ? <Table.Cell className="pricedetail">
               <Header as='h4' image>
               {familyArt && <Header.Subheader><span className="family_claim">IKEA FAMILY Preis</span></Header.Subheader>}
               {queryReducer.formatPrice(products[item.itemno].RetailItemCommPriceList.RetailItemCommPrice.Price) }
               {familyArt && <Header.Subheader><span className="normal_preis">Normalpreis: {queryReducer.formatPrice(products[item.itemno].RetailItemCommPriceList.RetailItemCommPrice.PriceNotOffer)}</span><br/><span className="family_period">{familyPeriod(products, combination)}</span></Header.Subheader>}
               </Header>
               </Table.Cell> : null}


         </Table.Row>
         )
       })}
        <Table.Row>
          <Table.Cell></Table.Cell><Table.Cell textAlign="right"><h3>Komplettpreis</h3></Table.Cell>

            <Table.Cell className="pricedetail">
              <Header as='h4' image>
                <Header.Content>
                  {familyCombination && <Header.Subheader><span className="family_claim">IKEA FAMILY Preis</span></Header.Subheader>}
                  {queryReducer.formatPrice(_calculatePrice(combination, products, familyCombination))}
                  {familyCombination && <Header.Subheader><span className="normal_preis">Normalpreis: {queryReducer.formatPrice(_calculatePrice(combination, products))}</span><br/><span className="family_period">{familyPeriod(products, combination)}</span></Header.Subheader>}
                </Header.Content>
              </Header>
            </Table.Cell>


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
