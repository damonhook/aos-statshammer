import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import NoItemsCard from 'components/NoItemsCard';
import _ from 'lodash';
import TargetModifierList from 'components/TargetModifierList';
import { IStore } from 'types/store';

const useStyles = makeStyles(() => ({
  target: {
    overflowX: 'hidden',
  },
}));

const mapStateToProps = (state: IStore) => ({
  target: state.target,
});

const connector = connect(mapStateToProps);
interface ITargetProps extends ConnectedProps<typeof connector> {
  className?: string;
}

const Target: React.FC<ITargetProps> = React.memo(
  ({ target, className }) => {
    const classes = useStyles();

    return (
      <div className={clsx(classes.target, className)}>
        {!target?.modifiers?.length && (
          <NoItemsCard header="No modifiers" body="No target modifiers are present (Basic target)" />
        )}
        <TargetModifierList />
      </div>
    );
  },
  (prevProps, nextProps) => _.isEqual(prevProps, nextProps),
);

export default connector(Target);
