/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../store/actions/actions';

import Layout from '../misc/layout';

class Crear extends Component {
  constructor(props) {
    super(props);
    this.state = {
      desc: '',
      duracion: '',
      imagen: '',
      nombre: '',
      snies: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    const { dispatch, match: { params: { idLanding } } } = this.props;
    dispatch(actions.getLandingInfo(idLanding));
  }

  handleInputChange(event) {
    const { target: { name, value } } = event;
    this.setState({
      [name]: value,
    });
  }

  saveProgramData() {
    const { dispatch } = this.props;
    dispatch(actions.newProgram(this.state));
    this.setState({
      desc: '',
      duracion: '',
      imagen: '',
      nombre: '',
      snies: '',
    });
  }

  render() {
    const title = (this.props.current)
      ? (
        <div className="title">
          <h1>{this.props.current.nombre}</h1>
          <span className="subtitle">{this.props.current.universidad}</span>
        </div>
      )
      : null;
    return (
      <Layout className="create">
        {title}
        <div className="content">
          <form>
            <label htmlFor="nombre">
              Nombre
              <input type="text" name="nombre" id="nombre" value={this.state.nombre} onChange={this.handleInputChange} />
            </label>
            <label htmlFor="duracion">
              Duración
              <input type="text" name="duracion" id="duracion" value={this.state.duracion} onChange={this.handleInputChange} />
            </label>
            <label htmlFor="snies">
              Snies
              <input type="text" name="snies" id="snies" value={this.state.snies} onChange={this.handleInputChange} />
            </label>
            <label htmlFor="imagen">
              Url imagen
              <span>(Debe ser cargada en marketo para obtener la url absoluta)</span>
              <input type="text" name="imagen" id="imagen" value={this.state.imagen} onChange={this.handleInputChange} />
            </label>
            <label htmlFor="desc">
              Descripción
              <textarea id="desc" name="desc" value={this.state.desc} onChange={this.handleInputChange} />
            </label>
            <div className="controls">
              <button type="button" className="finish" onClick={() => this.generateHtml()}>Generar HTML</button>
              <span className="add" role="button" tabIndex="0" onClick={() => this.saveProgramData()}>Agregar otro</span>
            </div>
          </form>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = state => (
  {
    current: state.landingsReducer.currentLanding,
  }
);

// Set propTypes
Crear.propTypes = {
  current: PropTypes.objectOf(PropTypes.string),
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

export default connect(mapStateToProps)(Crear);
