A tool for calculating possible damage outputs for Warhammer Age of Sigmar units.

# High-level Features

- Create units containing groups of models with various weapons.
- Attach various abilities to weapons.
- Create targets for to measure units against (including target abilities).
- Calculate the average damage that unit would to against a specific target.
- Simulate an attack action that unit would perform against a specific target.

# Example

We are going to create a `Unit` to represent the following warscroll (with a unit size of 10)

---

**DESCRIPTION**

Each model in a Example unit is armed with a Sword. 1 in every 10 models can replace their
weapon with a Greatsword.

**WEAPONS**

**Sword**

| Attacks | To Hit | To Wound | Rend | Damage |
| ------- | ------ | -------- | ---- | ------ |
| 2       | 3+     | 4+       | -    | 2      |

**Greatsword**

| Attacks | To Hit | To Wound | Rend | Damage |
| ------- | ------ | -------- | ---- | ------ |
| 2       | 3+     | 4+       | -1   | 2      |

**Champion**

1 model in this unit can be a Champion. Add 1 to the Attacks
characteristic of that model's Sword.

**ABILITIES**

**Accurate Strikes**

Models armed with a Greatsword can reroll hit rolls of one.

---

```rust
use aos_statshammer::{
    abilities as ab,
    Characteristic as C,
    ModelGroup,
    Phase as P,
    Weapon,
    Unit
};

// create a basic weapon with no abilities
let sword = Weapon::new(2, 3, 4, 0, 1);
// create a weapon with rerolls to hit
let greatsword = Weapon::new(2, 3, 4, 1, 2).with_ability(
    ab::Reroll::new(P::Hit, ab::RerollType::Ones)
);

// create a new unit that uses this weapon
let unit = Unit::new("Example Unit".to_string())
    // have a single model in the unit with the special weapon (the Greatsword)
    .add_model_group(ModelGroup::new(1, greatsword))
    // have 9 other models in the unit with the basic weapon (the Sword),
    // with one of those models being the "leader" (with a bonus to its attacks characteristic)
    .add_model_group(ModelGroup::new(9, sword).with_leader(1, ab::Bonus::new(C::Attacks, 1)));
```

We can then perform calculations on this unit, for example, calculating the average damage it
would do to a unit with a 4+ save.

```rust
let _ = unit.average_damage(&Target::new(4));
```

We can also simulate an attack sequence for the unit against a target with a 4+ save.

```rust
let _ = unit.simulate_damage(&Target::new(4));
```