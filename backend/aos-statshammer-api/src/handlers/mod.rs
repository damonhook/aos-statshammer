mod not_found;
use axum::Json;
pub use not_found::*;

mod average;
pub use average::*;

use serde::Serialize;

#[derive(Debug, Serialize)]
pub struct ApiStatus {
    status: String
}

pub async fn status() -> Json<ApiStatus> {
    Json(ApiStatus {status: "ok".to_string()})
}
