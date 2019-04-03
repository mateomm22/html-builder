/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actions from '../store/actions/actions';

import Backdrop from '../misc/backdrop';
import FormProgram from '../components/programs/form';
import Layout from '../misc/layout';
import Modal from '../components/modal';
import Result from './result';

class Programs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backdrop: false,
      program: {
        adicional: '',
        boton: '',
        desc: '',
        duracion: '',
        imagen: '',
        nombre: '',
      },
      modalCreate: false,
      modalDelete: false,
      modalEdit: false,
      modalResult: false,
      selectedId: '',
      // states applied to the final modal
      html: '',
      showMsg: false,
    };
    this.codeInput = React.createRef();
  }

  componentDidMount() {
    const { dispatch, match: { params: { idLanding } } } = this.props;
    dispatch(actions.getLandingInfo(idLanding));
    dispatch(actions.fetchPrograms(idLanding));
  }

  onEditing(id) {
    const {
      adicional, boton, desc, duracion, imagen, nombre,
    } = this.props.programs[id];

    this.setState(prevState => ({
      ...prevState,
      program: {
        ...prevState.program,
        adicional,
        boton,
        desc,
        duracion,
        imagen,
        nombre,
      },
    }));
    this.openModal('modalEdit', id);
  }

  togglePopover(id, open) {
    this.setState({
      backdrop: true,
      popover: open,
      selectedId: id,
    });
  }

  openModal(name, id) {
    this.setState({
      backdrop: true,
      [name]: true,
    });
    if (id) {
      this.setState({
        selectedId: id,
      });
    }
  }

  closeModal(name) {
    if (name === 'all') {
      this.setState({
        modalCreate: false,
        modalDelete: false,
        modalEdit: false,
        modalResult: false,
      });
    }
    this.setState({
      backdrop: false,
      program: {
        adicional: '',
        boton: '',
        desc: '',
        duracion: '',
        imagen: '',
        nombre: '',
      },
      [name]: false,
      selectedId: '',
    });
  }

  handleInputChange(event) {
    const { target: { name, value } } = event;
    this.setState(prevState => ({
      ...prevState,
      program: {
        ...prevState.program,
        [name]: value,
      },
    }));
  }

  editProgram(event) {
    event.preventDefault();
    const { dispatch, match: { params: { idLanding } } } = this.props;
    const { selectedId, program } = this.state;
    dispatch(actions.editElement('programas', selectedId, program, actions.fetchPrograms(idLanding)));
    this.closeModal('modalEdit');
  }

  deleteProgram(id) {
    const { dispatch, match: { params: { idLanding } } } = this.props;
    dispatch(actions.deleteElement('programas', id, actions.fetchPrograms(idLanding)));
    this.closeModal('modalDelete');
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
    let allPrograms;
    const { template } = (this.props.landing) ? this.props.landing : '';
    const programs = (this.props.programs) ? this.props.programs : '';
    const msgClass = (this.state.showMsg) ? 'active' : '';

    if (this.props.programs) {
      allPrograms = (Object.keys(this.props.programs).length > 0)
        ? Object.keys(this.props.programs).map((id, index) => {
          const {
            nombre,
          } = this.props.programs[id];
          const showPop = (this.state.popover && this.state.selectedId === id) ? 'active' : '';
          return (
            <tr key={id}>
              <td>{index + 1}</td>
              <td>{nombre}</td>
              <td className="pop-container">
                <i
                  className="fas fa-ellipsis-v open-pop"
                  role="button"
                  tabIndex="0"
                  onClick={() => this.togglePopover(id, true)}
                />
                <div
                  className={['action-pop', showPop].join(' ')}
                  role="button"
                  tabIndex="0"
                >
                  <button type="button" onClick={() => this.onEditing(id)}><i className="far fa-edit" /> Editar</button>
                  <button type="button" onClick={() => this.openModal('modalDelete', id)}><i className="far fa-trash-alt" /> Borrar</button>
                </div>
              </td>
            </tr>
          );
        })
        : (
          <tr>
            <td colSpan="3"><p>No hay programas creados en esta landing</p></td>
          </tr>
        );
    } else {
      allPrograms = (
        <tr>
          <td>
            <div className="mock" />
          </td>
          <td>
            <div className="mock" />
          </td>
        </tr>
      );
    }

    const { match: { params: { idLanding } } } = this.props;
    return (
      <Layout className="programs">
        <h1>Programas</h1>
        <br />
        <button className="btn btn-new btn-large crear-programa" type="button"><Link to={`/landings/${idLanding}/create`}>Crear programa</Link></button>
        <table>
          <thead>
            <tr>
              <th className="id">#</th>
              <th className="nombre">Nombre</th>
              <th className="actions">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {allPrograms}
          </tbody>
        </table>
        <button type="button" className="btn btn-large btn-edit generate" onClick={() => this.openModal('modalResult')}>Generar HTML</button>
        {/* Modal Edit Programa */}
        <Modal show={this.state.modalEdit} customClass="modal-create" closed={() => this.closeModal('modalEdit')}>
          <FormProgram
            changed={e => this.handleInputChange(e)}
            data={this.state.program}
            edit
            submitted={e => this.editProgram(e)}
          />
        </Modal>
        {/* Modal Delete Programa */}
        <Modal show={this.state.modalDelete} customClass="modal-delete" closed={() => this.closeModal('modalDelete')}>
          <strong className="alert">Esta acción no se puede deshacer</strong>
          <button className="btn btn-delete" type="button" onClick={() => this.deleteProgram(this.state.selectedId)}>Borrar</button>
        </Modal>
        {/* Modal HTML */}
        <Modal show={this.state.modalResult} customClass="modal-result" closed={() => this.closeModal('modalResult')}>
          <Result
            action={() => this.copyHtml()}
            data={programs || {}}
            msgClass={msgClass}
            reference={this.codeInput}
            template={template}
          />
        </Modal>
        <Backdrop show={this.state.backdrop} clicked={() => this.closeModal('all')} />
      </Layout>
    );
  }
}

const mapStateToProps = state => (
  {
    programs: state.programsReducer.loadedPrograms,
    landing: state.landingsReducer.currentLanding,
  }
);

// Set propTypes
Programs.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  landing: PropTypes.shape({
    nombre: PropTypes.string,
    template: PropTypes.number,
    universidad: PropTypes.string,
  }),
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
  programs: PropTypes.objectOf(PropTypes.object),
  dispatch: PropTypes.func,
};

export default connect(mapStateToProps)(Programs);
