import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Units, { AddUnitsFab } from 'containers/Units';
import Stats, { ExportPdfFab } from 'containers/Stats';
import Target, { AddModifiersFab } from 'containers/Target';
import { makeStyles } from '@material-ui/core/styles';
import { RoutedTabs } from 'components/Tabbed';
import BottomNavigation from 'components/BottomNavigation';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  mobileContent: {
    display: 'flex',
    flex: 1,
  },
  tabs: {
    marginTop: 0,
    maxWidth: '100vw',
  },
  tab: {
    padding: '.5em',
  },
}));

interface FabProps {
  activeIndex: number;
}

const Fab: React.FC<FabProps> = ({ activeIndex }) => {
  switch (activeIndex) {
    case 0:
      return <AddUnitsFab />;
    case 1:
      return <AddModifiersFab />;
    case 2:
      return <ExportPdfFab />;
    default:
      return null;
  }
};

interface MobileAppContent {
  className?: string;
}

const MobileAppContent: React.FC<MobileAppContent> = ({ className }) => {
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState(0);
  const onTabChange = useCallback(newIndex => setActiveTab(newIndex), []);

  return (
    <div className={clsx(classes.mobileContent, className)}>
      <BottomNavigation />
      <Fab activeIndex={activeTab} />
      <RoutedTabs
        className={classes.tabs}
        tabNames={['Units', 'Target', 'Stats']}
        tabContent={[
          <Units className={classes.tab} />,
          <Target className={classes.tab} />,
          <Stats className={classes.tab} />,
        ]}
        tabRoutes={['/', '/target', '/stats']}
        onTabChange={onTabChange}
      />
    </div>
  );
};

export default MobileAppContent;
