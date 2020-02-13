# Overview
The simulations page runs **{numSim}** simulations per save (Total: **{totSim}**) and
uses the results to gather more advanced metrics. You can modify the number of simulations
you want to perform by clicking on the '`# Simulations: x`' button.

These extra analytics are split into the following **3 tabs**:

## Cumulative

- Cumulative Probability Graphs
  - I.e: What is the **%** chance that the unit will inflict **<= x** damage
    against a target with **y** save

## Discrete

- Discrete Probability Graphs
  - I.e: What is the **%** chance that the unit will inflict **exactly x** damage
    against a target with **y** save.
  - Note that there will only be data points for damage numbers that the unit can
    possibly inflict

## Metrics

- Sample Metrics Tables
  - Contains sample metrics for each **unit** against a target with **y** save:
    - Mean
    - Max
    - Variance
    - Standard Deviation
- Probability Tables
  - Contains the data that was used to generate the **Discrete Probability Graphs**
