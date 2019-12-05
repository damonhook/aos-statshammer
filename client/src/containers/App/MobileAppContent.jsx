import React, { useState } from 'react';
import Units, { AddUnitsFab } from 'containers/Units';
import Stats from 'containers/Stats';
import { makeStyles } from '@material-ui/core/styles';
import Tabbed from 'components/Tabbed';
import clsx from 'clsx';


const useStyles = makeStyles(() => ({
  mobileContent: {
    display: 'flex',
    flex: 1,
  },
  tabs: {
    marginTop: 0,
  },
}));


const MobileAppContent = ({ className }) => {
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState(0);
  const onTabChange = (newIndex) => setActiveTab(newIndex);

  return (
    <div className={clsx(classes.mobileContent, className)}>
      {activeTab === 0 && <AddUnitsFab />}
      <Tabbed
        className={classes.tabs}
        tabNames={['Units', 'Stats']}
        tabContent={[<Units />, <Stats />]}
        onTabChange={onTabChange}
      />
    </div>
  );
};

export default MobileAppContent;
