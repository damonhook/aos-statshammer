use axum::{
    http::StatusCode,
    response::{IntoResponse, Response},
    Json,
};
use core::fmt;
use serde::Serialize;

#[derive(Debug, Serialize, utoipa::ToResponse)]
pub struct ApiErrorResponse {
    status_code: u16,
    message: String,
}

#[derive(Debug)]
pub struct ApiError {
    status: StatusCode,
    message: String,
}

impl ApiError {
    pub fn new(status: StatusCode, message: &str) -> Self {
        Self {
            status: status.into(),
            message: message.to_string(),
        }
    }

    pub fn server_error(message: &str) -> Self {
        Self::new(StatusCode::INTERNAL_SERVER_ERROR, message)
    }
}

impl fmt::Display for ApiError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}: {}", self.status, self.message)
    }
}

impl IntoResponse for ApiError {
    fn into_response(self) -> Response {
        let body = ApiErrorResponse {
            status_code: self.status.as_u16(),
            message: format!("{}", self.message),
        };
        (self.status, Json(body)).into_response()
    }
}

impl<E> From<E> for ApiError
where
    E: Into<anyhow::Error>,
{
    fn from(err: E) -> Self {
        Self::server_error(&format!("{}", err.into()))
    }
}

macro_rules! api_error {
    ($msg: literal $(,)?) => {
        return Err(ApiError::server_error($msg))
    };
    ($status: expr, $msg: literal $(,)?) => {
        return Err(ApiError::new($status, $msg))
    };
}
pub(crate) use api_error;
