/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../store/actions/actions';

import Layout from '../misc/layout';

class Crear extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMsg: false,
    };
    this.codeInput = React.createRef();
  }

  copyHtml() {
    this.codeInput.current.select();
    document.execCommand('copy');
    this.setState({ showMsg: true });
    setTimeout(() => {
      this.setState({ showMsg: false });
    }, 2500);
  }

  render() {
    const { cards, current, data } = this.props;
    const thisObj = cards.find(card => card.id === current);
    const { name: cardName } = thisObj;
    const msgClass = (this.state.showMsg) ? 'active' : '';
    const allData = data.map((program) => {
      const {
        desc, duracion, image, nombre, snies,
      } = program;

      return (`<div class="row mb-5 programa facultad-1 active"><div class="img col-lg-4 col-md-12 col-sm-4 text-left mb-3"><div class="image d-block mb-3"><img src="${image}" alt="${nombre}" /></div><i class="far fa-clock"></i> ${duracion}</div><div class="text col-lg-8 col-md-12 col-sm-8 pr-0 align-top"><h3 class="text-uppercase h5 color-title">${nombre}</h3><p class="mb-4">${desc}<span class="d-block small">${snies}</span></p></div></div>`);
    });

    return (
      <Layout className="result">
        <span className="subtitle">Resultado</span>
        <h1>{cardName}</h1>
        <input ref={this.codeInput} readOnly value={allData} />
        <button type="button" className="copy-html" onClick={() => this.copyHtml()}>Copiar HTML</button>
        <span className={['msg', msgClass].join(' ')}>Código copiado al portapapeles</span>
      </Layout>
    );
  }
}
const mapStateToProps = state => (
  {
    cards: state.cards,
    current: state.selected,
    data: state.programs,
  }
);

const mapDispatchToProps = dispatch => (
  {
    setSelected: id => dispatch(actions.selectCard(id)),
    onNew: info => dispatch(actions.newProgram(info)),
  }
);

// Set propTypes
Crear.propTypes = {
  current: PropTypes.number,
  cards: PropTypes.arrayOf(PropTypes.object),
  data: PropTypes.arrayOf(PropTypes.object),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Crear);
