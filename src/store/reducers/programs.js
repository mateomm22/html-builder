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

const setCurrent = (state, action) => (
  {
    ...state,
    currentLayout: action.selected,
  }
);

const saveProgramData = (state, action) => (
  {
    ...state,
    programs: [
      ...state.programs,
      action.info,
    ],
  }
);

const programsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SELECT_CARD:
      return setCurrent(state, action);

    case actions.SAVE_PROGRAM:
      return saveProgramData(state, action);

    default:
      return state;
  }
};

export default programsReducer;
