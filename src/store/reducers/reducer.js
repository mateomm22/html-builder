import { combineReducers } from 'redux';

import landingsReducer from './landings';
import programsReducer from './programs';

// Set the state key names
export default combineReducers({
  landingsReducer,
  programsReducer
});
