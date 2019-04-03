import * as actions from '../actions/types';

const initialState = {
  cards: [
    {
      id: 1,
      name: 'Simple card',
    },
    {
      id: 2,
      name: 'Horizontal card',
    },
    {
      id: 3,
      name: 'Hover card',
    },
  ],
};

const programsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_PROGRAMS:
      return {
        ...state,
        loadedPrograms: action.programs,
      };

    default:
      return state;
  }
};

export default programsReducer;
