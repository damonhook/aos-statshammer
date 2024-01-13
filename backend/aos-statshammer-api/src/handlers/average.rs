use crate::models::{api_error, ApiError, ApiErrorResponse, Unit};
use aos_statshammer as lib;
use axum::{http::StatusCode, Json};
use serde::{Deserialize, Serialize};
use std::collections::{HashMap, HashSet};

#[derive(Debug, Deserialize, utoipa::ToSchema)]
pub struct UnitRequestBody {
    units: Vec<Unit>,
}

#[derive(Debug, Serialize, utoipa::ToSchema)]
pub struct AverageDamageResult {
    save: u8,
    values: HashMap<String, f64>,
}

#[derive(Debug, Serialize, utoipa::ToResponse)]
pub struct AverageDamageResponse {
    results: Vec<AverageDamageResult>,
}

fn validate_units(units: &[Unit]) -> Result<(), ApiError> {
    if units.last().is_none() {
        api_error!(StatusCode::BAD_REQUEST, "No units present");
    }
    let unique_names = units
        .iter()
        .map(|u| u.name.as_str())
        .collect::<HashSet<_>>();
    if unique_names.len() != units.len() {
        api_error!(StatusCode::BAD_REQUEST, "Duplicate unit names present");
    };
    Ok(())
}

#[utoipa::path(
    post,
    path="/average",
    request_body = UnitRequestBody,
    responses(
        (status=200, response=AverageDamageResponse),
        (status=400, response=ApiErrorResponse),
    ),
)]
pub async fn average_damage(
    Json(payload): Json<UnitRequestBody>,
) -> Result<Json<AverageDamageResponse>, ApiError> {
    validate_units(&payload.units)?;
    let units: Vec<lib::Unit> = payload.units.iter().map(lib::Unit::from).collect();
    println!("{:#?}", units);
    let results = (2..=7)
        .map(|save| {
            let target = lib::Target::new(save);
            let values = units
                .iter()
                .map(|unit| {
                    (
                        unit.name.to_owned(),
                        (unit.average_damage(&target) * 100.0).round() / 100.0,
                    )
                })
                .collect::<HashMap<_, _>>();
            AverageDamageResult { save, values }
        })
        .collect();
    Ok(Json(AverageDamageResponse { results }))
}
