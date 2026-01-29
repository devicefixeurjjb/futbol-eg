export type MatchStatus = 
  | 'scheduled' 
  | 'live' 
  | 'halftime' 
  | 'finished' 
  | 'postponed' 
  | 'cancelled';

export type EventType = 
  | 'goal' 
  | 'yellow_card' 
  | 'red_card' 
  | 'substitution' 
  | 'penalty' 
  | 'own_goal' 
  | 'injury';

export interface Team {
  id: number;
  name: string;
  shortName?: string;
  city: string;
  stadium: string;
  founded?: number;
  colors?: string[];
  logo?: string;
}

export interface Player {
  id: number;
  name: string;
  number: number;
  position: string;
  nationality: string;
  dateOfBirth: string;
  teamId: number;
}

export interface MatchEvent {
  minute: string;
  type: EventType;
  player: string;
  playerId?: number;
  team: 'home' | 'away';
  description?: string;
  assist?: string;
}

export interface Match {
  id: number;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
  status: MatchStatus;
  minute?: string;
  league: string;
  venue: string;
  date: string;
  events: MatchEvent[];
  attendance?: number;
  referee?: string;
}

export interface LeagueStanding {
  position: number;
  team: Team;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  form?: string[]; // Last 5 matches: 'W', 'D', 'L'
}

export interface LiveUpdate {
  matchId: number;
  homeScore: number;
  awayScore: number;
  minute: string;
  status: MatchStatus;
  event?: MatchEvent;
  timestamp: string;
}

export interface SocketEvent {
  type: 'match_update' | 'commentary' | 'server_stats' | 'error';
  data: any;
  timestamp: string;
}