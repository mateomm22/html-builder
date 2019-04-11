/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

import * as actions from '../store/actions/actions';

import Backdrop from '../misc/backdrop';
import FormProgram from '../components/programs/form';
import Modal from '../components/modal';
import Result from './result';

import logoWeb from '../assets/images/logo-team-web.svg';
import logo from '../assets/images/logo-ilumno.svg';

/**
 * Config to the sortable HOC
 * @see (https://github.com/clauderic/react-sortable-hoc/)
 */
const SortableItem = SortableElement(({ children }) => children);
const SortableList = SortableContainer(({ children }) => children);

/**
 * All programs View
 */
class Programs extends Component {
  /**
   * Set the empty local state for the created program info.
   */
  constructor(props) {
    super(props);
    this.state = {
      backdrop: false,
      clear: false,
      program: {
        adicional: '',
        boton: '',
        desc: '',
        duracion: '',
        imagen: '',
        nombre: '',
      },
      // These states are used to open the modals.
      modalCreate: false,
      modalDelete: false,
      modalEdit: false,
      modalResult: false,
      // This is used to get a reference to the program that will be edited or deleted.
      selectedId: '',
      tableStatus: '',
      // States applied to the final modal
      html: '',
      showMsg: false,
    };
    // This is a referencia to the input with the HTML result
    this.codeInput = React.createRef();
    // This binds the event to the updateIndexes() function
    this.updateIndexes = this.updateIndexes.bind(this);
  }

  /**
   * Get the name and university of the current landing.
   * Fetch all the programs inside that landing.
   */
  componentDidMount() {
    const { dispatch, match: { params: { idLanding } } } = this.props;
    dispatch(actions.getLandingInfo(idLanding));
    dispatch(actions.fetchPrograms(idLanding));
  }

