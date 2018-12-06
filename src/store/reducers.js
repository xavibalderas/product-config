import { TYPES } from './actions';
//import BedCombination from './classess'
import queryReducer from '../tools/queryReducer';

/*

setting.combinations: stores all the combinations available in the local storage configuration.
data.items:   stores the unique products numbers for each of the articles added into the full configuration.
              produced as a result of passing the combinations to the reduceItems function.

*/
const initialStates = {
  settings: {

    loggedIn: false,
    accessSetup: false,
    type: 'bed',
    combinations: [
      [
        {
          itemno:'',
          qty:1,
          isValid: false
        }
      ]
    ],
    config: {
      diplayID: ''
    },
    loadingConfig: false,
    isFetching: false,
    version: '1.0'
  },
  data: {
    isFetching: false,
    didInvalidate: false,
    items: [],
    productsInfo: {},
    selectedCombination: 0
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
        combinations: action.combinations
      });
    case TYPES.SETTINGS_LOADED:
      return Object.assign({}, state, {
        config: action.settings
      });
    case TYPES.SAVE_CONFIG:
      return Object.assign({}, state, {
        combinations: action.combinations
      });

    case TYPES.SAVE_SETTINGS:
        return Object.assign({}, state, {
          config: action.config
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
      const items = queryReducer.reduceCombinations(action.combinations);
      return Object.assign({}, state, {
        items: items
      });

    case TYPES.SELECT_COMBINATION:
      return Object.assign({}, state, {
        selectedCombination: action.combination
      })

    default:
      return state;
  }
}
