import React from 'react';
import PropTypes from 'prop-types';

const Backdrop = ({ clicked, show }) => {
  const modalClass = (show) ? 'active' : '';
  return (
    <div className={['backdrop', modalClass].join(' ')} role="presentation" onClick={clicked} />
  );
};

// Set propTypes
Backdrop.propTypes = {
  clicked: PropTypes.func,
  show: PropTypes.bool,
};

export default Backdrop;
