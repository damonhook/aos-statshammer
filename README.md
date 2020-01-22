# Age of Sigmar Statshammer

A tool for caclulating and comparing damage outputs for Warhammer Age of Sigmar units.

The production deploy of the tool is located at: https://aos-statshammer.herokuapp.com/

The tool works by adding a number of weapon profiles to various units, which can contain
a number of modifiers (abilities)

## Features

- Ability to add multiple units, each with multiple profiles
- The API will then determine the average damage per target save
- Includes a results table and various graphs
- Dark theme
- Persisitent data between refreshes
- Import/Export of unit data
- Ability to export results as PDF
- Ability to add modifiers to the target (e.g: Reroll saves, ethereal, FNP, etc.)

## Roadmap Features

- Ability to add modifiers to the unit as a whole, and not just to each profile
- Ability to provide points costs to provide stats for average damage / 100 points

## Installation

Ensure that you have `node`, `yarn`, and `nodedeamon` installed.

Install the packages needed for the express server (backend) and the client (frontend)

```bash
yarn setup
```

## Usage

### `yarn dev`

Runs the app in development mode (launches both the express server, and the react frontend).

Open http://localhost:3000 to view it in the browser

### `yarn test`

Runs the api tests. Please make sure you run this whenever you make any changes to the api / backend

### Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

If you make any changes to the API. Please ensure that you have run the unit tests. In addition, if you have added extra functionality to the API (e.g: a new modifier), please add a unit test to the `api/tests/test.units.ts` file that contains this new functionality
