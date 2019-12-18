import React from 'react';
import { StyleSheet, View, Text } from '@react-pdf/renderer';
import { grey } from '@material-ui/core/colors';

const styles = StyleSheet.create({
  table: {
    backgroundColor: 'white',
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    margin: 5,
  },
  header: {
    backgroundColor: grey[400],
    fontWeight: 'bold',
    fontSize: '25px',
  },
  row: {
    flexDirection: 'row',
    display: 'flex',
  },
  cell: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: '2em',
    fontSize: 10,
    flex: 1,
  },
  long: {
    flex: 2,
  },
  extra: {
    flex: 3,
  },
});

const TableHead = ({ children, style = {} }) => (
  <View style={[styles.header, style]}>
    {children}
  </View>
);

const TableRow = ({ children, style = {} }) => (
  <View style={[styles.row, style]}>
    {children}
  </View>
);

const TableCell = ({
  children, variant = 'basic', style = {}, bold,
}) => {
  const styleLookup = {
    basic: {},
    long: styles.long,
    extra: styles.extra,
  };
  return (
    <View style={[styles.cell, styleLookup[variant], style]}>
      <Text style={bold ? { fontWeight: 'bold' } : {}}>
        {children}
      </Text>
    </View>
  );
};

const Table = ({ children, style = {} }) => (
  <View style={[styles.table, style]}>
    {children}
  </View>
);

Table.Head = TableHead;
Table.Row = TableRow;
Table.Cell = TableCell;

export default Table;
