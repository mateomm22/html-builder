import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({
  children, closed, customClass, show,
}) => {
  const modalClass = (show) ? 'active' : '';
  return (
    <div className={['modal', customClass, modalClass].join(' ')}>
      <div className="modal-body">
        <button className="close" onClick={closed} type="button">
          <i className="fas fa-times" />
        </button>
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  );
};

// Set propTypes
Modal.propTypes = {
  closed: PropTypes.func,
  customClass: PropTypes.string,
  show: PropTypes.bool,
  children: PropTypes.node,
};

export default Modal;
