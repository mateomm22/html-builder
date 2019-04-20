import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


const Preview = ({
  data: {
    adicional, boton, desc, duracion, imagen, nombre,
  }, template,
}) => {
  let markup;
  switch (template) {
    case 1:
      markup = (
        <div className="template template-1">
          <div className="image">
            <img src={imagen || 'https://via.placeholder.com/400x180.png?text=Imagen'} alt="" />
          </div>
          <div className="text">
            <h2>{nombre || 'Template 1'}</h2>
            <p>{desc || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mattis ultricies nunc eget fermentum. Pellentesque condimentum velit vel leo tincidunt consequat. Maecenas at odio nulla.'}</p>
            <span>{duracion || '4 años'}</span>
            <small>{adicional || 'Información adicional'}</small>
            <button type="button" className="btn btn-dark">{boton || 'Más información'}</button>
          </div>
        </div>
      );
      break;
    case 2:
      markup = (
        <div className="template template-2">
          <div className="image">
            <img src={imagen || 'https://via.placeholder.com/240x315.png?text=Imagen'} alt="" />
          </div>
          <div className="text">
            <h2>{nombre || 'Template 2'}</h2>
            <p>{desc || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mattis ultricies nunc eget fermentum. Pellentesque condimentum velit vel leo tincidunt consequat. Maecenas at odio nulla.'}</p>
            <span>{duracion || '4 años'}</span>
            <small>{adicional || 'Información adicional'}</small>
            <button type="button" className="btn btn-dark">{boton || 'Más información'}</button>
          </div>
        </div>
      );
      break;
    case 3:
      markup = (
        <div className="template template-3">
          <div className="title">
            <h2>{nombre || 'Template 3'}</h2>
          </div>
          <div className="image">
            <img src={imagen || 'https://via.placeholder.com/400x180.png?text=Imagen'} alt="" />
          </div>
          <div className="text">
            <p>{desc || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mattis ultricies nunc eget fermentum. Pellentesque condimentum velit vel leo tincidunt consequat. Maecenas at odio nulla.'}</p>
            <span>{duracion || '4 años'}</span>
            <small>{adicional || 'Información adicional'}</small>
            <button type="button" className="btn btn-dark">{boton || 'Más información'}</button>
          </div>
        </div>
      );
      break;
    default:
      markup = <p>Ocurrió un error</p>;
  }
  return markup;
};

// Set propTypes
Preview.propTypes = {
  data: PropTypes.shape({
    adicional: PropTypes.string,
    boton: PropTypes.string,
    desc: PropTypes.string,
    duracion: PropTypes.string,
    imagen: PropTypes.string,
    nombre: PropTypes.string,
  }),
  template: PropTypes.number,
};

export default connect()(Preview);
