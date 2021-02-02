import { Box, Tab, Tabs, Typography, useTheme } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import GraphSkeleton from 'components/Skeletons/GraphSkeleton'
import React, { useCallback, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SwipeableViews from 'react-swipeable-views'
import { uiStore } from 'store/slices'
import Store from 'types/store'
import { ComparisonResult } from 'types/store/comparison'
import { GraphTab } from 'types/store/ui'
import { NameMapping } from 'types/store/units'

import { ComparisonBarGraph, ComparisonGraphProps, ComparisonLineGraph, ComparisonRadarGraph } from './graphs'

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

function a11yProps(index: any) {
  return {
    id: `graph-tab-${index}`,
    'aria-controls': `graph-tabpanel-${index}`,
  }
}

type TabConfig = { id: GraphTab; title: string; component: (props: ComparisonGraphProps) => React.ReactNode }
const tabConfig: TabConfig[] = [
  { id: 'bar', title: 'Bar', component: ComparisonBarGraph },
  { id: 'line', title: 'Line', component: ComparisonLineGraph },
  { id: 'radar', title: 'Radar', component: ComparisonRadarGraph },
]

interface ComparisonGraphsProps {
  nameMapping: NameMapping
  results: ComparisonResult[]
  loading?: boolean
}

const ComparisonGraphs = ({ nameMapping, results, loading }: ComparisonGraphsProps) => {
  const [animate, setAnimate] = useState(false)
  const tab = useSelector((state: Store) => state.ui.stats.graphTab)
  const dispatch = useDispatch()
  const theme = useTheme()

  const value = useMemo(() => {
    const idx = tabConfig.findIndex(t => t.id === tab)
    return idx >= 0 ? idx : 0
  }, [tab])

  const handleChange = (event: React.ChangeEvent<any>, index: number) => {
    const { id } = tabConfig[index]
    dispatch(uiStore.actions.setStatsUI({ graphTab: id }))
  }

  const handleSwipe = (index: number) => {
    const { id } = tabConfig[index]
    dispatch(uiStore.actions.setStatsUI({ graphTab: id }))
  }

  const onSwitching = (index: number, type: 'move' | 'end') => {
    if (type === 'move') setAnimate(true)
    else setTimeout(() => setAnimate(false), 250)
  }

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
        onSwitching={onSwitching}
        animateTransitions={animate}
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

export default React.memo(ComparisonGraphs)
