use aos_statshammer::{
    abilities as ab, Characteristic as C, ModelGroup, Phase as P, Target, Unit, Weapon, D6,
};
use criterion::{black_box, criterion_group, criterion_main, Criterion};

mod units {
    use super::*;

    pub fn basic_unit() -> Unit {
        Unit::new("Basic Unit".to_string())
            .add_model_group(ModelGroup::new(10, Weapon::new(2, 3, 4, 1, 1)))
    }

    pub fn medium_unit() -> Unit {
        Unit::new("Medium Unit".to_string())
            .add_model_group(
                ModelGroup::new(9, Weapon::new(2, 3, 4, 0, 1))
                    .with_leader(1, ab::Bonus::new(C::Attacks, 1)),
            )
            .add_model_group(ModelGroup::new(1, Weapon::new(2, 3, 3, 1, 1)))
    }

    pub fn complex_unit() -> Unit {
        Unit::new("Complex Unit".to_string())
            .add_model_group(ModelGroup::new(
                2,
                Weapon::new(2, 3, 4, 1, D6).with_abilities([
                    ab::Reroll::new(P::Hit, ab::RerollType::Any).into(),
                    ab::Reroll::new(P::Wound, ab::RerollType::Any).into(),
                    ab::MortalWounds::new(P::Hit, 6, D6, true, true).into(),
                ]),
            ))
            .add_model_group(
                ModelGroup::new(
                    8,
                    Weapon::new(2, 3, 4, 1, 2).with_ability(ab::Exploding::new(P::Hit, 6, 1, true)),
                )
                .with_leader(1, ab::Bonus::new(C::Attacks, 1)),
            )
    }
}

fn benchmark_create(c: &mut Criterion) {
    let mut group = c.benchmark_group("Create Unit");
    group.bench_function("Basic Unit", |b| b.iter(|| units::basic_unit()));
    group.bench_function("Medium Unit", |b| b.iter(|| units::medium_unit()));
    group.bench_function("Complex Unit", |b| b.iter(|| units::complex_unit()));
}

fn benchmark_average(c: &mut Criterion) {
    let target = Target::new(4);
    let mut group = c.benchmark_group("Average Damage");
    group.bench_function("Basic Unit", |b| {
        b.iter(|| units::basic_unit().average_damage(black_box(&target)))
    });
    group.bench_function("Medium Unit", |b| {
        b.iter(|| units::medium_unit().average_damage(black_box(&target)))
    });
    group.bench_function("Complex Unit", |b| {
        b.iter(|| units::complex_unit().average_damage(black_box(&target)))
    });
}

criterion_group!(benches, benchmark_create, benchmark_average);
criterion_main!(benches);
