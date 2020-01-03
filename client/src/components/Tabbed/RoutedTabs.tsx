import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Tab, Paper, Tabs } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import { useHistory, Route, matchPath, useLocation } from 'react-router-dom';
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

const a11yProps = (index: number) => ({
  id: `full-width-tab-${index}`,
  'aria-controls': `full-width-tabpanel-${index}`,
});

interface IRoutedTabsProps {
  tabNames: string[];
  tabContent: React.ReactNode[];
  tabRoutes: string[];
  className?: string;
  onTabChange?: (index: number) => void;
}

/**
 * A simple tabbed interface
 */
const RoutedTabs: React.FC<IRoutedTabsProps> = ({
  tabNames,
  tabContent,
  tabRoutes,
  className,
  onTabChange,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const location = useLocation();

  const handleChange = (event, newValue) => {
    history.replace(tabRoutes[newValue]);
  };
  const handleSwipe = index => {
    history.replace(tabRoutes[index]);
  };

  let value = 0;
  let matched = false;
  [...tabRoutes].reverse().some((path, index) => {
    if (matchPath(location.pathname, { path })) {
      value = tabRoutes.length - (index + 1);
      matched = true;
      return true;
    }
    return false;
  });
  if (!matched) history.replace(tabRoutes[0]);

  useEffect(() => {
    if (onTabChange) {
      onTabChange(value);
    }
  }, [onTabChange, value]);

  return (
    <div className={clsx(classes.tabs, className)}>
      <Paper square>
        <Tabs value={value} indicatorColor="primary" onChange={handleChange} variant="fullWidth">
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
            {/* <TabPanel value={value} index={index} className={classes.content} dir={theme.direction}> */}
            <TabPanel value={value} index={index} className={classes.content}>
              {content}
            </TabPanel>
          </Route>
        ))}
      </SwipeableViews>
    </div>
  );
};

export default RoutedTabs;
