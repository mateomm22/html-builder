/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';

const FormProgram = ({
  changed, edit, saved, submitted, total, data: {
    adicional, boton, desc, duracion, idLanding, imagen, nombre,
  },
}) => {
  const controls = (!edit)
    ? (
      <div className="controls">
        <button type="submit" className="btn btn-new">Guardar</button>
        <span className="add" role="button" tabIndex="0" onClick={saved}>Agregar otro</span>
      </div>
    )
    : (
      <div className="controls">
        <button type="submit" className="btn btn-new">Guardar</button>
      </div>
    );

  return (
    <form action="" onSubmit={submitted}>
      <label htmlFor="nombre">
        Nombre
        <input type="text" name="nombre" id="nombre" value={nombre} onChange={changed} />
      </label>
      <label htmlFor="duracion">
        Duración
        <input type="text" name="duracion" id="duracion" value={duracion} onChange={changed} />
      </label>
      <label htmlFor="adicional">
        Info adicional
        <input type="text" name="adicional" id="adicional" value={adicional} onChange={changed} />
      </label>
      <label htmlFor="imagen">
        Url imagen
        <span>(Debe ser cargada en marketo para obtener la url absoluta)</span>
        <input type="text" name="imagen" id="imagen" value={imagen} onChange={changed} />
      </label>
      <label htmlFor="boton">
        Texto botón
        <input type="text" name="boton" id="boton" value={boton} onChange={changed} />
      </label>
      <input type="hidden" name="landing" value={idLanding} />
      <label htmlFor="desc">
        Descripción
        <textarea id="desc" name="desc" value={desc} onChange={changed} />
        <small>{total}</small>
      </label>
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
  saved: PropTypes.func,
  submitted: PropTypes.func,
  total: PropTypes.number,
};


export default FormProgram;
