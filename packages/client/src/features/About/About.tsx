import { IconButton, makeStyles, Paper, Theme, Typography } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import { LogoIcon } from 'components/Icons'
import React from 'react'
import { EXTERNAL_LINKS, PAGE_ROUTES } from 'utils/routes'

import AboutLink from './AboutLink'
import Section from './Section'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    maxWidth: 900,
    margin: `${theme.spacing(2)}px auto`,
  },
  about: { margin: theme.spacing(0, 1) },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  content: {
    padding: theme.spacing(2, 6),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2, 4),
    },
  },
  logoButton: {
    fontSize: '7rem',
  },
}))

const About = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Paper className={classes.about}>
        <div className={classes.content}>
          <div className={classes.header}>
            <IconButton href={PAGE_ROUTES.HOME} className={classes.logoButton}>
              <LogoIcon color="primary" fontSize="inherit" />
            </IconButton>
            <Typography component="h2" variant="h5" align="center">
              AoS Statshammer
            </Typography>
          </div>
          <Section title="Overview">
            A tool for calculating and comparing damage outputs for <strong>Warhammer Age of Sigmar </strong>
            units (also referred to as Mathhammer). If you are interested in Warcry calculations, see the
            sister-project <AboutLink href={EXTERNAL_LINKS.WARCRY_STATSHAMMER}>Warcry-Statshammer</AboutLink>.
          </Section>
          <Section title="Average Damage Comparison">
            Gather the average damage that each unit is expected to do against each possible save. This
            average is a calculated value (not simulated).
          </Section>
          <Section title="Profile Modifiers">
            Add various modifiers to your weapon profiles in order to replicate the vast array of unit
            rules/abilities that exist in the rules. Some examples are:
            <ul>
              <li>
                <strong>Reroll Ones: </strong>
                Reroll Ones <i>to hit</i>
              </li>
              <li>
                <strong>Mortal Wounds: </strong>
                <i>Unmodified</i> rolls of <i>6</i>+ <i>to hit</i> result in <i>1</i> mortal wounds
              </li>
              <li>
                <strong>Leader Bonus: </strong>
                Add <i>2</i> <i>attacks</i> to the leader of this unit (<i>1</i> leader)
              </li>
              <li>And many more</li>
            </ul>
          </Section>
          <Section title="Target Modifiers">
            Add various modifiers to the target to which stats are generated against (the opposing unit).
            Useful to replicate when where you are evaluating against a scenario where the opposing unit has
            certain abilities. Some examples are:
            <ul>
              <li>
                <strong>Target Reroll: </strong>
                Reroll Save Rolls
              </li>
              <li>
                <strong>Target Ethereal: </strong>
                Ignore modifiers to save (positive or negative) when making save rolls
              </li>
              <li>
                <strong>Target Feel No Pain: </strong>
                Ignore wounds and mortal wounds on a roll of <i>6</i>+
              </li>
              <li>And many more</li>
            </ul>
          </Section>
          <Section title="Simulations">
            Running a large number of simuled attacks to gather more detailed information on the performance
            of the given units. The data points gathered include:
            <ul>
              <li>Cumulative Probabilies</li>
              <li>Discrete Probabilies</li>
              <li>Sample Metrics (mean, max, variance)</li>
            </ul>
            The number of simulations is customizable from the simulations screen.
          </Section>
          <Section title="Import / Export">
            There are various importing / exporting functionalities to make reproducing or saving results
            easier.
            <ul>
              <li>Import / Export your units</li>
              <li>
                Export a PDF containing the generated information (unit data, comparisons, simulations, etc)
              </li>
            </ul>
          </Section>
          <Section title="Notes">
            This is a free community tool built by Damon Hook (<i>NomadHook</i>).
            <br />
            Keep an eye on the <AboutLink href={EXTERNAL_LINKS.RELEASES}>Github Releases</AboutLink>, or{' '}
            <AboutLink href={EXTERNAL_LINKS.REDDIT}>Reddit page</AboutLink> to get notified of new additions.
            <br />
            <br />
            <Alert severity="info">
              <AlertTitle>Remember</AlertTitle>
              <Typography>
                There is more to a unit than just its damage output. This is a tool, not a definitive answer
                of which unit is better
              </Typography>
            </Alert>
          </Section>
        </div>
      </Paper>
    </div>
  )
}

export default About
