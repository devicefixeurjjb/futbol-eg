from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from contextlib import asynccontextmanager
import os
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifespan events for startup and shutdown"""
    # Startup
    print("🚀 Starting Fútbol EG API")
    print(f"Environment: {os.getenv('APP_ENV', 'development')}")
    yield
    # Shutdown
    print("🛑 Shutting down Fútbol EG API")

app = FastAPI(
    title="Fútbol EG API",
    description="API oficial para resultados de fútbol de Guinea Ecuatorial",
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://futboleg.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security: Only trusted hosts
app.add_middleware(
    TrustedHostMiddleware,
    allowed_hosts=["localhost", "api.futboleg.com", "*.futboleg.com"]
)

@app.get("/")
async def root():
    return {
        "message": "Bienvenido a la API de Fútbol Guinea Ecuatorial",
        "version": "1.0.0",
        "timestamp": datetime.now().isoformat(),
        "docs": "/docs",
        "health": "/health",
        "endpoints": {
            "matches": "/api/v1/matches",
            "teams": "/api/v1/teams",
            "live": "/api/v1/live",
            "stats": "/api/v1/stats"
        }
    }

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "futbol-eg-api",
        "timestamp": datetime.now().isoformat(),
        "version": "1.0.0"
    }

@app.get("/api/v1/matches")
async def get_matches():
    """Get all matches"""
    return {
        "matches": [
            {
                "id": 1,
                "home_team": "Canon Sportif",
                "away_team": "Sony de Elá Nguema",
                "home_score": 2,
                "away_score": 1,
                "status": "live",
                "minute": "67'",
                "league": "Primera División",
                "venue": "Estadio de Malabo",
                "date": "2024-01-15T16:00:00"
            }
        ]
    }

@app.get("/api/v1/matches/{match_id}")
async def get_match(match_id: int):
    """Get specific match details"""
    return {
        "id": match_id,
        "home_team": "Canon Sportif", @app.get("/api/v1/matches/{match_id}")
async def get_match(match_id: int):
    """Get specific match details"""
    return {
        "id": match_id,
        "home_team": "Canon Sportif",
        "away_team": "Sony de Elá Nguema",
        "home_score": 2,
        "away_score": 1,
        "status": "live",
        "minute": "67'",
        "league": "Primera División",
        "venue": "Estadio de Malabo",
        "date": "2024-01-15T16:00:00",
        "events": [
            {"minute": "15'", "type": "goal", "player": "Juan Esono", "team": "home"},
            {"minute": "42'", "type": "goal", "player": "José Obama", "team": "away"},
            {"minute": "55'", "type": "goal", "player": "Pedro Mbá", "team": "home"}
        ]
    }

@app.get("/api/v1/teams")
async def get_teams():
    """Get all teams"""
    return {
        "teams": [
            {"id": 1, "name": "Canon Sportif", "city": "Malabo", "stadium": "Estadio de Malabo"},
            {"id": 2, "name": "Sony de Elá Nguema", "city": "Malabo", "stadium": "Estadio de Malabo"},
            {"id": 3, "name": "Deportivo Unidad", "city": "Bata", "stadium": "Estadio de Bata"},
            {"id": 4, "name": "Dragón FC", "city": "Ebebiyín", "stadium": "Campo de Ebebiyín"},
            {"id": 5, "name": "Atlético Semu", "city": "Mongomo", "stadium": "Estadio de Mongomo"},
            {"id": 6, "name": "Akonangui FC", "city": "Evinayong", "stadium": "Campo de Evinayong"},
            {"id": 7, "name": "Leones Vegetarianos", "city": "Mbini", "stadium": "Campo de Mbini"},
            {"id": 8, "name": "Estrellas de Evinayong", "city": "Evinayong", "stadium": "Campo de Evinayong"}
        ]
    }

@app.get("/api/v1/standings")
async def get_standings():
    """Get league standings"""
    return {
        "league": "Primera División 2024",
        "standings": [
            {"position": 1, "team": "Canon Sportif", "points": 29, "played": 12},
            {"position": 2, "team": "Sony de Elá Nguema", "points": 27, "played": 12},
            {"position": 3, "team": "Deportivo Unidad", "points": 24, "played": 12},
            {"position": 4, "team": "Dragón FC", "points": 22, "played": 12},
            {"position": 5, "team": "Atlético Semu", "points": 20, "played": 12},
            {"position": 6, "team": "Akonangui FC", "points": 18, "played": 12},
            {"position": 7, "team": "Leones Vegetarianos", "points": 16, "played": 12},
            {"position": 8, "team": "Estrellas de Evinayong", "points": 14, "played": 12}
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )