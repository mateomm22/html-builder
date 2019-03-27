import React from 'react';

const imgLayout = ({ id, name }) => {
  let image = null;

  switch (id) {
    case (1):
      image = <img src="https://via.placeholder.com/600x200.png?text=Layout+1" className="image" alt={name} />;
      break;
    case (2):
      image = <img src="https://via.placeholder.com/600x200.png?text=Layout+2" className="image" alt={name} />;
      break;
    default:
      image = null;
  }

  return image;
};

export default imgLayout;
