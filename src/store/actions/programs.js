import * as actions from './types';

export const selectCard = id => (
  {
    type: actions.SELECT_CARD,
    selected: id,
  }
);

export const newProgram = data => (
  {
    type: actions.SAVE_PROGRAM,
    info: data,
  }
);
