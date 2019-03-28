import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


const Preview = ({
  desc, duracion, image, nombre, snies,
}) => (
  <div className="preview">
    <h2>{nombre}</h2>
    <p>{desc}</p>
    <small>{snies}</small>
    <span>{duracion}</span>
    <img src={image} alt="" />
  </div>
);

// Set propTypes
Preview.propTypes = {
  desc: PropTypes.string,
  duracion: PropTypes.string,
  image: PropTypes.string,
  nombre: PropTypes.string,
  snies: PropTypes.string,
};


const mapStateToProps = state => (
  {
    cards: state.cards,
    finished: state.finished,
  }
);

export default connect(mapStateToProps)(Preview);
