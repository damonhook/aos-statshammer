import { Paper, Portal, Tab, Tabs } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useRouteFind } from 'hooks';
import React, { useEffect, useMemo } from 'react';
import { Route, useHistory } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';

import TabPanel from './TabPanel';

const useStyles = makeStyles({
  tabs: {
    flexGrow: 1,
    marginTop: '1em',
    maxWidth: '100vw',
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
  usePortal?: boolean;
}

/**
 * A simple tabbed interface
 */
const RoutedTabs = ({
  tabNames,
  tabContent,
  tabRoutes,
  className,
  onTabChange,
  usePortal,
}: IRoutedTabsProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const ref = React.useRef<HTMLDivElement>(null);

  const handleChange = (e: any, newValue: number) => {
    history.replace(tabRoutes[newValue]);
  };
  const handleSwipe = (index: number) => {
    history.replace(tabRoutes[index]);
  };

  const [value, matched] = useRouteFind(tabRoutes);
  if (!matched) history.replace(tabRoutes[0]);

  useEffect(() => {
    if (onTabChange) {
      onTabChange(value);
    }
  }, [onTabChange, value]);

  // const innerContent = useMemo(
  //   () =>
  //     tabContent.map((content, index) => (
  //       <Route path={tabRoutes[index]} key={tabNames[index]}>
  //         <TabPanel value={value} index={index} className={classes.content}>
  //           {content}
  //         </TabPanel>
  //       </Route>
  //     )),
  //   [classes.content, tabContent, tabNames, tabRoutes, value],
  // );

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
            {/* <Portal disablePortal={!usePortal} container={ref.current}> */}
            <TabPanel value={value} index={index} className={classes.content}>
              {content}
            </TabPanel>
            {/* </Portal> */}
          </Route>
        ))}
      </SwipeableViews>
      <div ref={ref} className="test" />
    </div>
  );
};

export default RoutedTabs;
