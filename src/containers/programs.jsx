import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actions from '../store/actions/actions';

import Backdrop from '../misc/backdrop';
import FormProgram from '../components/programs/form';
import Layout from '../misc/layout';
import Modal from '../components/modal';

class Programs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backdrop: false,
      program: {
        adicional: '',
        desc: '',
        duracion: '',
        imagen: '',
        nombre: '',
      },
      modalCreate: false,
      modalDelete: false,
      modalEdit: false,
      selectedId: '',
    };
  }

  componentDidMount() {
    const { dispatch, match: { params: { idLanding } } } = this.props;
    dispatch(actions.fetchPrograms(idLanding));
  }

  onEditing(id) {
    const {
      adicional, desc, duracion, imagen, nombre,
    } = this.props.programs[id];

    this.setState(prevState => ({
      ...prevState,
      program: {
        ...prevState.program,
        adicional,
        desc,
        duracion,
        imagen,
        nombre,
      },
    }));
    this.openModal('modalEdit', id);
  }

  openModal(name, id) {
    this.setState({
      backdrop: true,
      [name]: true,
    });
    if (id) {
      this.setState({
        selectedId: id,
      });
    }
  }

  closeModal(name) {
    this.setState({
      backdrop: false,
      program: {
        adicional: '',
        desc: '',
        duracion: '',
        imagen: '',
        nombre: '',
      },
      [name]: false,
      selectedId: '',
    });
  }

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

  // createProgram(event) {
  //   event.preventDefault();
  //   const { dispatch } = this.props;
  //   dispatch(actions.newProgram(this.state.program));
  // }

  deleteProgram(id) {
    const { dispatch, match: { params: { idLanding } } } = this.props;
    dispatch(actions.deleteProgram(id, idLanding));
    this.closeModal('modalDelete');
  }

  editProgram(event) {
    event.preventDefault();
    const { dispatch, match: { params: { idLanding } } } = this.props;
    const { selectedId, program } = this.state;
    dispatch(actions.editProgram(selectedId, program, idLanding));
    this.closeModal('modalEdit');
  }

  render() {
    let allPrograms;
    if (this.props.programs) {
      allPrograms = (Object.keys(this.props.programs).length > 0)
        ? Object.keys(this.props.programs).map((id, index) => {
          const {
            nombre,
          } = this.props.programs[id];
          return (
            <tr key={id}>
              <td>{index + 1}</td>
              <td>{nombre}</td>
              <td>
                <div className="action">
                  <button type="button" className="btn btn-edit" onClick={() => this.onEditing(id)}>Editar</button>
                  <button type="button" className="btn btn-delete" onClick={() => this.openModal('modalDelete', id)}>Borrar</button>
                </div>
              </td>
            </tr>
          );
        })
        : (
          <tr>
            <td colSpan="3"><p>No hay  creados en esta landing</p></td>
          </tr>
        );
    } else {
      allPrograms = (
        <tr>
          <td>
            <div className="mock" />
          </td>
          <td>
            <div className="mock" />
          </td>
        </tr>
      );
    }

    return (
      <Layout className="programas">
        <h1>Programas</h1>
        <br />
        <button className="btn btn-new btn-large crear-programa" type="button" onClick={() => this.openModal('modalCreate')}><Link to="/crear">Crear programa</Link></button>
        <table>
          <thead>
            <tr>
              <th className="id">ID</th>
              <th className="nombre">Nombre</th>
              <th className="actions">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {allPrograms}
          </tbody>
        </table>
        {/* Modal Edit Programa */}
        <Modal show={this.state.modalEdit} customClass="modal-create" closed={() => this.closeModal('modalEdit')}>
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
          <button className="btn btn-delete" type="button" onClick={() => this.deleteLanding(this.state.selectedId)}>Borrar</button>
        </Modal>
        <Backdrop show={this.state.backdrop} />
      </Layout>
    );
  }
}

const mapStateToProps = state => (
  {
    programs: state.programsReducer.loadedPrograms,
  }
);

// Set propTypes
Programs.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
  programs: PropTypes.objectOf(PropTypes.object),
  dispatch: PropTypes.func,
};

export default connect(mapStateToProps)(Programs);
