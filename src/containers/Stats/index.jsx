import React from 'react';
import './index.scss';
import { Table } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Graph from 'components/Graph';
import Card from 'components/Card';

const Stats = ({ stats, units }) => {
  if (!stats || !stats.payload || !stats.payload.length) {
    return null;
  }
  const unitNames = units.map(({ name }) => name);
  return (
    <Card className="stats-container">
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Save</Table.HeaderCell>
            {unitNames.map((name) => (
              <Table.HeaderCell>{name}</Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {stats.payload.map((result) => {
            const { save, ...unitResults } = result;
            return (
              <Table.Row>
                <Table.Cell>{save && save !== 'None' ? `${save}+` : '-'}</Table.Cell>
                {unitNames.map((name) => (
                  <Table.Cell>{unitResults[name]}</Table.Cell>
                ))}
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
      <Graph results={stats.payload} unitNames={unitNames} />
    </Card>
  );
};

const mapStateToProps = (state) => ({
  stats: state.stats,
  units: state.units,
});

export default connect(mapStateToProps)(Stats);
