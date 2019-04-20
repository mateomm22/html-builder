import * as actions from '../actions/types';

const initialState = {
  cards: [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
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

    case actions.FILTER_PROGRAMS:
      return (
        {
          ...state,
          loadedPrograms: {
            ...state.loadedPrograms,
            [action.data.id]: {
              ...state.loadedPrograms[action.data.id],
              visible: action.data.show,
            },
          },
        }
      );

    default:
      return state;
  }
};

export default programsReducer;
