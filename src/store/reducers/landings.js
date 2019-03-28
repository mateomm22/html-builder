import * as actions from '../actions/types';

const landingsReducer = (state = {}, action) => {
  switch (action.type) {
    case actions.FETCH_LANDINGS:
      return (
        {
          ...state,
          landings: action.data,
        }
      );

    case actions.CREATE_LANDING:
      return (
        {
          ...state,
          currentLanding: action.data,
        }
      );

    default:
      return state;
  }
};

export default landingsReducer;
