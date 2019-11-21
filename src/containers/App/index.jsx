import React from 'react';
import Units from 'containers/Units';
import Stats from 'containers/Stats';
import { connect } from "react-redux";
import { fetchStatsTable, fetchStatsCompare } from "api";
import { bindActionCreators } from "redux";
import { Button } from "semantic-ui-react";
import "./index.scss"

const App = ({ units, fetchStatsTable, fetchStatsCompare }) => {
  return (
    <div className="app">
      <div className="container">
        <Units />
        <Button
          className="stats-button"
          content="Generate Data"
          icon="chart bar"
          fluid
          onClick={() => {fetchStatsTable(units[0]); fetchStatsCompare(units);}}
        />
        <Stats />
      </div>
    </div>
  );
}

const mapStateToProps = state => (state)

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchStatsTable,
  fetchStatsCompare
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App);
