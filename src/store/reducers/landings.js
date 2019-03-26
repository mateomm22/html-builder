import * as actions from '../actions/types';

const setLandings = (state, action) => (
  {
    ...state,
    landings: action.data,
  }
);

const landingsReducer = (state = [], action) => {
  switch (action.type) {
    case actions.FETCH_LANDINGS:
      console.log(action);
      return setLandings(state, action);

    default:
      return state;
  }
};

export default landingsReducer;
