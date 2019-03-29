import * as actions from '../actions/types';

const initialState = {
  cards: [
    {
      id: 1,
      name: 'Simple card',
    },
    {
      id: 2,
      name: 'Hover card',
    },
  ],
  currentLayout: 1,
  programs: [],
};

const programsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_PROGRAMS:
      return {
        ...state,
        loadedPrograms: action.programs,
      };

    case actions.GET_PROGRAM_INFO:
      return {
        ...state,
        currentProgram: action.data,
      };

    case actions.SELECT_CARD:
      return {
        ...state,
        currentLayout: action.selected,
      };

    case actions.SAVE_PROGRAM:
      return {
        ...state,
        programs: [
          ...state.programs,
          action.info,
        ],
      };

    default:
      return state;
  }
};

export default programsReducer;
