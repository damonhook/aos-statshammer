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
  sticky: {
    position: 'sticky',
    left: 0,
    zIndex: 11,
    backgroundColor: theme.palette.background.nested,
  },
}));

const ProbabilityTables = ({
  pending, probabilities, unitNames, className,
}) => {
  const classes = useStyles();
  return (
    <ListItem
      header="Probability Tables"
      className={className}
      collapsible
      startCollapsed
      loading={pending}
      loaderDelay={0}
    >
      <Grid container spacing={2} className={classes.metricsContainer}>
        {(probabilities || []).map(({ save, buckets }) => {
          const saveString = save !== 'None' ? `${save}+` : '-';
          return (
            <Grid item className={classes.tableContainer}>
              <Typography variant="h6" className={classes.tableTitle}>
                {`Probability against ${saveString} save`}
              </Typography>
              <Paper className={classes.table}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.sticky}>Damage</TableCell>
                      {unitNames.map((name) => (
                        <TableCell>{name}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {buckets.map(({ damage, ...unitData }) => (
                      <TableRow>
                        <TableCell className={classes.sticky}>{damage}</TableCell>
                        {unitNames.map((name) => (
                          unitData[name]
                            ? <TableCell>{unitData[name].toFixed(2)}</TableCell>
                            : <TableCell>0.00</TableCell>
                        ))}
                      </TableRow>
                    ))}
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

export default ProbabilityTables;
