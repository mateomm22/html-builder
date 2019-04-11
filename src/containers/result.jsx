/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';

const Result = ({
  action, data, msgClass, reference, template,
}) => {
  let allData;
  let total;
  if (data) {
    total = Object.keys(data).length;
    allData = Object.keys(data).map((idProgram) => {
      // console.log(template);
      const {
        desc, duracion, image, nombre, adicional,
      } = data[idProgram];

      switch (template) {
        case (1):
        case (2):
        case (3):
          return `<div class="row mb-5 programa facultad-1 active ${template}"><div class="img col-lg-4 col-md-12 col-sm-4 text-left mb-3"><div class="image d-block mb-3"><img src="${image}" alt="${nombre}" /></div><i class="far fa-clock"></i> ${duracion}</div><div class="text col-lg-8 col-md-12 col-sm-8 pr-0 align-top"><h3 class="text-uppercase h5 color-title">${nombre}</h3><p class="mb-4">${desc}<span class="d-block small">${adicional}</span></p></div></div>`;
        default:
          return null;
      }
    });
  }

  return (
    <div className="result">
      <span className="subtitle">Se ha generado el código fuente para <strong>{total} programas</strong></span>
      <input ref={reference} readOnly value={allData || 'Ocurrió un error, intenta generar el código de nuevo'} />
      <button
        type="button"
        className="btn btn-new"
        onClick={action}
      >
        Copiar HTML
      </button>
      <span className={['copied', msgClass].join(' ')}>Código copiado al portapapeles</span>
    </div>
  );
};

// Set propTypes
Result.propTypes = {
  action: PropTypes.func,
  data: PropTypes.objectOf(PropTypes.object),
  msgClass: PropTypes.string,
  reference: PropTypes.objectOf(PropTypes.instanceOf(Element)),
  template: PropTypes.number,
};

export default Result;
