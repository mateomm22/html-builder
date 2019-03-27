import React from 'react';
import PropTypes from 'prop-types';

const Backdrop = (props) => {
  const { show } = props;
  const modalClass = (show) ? 'active' : '';
  return (
    <div className={['backdrop', modalClass].join(' ')} />
  );
};

// Set propTypes
Backdrop.propTypes = {
  show: PropTypes.bool,
};

export default Backdrop;
