import React from 'react';
import { connect } from 'react-redux';
import { useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
// import NoItemsCard from 'components/NoItemsCard';
import _ from 'lodash';
import TargetModifierList from 'components/TargetModifierList';

const useStyles = makeStyles((theme) => ({
  target: {
    marginBottom: '1em',
    flexGrow: 1,
    flexBasis: '50%',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '4em',
    },
    overflowX: 'hidden',
  },
}));

const Target = React.memo(({ target, className }) => {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className={clsx(classes.target, className)}>
      <TargetModifierList />
    </div>
  );
}, (prevProps, nextProps) => _.isEqual(prevProps, nextProps));

const mapStateToProps = (state) => ({
  target: state.target,
});

export default connect(mapStateToProps)(Target);
