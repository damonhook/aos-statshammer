import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchStatsCompare } from 'api';
import { bindActionCreators } from 'redux';
import StatsContainer from './StatsContainer';

const Stats = ({ units, stats, fetchStatsCompare }) => {
  useEffect(() => {
    if (units) {
      fetchStatsCompare(units);
    }
  }, [units]);
  const unitNames = units.map(({ name }) => name);

  return (
    <StatsContainer stats={stats} unitNames={unitNames} />
  );
};

const mapStateToProps = (state) => (state);

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchStatsCompare,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Stats);
