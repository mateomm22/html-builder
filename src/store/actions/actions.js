import History from '../../history';

import * as actions from './types';
import db from '../../Firebase';

// Landings actions
export const fetchLandings = () => (
  (dispatch) => {
    const landings = {};
    db.collection('landings')
      .get()
      .then((allLandings) => {
        allLandings.forEach((landing) => {
          const { nombre, universidad } = landing.data();
          landings[landing.id] = { nombre, universidad };
        });
        dispatch({
          type: actions.FETCH_LANDINGS,
          data: landings,
        });
      });
  }
);

export const deleteLanding = id => (
  (dispatch) => {
    db.collection('landings').doc(id)
      .delete()
      .then(() => {
        dispatch(fetchLandings());
      });
  }
);

export const newLanding = data => (
  (dispatch) => {
    db.collection('landings')
      .add(data)
      .then((docRef) => {
        db.collection('grupos').doc(docRef.id)
          .set({ programas: [] })
          .then();
        dispatch({
          type: actions.CREATE_LANDING,
          data: {
            id: docRef.id,
            nombre: data.nombre,
            universidad: data.universidad,
          },
        });
        History.push(`/${docRef.id}/create`);
      });
  }
);

export const editLanding = (id, data) => (
  (dispatch) => {
    db.collection('landings').doc(id)
      .set(data)
      .then(() => {
        dispatch(fetchLandings());
      });
  }
);

// Programs actions
export const fetchPrograms = idLanding => (
  (dispatch) => {
    db.collection('grupos').doc(idLanding)
      .get()
      .then((programsArr) => {
        console.log(programsArr.data());
        dispatch({
          type: actions.FETCH_PROGRAMS,
          data: programsArr.data(),
        });
      });
  }
);

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
