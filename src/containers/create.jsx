/* eslint-disable max-len */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../store/actions/actions';
import * as actionTypes from '../store/actions/types';

import Card from '../components/programs/cardLayout';
import FormProgram from '../components/programs/form';
import Preview from '../components/programs/preview';

import logo from '../assets/images/logo-ilumno.svg';

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      charCount: 200,
      program: {
        adicional: '',
        boton: '',
        desc: '',
        duracion: '',
        imagen: '',
        landing: '',
        nombre: '',
      },
      showMsg: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    const { dispatch, match: { params: { idLanding } } } = this.props;
    this.setState(prevState => ({
      ...prevState,
      program: {
        ...prevState.program,
        landing: idLanding,
      },
    }));
    dispatch(actions.getLandingInfo(idLanding));
  }

  setLayout(id) {
    const { dispatch } = this.props;
    dispatch({
      type: actionTypes.SET_TEMPLATE,
      id,
    });
  }

  handleInputChange(event) {
    const { target: { name, value } } = event;

    if (name === 'desc') {
      const total = 200 - value.length;
      this.setState({
        charCount: total,
      });
    }

    this.setState(prevState => ({
      ...prevState,
      program: {
        ...prevState.program,
        [name]: value,
      },
    }));
  }

  /**
 * Create the program
 * @param {*} event - The default submit form event
 * @param {boolean} finish - Boolean to know if the user
 * finished creating programs
 * @returns {function} dispatch - Dispatch the action to create the program
 */
  createProgram(event, finish) {
    event.preventDefault();
    const { current: { template }, dispatch, match: { params: { idLanding } } } = this.props;
    if (!finish) {
      dispatch(actions.createProgram(this.state.program, false, idLanding, template));
      this.setState({ showMsg: true });
      setTimeout(() => {
        this.setState({ showMsg: false });
      }, 2500);
    } else {
      dispatch(actions.createProgram(this.state.program, true, idLanding, template));
    }

    this.setState({
      program: {
        adicional: '',
        boton: '',
        desc: '',
        duracion: '',
        imagen: '',
        landing: '',
        nombre: '',
      },
    });
  }

  render() {
    const msgClass = (this.state.showMsg) ? 'active' : '';
    let allCards;
    let preview;
    let selected;
    let title;

    if (this.props.current) {
      const { cards, current: { nombre, template, universidad } } = this.props;
      selected = template;
      title = (
        <div className="landing-title">
          <h1>{nombre} | <span>{universidad}</span></h1>
        </div>
      );
      allCards = cards.map((card) => {
        const { name, id } = card;
        const thisSelected = (id === selected);
        return (
          <Card
            id={id}
            key={id}
            active={thisSelected}
            title={name}
            clicked={() => this.setLayout(id)}
          />
        );
      });
      preview = <Preview template={selected} data={this.state.program} />;
    }

    return (
      <div className="create">
        <header>
          Logo
          <img className="logo-ilumno" src={logo} alt="" />
        </header>
        <span className={['msg', msgClass].join(' ')}>Programa creado</span>
        <div className="content">
          {title}
          <div className="cards">
            <p className="subtitle">
              Escoja un diseño:
              <span>Por defecto aparece seleccionado el template que tienen los demás programas creados de la landing, si se modifica el diseño, éste se aplicará a todos los programas existentes.</span>
            </p>
            <div className="grid">
              {allCards}
            </div>
          </div>
          <div className="preview">
            <p className="subtitle">
              Previsualización
              <span>Esta es una previsualización básica de la estructura y organización del contenido, los colores fuentes y tamaños pueden variar dentro de la landing de Marketo.</span>
            </p>
            {preview}
          </div>
        </div>
        <div className="form">
          <h6>Información del programa</h6>
          <FormProgram
            changed={e => this.handleInputChange(e)}
            data={this.state.program}
            saved={e => this.createProgram(e, false)}
            submitted={e => this.createProgram(e, true)}
            total={this.state.charCount}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    current: state.landingsReducer.currentLanding,
    cards: state.programsReducer.cards,
  }
);

// Set propTypes
Create.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object),
  current: PropTypes.shape({
    nombre: PropTypes.string,
    template: PropTypes.number,
    universidad: PropTypes.string,
  }),
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

export default connect(mapStateToProps)(Create);
