import { TYPES } from './actions'

const initialStates = {
  settings: {
    loggedIn: false,
    accessSetup: false,
    combinations: [{
      bed:'',
      mattress: '',
      mattress_qty: 1,
      slat: '',
      slat_qty: 1,
      extra: '',
      extra_qty: 0
    }],
    loadingConfig: false,
    isFetching: false,
  },
  data: {
    isFetching: false,
    didInvalidate: false,
    items: [],
    productsInfo: {}
  }
}

const reduceItems = (combinations) => {
  let partNumbers = [];
  combinations.forEach((combination, index) => {
    partNumbers.push(combination.bed);
    partNumbers.push(combination.mattress);
    partNumbers.push(combination.slat);
    partNumbers.push(combination.extra);
  });
  return partNumbers;
}

const mapProducts = (productsInfo) => {
  let result = {};
  console.log(productsInfo);
  productsInfo.forEach((element, index)=>{
    result[element.ItemNo] = element;
  });
  console.log(result);
  return result;
}

export const settings = (state = initialStates.settings, action) => {
  switch (action.type) {
    case TYPES.ACCESS_SETUP:
      return Object.assign({}, state, { accessSetup: action.bool });

    case TYPES.LOG_IN_OUT:
      return Object.assign({}, state, { loggedIn: action.bool });

    case TYPES.LOADING_CONFIG:
      return Object.assign({}, state, { isFetching: action.bool });

    case TYPES.CONFIG_LOADED:
      return Object.assign({}, state, {
        isFetching: false,
        combinations: action.combinations
      });

      case TYPES.SAVE_CONFIG:
      return Object.assign({}, state, {
        combinations: action.combinations
      });

    default:
      return state
  }
}

export const data = (state = initialStates.data, action) => {
  switch (action.type) {
    case TYPES.REQUEST_PRODUCTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });

    case TYPES.ITEMS_LOADED:
      const items = reduceItems(action.combinations);
      return Object.assign({}, state, {
        items: items
      });

    case TYPES.RECEIVE_PRODUCTS:
      const productInfo = mapProducts(action.productsInfo);
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: productInfo
      });

    default:
      return state;
  }
}
