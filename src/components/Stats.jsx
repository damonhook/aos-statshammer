import React from "react";
import "./Stats.scss"
import { Table } from "semantic-ui-react";
import Graph from "./Graph";
import Card from "./Card";

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

export default Stats
