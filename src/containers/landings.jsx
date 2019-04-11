/* eslint-disable max-len */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actions from '../store/actions/actions';
import * as actionTypes from '../store/actions/types';

import Backdrop from '../misc/backdrop';
import FormLanding from '../components/landings/form';
import Modal from '../components/modal';

import logoWeb from '../assets/images/logo-team-web.svg';
import logo from '../assets/images/logo-ilumno.svg';
import logoApp from '../assets/images/logo-app.svg';

/**
 * All Landings View
 */
class Landings extends Component {
  /**
   * Set the empty local state for the created landing info.
   */
  constructor(props) {
    super(props);
    this.state = {
      backdrop: false,
      clear: false,
      landing: {
        nombre: '',
        template: 1,
        universidad: '',
        visible: true,
      },
      // These states are used to open the modals.
      modalCreate: false,
      modalDelete: false,
      modalEdit: false,
      // This is used to open the popover with the actions
      popover: false,
      // This is used to get a reference to the landing that will be edited or deleted.
      selectedId: '',
    };
  }

  /**
   * Fetch all the landings
   */
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actions.fetchLandings());
  }

  /**
   * Get the current info of the selected landing and opens
   * the editing modal with the pre-filled values
   * @param {string} id - The id of the current edited landing.
   */
  onEditing(id) {
    const { nombre, universidad } = this.props.landings[id];
    this.setState(prevState => ({
      ...prevState,
      landing: {
        ...prevState.landing,
        nombre,
        universidad,
      },
    }));
    this.openModal('modalEdit', id);
  }

  /**
   * This function Toggles the popover with the edit and delete actions inside
   * @param {string} id - The id of the selected element.
   * @param {bool} open - Condition if the popover should be
   * open or not. True for open false for closed.
   */
  togglePopover(id, open) {
    this.setState({
      backdrop: true,
      clear: true,
      popover: open,
      selectedId: id,
    });
  }

  /**
   * Open a Modal
   * @param {string} name - The name of the modal that will be opened.
   * @param {string} [id] - the Id of the selected landing in case of
   * editing and deleting.
   */
  openModal(name, id) {
    this.setState({
      backdrop: true,
      clear: false,
      [name]: true,
      popover: false,
    });
    if (id) {
      this.setState({
        selectedId: id,
      });
    }
  }

  /**
   * Close a Modal
   * @param {string} name - The name of the modla that will be closed.
   */
  closeModal(name) {
    if (name === 'all') {
      this.setState({
        modalCreate: false,
        modalDelete: false,
        modalEdit: false,
      });
    }
    this.setState({
      backdrop: false,
      clear: false,
      landing: {
        nombre: '',
        universidad: '',
      },
      [name]: false,
      popover: false,
      selectedId: '',
    });
  }

  /**
   * Get the value of inputs and store them inside the local state
   * @param {*} event
   * @param {Object} event.target - The current input.
   * @param {string} event.target.name - The input's name.
   * @param {string} event.target.value - The input's value.
   */
  handleInputChange(event) {
    const { target: { name, value } } = event;
    this.setState(prevState => ({
      ...prevState,
      landing: {
        ...prevState.landing,
        [name]: value,
      },
    }));
  }

  /**
   * Dispatch the action that creates a new landing
   * @param {*} event - Submit the form.
   */
  createLanding(event) {
    event.preventDefault();
    const { dispatch } = this.props;
    dispatch(actions.createLanding(this.state.landing));
  }

  /**
   * Dispatch the action that edits the selected landing
   */
  editLanding(event) {
    event.preventDefault();
    const { dispatch } = this.props;
    const { selectedId, landing } = this.state;
    dispatch(actions.editElement('landings', selectedId, landing, actions.fetchLandings()));
    this.closeModal('modalEdit');
  }

  /**
   * Dispatch the action that deletes the selected landing
   * @param {string} id - The id of the landing that will be deleted.
   */
  deleteLanding(id) {
    const { dispatch } = this.props;
    dispatch(actions.deleteElement('landings', id, actions.fetchLandings()));
    this.closeModal('modalDelete');
  }

  /**
   * Filter the loaded landings and dispatch an action to hide
   * the items that doesn't match with the keywords
   * @param {*} e - The default event to get the info from the input
   */
  searchHandler(e) {
    const { target: { value } } = e;
    const { dispatch, landings } = this.props;
    Object.keys(landings).filter((id) => {
      const result = (landings[id].nombre.toUpperCase().indexOf(value.toUpperCase()) >= 0);
      return dispatch({
        type: actionTypes.FILTER_LANDINGS,
        data: {
          id,
          show: result,
        },
      });
    });
  }

  render() {
    const allLandings = (this.props.landings)
      ? Object.keys(this.props.landings).map((id) => {
        const {
          nombre, programas, universidad, visible,
        } = this.props.landings[id];
        const showPop = (this.state.popover && this.state.selectedId === id) ? 'active' : '';
        return (visible)
          ? (
            <tr key={id}>
              <td className="nombre">
                <Link to={`/landings/${id}`}>{nombre}</Link>
              </td>
              <td className="uni">{universidad}</td>
              <td className="programas">{programas}</td>
              <td className="actions pop-container">
                <i
                  className="fas fa-ellipsis-v open-pop"
                  role="button"
                  tabIndex="0"
                  onClick={() => this.togglePopover(id, true)}
                />
                <div
                  className={['action-pop', showPop].join(' ')}
                  role="button"
                  tabIndex="0"
                >
                  <button type="button" onClick={() => this.onEditing(id)}><i className="far fa-edit" /> Editar</button>
                  <button type="button" onClick={() => this.openModal('modalDelete', id)}><i className="far fa-trash-alt" /> Borrar</button>
                </div>
              </td>
            </tr>
          )
          : null;
      })
      : (
        <tr>
          <td>
            <div className="mock" />
          </td>
          <td>
            <div className="mock" />
          </td>
          <td>
            <div className="mock" />
          </td>
          <td>
            <div className="mock" />
          </td>
        </tr>
      );

    return (
      <div className="landings">
        <header>
          <div className="container">
            <Link to="/"><img className="logo-web" src={logoWeb} alt="" /></Link>
            <Link to="/"><img className="logo-ilumno" src={logo} alt="" /></Link>
          </div>
        </header>
        <div className="header">
          <div className="container">
            <img className="logo-app" src={logoApp} alt="" />
            <p>Para empezar puede crear una nueva plantilla o modificar una existente de la lista</p>
          </div>
          <div className="bar">
            <div className="container">
              <button className="btn btn-new btn-large" type="button" onClick={() => this.openModal('modalCreate')}>Nueva plantilla</button>
              <div className="input">
                <input type="text" name="search" onChange={e => this.searchHandler(e)} placeholder="Buscar plantilla por nombre..." />
                <i className="fab fa-sistrix search-icon" />
              </div>
            </div>
          </div>
        </div>
        <div className="container main-container">
          <table>
            <thead>
              <tr>
                <th className="nombre">Nombre</th>
                <th className="uni">Universidad</th>
                <th className="programas">Programas creados</th>
                <th className="actions">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {allLandings}
            </tbody>
          </table>
        </div>
        {/* Modal Create Landing */}
        <Modal show={this.state.modalCreate} customClass="modal-create" closed={() => this.closeModal('modalCreate')}>
          <FormLanding
            btnText="Crear"
            changed={e => this.handleInputChange(e)}
            help
            nombre={this.state.landing.nombre}
            submitted={e => this.createLanding(e)}
            title={this.state.landing.nombre}
            uni={this.state.landing.universidad}
          />
        </Modal>
        {/* Modal Edit Landing */}
        <Modal show={this.state.modalEdit} customClass="modal-edit" closed={() => this.closeModal('modalEdit')}>
          <FormLanding
            btnText="Guardar"
            changed={e => this.handleInputChange(e)}
            nombre={this.state.landing.nombre}
            submitted={e => this.editLanding(e)}
            title={`Editar landing ${this.state.landing.nombre}`}
            uni={this.state.landing.universidad}
          />
        </Modal>
        {/* Modal Delete Landing */}
        <Modal show={this.state.modalDelete} customClass="modal-delete" closed={() => this.closeModal('modalDelete')}>
          <strong className="alert">Esta acción no se puede deshacer</strong>
          <button className="btn btn-delete" type="button" onClick={() => this.deleteLanding(this.state.selectedId)}>Borrar</button>
        </Modal>
        <Backdrop show={this.state.backdrop} clear={this.state.clear} clicked={() => this.closeModal('all')} />
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    landings: state.landingsReducer.landings,
  }
);

// Set propTypes
Landings.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  landings: PropTypes.objectOf(PropTypes.object),
  dispatch: PropTypes.func,
};

export default connect(mapStateToProps)(Landings);
