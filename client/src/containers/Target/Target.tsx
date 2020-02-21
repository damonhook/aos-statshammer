import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import NoItemsCard from 'components/NoItemsCard';
import TargetModifierList from 'components/TargetModifierList';
import _ from 'lodash';
import React from 'react';
import { useSelector } from 'react-redux';
import { targetSelector } from 'store/selectors';

const useStyles = makeStyles(() => ({
  target: {
    overflowX: 'hidden',
  },
}));

interface ITargetProps {
  className?: string;
}

const Target = ({ className }: ITargetProps) => {
  const classes = useStyles();
  const target = useSelector(targetSelector, _.isEqual);

  return (
    <div className={clsx(classes.target, className)}>
      {!target?.modifiers?.length && (
        <NoItemsCard header="No modifiers" body="No target modifiers are present (Basic target)" />
      )}
      <TargetModifierList />
    </div>
  );
};

export default Target;
