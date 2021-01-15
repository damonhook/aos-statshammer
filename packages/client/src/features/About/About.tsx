import { Link, makeStyles, Paper, Theme, Typography } from '@material-ui/core'
import React from 'react'
import { EXTERNAL_LINKS } from 'utils/routes'
import AboutLink from './AboutLink'
import Section from './Section'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    maxWidth: 900,
    margin: '10px auto',
    marginTop: 10,
  },
  about: { margin: theme.spacing(0, 1) },
  header: { marginBottom: theme.spacing(2) },
  content: {
    padding: theme.spacing(2, 6),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2, 4),
    },
  },
}))

const About = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Paper className={classes.about}>
        <div className={classes.content}>
          <Typography component="h2" variant="h5" align="center" className={classes.header}>
            AoS Statshammer
          </Typography>
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
                Reroll Ones for <i>to hit</i>
              </li>
              <li>
                <strong>Mortal Wounds: </strong>
                <i>Unmodified</i> rolls of <i>6</i>+ for <i>to hit</i> result in <i>1</i> mortal wounds
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
            This is a free community tool built by Damon Hook (<i>NoMaDhOoK</i>).
            <br />
            Keep an eye on the <AboutLink href={EXTERNAL_LINKS.RELEASES}>Github Releases</AboutLink>, or the
            <AboutLink href={EXTERNAL_LINKS.REDDIT}>Reddit page</AboutLink> to get notified of new additions.
            <br />
            <br />
            <strong>Remember:</strong> There is more to a unit than just its damage output. This is a tool,
            not a definitive answer of which unit is better <br />
          </Section>
        </div>
      </Paper>
    </div>
  )
}

export default About
