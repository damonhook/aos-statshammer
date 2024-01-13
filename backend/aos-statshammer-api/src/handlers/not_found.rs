use crate::models::ApiError;
use axum::http::StatusCode;

pub async fn not_found() -> ApiError {
    ApiError::new(StatusCode::NOT_FOUND, "Not found")
}
