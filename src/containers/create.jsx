/* eslint-disable max-len */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actions from '../store/actions/actions';
import * as actionTypes from '../store/actions/types';

import Card from '../components/programs/cardLayout';
import FormProgram from '../components/programs/form';
import Preview from '../components/programs/preview';

import logoWeb from '../assets/images/logo-team-web.svg';
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
      showForm: false,
      showMsg: false,
      showError: false,
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

  /**
   * This function Toggles the form
   */
  toggleForm() {
    this.setState(prevState => ({
      showForm: !prevState.showForm,
    }));
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
 * @param {boolean} finish - Boolean to know if the user finished creating programs
 * @returns {function} dispatch - Dispatch the action to create the program
 */
  createProgram(event, finish) {
    event.preventDefault();
    const { current: { template }, dispatch, match: { params: { idLanding } } } = this.props;
    const { program } = this.state;
    const validate = Object.keys(program).every(key => program[key] !== '');

    if (validate) {
      // Check if the action is save and finish or save and keep creating programs
      if (!finish) {
        dispatch(actions.createProgram(program, false, idLanding, template));
        this.setState({ showMsg: true });
        setTimeout(() => {
          this.setState({ showMsg: false });
        }, 2500);
      } else {
        dispatch(actions.createProgram(program, true, idLanding, template));
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
    } else {
      this.setState({ showError: true });
      setTimeout(() => {
        this.setState({ showError: false });
      }, 5000);
    }
  }

  render() {
    const msgClass = (this.state.showMsg) ? 'active' : '';
    const msgError = (this.state.showError) ? 'active' : '';
    const formClass = (this.state.showForm) ? 'visible' : '';
    const arrowClass = (this.state.showForm) ? 'fa-arrow-right' : 'fa-arrow-left';
    let allCards;
    let goBack;
    let preview;
    let selected;
    let title;

    if (this.props.current) {
      const { cards, current: { nombre, template, universidad }, match: { params: { idLanding } } } = this.props;
      selected = template;
      goBack = <Link className="go-back" to={`/landings/${idLanding}`}><i className="fas fa-angle-left" /> Volver</Link>;
      title = (
        <div className="landing-title">
          <h1>
            {nombre}
            <span>{universidad}</span>
          </h1>
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
          <div className="container">
            <Link to="/"><img className="logo-web" src={logoWeb} alt="" /></Link>
            <Link to="/" className="link-logo-ilumno"><img className="logo-ilumno" src={logo} alt="" /></Link>
            {title}
          </div>
        </header>
        <span className={['msg', msgClass].join(' ')}>Programa creado</span>
        <span className={['msg', 'msg-error', msgError].join(' ')}>Por favor completa los campos</span>
        <div className={['content', formClass].join(' ')}>
          {goBack}
          <div className="cards">
            <div className="subtitle">
              <h5>Escoja un diseño:</h5>
              <p>Por defecto aparece seleccionado el template que tienen los demás programas creados de la landing, si se modifica el diseño, éste se aplicará a todos los programas existentes.</p>
            </div>
            <div className="grid">
              {allCards}
            </div>
          </div>
          <div className="preview">
            <div className="subtitle">
              <h5>Previsualización</h5>
              <p>Esta es una previsualización básica de la estructura y organización del contenido, los colores fuentes y tamaños pueden variar dentro de la landing de Marketo.</p>
            </div>
            <div className="templates">
              {preview}
            </div>
          </div>
        </div>
        <div className={['form', formClass].join(' ')}>
          <button type="button" className={['toggle-form', formClass].join(' ')} onClick={() => this.toggleForm()}>
            <i className={['fas', arrowClass].join(' ')} />
          </button>
          <div className="title-form">
            <h6>Información del programa</h6>
            <p>Complete los siguientes campos del formulario para generar la plantilla HTML con los programas</p>
          </div>
          <FormProgram
            changed={e => this.handleInputChange(e)}
            showClass={formClass}
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
