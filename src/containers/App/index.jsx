import React from 'react';
import Unit from 'containers/Unit';
import Stats from 'containers/Stats';
import { connect } from "react-redux";
import { fetchStatsTable, fetchModifiers } from "api";
import { bindActionCreators } from "redux";
import { Button } from "semantic-ui-react";

const App = ({ unit, fetchStatsTable, fetchModifiers }) => {
  return (
    <div className="App" style={{ margin: "2em" }}>
      <Unit />
      <Button
        content="Update Modifiers"
        icon="cogs"
        labelPosition="left"
        fluid
        onClick={() => fetchModifiers()}
      />
      <Button
        content="Generate Data"
        icon="chart bar"
        labelPosition="left"
        fluid
        onClick={() => fetchStatsTable(unit)}
      />
      <Stats />
    </div>
  );
}

const mapStateToProps = state => (state)

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchStatsTable,
  fetchModifiers
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App);
