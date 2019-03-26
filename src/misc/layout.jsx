import React from 'react';
import PropTypes from 'prop-types';

const Layout = (props) => {
  const { className, children } = props;

  const header = className !== 'home' ? <header>Logo</header> : null;
  const footer = className !== 'home' ? <footer>2019</footer> : null;

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
