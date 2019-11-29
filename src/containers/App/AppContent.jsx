import React, { useState } from 'react';
import Units, { AddUnitsFab } from 'containers/Units';
import Stats from 'containers/Stats';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import Tabbed from 'components/Tabbed';


const useStyles = makeStyles((theme) => ({
  container: {
    width: '90%',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '1366px',
    margin: '2em auto',
    [theme.breakpoints.down('md')]: {
      width: '95%',
      marginTop: '1em',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      maxWidth: '100%',
    },
    [theme.breakpoints.up('lg')]: {
      flexDirection: 'row',
      maxWidth: '2166px',
      width: '95%',
    },
  },
  separator: {
    height: '1em',
    width: '1em',
  },
  mobileContainer: {
    marginTop: 0,
  },
}));

const DesktopAppContent = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Units />
      <div className={classes.separator} />
      <Stats />
    </div>
  );
};

const MobileAppContent = () => {
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState(0);
  const onTabChange = (newIndex) => setActiveTab(newIndex);

  return (
    <div>
      {activeTab === 0 && <AddUnitsFab />}
      <Tabbed
        className={classes.mobileContainer}
        tabNames={['Units', 'Stats']}
        tabContent={[<Units />, <Stats />]}
        onTabChange={onTabChange}
      />
    </div>
  );
};

const AppContent = () => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  return mobile ? <MobileAppContent /> : <DesktopAppContent />;
};


export default AppContent;
