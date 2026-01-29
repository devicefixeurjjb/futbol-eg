'use client';

import { useState, useEffect } from 'react';
import { Clock, Users, MapPin } from 'lucide-react';

const mockLiveMatches = [
  {
    id: 1,
    homeTeam: 'Canon Sportif',
    awayTeam: 'Sony de Elá Nguema',
    homeScore: 2,
    awayScore: 1,
    minute: '67\'',
    status: 'live',
    league: 'Primera División',
    venue: 'Estadio de Malabo',
    events: [
      { minute: '15\'', type: 'goal', player: 'Juan Esono', team: 'home' },
      { minute: '42\'', type: 'goal', player: 'José Obama', team: 'away' },
      { minute: '55\'', type: 'goal', player: 'Pedro Mbá', team: 'home' },
    ],
  },
  {
    id: 2,
    homeTeam: 'Deportivo Unidad',
    awayTeam: 'Atlético Semu',
    homeScore: 0,
    awayScore: 0,
    minute: '23\'',
    status: 'live',
    league: 'Primera División',
    venue: 'Estadio de Bata',
    events: [],
  },
  {
    id: 3,
    homeTeam: 'Dragón FC',
    awayTeam: 'Akonangui FC',
    homeScore: 1,
    awayScore: 3,
    minute: '89\'',
    status: 'live',
    league: 'Segunda División',
    venue: 'Campo de Ebebiyín',
    events: [
      { minute: '12\'', type: 'goal', player: 'Martín Nsue', team: 'away' },
      { minute: '34\'', type: 'goal', player: 'Carlos Nvé', team: 'home' },
      { minute: '45\'', type: 'goal', player: 'Luis Ondó', team: 'away' },
      { minute: '78\'', type: 'goal', player: 'Francisco Mbá', team: 'away' },
    ],
  },
];

export default function LiveMatches() {
  const [matches, setMatches] = useState(mockLiveMatches);
  const [time, setTime] = useState(new Date());

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
      // In a real app, this would fetch from WebSocket
      setMatches(prev => prev.map(match => ({
        ...match,
        minute: match.status === 'live' 
          ? `${(parseInt(match.minute) + 1)}'` 
          : match.minute
      })));
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <span className="font-bold">EN VIVO AHORA</span>
        </div>
        <div className="text-sm text-gray-500">
          Actualizado: {time.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {/* Matches List */}
      <div className="space-y-4">
        {matches.map((match) => (
          <div key={match.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            {/* Match Header */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-green-700 bg-green-50 px-3 py-1 rounded-full">
                {match.league}
              </span>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock size={14} />
                <span className="font-bold">{match.minute}</span>
                <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">
                  EN VIVO
                </span>
              </div>
            </div>

            {/* Teams and Score */}
            <div className="flex items-center justify-between mb-4">
              <div className="text-center flex-1">
                <div className="font-bold text-lg">{match.homeTeam}</div>
                <div className="text-sm text-gray-500 mt-1">Local</div>
              </div>
              
              <div className="mx-6">
                <div className="flex items-center space-x-6">
                  <div className="text-3xl font-bold">{match.homeScore}</div>
                  <div className="text-gray-400">-</div>
                  <div className="text-3xl font-bold">{match.awayScore}</div>
                </div>
                <div className="text-xs text-gray-500 text-center mt-2">Marcador</div>
              </div>
              
              <div className="text-center flex-1">
                <div className="font-bold text-lg">{match.awayTeam}</div>
                <div className="text-sm text-gray-500 mt-1">Visitante</div>
              </div>
            </div>

            {/* Match Details */}
            <div className="flex items-center justify-between text-sm text-gray-600 border-t pt-3">
              <div className="flex items-center space-x-1">
                <MapPin size={14} />
                <span>{match.venue}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users size={14} />
                <span>{match.events.length} eventos</span>
              </div>
            </div>

            {/* Events Timeline */}
            {match.events.length > 0 && (
              <div className="mt-4 pt-3 border-t">
                <div className="text-sm font-medium text-gray-700 mb-2">Eventos del partido:</div>
                <div className="space-y-1">
                  {match.events.map((event, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <span className="text-gray-500">{event.minute}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        event.type === 'goal' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {event.type === 'goal' ? '⚽ Gol' : '🟨 Tarjeta'}
                      </span>
                      <span className="font-medium">{event.player}</span>
                      <span className="text-gray-500">({event.team === 'home' ? match.homeTeam : match.awayTeam})</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* No Live Matches */}
      {matches.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
          <div className="text-gray-400 mb-2">No hay partidos en vivo en este momento</div>
          <div className="text-sm text-gray-500">El próximo partido comienza a las 16:30</div>
        </div>
      )}
    </div>
  );
}