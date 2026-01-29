from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from enum import Enum

class MatchStatus(str, Enum):
    SCHEDULED = "scheduled"
    LIVE = "live"
    HALFTIME = "halftime"
    FINISHED = "finished"
    POSTPONED = "postponed"
    CANCELLED = "cancelled"

class EventType(str, Enum):
    GOAL = "goal"
    YELLOW_CARD = "yellow_card"
    RED_CARD = "red_card"
    SUBSTITUTION = "substitution"
    PENALTY = "penalty"
    OWN_GOAL = "own_goal"

class Event(BaseModel):
    minute: str
    type: EventType
    player: str
    team: str
    description: Optional[str] = None

class Team(BaseModel):
    id: int
    name: str
    short_name: Optional[str] = None
    city: str
    stadium: str
    founded: Optional[int] = None
    colors: Optional[List[str]] = None

class MatchCreate(BaseModel):
    home_team_id: int
    away_team_id: int
    league_id: int
    date: datetime
    venue: str
    referee: Optional[str] = None

class MatchUpdate(BaseModel):
    home_score: Optional[int] = None
    away_score: Optional[int] = None
    status: Optional[MatchStatus] = None
    minute: Optional[str] = None
    events: Optional[List[Event]] = None

class MatchResponse(BaseModel):
    id: int
    home_team: Team
    away_team: Team
    home_score: int = 0
    away_score: int = 0
    status: MatchStatus
    minute: Optional[str] = None
    league: str
    venue: str
    date: datetime
    events: List[Event] = []
    attendance: Optional[int] = None
    referee: Optional[str] = None
    
    class Config:
        from_attributes = True

class LiveMatchUpdate(BaseModel):
    match_id: int
    home_score: int
    away_score: int
    minute: str
    status: MatchStatus
    event: Optional[Event] = None