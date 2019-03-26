import * as actions from './types';
import db from '../../Firebase';

const setLandings = data => (
  {
    type: actions.FETCH_LANDINGS,
    data,
  }
);

export const fetchLandings = () => (
  (dispatch) => {
    const landings = [];
    db.collection('landings')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const { nombre } = doc.data();
          landings.push({
            id: doc.id,
            nombre,
          });
        });
        dispatch(setLandings(landings));
      });
  }
);

export const newLanding = data => (
  {
    type: actions.CREATE_LANDING,
    info: data,
  }
);
