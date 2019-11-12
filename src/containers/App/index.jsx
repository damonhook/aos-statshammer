import React from 'react';
import Unit from 'containers/Unit';
import Stats from 'containers/Stats';
import { connect } from "react-redux";
import { fetchStatsTable, fetchModifiers } from "api";
import { bindActionCreators } from "redux";
import { Button } from "semantic-ui-react";
import "./index.scss"

const App = ({ unit, fetchStatsTable, fetchModifiers }) => {
  return (
    <div className="app">
      <div className="container">
        <Unit />
        <Button
          className="stats-button"
          content="Generate Data"
          icon="chart bar"
          labelPosition="left"
          fluid
          onClick={() => fetchStatsTable(unit)}
        />
        <Stats />
      </div>
    </div>
  );
}

const mapStateToProps = state => (state)

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchStatsTable,
  fetchModifiers
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App);
