import React from 'react';
import { Link } from 'react-router-dom';

import logoApp from '../assets/images/logo-app.svg';

/**
 * Home ccntainer
 */
const Home = () => (
  <div className="pre-home">
    <div className="container">
      <div className="title">
        <img className="logo" src={logoApp} alt="Generador de programas" />
        <small>
          para insertar en marketo
        </small>
      </div>
      <div className="text">
        <p>
          Con esta herramienta logrará ser mas versatil al escoger los diseños para la seccion de programas para nuevas landings en Marketo.
        </p>
        <Link to="/landings" className="btn">Entrar</Link>
      </div>
    </div>
  </div>
);

export default Home;
