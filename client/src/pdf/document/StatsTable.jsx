import React from 'react';
import Table from 'pdf/components/Table';

const transposeData = (unitNames, results) => unitNames.reduce((acc, name) => {
  const item = { name };
  results.forEach(({ save, ...results }) => {
    item[save] = results[name];
  });
  acc.push(item);
  return acc;
}, []);

const StatsTable = ({ unitNames, results }) => {
  const transposed = transposeData(unitNames, results);
  return (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.Cell variant="extra">Unit Name</Table.Cell>
          {results.map(({ save }) => (
            <Table.Cell>{save !== 'None' ? `${save}+` : '-' }</Table.Cell>
          ))}
        </Table.Row>
      </Table.Head>
      {transposed.map(({ name, ...results }) => (
        <Table.Row>
          <Table.Cell variant="extra">{name}</Table.Cell>
          {Object.keys(results).map((k) => (
            <Table.Cell>{results[k]}</Table.Cell>
          ))}
        </Table.Row>
      ))}
    </Table>
  );
};

export default StatsTable;
