import * as actions from './types';
import db from '../../Firebase';

// Landings actions
export const fetchLandings = () => (
  (dispatch) => {
    const landings = [];
    db.collection('landings')
      .get()
      .then((queryLandings) => {
        queryLandings.forEach((landing) => {
          const { nombre, universidad } = landing.data();
          landings.push({
            id: landing.id,
            nombre,
            universidad,
          });
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
        dispatch({
          type: actions.CREATE_LANDING,
          data: {
            id: docRef.id,
            nombre: data.nombre,
            universidad: data.universidad,
          },
        });
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Error adding document: ', error);
      });
  }
);


// Programs actions
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
