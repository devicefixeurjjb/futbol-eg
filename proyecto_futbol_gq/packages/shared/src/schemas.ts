import { z } from 'zod';

export const TeamSchema = z.object({
  id: z.number(),
  name: z.string().min(2).max(50),
  shortName: z.string().max(10).optional(),
  city: z.string().min(2).max(50),
  stadium: z.string().min(2).max(100),
  founded: z.number().min(1800).max(2100).optional(),
  colors: z.array(z.string()).optional(),
  logo: z.string().url().optional(),
});

export const MatchEventSchema = z.object({
  minute: z.string().regex(/^\d{1,3}'$/),
  type: z.enum(['goal', 'yellow_card', 'red_card', 'substitution', 'penalty', 'own_goal', 'injury']),
  player: z.string().min(2).max(50),
  playerId: z.number().optional(),
  team: z.enum(['home', 'away']),
  description: z.string().optional(),
  assist: z.string().optional(),
});

export const MatchSchema = z.object({
  id: z.number(),
  homeTeam: TeamSchema,
  awayTeam: TeamSchema,
  homeScore: z.number().min(0),
  awayScore: z.number().min(0),
  status: z.enum(['scheduled', 'live', 'halftime', 'finished', 'postponed', 'cancelled']),
  minute: z.string().optional(),
  league: z.string().min(2).max(50),
  venue: z.string().min(2).max(100),
  date: z.string().datetime(),
  events: z.array(MatchEventSchema).default([]),
  attendance: z.number().optional(),
  referee: z.string().optional(),
});

export const LiveUpdateSchema = z.object({
  matchId: z.number(),
  homeScore: z.number().min(0),
  awayScore: z.number().min(0),
  minute: z.string(),
  status: z.enum(['scheduled', 'live', 'halftime', 'finished']),
  event: MatchEventSchema.optional(),
  timestamp: z.string().datetime(),
});

export const LeagueStandingSchema = z.object({
  position: z.number().min(1),
  team: TeamSchema,
  played: z.number().min(0),
  won: z.number().min(0),
  drawn: z.number().min(0),
  lost: z.number().min(0),
  goalsFor: z.number().min(0),
  goalsAgainst: z.number().min(0),
  goalDifference: z.number(),
  points: z.number().min(0),
  form: z.array(z.enum(['W', 'D', 'L'])).optional(),
});