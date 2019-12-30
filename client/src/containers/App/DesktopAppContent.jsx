import React from 'react';
import PropTypes from 'prop-types';
import Units from 'containers/Units';
import Stats from 'containers/Stats';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Target from 'containers/Target';
import { RoutedTabs } from 'components/Tabbed';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  content: {
    margin: theme.spacing(0, 3, 2, 1),
    flex: 1,
    flexBasis: '50%',
    width: '45%',
    maxWidth: '1024px',
    display: 'flex',
    flexDirection: 'column',
  },
  tabs: {
    margin: theme.spacing(0, 1, 2, 0),
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

const DesktopAppContent = ({ className }) => {
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
      <div className={classes.content}>
        <Stats className={classes.statsContent} />
      </div>
      <div className={classes.margin} />
      <Redirect to="/" />
    </div>
  );
};

DesktopAppContent.defaultProps = {
  className: null,
};

DesktopAppContent.propTypes = {
  /** Any additional class names to apply to the component */
  className: PropTypes.string,
};

export default DesktopAppContent;
