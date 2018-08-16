import { TYPES } from './actions'

const initialStates = {
  settings: {
    loggedIn: false,
    accessSetup: false,
    combination: {test:'fffd'},
    configuration: {}
  }
}

export const settings = (state = initialStates.settings, action) => {
  switch (action.type) {
    case TYPES.ACCESS_SETUP:
      return Object.assign({}, state, { accessSetup: action.bool });

    case TYPES.LOG_IN_OUT:
      return Object.assign({}, state, { loggedIn: action.bool });

    default:
      return state
  }
}
