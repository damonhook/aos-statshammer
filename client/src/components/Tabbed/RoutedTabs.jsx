import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Paper, Tabs } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import {
  useHistory, Route, matchPath, useLocation,
} from 'react-router-dom';
import clsx from 'clsx';
import TabPanel from './TabPanel';

const useStyles = makeStyles({
  tabs: {
    flexGrow: 1,
    marginTop: '1em',
  },
  content: {
    flexGrow: 1,
    maxWidth: '100vw',
  },
  swiper: {
    height: '100%',
  },
});

const a11yProps = (index) => ({
  id: `full-width-tab-${index}`,
  'aria-controls': `full-width-tabpanel-${index}`,
});

/**
 * A simple tabbed interface
 */
const RoutedTabs = ({
  tabNames, tabContent, tabRoutes, className, onTabChange,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const location = useLocation();

  const handleChange = (event, newValue) => {
    history.replace(tabRoutes[newValue]);
    if (onTabChange) onTabChange(newValue);
  };
  const handleSwipe = (index) => {
    history.replace(tabRoutes[index]);
    if (onTabChange) onTabChange(index);
  };

  let value = 0;
  [...tabRoutes].reverse().some((path, index) => {
    if (matchPath(location.pathname, { path })) {
      value = tabRoutes.length - (index + 1);
      return true;
    }
    return false;
  });

  return (
    <div className={clsx(classes.tabs, className)}>
      <Paper square>
        <Tabs
          value={value}
          indicatorColor="primary"
          onChange={handleChange}
          variant="fullWidth"
        >
          {tabNames.map((name, index) => (
            <Tab label={name} {...a11yProps(index)} key={name} />
          ))}
        </Tabs>
      </Paper>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleSwipe}
        className={classes.swiper}
        resistance
      >
        {tabContent.map((content, index) => (
          <Route path={tabRoutes[index]} key={tabNames[index]}>
            <TabPanel
              value={value}
              index={index}
              className={classes.content}
              dir={theme.direction}
            >
              {content}
            </TabPanel>
          </Route>
        ))}
      </SwipeableViews>
    </div>
  );
};

RoutedTabs.defaultProps = {
  className: null,
  onTabChange: null,
};

RoutedTabs.propTypes = {
  /** The list of tab names */
  tabNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** The list of tab content to display in the relevant index */
  tabContent: PropTypes.arrayOf(PropTypes.node).isRequired,
  /** The list of tab names */
  tabRoutes: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** Any additional class names to add to the component */
  className: PropTypes.string,
  /** A callback function to call when the tab changes */
  onTabChange: PropTypes.func,
};

export default RoutedTabs;
