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

    case actions.GET_PROGRAMS_COUNT:
      return (
        {
          ...state,
          landings: {
            ...state.landings,
            [action.data.id]: {
              ...state.landings[action.data.id],
              programas: action.data.total,
            },
          },
        }
      );

    case actions.GET_LANDING_INFO:
      return (
        {
          ...state,
          currentLanding: action.data,
        }
      );

    case actions.SET_TEMPLATE:
      return (
        {
          ...state,
          currentLanding: {
            ...state.currentLanding,
            template: action.id,
          },
        }
      );

    default:
      return state;
  }
};

export default landingsReducer;
