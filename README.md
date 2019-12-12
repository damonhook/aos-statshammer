# Age of Sigmar Statshammer

A tool for caclulating and comparing damage outputs for Warhammer Age of Sigmar units.

The tool works by adding a number of weapon profiles to various units, which can contain
a number of modifiers (abilities)

## Feature Checklist

### Interface

* [x] Basic Desktop interface
* [x] Basic Mobile interface
* [ ] Swipe to delete
* [x] Long Press for context menu
* Snackbars for deleting
  * [x] Basic
  * [ ] With undo
* Error messages for API
  * [ ] Basic
  * [ ] With tap to retry
* [ ] Move modifier selector to dialog on mobile

### Units

* [x] Add / Delete Unit
* [x] Copy Unit
* [x] Add / Edit / Delete Weapon Profile
* [x] Copy Weapon Profile
* Import / Export Import Units
  * [x] Desktop
  * [ ] Mobile

### Modifiers

* [x] Profile Modifiers
* Modifier List
  * [x] Reroll Ones
  * [x] Reroll Failed
  * [x] Reroll All
  * [x] Bonus
  * [x] Leader Extra Attacks
  * [x] Exploding
  * [x] Mortal Wounds
* [ ] Unit Modifiers
* [ ] Target Modifiers

### Stats

* [x] Table View
* [x] Line Graph
* [x] Bar Graph
* [x] Radar Graph
* [ ] Unit Point Values (and per point stats)
* [ ] Export results to PDF

### Other

* [x] Deploy to Heroku
* [x] Footer with disclaimer
* [ ] Write Unit State to URL
* [x] Use Router to close Dialogs with back button
* [x] Add Dice values as an option for relevant inputs
