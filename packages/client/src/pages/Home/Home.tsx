import React, { useState, useEffect } from 'react'
import UnitsTab from './tabs/UnitsTab'
import TabPanel from './components/TabPanel'
import { Grid, Tab, Tabs, useTheme, makeStyles, Theme, useMediaQuery } from '@material-ui/core'
import SwipeableViews from 'react-swipeable-views'
import StatsTab from './tabs/StatsTab'

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  }
}

const tabConfig = {
  units: { title: 'Units', route: '/' },
  target: { title: 'Target', route: '/target' },
  stats: { title: 'Stats', route: '/stats' },
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  statsAside: {
    marginTop: theme.spacing(4),
  },
}))

const Units = () => {
  const [value, setValue] = useState(0)
  const classes = useStyles()
  const theme = useTheme()
  const statsAsTab = useMediaQuery(theme.breakpoints.down('md'))

  useEffect(() => {
    if (!statsAsTab && value === 2) setValue(0)
  }, [statsAsTab, value, setValue])

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }

  const handleChangeIndex = (index: number) => {
    setValue(index)
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item md={12} lg={6}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label={tabConfig.units.title} {...a11yProps(0)} />
            <Tab label={tabConfig.target.title} {...a11yProps(1)} />
            {statsAsTab && <Tab label={tabConfig.stats.title} {...a11yProps(2)} />}
          </Tabs>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <UnitsTab />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <StatsTab />
            </TabPanel>
            {statsAsTab && (
              <TabPanel value={value} index={2} dir={theme.direction}>
                <StatsTab />
              </TabPanel>
            )}
          </SwipeableViews>
        </Grid>
        {!statsAsTab && (
          <Grid item xs>
            <div className={classes.statsAside}>
              <StatsTab />
            </div>
          </Grid>
        )}
      </Grid>
    </div>
  )
}

export default Units
