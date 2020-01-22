import React from 'react';
import Units from 'containers/Units';
import Stats from 'containers/Stats';
import { makeStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import clsx from 'clsx';
import Target from 'containers/Target';
import { RoutedTabs } from 'components/Tabbed';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  content: {
    margin: theme.spacing(0, 3, 2, 2),
    flex: 1,
    flexBasis: '50%',
    width: '45%',
    maxWidth: '1024px',
    display: 'flex',
    flexDirection: 'column',
  },
  tabs: {
    margin: theme.spacing(0, 2, 2, 0),
  },
  tab: {
    padding: theme.spacing(2, 0, 2, 3),
    marginLeft: 'auto',
  },
  statsContent: {
    paddingTop: theme.spacing(2),
  },
  margin: {
    flex: 1,
  },
}));

interface DesktopAppContentProps {
  className?: string;
}

const DesktopAppContent: React.FC<DesktopAppContentProps> = ({ className }) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.container, className)}>
      <div className={classes.margin} />
      <RoutedTabs
        className={clsx(classes.content, classes.tabs)}
        tabNames={['Units', 'Target']}
        tabContent={[<Units className={classes.tab} />, <Target className={classes.tab} />]}
        tabRoutes={['/', '/target']}
      />
      <div>
        <Divider orientation="vertical" light />
      </div>
      <div className={classes.content}>
        <Stats className={classes.statsContent} />
      </div>
      <div className={classes.margin} />
    </div>
  );
};

export default DesktopAppContent;
