import LiveMatches from '@/components/home/LiveMatches'
import FeaturedMatches from '@/components/home/FeaturedMatches'
import LeagueStandings from '@/components/home/LeagueStandings'
import StatsOverview from '@/components/home/StatsOverview'

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          ⚽ Fútbol <span className="text-green-600">Guinea Ecuatorial</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Resultados, estadísticas y noticias en tiempo real del fútbol ecuatoguineano
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Live Matches */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6 text-green-800">
              🎯 Partidos en Vivo
            </h2>
            <LiveMatches />
          </section>

          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6 text-green-800">
              ⭐ Partidos Destacados
            </h2>
            <FeaturedMatches />
          </section>
        </div>

        {/* Right Column - Stats & Standings */}
        <div className="space-y-8">
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6 text-green-800">
              📊 Clasificación Liga
            </h2>
            <LeagueStandings />
          </section>

          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6 text-green-800">
              📈 Estadísticas
            </h2>
            <StatsOverview />
          </section>
        </div>
      </div>

      {/* Quick Stats Banner */}
      <div className="mt-12 bg-gradient-to-r from-green-900 to-green-700 text-white rounded-lg p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold">24</div>
            <div className="text-sm opacity-90">Equipos Activos</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">156</div>
            <div className="text-sm opacity-90">Partidos/Mes</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">3s</div>
            <div className="text-sm opacity-90">Actualización</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">100%</div>
            <div className="text-sm opacity-90">Cobertura</div>
          </div>
        </div>
      </div>
    </div>
  )
