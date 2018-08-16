import { TYPES } from './actions'

const initialStates = {
  settings: {
    loggedIn: false,
    accessSetup: false,
    products: ['000000'],
    loadingConfig: false,
    isFetching: false,
  },
  data: {
    isFetching: false,
    didInvalidate: false,
    items: []
  }
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
        products: action.products
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

    case TYPES.RECEIVE_PRODUCTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.productsInfo
      });

    default:
      return state;
  }
}
