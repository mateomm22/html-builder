import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="pre-home">
    <div className="container">
      <h3>Home</h3>
      <Link to="/landings">Entrar</Link>
    </div>
  </div>
);

export default Home;
