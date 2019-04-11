/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';

const FormProgram = ({
  changed, edit, showClass, saved, submitted, total, data: {
    adicional, boton, desc, duracion, idLanding, imagen, nombre,
  },
}) => {
  const editClass = (edit) ? 'edit' : '';
  const controls = (!edit)
    ? (
      <div className={['controls', showClass].join(' ')}>
        <span className="btn" role="button" tabIndex="0" onClick={saved}>Agregar otro</span>
        <button type="submit" className="finish">Guardar y finalizar</button>
      </div>
    )
    : (
      <div className="controls">
        <button type="submit" className="btn">Guardar</button>
      </div>
    );

  return (
    <form action="" className={editClass} onSubmit={submitted}>
      <div className="input">
        <input type="text" name="nombre" id="nombre" value={nombre} onChange={changed} required />
        <label htmlFor="nombre">
          Nombre
        </label>
      </div>
      <div className="input">
        <input type="text" name="duracion" id="duracion" value={duracion} onChange={changed} required />
        <label htmlFor="duracion">
          Duración
        </label>
      </div>
      <div className="input">
        <input type="text" name="adicional" id="adicional" value={adicional} onChange={changed} required />
        <label htmlFor="adicional">
          Info adicional
        </label>
      </div>
      <div className="input">
        <input type="text" name="imagen" id="imagen" value={imagen} onChange={changed} required />
        <label htmlFor="imagen">
          Imagen <span>(Url Marketo)</span>
        </label>
      </div>
      <div className="input">
        <input type="text" name="boton" id="boton" value={boton} onChange={changed} required />
        <label htmlFor="boton">
          Texto botón
        </label>
      </div>
      <input type="hidden" name="landing" value={idLanding} />
      <div className="input">
        <textarea id="desc" name="desc" value={desc} onChange={changed} required />
        <label htmlFor="desc">
          Descripción
        </label>
        <small>{total}</small>
      </div>
      {controls}
    </form>
  );
};

// Set propTypes
FormProgram.propTypes = {
  changed: PropTypes.func,
  data: PropTypes.shape({
    nombre: PropTypes.string,
    duracion: PropTypes.string,
    adicional: PropTypes.string,
    imagen: PropTypes.string,
    desc: PropTypes.string,
  }),
  edit: PropTypes.bool,
  showClass: PropTypes.string,
  saved: PropTypes.func,
  submitted: PropTypes.func,
  total: PropTypes.number,
};


export default FormProgram;
