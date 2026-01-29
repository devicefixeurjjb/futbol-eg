// Guinea Ecuatorial football constants
export const GE_LEAGUES = {
  FIRST_DIVISION: 'Primera División de Guinea Ecuatorial',
  SECOND_DIVISION: 'Segunda División',
  CUP: 'Copa de Guinea Ecuatorial',
  SUPER_CUP: 'Supercopa de Guinea Ecuatorial',
  WOMENS_LEAGUE: 'Liga Femenina',
} as const;

export const GE_TEAMS = [
  { id: 1, name: 'Canon Sportif', city: 'Malabo', stadium: 'Estadio de Malabo' },
  { id: 2, name: 'Sony de Elá Nguema', city: 'Malabo', stadium: 'Estadio de Malabo' },
  { id: 3, name: 'Deportivo Unidad', city: 'Bata', stadium: 'Estadio de Bata' },
  { id: 4, name: 'Dragón FC', city: 'Ebebiyín', stadium: 'Campo de Ebebiyín' },
  { id: 5, name: 'Atlético Semu', city: 'Mongomo', stadium: 'Estadio de Mongomo' },
  { id: 6, name: 'Akonangui FC', city: 'Evinayong', stadium: 'Campo de Evinayong' },
  { id: 7, name: 'Leones Vegetarianos', city: 'Mbini', stadium: 'Campo de Mbini' },
  { id: 8, name: 'Estrellas de Evinayong', city: 'Evinayong', stadium: 'Campo de Evinayong' },
  { id: 9, name: 'Nzalang Nacional', city: 'Guinea Ecuatorial', stadium: 'Estadio de Malabo' },
] as const;

export const MATCH_STATUS = {
  SCHEDULED: 'scheduled',
  LIVE: 'live',
  HALFTIME: 'halftime',
  FINISHED: 'finished',
  POSTPONED: 'postponed',
  CANCELLED: 'cancelled',
} as const;

export const EVENT_TYPES = {
  GOAL: 'goal',
  YELLOW_CARD: 'yellow_card',
  RED_CARD: 'red_card',
  SUBSTITUTION: 'substitution',
  PENALTY: 'penalty',
  OWN_GOAL: 'own_goal',
  INJURY: 'injury',
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  MATCHES: '/api/v1/matches',
  MATCH: (id: number) => `/api/v1/matches/${id}`,
  LIVE_MATCHES: '/api/v1/matches/live',
  TEAMS: '/api/v1/teams',
  TEAM: (id: number) => `/api/v1/teams/${id}`,
  STANDINGS: '/api/v1/standings',
  PLAYERS: '/api/v1/players',
  STATS: '/api/v1/stats',
} as const;

// Socket Events
export const SOCKET_EVENTS = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  SUBSCRIBE_MATCH: 'subscribe_match',
  UNSUBSCRIBE_MATCH: 'unsubscribe_match',
  MATCH_UPDATE: 'match_update',
  MATCH_EVENT: 'match_event',
  COMMENTARY: 'commentary',
  NEW_COMMENTARY: 'new_commentary',
  SERVER_STATS: 'server_stats',
  ERROR: 'error',
} as const;