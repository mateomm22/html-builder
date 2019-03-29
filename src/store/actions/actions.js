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
          landings[landing.id] = landing.data();
        });
        dispatch({
          type: actions.FETCH_LANDINGS,
          data: landings,
        });
      });
  }
);

export const getLandingInfo = id => (
  (dispatch) => {
    db.collection('landings').doc(id)
      .get()
      .then((landing) => {
        dispatch({
          type: actions.GET_LANDING_INFO,
          data: landing.data(),
        });
      });
  }
);

export const newLanding = data => (
  (dispatch) => {
    db.collection('landings')
      .add(data)
      .then((docRef) => {
        dispatch({
          type: actions.CREATE_LANDING,
          data: {
            id: docRef.id,
            nombre: data.nombre,
            universidad: data.universidad,
          },
        });
        History.push(`/landings/${docRef.id}/create`);
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

export const deleteLanding = id => (
  (dispatch) => {
    db.collection('landings').doc(id)
      .delete()
      .then(() => {
        dispatch(fetchLandings());
      });
  }
);


// Programs actions
export const fetchPrograms = idLanding => (
  (dispatch) => {
    const programs = {};
    db.collection('programas')
      .where('landing', '==', idLanding)
      .get()
      .then((allPrograms) => {
        allPrograms.forEach((program) => {
          programs[program.id] = program.data();
        });
        dispatch({
          type: actions.FETCH_PROGRAMS,
          programs,
        });
      });
  }
);

export const getProgramInfo = id => (
  (dispatch) => {
    db.collection('programas').doc(id)
      .get()
      .then((landing) => {
        dispatch({
          type: actions.GET_PROGRAM_INFO,
          data: landing.data(),
        });
      });
  }
);

export const editProgram = (id, data, idLanding) => (
  (dispatch) => {
    db.collection('programas').doc(id)
      .set(data, { merge: true })
      .then(() => {
        dispatch(fetchPrograms(idLanding));
      });
  }
);

export const deleteProgram = (id, idLanding) => (
  (dispatch) => {
    db.collection('programas').doc(id)
      .delete()
      .then(() => {
        dispatch(fetchPrograms(idLanding));
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
