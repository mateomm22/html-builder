/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-one-expression-per-line */
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
      image: '',
      nombre: '',
      snies: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
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
      image: '',
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
            <label htmlFor="image">
              Url imagen
              <span>(Debe ser cargada en marketo para obtener la url absoluta)</span>
              <input type="text" name="image" id="image" value={this.state.image} onChange={this.handleInputChange} />
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
    current: state.landingsReducer.createdLanding,
  }
);

// Set propTypes
Crear.propTypes = {
  current: PropTypes.objectOf(PropTypes.string),
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Crear);
