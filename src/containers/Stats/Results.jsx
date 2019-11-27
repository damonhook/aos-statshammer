import React from 'react';
import { connect } from 'react-redux';
import Graphs from 'components/Graphs';
import ListItem from 'components/ListItem';
import {
  Table, TableHead, TableBody, TableRow, TableCell,
} from '@material-ui/core';
import Card from 'components/Card';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';


const useStyles = makeStyles({
  results: {},
});

const Results = ({ stats, units, className }) => {
  const classes = useStyles();

  if (!stats || !stats.payload || !stats.payload.length) {
    return null;
  }
  const unitNames = units.map(({ name }) => name);
  return (
    <ListItem className={clsx(classes.results, className)} header="Generated Stats" collapsible>
      <Card>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Save</TableCell>
              {unitNames.map((name) => (
                <TableCell>{name}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {stats.payload.map((result) => {
              const { save, ...unitResults } = result;
              return (
                <TableRow>
                  <TableCell>{save && save !== 'None' ? `${save}+` : '-'}</TableCell>
                  {unitNames.map((name) => (
                    <TableCell>{unitResults[name]}</TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
      <Graphs results={stats.payload} unitNames={unitNames} />
    </ListItem>
  );
};

const mapStateToProps = (state) => ({
  stats: state.stats,
  units: state.units,
});

export default connect(mapStateToProps)(Results);
