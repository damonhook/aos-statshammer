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
  },
});

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const Tabbed = ({ tabNames, tabContent, className }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleSwipe = (index) => {
    setValue(index);
  };

  return (
    <div className={clsx(classes.tabs, className)}>
      <Paper square>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          variant="fullWidth"
        >
          {tabNames.map((name, index) => (
            <Tab label={name} {...a11yProps(index)} />
          ))}
        </Tabs>
      </Paper>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleSwipe}
      >
        {tabContent.map((content, index) => (
          <TabPanel value={value} index={index} className={content} dir={theme.direction}>
            {content}
          </TabPanel>
        ))}
      </SwipeableViews>
    </div>
  );
};


export default Tabbed;
