export const TYPES = {
  ACCESS_SETUP: 'ACCESS_SETUP',
  LOG_IN_OUT: 'LOG_IN_OUT',
  SAVE_CONFIG: 'SAVE_CONFIG',
  SELECT_COMBINATION: 'SELECT_COMBINATION'
}

export const actions = {
  accessSetup: (bool) => ({ type: TYPES.ACCESS_SETUP, bool }),
  logInOut: (bool) => ({ type: TYPES.LOG_IN_OUT, bool }),
  saveConfig: (config) => ({ type: TYPES.SAVE_CONFIG, config }),
  selecCombination: (combination) => ({ type: TYPES.SELECT_COMBINATION, combination })
}
