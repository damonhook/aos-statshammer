import { Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import React from 'react'
import { buildSteps, selectorsWithPrefix } from 'utils/help'

export const helpTargets = selectorsWithPrefix('help-profile', {
  ids: {
    profileName: 'name',
    profileCharacteristic: 'characteristics',
    profileDialogActions: 'dialog-actions',
    addModifiers: 'add-modifiers',
  },
  classes: {
    modifiers: 'modifiers',
  },
})

interface GetStepsProps {
  numModifiers: number
}

const getSteps = ({ numModifiers }: GetStepsProps) =>
  buildSteps([
    {
      id: helpTargets.ids.profileCharacteristic,
      content: (
        <>
          <Typography>
            You can modifiy the characteristics of the weapon.
            <Alert severity="info" style={{ marginTop: 8 }}>
              Certain fields (attacks and damage) also accept dice values (e.g: <code>'D6'</code>,{' '}
              <code>'D3 + 2'</code>, <code>'2D6'</code>, etc).
            </Alert>
          </Typography>
        </>
      ),
    },
    {
      id: helpTargets.ids.addModifiers,
      content: 'Add modifiers (abilities) to the weapon profile.',
    },
    {
      className: helpTargets.classes.modifiers,
      content: 'Edit your applied modifiers to best match what is on the warscroll.',
      hidden: numModifiers <= 0,
    },
    {
      id: helpTargets.ids.profileName,
      content: 'You can optionally add a name to the weapon profile.',
    },
    {
      id: helpTargets.ids.profileDialogActions,
      content: 'Save or discard the changes you have made to the weapon profile.',
    },
  ])

export default getSteps
