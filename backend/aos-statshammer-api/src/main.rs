use axum::{routing::{get, post}, Router};
use std::env;
use tower::ServiceBuilder;
use tower_http::services::ServeDir;
use tower_http::trace::TraceLayer;
use tracing_subscriber::EnvFilter;
use utoipa::OpenApi;
use utoipa_rapidoc::RapiDoc;

mod handlers;
mod models;
mod serde_utils;

fn api_router() -> Router {
    Router::new()
        .route("/status", get(handlers::status))
        .route("/average", post(handlers::average_damage))
        .fallback(handlers::not_found)
}

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt()
        .with_env_filter(EnvFilter::from_default_env())
        .init();

    #[derive(OpenApi)]
    #[openapi(
        info(title = "AoS Statshammer API"),
        servers(
            (url="/api"),
        ),
        paths(handlers::average_damage),
        components(
            schemas(
                models::Unit, models::ModelGroup, models::Weapon,
                models::Ability, models::Characteristic, models::Phase,
                models::Bonus, models::Exploding,
                handlers::UnitRequestBody, handlers::AverageDamageResult,
            ),
            responses(models::ApiErrorResponse, handlers::AverageDamageResponse)
        )
    )]
    struct ApiDoc;

    let mut app = Router::new()
        .nest("/api", api_router())
        .layer(ServiceBuilder::new().layer(TraceLayer::new_for_http()));

    match env::var("ROLE") {
        Ok(v) if v.to_lowercase() == "dev" => {
            println!("API explorer available at /api/docs");
            app = app.merge(
                RapiDoc::with_openapi("/api/openapi.json", ApiDoc::openapi()).path("/api/docs"),
            );
        }
        _ => {
            println!("Serving static files");
            app = app.fallback_service(ServeDir::new("dist"));
        }
    }

    let listener = tokio::net::TcpListener::bind("127.0.0.1:8000")
        .await
        .unwrap();
    println!("Listening on {}", listener.local_addr().unwrap());
    axum::serve(listener, app).await.unwrap();
}
