import React from "react";
import "./index.scss"
import { Table } from "semantic-ui-react";
import { connect } from "react-redux";
import Graph from "components/Graph";
import Card from "components/Card";

const Stats = ({ stats }) => {
  if (!stats || !stats.payload || !stats.payload.length) {
    return null;
  }
  return (
    <Card className="stats-container">
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Save</Table.HeaderCell>
            <Table.HeaderCell>Average Damage</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {stats.payload.map(result => (
            <Table.Row>
              <Table.Cell>{result.target.save ? `${result.target.save}+` : '-'}</Table.Cell>
              <Table.Cell>{result.average_damage}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Graph results={stats.payload}/>
    </Card>
  )
}

const mapStateToProps = state => ({
  stats: state.stats
})

export default connect(mapStateToProps)(Stats)