  /**
   * Get the current info of the selected program and opens
   * the editing modal with the pre-filled values
   * @param {string} id - The id of the current edited program.
   */
  onEditing(id) {
    const {
      adicional, boton, desc, duracion, imagen, nombre,
    } = this.props.programs[id];

    this.setState(prevState => ({
      ...prevState,
      program: {
        ...prevState.program,
        adicional,
        boton,
        desc,
        duracion,
        imagen,
        nombre,
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
   * @param {string} [id] - the Id of the selected program in case of
   * editing and deleting.
   */
  openModal(name, id) {
    this.setState({
      backdrop: true,
      clear: false,
      [name]: true,
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
        modalResult: false,
      });
    }
    this.setState({
      backdrop: false,
      program: {
        adicional: '',
        boton: '',
        desc: '',
        duracion: '',
        imagen: '',
        nombre: '',
      },
      [name]: false,
      selectedId: '',
    });
  }

  /**
   * Get the value of inputs and store them inside the local state
   * This is just for editing and deleting
   * @param {*} event
   * @param {Object} event.target - The current input.
   * @param {string} event.target.name - The input's name.
   * @param {string} event.target.value - The input's value.
   */
  handleInputChange(event) {
    const { target: { name, value } } = event;
    this.setState(prevState => ({
      ...prevState,
      program: {
        ...prevState.program,
        [name]: value,
      },
    }));
  }

  /**
   * Dispatch the action that edits the selected program
   */
  editProgram(event) {
    event.preventDefault();
    const { dispatch, match: { params: { idLanding } } } = this.props;
    const { selectedId, program } = this.state;
    dispatch(actions.editElement('programas', selectedId, program, actions.fetchPrograms(idLanding)));
    this.closeModal('modalEdit');
  }

  /**
   * Dispatch the action that deletes the selected program
   * @param {string} id - The id of the program that will be deleted.
   */
  deleteProgram(id) {
    const { dispatch, match: { params: { idLanding } } } = this.props;
    dispatch(actions.deleteElement('programas', id, actions.fetchPrograms(idLanding)));
    this.closeModal('modalDelete');
  }

  /**
   * This function updates the indexes of the programs to reorder them
   * @param {*} param0
   */
  updateIndexes({ oldIndex, newIndex }) {
    const { dispatch, programs, match: { params: { idLanding } } } = this.props;
    const arr = [
      ...Object.keys(programs),
    ];
    arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
    arr.map((idProgram, index) => dispatch(actions.editElement('programas', idProgram, { order: index }, actions.fetchPrograms(idLanding))));
    this.setState({ tableStatus: 'disabled' });
    setTimeout(() => {
      this.setState({ tableStatus: '' });
    }, 1500);
  }

  /**
   * This function copies the content of the input inside the results modal
   * to the clipboard
   */
  copyHtml() {
    this.codeInput.current.select();
    document.execCommand('copy');
    this.setState({ showMsg: true });
    setTimeout(() => {
      this.setState({ showMsg: false });
    }, 2500);
  }


  render() {
    let allPrograms;
    let landingInfo;
    // Destructuring all the needed properties
    const {
      match: {
        params: {
          idLanding,
        },
      },
      landing,
      programs,
    } = this.props;
    const { template } = (landing) ? this.props.landing : '';
    const msgClass = (this.state.showMsg) ? 'active' : '';

    if (landing) {
      const { nombre, universidad } = landing;
      landingInfo = (
        <h5 className="info">{nombre} | <span>{universidad}</span></h5>
      );
    } else {
      landingInfo = null;
    }

    if (programs) {
      allPrograms = (Object.keys(programs).length > 0)
        ? (
          <SortableList
            onSortEnd={this.updateIndexes}
            pressDelay={200}
            helperClass="sorting"
            helperContainer={document.querySelector('.sorting')}
            lockAxis="y"
          >
            <tbody>
              {
                Object.keys(programs).map((id, index) => {
                  const {
                    nombre,
                  } = programs[id];
                  const showPop = (this.state.popover && this.state.selectedId === id) ? 'active' : '';
                  return (
                    <SortableItem key={id} index={index} id={id}>
                      <tr>
                        <td className="id">{index + 1}</td>
                        <td className="nombre">
                          {nombre}
                        </td>
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
                    </SortableItem>
                  );
                })
              }
            </tbody>
          </SortableList>
        )
        : (
          <tbody>
            <tr>
              <td colSpan="3">
                <p>No hay programas creados en esta landing</p>
                <i className="note">Empieza creando uno en el botón de la parte superior</i>
              </td>
            </tr>
          </tbody>
        );
    } else {
      allPrograms = (
        <tbody>
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
          </tr>
        </tbody>
      );
    }

    return (
      <div className="programs">
        <header>
          <div className="container">
            <Link to="/"><img className="logo-web" src={logoWeb} alt="" /></Link>
            <Link to="/"><img className="logo-ilumno" src={logo} alt="" /></Link>
          </div>
        </header>
        <div className="header">
          <div className="container">
            <Link className="go-back" to="/landings"><i className="fas fa-angle-left" /> Volver</Link>
            <h1>Programas</h1>
            <p>Este es el listado de programas para la landing:</p>
            {landingInfo}
          </div>
          <div className="bar">
            <div className="container">
              <button className="btn crear-programa" type="button"><Link to={`/landings/${idLanding}/create`}>Crear programa</Link></button>
            </div>
          </div>
        </div>
        <div className="container main-container">
          <table className={this.state.tableStatus}>
            <thead>
              <tr>
                <th className="id">#</th>
                <th className="nombre">Nombre</th>
                <th className="actions">Acciones</th>
              </tr>
            </thead>
            {allPrograms}
          </table>
          <table className="hidden">
            <tbody className="sorting" />
          </table>
          <p className="note">
            Hacer click sostenido sobre un programa para re-ordenarlo programas
          </p>
          <button type="button" className="btn btn-large btn-edit generate" onClick={() => this.openModal('modalResult')}>Generar HTML</button>
        </div>
        {/* Modal Edit Programa */}
        <Modal show={this.state.modalEdit} customClass="modal-edit" closed={() => this.closeModal('modalEdit')}>
          <div className="modal-header">
            <strong>Editar programa</strong>
          </div>
          <FormProgram
            changed={e => this.handleInputChange(e)}
            data={this.state.program}
            edit
            submitted={e => this.editProgram(e)}
          />
        </Modal>
        {/* Modal Delete Programa */}
        <Modal show={this.state.modalDelete} customClass="modal-delete" closed={() => this.closeModal('modalDelete')}>
          <strong className="alert">Esta acción no se puede deshacer</strong>
          <button className="btn btn-delete" type="button" onClick={() => this.deleteProgram(this.state.selectedId)}>Borrar</button>
        </Modal>
        {/* Modal HTML */}
        <Modal show={this.state.modalResult} customClass="modal-result" closed={() => this.closeModal('modalResult')}>
          <Result
            action={() => this.copyHtml()}
            data={programs || {}}
            msgClass={msgClass}
            reference={this.codeInput}
            template={template}
          />
        </Modal>
        <Backdrop show={this.state.backdrop} clear={this.state.clear} clicked={() => this.closeModal('all')} />
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    programs: state.programsReducer.loadedPrograms,
    landing: state.landingsReducer.currentLanding,
  }
);

// Set propTypes
Programs.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  landing: PropTypes.shape({
    nombre: PropTypes.string,
    template: PropTypes.number,
    universidad: PropTypes.string,
  }),
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
  programs: PropTypes.objectOf(PropTypes.object),
  dispatch: PropTypes.func,
};

export default connect(mapStateToProps)(Programs);
