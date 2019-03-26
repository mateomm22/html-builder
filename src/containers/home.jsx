import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../store/actions';

import Layout from '../misc/layout';

class Home extends Component {
  componentDidMount() {
    console.log('componentDidMount');
    this.props.onLoad();
  }

  render() {
    console.log('render');
    const allLandings = this.props.landings.map((landing) => {
      const { id, name } = landing;
      return (
        <tr key={id}>
          <td>{name}</td>
        </tr>
      );
    });

    console.log(this.props.landings);
    return (
      <Layout className="home">
        <h1>Test</h1>
        <p>Lorem ipsum dolor sit amet.</p>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return ({
    landings: state.landingsReducer.landings,
  });
};


const mapDispatchToProps = dispatch => (
  {
    onLoad: () => dispatch(actions.fetchLandings()),
  }
);

// Set propTypes
Home.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  landings: PropTypes.arrayOf(PropTypes.object),
  onLoad: PropTypes.func,
  onSelect: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
