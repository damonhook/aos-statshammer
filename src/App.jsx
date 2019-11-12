import React from 'react';
import Unit from './components/Unit';
import Stats from './components/Stats';
import { connect } from "react-redux";
import { fetchStatsTable, fetchModifiers } from "./api";
import { bindActionCreators } from "redux";
import { Button } from "semantic-ui-react";

const App = ({unit, fetchStatsTable, fetchModifiers, stats}) => {
  return (
    <div className="App" style={{margin: "2em"}}>
      <Unit unit={unit}/>
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
      <Stats stats={stats} />
    </div>
  );
}

const mapStateToProps = state => {
  return state;
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchStatsTable,
  fetchModifiers
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App);
