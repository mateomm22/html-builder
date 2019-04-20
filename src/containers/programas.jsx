import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actions from '../store/actions/actions';

import Backdrop from '../misc/backdrop';
import Layout from '../misc/layout';
import Modal from '../components/modal';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backdrop: false,
      data: {
        nombre: '',
        universidad: '',
      },
      modalCreate: false,
      modalDelete: false,
      toDelete: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.createLanding = this.createLanding.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actions.fetchLandings());
  }

  onDelete(id) {
    this.setState({
      backdrop: true,
      modalDelete: true,
      toDelete: id,
    });
  }

  onCreate() {
    this.setState({
      backdrop: true,
      modalCreate: true,
    });
  }

  closeModal(name) {
    this.setState({
      backdrop: false,
      [name]: false,
    });
  }

  deleteLanding(id) {
    const { dispatch } = this.props;
    dispatch(actions.deleteLanding(id));
    this.setState({
      backdrop: false,
      modalDelete: false,
    });
  }

  handleInputChange(event) {
    const { target: { name, value } } = event;
    this.setState(prevState => ({
      ...prevState,
      data: {
        ...prevState.data,
        [name]: value,
      },
    }));
  }

  createLanding(event) {
    event.preventDefault();
    const { dispatch } = this.props;
    dispatch(actions.newLanding(this.state.data));
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
                <button type="button" className="btn btn-edit">Editar</button>
                <button type="button" className="btn btn-delete" onClick={() => this.onDelete(id)}>Borrar</button>
              </div>
            </td>
          </tr>
        );
      })
      : null;

    return (
      <Layout className="home">
        <h1>Test</h1>
        <p>Lorem ipsum dolor sit amet.</p>
        <button className="btn btn-new btn-large" type="button" onClick={() => this.onCreate()}>Crear landing</button>
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
          <strong>Crear nueva Landing</strong>
          <form action="" onSubmit={this.createLanding}>
            <input type="text" name="nombre" placeholder="Ej: POLI LAN-400 Pregrado" onChange={this.handleInputChange} />
            <select name="universidad" id="" onChange={this.handleInputChange}>
              <option defaultValue>Selecciona una</option>
              <option value="Poli">Poli</option>
              <option value="Areandina">Areandina</option>
              <option value="IPP">IPP</option>
            </select>
            <button className="btn btn-new" type="submit">Crear</button>
          </form>
        </Modal>
        <Modal show={this.state.modalDelete} customClass="modal-delete" closed={() => this.closeModal('modalDelete')}>
          <strong className="alert">Esta acción no se puede deshacer</strong>
          <button className="btn btn-delete" type="button" onClick={() => this.deleteLanding(this.state.toDelete)}>Borrar</button>
        </Modal>
        <Backdrop show={this.state.backdrop} />
      </Layout>
    );
  }
}

const mapStateToProps = state => (
  {
    landings: state.landingsReducer.landings,
    created: state.landingsReducer.createdLanding,
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
