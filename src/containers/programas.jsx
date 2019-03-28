import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actions from '../store/actions/actions';

import Aux from '../misc/wrapper';
import Backdrop from '../misc/backdrop';
import FormLanding from '../components/landings/form';
import Layout from '../misc/layout';
import Modal from '../components/modal';

class Programas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backdrop: false,
      landing: {
        nombre: '',
        universidad: '',
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
      landing: {
        nombre: '',
        universidad: '',
      },
      [name]: false,
      selectedId: '',
    });
  }

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

  createLanding(event) {
    event.preventDefault();
    const { dispatch } = this.props;
    dispatch(actions.newLanding(this.state.landing));
  }

  deleteLanding(id) {
    const { dispatch } = this.props;
    dispatch(actions.deleteLanding(id));
    this.closeModal('modalDelete');
  }

  editLanding(event) {
    event.preventDefault();
    const { dispatch } = this.props;
    const { selectedId, landing } = this.state;
    dispatch(actions.editLanding(selectedId, landing));
    this.closeModal('modalEdit');
  }

  render() {
    const allLandings = (this.props.landings)
      ? Object.keys(this.props.landings).map((id) => {
        const {
          nombre, universidad,
        } = this.props.landings[id];
        return (
          <tr key={id}>
            <td>
              <Link to={`/${id}`}>{nombre}</Link>
            </td>
            <td>{universidad}</td>
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
        <Aux>
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
        </Aux>
      );

    return (
      <Layout className="landings">
        <h1>Programas</h1>
        <p>Lorem ipsum dolor sit amet.</p>
        <button className="btn btn-new btn-large" type="button" onClick={() => this.openModal('modalCreate')}>Crear landing</button>
        <table>
          <thead>
            <tr>
              <th className="nombre">Nombre</th>
              <th className="uni">Universidad</th>
              <th className="actions">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {allLandings}
          </tbody>
        </table>
        {/* Modal Create Programa */}
        <Modal show={this.state.modalCreate} customClass="modal-create" closed={() => this.closeModal('modalCreate')}>
          <FormLanding
            btnText="Crear"
            changed={e => this.handleInputChange(e)}
            help
            name={this.state.landing.nombre}
            submitted={e => this.createLanding(e)}
            title={this.state.landing.nombre}
            uni={this.state.landing.universidad}
          />
        </Modal>
        {/* Modal Edit Programa */}
        <Modal show={this.state.modalEdit} customClass="modal-create" closed={() => this.closeModal('modalEdit')}>
          <FormLanding
            btnText="Guardar"
            changed={e => this.handleInputChange(e)}
            name={this.state.landing.nombre}
            submitted={e => this.editLanding(e)}
            title="Editar landing"
            uni={this.state.landing.universidad}
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
    landings: state.landingsReducer.landings,
  }
);

// Set propTypes
Programas.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
  landings: PropTypes.objectOf(PropTypes.object),
  dispatch: PropTypes.func,
};

export default connect(mapStateToProps)(Programas);
