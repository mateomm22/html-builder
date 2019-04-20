/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';

import card1 from '../../assets/images/templates/card-1.svg';
import card2 from '../../assets/images/templates/card-2.svg';
import card3 from '../../assets/images/templates/card-3.svg';

const CardHome = ({
  active, clicked, id, title,
}) => {
  const activeClass = (active) ? 'active' : '';
  let image = null;
  switch (id) {
    case (1):
      image = <img src={card1} className="image" alt={title} />;
      break;
    case (2):
      image = <img src={card2} className="image wide" alt={title} />;
      break;
    case (3):
      image = <img src={card3} className="image" alt={title} />;
      break;
    default:
      image = null;
  }

  return (
    <div className={['card-design', activeClass].join(' ')} onClick={clicked} role="button" tabIndex="0">
      {image}
    </div>
  );
};

// Set propTypes
CardHome.propTypes = {
  active: PropTypes.bool,
  clicked: PropTypes.func,
  id: PropTypes.number,
  title: PropTypes.string,
};

export default CardHome;
