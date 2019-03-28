import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import db from '../Firebase';
import * as actions from '../store/actions/actions';

import Backdrop from '../misc/backdrop';
import FormLanding from '../components/landings/form';
import Layout from '../misc/layout';
import Modal from '../components/modal';

class Home extends Component {
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

    this.handleInputChange = this.handleInputChange.bind(this);
    this.createLanding = this.createLanding.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actions.fetchLandings());
  }

  onEditing(id) {
    db.collection('landings').doc(id)
      .get()
      .then((landing) => {
        if (landing.exists) {
          const { nombre, universidad } = landing.data();
          this.setState(prevState => ({
            ...prevState,
            landing: {
              ...prevState.landing,
              nombre,
              universidad,
            },
          }));
        }
      });
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
    this.setState({
      backdrop: false,
      modalDelete: false,
    });
  }

  render() {
    const allLandings = (this.props.landings)
      ? this.props.landings.map((landing) => {
        const {
          id, nombre, universidad,
        } = landing;
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
      : null;

    return (
      <Layout className="landings">
        <h1>Test</h1>
        <p>Lorem ipsum dolor sit amet.</p>
        <button className="btn btn-new btn-large" type="button" onClick={() => this.openModal('modalCreate')}>Crear landing</button>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Universidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {allLandings}
          </tbody>
        </table>
        <Modal show={this.state.modalCreate} customClass="modal-create" closed={() => this.closeModal('modalCreate')}>
          <FormLanding
            btnText="Crear"
            changed={this.handleInputChange}
            help
            submitted={this.createLanding}
            title={this.state.landing.nombre}
          />
        </Modal>
        <Modal show={this.state.modalEdit} customClass="modal-create" closed={() => this.closeModal('modalEdit')}>
          <FormLanding
            btnText="Guardar"
            changed={this.handleInputChange}
            submitted={this.createLanding}
            title="Editar"
          />
        </Modal>
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
Home.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  landings: PropTypes.arrayOf(PropTypes.object),
  dispatch: PropTypes.func,
};

export default connect(mapStateToProps)(Home);
