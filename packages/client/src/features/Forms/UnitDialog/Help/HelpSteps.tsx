import { buildSteps, selectorsWithPrefix } from 'utils/help'

export const helpTargets = selectorsWithPrefix('help-unit', {
  ids: {
    unitName: 'name',
    addWeaponProfile: 'add-weapon-profile',
    importExport: 'import-export',
    unitDialogActions: 'dialog-actions',
  },
  classes: {
    toggleActiveProfile: 'toggle-active-profile',
    weaponProfile: 'weapon-profile',
    weaponProfileControls: 'weapon-profile-controls',
  },
})

interface GetStepsProps {
  numWeaponProfiles: number
}

const getSteps = ({ numWeaponProfiles }: GetStepsProps) =>
  buildSteps([
    {
      id: helpTargets.ids.unitName,
      content: 'Edit the name of your unit.',
    },
    {
      id: helpTargets.ids.addWeaponProfile,
      content: 'Add new weapon profiles to your unit.',
    },
    {
      className: helpTargets.classes.toggleActiveProfile,
      content: 'Click to toggle whether the profile is active or not.',
      hidden: numWeaponProfiles <= 0,
    },
    {
      className: helpTargets.classes.weaponProfile,
      content: 'Click to edit the weapon profile.',
      hidden: numWeaponProfiles <= 0,
    },
    {
      className: helpTargets.classes.weaponProfileControls,
      content: 'Open the menu to perform actions on the weapon profile (e.g: Copy, Delete)',
      hidden: numWeaponProfiles <= 0,
    },
    {
      id: helpTargets.ids.importExport,
      content: 'You can export (save) this unit to your device, as well as, import previously saved units.',
    },
    {
      id: helpTargets.ids.unitDialogActions,
      content: 'Save or discard the changes you have made to the unit.',
    },
  ])

export default getSteps
