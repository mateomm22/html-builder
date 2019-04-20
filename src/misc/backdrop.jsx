import React from 'react';
import PropTypes from 'prop-types';

const Backdrop = ({ clear, clicked, show }) => {
  const modalClass = (show) ? 'active' : '';
  const colorClass = (clear) ? 'clear' : '';
  return (
    <div className={['backdrop', colorClass, modalClass].join(' ')} role="presentation" onClick={clicked} />
  );
};

// Set propTypes
Backdrop.propTypes = {
  clear: PropTypes.bool,
  clicked: PropTypes.func,
  show: PropTypes.bool,
};

export default Backdrop;
