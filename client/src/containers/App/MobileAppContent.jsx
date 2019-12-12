import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
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
    maxWidth: '100vw',
  },
  tab: {
    padding: '.5em',
  },
}));


const MobileAppContent = ({ className }) => {
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState(0);
  const onTabChange = useCallback((newIndex) => setActiveTab(newIndex), []);

  return (
    <div className={clsx(classes.mobileContent, className)}>
      {activeTab === 0 && <AddUnitsFab />}
      <Tabbed
        className={classes.tabs}
        tabNames={['Units', 'Stats']}
        tabContent={[<Units className={classes.tab} />, <Stats className={classes.tab} />]}
        onTabChange={onTabChange}
      />
    </div>
  );
};

MobileAppContent.defaultProps = {
  className: null,
};

MobileAppContent.propTypes = {
  /** Any additional class names to apply to the component */
  className: PropTypes.string,
};


export default MobileAppContent;
