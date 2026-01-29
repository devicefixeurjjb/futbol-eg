import * as React from 'react';
import { cn } from '../lib/utils';
import { Clock, MapPin, Users } from 'lucide-react';

interface MatchCardProps {
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  minute?: string;
  status: 'scheduled' | 'live' | 'finished' | 'postponed';
  league: string;
  venue: string;
  date?: string;
  className?: string;
}

const MatchCard: React.FC<MatchCardProps> = ({
  homeTeam,
  awayTeam,
  homeScore = 0,
  awayScore = 0,
  minute,
  status,
  league,
  venue,
  date,
  className,
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'live': return 'bg-red-500';
      case 'finished': return 'bg-green-500';
      case 'postponed': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'live': return 'EN VIVO';
      case 'finished': return 'FINALIZADO';
      case 'postponed': return 'APLAZADO';
      default: return 'PROGRAMADO';
    }
  };

  return (
    <div className={cn(
      'border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow',
      className
    )}>
      {/* League */}
      <div className="text-sm font-medium text-green-700 bg-green-50 px-3 py-1 rounded-full inline-block mb-4">
        {league}
      </div>

      {/* Teams and Score */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-center flex-1">
          <div className="font-bold text-xl">{homeTeam}</div>
          <div className="text-sm text-gray-500 mt-1">Local</div>
        </div>
        
        <div className="mx-8">
          {status === 'scheduled' ? (
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-700">
                {date ? new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'}
              </div>
              <div className="text-xs text-gray-500 mt-1">Inicio</div>
            </div>
          ) : (
            <>
              <div className="flex items-center space-x-8">
                <div className="text-4xl font-bold">{homeScore}</div>
                <div className="text-gray-400 text-2xl">-</div>
                <div className="text-4xl font-bold">{awayScore}</div>
              </div>
              <div className="text-xs text-gray-500 text-center mt-2">Marcador</div>
            </>
          )}
        </div>
        
        <div className="text-center flex-1">
          <div className="font-bold text-xl">{awayTeam}</div>
          <div className="text-sm text-gray-500 mt-1">Visitante</div>
        </div>
      </div>

      {/* Status and Details */}
      <div className="flex items-center justify-between pt-4 border-t">
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${getStatusColor()}`}></div>
          <span className="text-sm font-medium">{getStatusText()}</span>
          {minute && (
            <>
              <Clock size={14} className="text-gray-400" />
              <span className="text-sm text-gray-600">{minute}</span>
            </>
          )}
        </div>
        
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <MapPin size={14} />
            <span>{venue}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { MatchCard };