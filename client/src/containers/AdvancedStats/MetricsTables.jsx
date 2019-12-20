import React from 'react';
import {
  Table, TableHead, TableRow, TableCell, TableBody, Typography, Paper, Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from 'components/ListItem';

const useStyles = makeStyles((theme) => ({
  wrapper: {},
  metricsContainer: {},
  tableContainer: {
    flexGrow: 1,
    flexBasis: '33%',
  },
  tableTitle: {
    paddingBottom: theme.spacing(0, 0, 1),
    textAlign: 'center',
  },
  table: {
    background: theme.palette.background.nested,
  },
}));

const MetricsTables = ({
  pending, results, unitNames, className,
}) => {
  const classes = useStyles();

  if (pending || !results || !results.length) {
    return null;
  }
  return (
    <ListItem header="Metrics" className={className} collapsible>
      <Grid container spacing={2} className={classes.metricsContainer}>
        {results.map(({ save, ...unitData }) => {
          const saveString = save !== 'None' ? `${save}+` : '-';
          return (
            <Grid item className={classes.tableContainer}>
              <Typography variant="h6" className={classes.tableTitle}>
                {`Metrics against ${saveString} save`}
              </Typography>
              <Paper className={classes.table}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Unit Name</TableCell>
                      <TableCell>Mean</TableCell>
                      <TableCell>Var.</TableCell>
                      <TableCell>Std. Dev.</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.keys(unitData).map((k) => {
                      const { metrics } = unitData[k];
                      return (
                        <TableRow>
                          <TableCell>{k}</TableCell>
                          <TableCell>{metrics.mean.toFixed(2)}</TableCell>
                          <TableCell>{Math.abs(metrics.variance).toFixed(2)}</TableCell>
                          <TableCell>
                            {metrics.standardDeviation ? metrics.standardDeviation.toFixed(2) : '-'}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </ListItem>
  );
};

export default MetricsTables;
