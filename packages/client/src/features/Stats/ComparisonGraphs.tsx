import { Box, Tab, Tabs, Typography, useTheme } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import GraphSkeleton from 'components/Skeletons/GraphSkeleton'
import React, { useCallback, useState } from 'react'
import SwipeableViews from 'react-swipeable-views'
import { ComparisonResult } from 'types/store/comparison'
import { NameMapping } from 'types/store/units'

import ComparisonBarGraph from './graphs/ComparisonBarGraph'
import ComparisonLineGraph from './graphs/ComparisonLineGraph'
import ComparisonRadarGraph from './graphs/ComparisonRadarGraph'

interface TabPanelProps {
  index: number
  value: number
  children?: React.ReactNode
}

const TabPanel = ({ children, value, index }: TabPanelProps) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`graph-tabpanel-${index}`}
      aria-labelledby={`graph-tab-${index}`}
    >
      <Box marginTop={2}>
        <Typography>{children}</Typography>
      </Box>
    </div>
  )
}

interface ComparisonGraphsProps {
  nameMapping: NameMapping
  results: ComparisonResult[]
  loading: boolean
}

const ComparisonGraphs = ({ nameMapping, results, loading }: ComparisonGraphsProps) => {
  const [value, setValue] = useState(0)
  const theme = useTheme()

  const handleChange = (event: React.ChangeEvent<any>, newValue: number) => {
    setValue(newValue)
  }

  const handleSwipe = (index: number) => {
    setValue(index)
  }

  const a11yProps = useCallback(
    (index: number) => ({
      id: `graph-tab-${index}`,
      'aria-controls': `graph-tabpanel-${index}`,
    }),
    []
  )

  if (loading)
    return (
      <div>
        <Skeleton variant="rect" height={48} style={{ marginBottom: 10 }} />
        <GraphSkeleton series={6} groups={2} includeTitle />
      </div>
    )
  return (
    <div style={{ marginTop: -theme.spacing(1) }}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        aria-label="graph tabs"
      >
        <Tab label="Bar" {...a11yProps(0)} />
        <Tab label="Line" {...a11yProps(1)} />
        <Tab label="Radar" {...a11yProps(2)} />
      </Tabs>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleSwipe}
        style={{ height: '100%' }}
        containerStyle={{ height: '100%' }}
      >
        <TabPanel value={value} index={0}>
          <ComparisonBarGraph nameMapping={nameMapping} results={results} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ComparisonLineGraph nameMapping={nameMapping} results={results} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ComparisonRadarGraph nameMapping={nameMapping} results={results} />
        </TabPanel>
      </SwipeableViews>
    </div>
  )
}

export default ComparisonGraphs
