export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-green-600 p-2 rounded-lg">
                <span className="text-xl">⚽</span>
              </div>
              <span className="text-xl font-bold">Fútbol EG</span>
            </div>
            <p className="text-gray-400 text-sm">
              Plataforma oficial de seguimiento del fútbol ecuatoguineano.
              Resultados en tiempo real, estadísticas y análisis.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li><a href="/live" className="text-gray-400 hover:text-white">Partidos en Vivo</a></li>
              <li><a href="/matches" className="text-gray-400 hover:text-white">Calendario</a></li>
              <li><a href="/teams" className="text-gray-400 hover:text-white">Equipos</a></li>
              <li><a href="/stats" className="text-gray-400 hover:text-white">Estadísticas</a></li>
              <li><a href="/news" className="text-gray-400 hover:text-white">Noticias</a></li>
            </ul>
          </div>

          {/* Leagues */}
          <div>
            <h3 className="text-lg font-bold mb-4">Ligas</h3>
            <ul className="space-y-2">
              <li><a href="/league/1" className="text-gray-400 hover:text-white">Primera División</a></li>
              <li><a href="/league/2" className="text-gray-400 hover:text-white">Segunda División</a></li>
              <li><a href="/league/3" className="text-gray-400 hover:text-white">Copa Nacional</a></li>
              <li><a href="/league/4" className="text-gray-400 hover:text-white">Selección Nacional</a></li>
              <li><a href="/league/5" className="text-gray-400 hover:text-white">Fútbol Femenino</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contacto</h3>
            <ul className="space-y-2 text-gray-400">
              <li>contacto@futboleg.com</li>
              <li>+240 222 333 444</li>
              <li>Malabo, Guinea Ecuatorial</li>
            </ul>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
              <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Fútbol Guinea Ecuatorial. Todos los derechos reservados.</p>
          <p className="mt-2">
            <a href="/privacy" className="hover:text-white">Política de Privacidad</a> • 
            <a href="/terms" className="hover:text-white ml-2">Términos de Servicio</a>
          </p>
        </div>
      </div>
    </footer>
  )
}