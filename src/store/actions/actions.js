import History from '../../history';

import * as actions from './types';
import db from '../../Firebase';

/**
 * Get the total count of programs inside a given landing
 * @param {string} idLanding - The id of the landing to search into.
 * @returns {object} An object with all the created programs
 * inside the landing.
 */
export const getProgramsCount = idLanding => (
  (dispatch) => {
    db.collection('programas')
      .where('landing', '==', idLanding)
      .get()
      .then((allPrograms) => {
        const total = allPrograms.size;
        dispatch({
          type: actions.GET_PROGRAMS_COUNT,
          data: {
            id: idLanding,
            total,
          },
        });
      });
  }
);

/**
 * Fetch all the landings.
 * After fetching the landings executes the getProgramsCount()
 * function to get the total programs of each landing
 * @returns {object} An object with all the created landings.
 */
export const fetchLandings = () => (
  (dispatch) => {
    const landings = {};
    db.collection('landings')
      .orderBy('universidad')
      .get()
      .then((allLandings) => {
        allLandings.forEach((landing) => {
          landings[landing.id] = landing.data();
          dispatch(getProgramsCount(landing.id));
        });
        dispatch({
          type: actions.FETCH_LANDINGS,
          data: {
            ...landings,
          },
        });
      });
  }
);

/**
 * Looking for the data of a specific landing
 * @param {string} id - The id of the current landing
 * @returns {object} An object with **nombre**, **universidad** and **template**.
 */
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

/**
 * Fetch all the programs ordered by the field **order** inside a landing
 * @param {string} id - The id of the current landing.
 * @returns {object} An object with all the created landings.
 * @see orderPrograms
 */
export const fetchPrograms = idLanding => (
  (dispatch) => {
    const programs = {};
    db.collection('programas')
      .orderBy('order')
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


/**
 * Create a landing with the fields filled in the createLanding modal
 * @param {Object} data - The data of the created landing.
 * @param {string} data.nombre - Name of the landing.
 * @param {number} data.template - Number of the default template used
 * to create the programs.
 * @param {string} data.universidad - Name of the university associated
 * to that landing.
 * @returns {function} Redirects to the create program view.
 * @see orderPrograms
 */
export const createLanding = data => (
  () => {
    db.collection('landings')
      .add(data)
      .then((docRef) => {
        History.push(`/landings/${docRef.id}/create`);
      });
  }
);

/**
 * Creates a program inside a landing with the given data.
 * The function first get the total count of programs inside
 * the current landing with the param idLanding and then creates
 * the new landing with the last index.
 * @param {Object} data - The data of the created program
 * @param {string} data.adicional
 * @param {string} data.boton
 * @param {string} data.desc
 * @param {string} data.duracion
 * @param {string} data.imagen
 * @param {string} data.landing
 * @param {string} data.nombre
 * @param {*} finish - A flag to redirect to the all programs view
 * or just save the program, clean the form and keep creating programs.
 * @param {*} idLanding - The d of the current landing.
 * @param {*} template - The default template to be used for
 * the program (this can be changed at any time).
 */
export const createProgram = (data, finish, idLanding, template) => (
  (dispatch) => {
    db.collection('programas')
      .where('landing', '==', idLanding)
      .get()
      .then((allPrograms) => {
        const total = allPrograms.size;
        dispatch(() => {
          // With the total of programs creates the new program with the last index
          db.collection('programas')
            .add({
              ...data,
              order: total,
            })
            .then(() => {
              if (finish) {
                History.push(`/landings/${idLanding}`);
              }
            });
        });
      });
    // updates the default template for this landing
    db.collection('landings').doc(idLanding).update({ template });
  }
);


/**
 * Edit an element
 * @param {string} collection - The category of the element
 * inside the Database.
 * @param {string} idElement - Id of the element to be edited.
 * @param {Object} data - An object with the fields to be updated
 * inside the element.
 * @param {*} callback - The callback function to be executed
 * once the updating action is done.
 */
export const editElement = (collection, idElement, data, callback) => (
  (dispatch) => {
    db.collection(collection).doc(idElement)
      .update(data)
      .then(() => {
        dispatch(callback);
      });
  }
);


/**
 * Delete an element
 * @param {string} collection - The category of the element
 * inside the Database.
 * @param {string} idElement - Id of the element to be edited.
 * @param {*} callback - The callback function to be executed
 * once the updating action is done.
 */
export const deleteElement = (collection, idElement, callback) => (
  (dispatch) => {
    db.collection(collection).doc(idElement)
      .delete()
      .then(() => {
        dispatch(callback);
      });
  }
);
