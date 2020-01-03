import React, { useState } from 'react';
import { Tab, Paper, Tabs } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
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

interface ITabbedProps {
  tabNames: string[];
  tabContent: React.ReactNode[];
  className?: string;
  onTabChange?: (index: number) => void;
}

/**
 * A simple tabbed interface
 */
const Tabbed: React.FC<ITabbedProps> = ({ tabNames, tabContent, className, onTabChange }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (onTabChange) onTabChange(newValue);
  };
  const handleSwipe = index => {
    setValue(index);
    if (onTabChange) onTabChange(index);
  };

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
          <TabPanel value={value} index={index} className={classes.content} key={tabNames[index]}>
            {content}
          </TabPanel>
        ))}
      </SwipeableViews>
    </div>
  );
};

export default Tabbed;
