'use client';

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Bell, User, Search } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-green-600 text-white p-2 rounded-lg">
              <span className="text-2xl font-bold">⚽</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Fútbol EG</h1>
              <p className="text-xs text-gray-500">Resultados en tiempo real</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="font-medium text-gray-700 hover:text-green-600">
              Inicio
            </Link>
            <Link href="/live" className="font-medium text-gray-700 hover:text-green-600">
              En Vivo
            </Link>
            <Link href="/matches" className="font-medium text-gray-700 hover:text-green-600">
              Partidos
            </Link>
            <Link href="/teams" className="font-medium text-gray-700 hover:text-green-600">
              Equipos
            </Link>
            <Link href="/stats" className="font-medium text-gray-700 hover:text-green-600">
              Estadísticas
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-green-600">
              <Search size={20} />
            </button>
            <button className="p-2 text-gray-600 hover:text-green-600 relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </button>
            <button className="hidden md:flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
              <User size={18} />
              <span>Iniciar Sesión</span>
            </button>
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-3">
              <Link href="/" className="py-2 text-gray-700 hover:text-green-600">
                Inicio
              </Link>
              <Link href="/live" className="py-2 text-gray-700 hover:text-green-600">
                En Vivo
              </Link>
              <Link href="/matches" className="py-2 text-gray-700 hover:text-green-600">
                Partidos
              </Link>
              <Link href="/teams" className="py-2 text-gray-700 hover:text-green-600">
                Equipos
              </Link>
              <Link href="/stats" className="py-2 text-gray-700 hover:text-green-600">
                Estadísticas
              </Link>
              <div className="pt-2 border-t">
                <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                  Iniciar Sesión
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}