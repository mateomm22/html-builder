/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import Aux from '../../misc/wrapper';


const FormLanding = ({
  btnText, changed, help, name, submitted, title, uni,
}) => {
  const helpName = (help) ? <label htmlFor="nombre">Vas a crear una nueva landing</label> : null;

  const helpUni = (help) ? <label htmlFor="universidad">y selecciona la universidad</label> : null;

  return (
    <Aux>
      <div className="modal-header">
        <strong>{title}</strong>
      </div>
      <form action="" onSubmit={submitted}>
        {helpName}
        <input type="text" id="nombre" name="nombre" placeholder="Ej: POLI LAN-400 Pregrado" onChange={changed} value={name} />
        {helpUni}
        <select name="universidad" id="universidad" onChange={changed} value={uni}>
          <option defaultValue>Selecciona una</option>
          <option value="Poli">Poli</option>
          <option value="Areandina" defaultValue>Areandina</option>
          <option value="IPP">IPP</option>
        </select>
        <button className="btn btn-new" type="submit">{btnText}</button>
      </form>
    </Aux>
  );
};

// Set propTypes
FormLanding.propTypes = {
  btnText: PropTypes.string,
  changed: PropTypes.func,
  help: PropTypes.bool,
  name: PropTypes.string,
  submitted: PropTypes.func,
  title: PropTypes.string,
  uni: PropTypes.string,
};


export default FormLanding;
