import React from 'react';
import PropTypes from 'prop-types';

import logo from '../assets/images/logo-ilumno.svg';

const Layout = ({ className, children }) => {
  const header = className !== 'pre-home'
    ? (
      <header>
        Logo
        <img className="logo-ilumno" src={logo} alt="" />
      </header>
    )
    : null;

  const footer = className !== 'pre-home' ? <footer>2019</footer> : null;

  return (
    <div className={className}>
      {header}
      <div className="container">
        {children}
      </div>
      {footer}
    </div>
  );
};

// Set propTypes
Layout.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Layout;
