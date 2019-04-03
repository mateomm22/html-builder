import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Home ccntainer
 */
const Home = () => (
  <div className="pre-home">
    <div className="container">
      <div className="text">
        <h3>
          <span>&lt;</span>
          Generador de programas
          <span>/&gt;</span>
        </h3>
      </div>
      <Link to="/landings">Entrar</Link>
    </div>
  </div>
);

export default Home;
