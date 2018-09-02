export const TYPES = {
  ACCESS_SETUP: 'ACCESS_SETUP',
  LOG_IN_OUT: 'LOG_IN_OUT',
  SAVE_CONFIG: 'SAVE_CONFIG',
  SELECT_COMBINATION: 'SELECT_COMBINATION',
  REQUEST_PRODUCTS: 'REQUEST_PRODUCTS',
  RECEIVE_PRODUCTS: 'RECEIVE_PRODUCTS',
  LOADING_CONFIG: 'LOAD_CONFIG',
  CONFIG_LOADED: 'CONFIG_LOADED',
  ITEMS_LOADED: 'ITEMS_LOADED',
}

export const actions = {
  accessSetup: (bool) => ({ type: TYPES.ACCESS_SETUP, bool }),
  logInOut: (bool) => ({ type: TYPES.LOG_IN_OUT, bool }),
  saveConfig: (products) => ({ type: TYPES.SAVE_CONFIG, products }),
  requestProducts: (products) => ({ type: TYPES.REQUEST_PRODUCTS, products }),
  receiveProducts: (productsInfo) => ({ type: TYPES.RECEIVE_PRODUCTS, productsInfo }),
  loadingConfig: (bool) => ({ type: TYPES.LOADING_CONFIG, bool }),
  configLoaded: (combinations) => ({ type: TYPES.CONFIG_LOADED, combinations }),
  itemsLoaded: (combinations) => ({ type: TYPES.ITEMS_LOADED, combinations }),
  selectCombination: (combination) => ({type: TYPES.SELECT_COMBINATION, combination })
}
