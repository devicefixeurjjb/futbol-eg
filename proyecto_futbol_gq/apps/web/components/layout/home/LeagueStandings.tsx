const standings = [
  { position: 1, team: 'Canon Sportif', played: 12, won: 9, drawn: 2, lost: 1, goalsFor: 28, goalsAgainst: 10, points: 29 },
  { position: 2, team: 'Sony de Elá Nguema', played: 12, won: 8, drawn: 3, lost: 1, goalsFor: 25, goalsAgainst: 12, points: 27 },
  { position: 3, team: 'Deportivo Unidad', played: 12, won: 7, drawn: 3, lost: 2, goalsFor: 22, goalsAgainst: 11, points: 24 },
  { position: 4, team: 'Dragón FC', played: 12, won: 6, drawn: 4, lost: 2, goalsFor: 20, goalsAgainst: 15, points: 22 },
  { position: 5, team: 'Atlético Semu', played: 12, won: 5, drawn: 5, lost: 2, goalsFor: 18, goalsAgainst: 14, points: 20 },
  { position: 6, team: 'Akonangui FC', played: 12, won: 5, drawn: 3, lost: 4, goalsFor: 16, goalsAgainst: 15, points: 18 },
  { position: 7, team: 'Leones Vegetarianos', played: 12, won: 4, drawn: 4, lost: 4, goalsFor: 15, goalsAgainst: 16, points: 16 },
  { position: 8, team: 'Estrellas de Evinayong', played: 12, won: 3, drawn: 5, lost: 4, goalsFor: 14, goalsAgainst: 18, points: 14 },
];

export default function LeagueStandings() {
  return (
    <div>
      {/* League Selector */}
      <div className="mb-4">
        <select className="w-full p-2 border border-gray-300 rounded-lg">
          <option value="1">Primera División 2024</option>
          <option value="2">Segunda División</option>
          <option value="3">Copa Nacional</option>
        </select>
      </div>

      {/* Standings Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">#</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Equipo</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">PJ</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">PG</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">PE</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">PP</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">GF</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">GC</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">DG</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pts</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {standings.map((team) => (
              <tr key={team.position} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm">
                  <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${
                    team.position <= 2 ? 'bg-green-100 text-green-800' :
                    team.position === 3 ? 'bg-blue-100 text-blue-800' :
                    team.position >= 7 ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {team.position}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{team.team}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{team.played}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{team.won}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{team.drawn}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{team.lost}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{team.goalsFor}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{team.goalsAgainst}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{team.goalsFor - team.goalsAgainst}</td>
                <td className="px-4 py-3 text-sm font-bold text-gray-900">{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-4 text-xs">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-green-100 rounded"></div>
          <span>Clasifica a Champions League CAF</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-blue-100 rounded"></div>
          <span>Clasifica a Confederation Cup</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-red-100 rounded"></div>
          <span>Descenso</span>
        </div>
      </div>
    </div>
  );
}