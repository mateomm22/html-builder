import React from 'react';
import PropTypes from 'prop-types';

import ImgLayout from './imgLayout';

const CardHome = ({ clicked, id, title }) => (
  <div className="card-home">
    <ImgLayout id={id} name={title} />
    <div className="text">
      <h2>{title}</h2>
      <button type="button" onClick={clicked} className="link">Crear</button>
    </div>
  </div>
);

// Set propTypes
CardHome.propTypes = {
  clicked: PropTypes.func,
  id: PropTypes.number,
  title: PropTypes.string,
};

export default CardHome;
