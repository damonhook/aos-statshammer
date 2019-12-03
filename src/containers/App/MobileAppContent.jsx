import React, { useState } from 'react';
import Units, { AddUnitsFab } from 'containers/Units';
import Stats from 'containers/Stats';
import { makeStyles } from '@material-ui/core/styles';
import Tabbed from 'components/Tabbed';


const useStyles = makeStyles(() => ({
  mobileContainer: {
    marginTop: 0,
  },
}));


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

export default MobileAppContent;
