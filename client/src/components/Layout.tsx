import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <h1 className="text-xl font-bold text-gray-800">Flujo</h1>
          <nav className="flex gap-4 text-sm">
            <Link
              to="/"
              className={`px-3 py-1 rounded transition-colors ${
                location.pathname === '/'
                  ? 'bg-gray-100 text-gray-900 font-medium'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              Board
            </Link>
            <Link
              to="/lista"
              className={`px-3 py-1 rounded transition-colors ${
                location.pathname === '/lista'
                  ? 'bg-gray-100 text-gray-900 font-medium'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              Lista
            </Link>
          </nav>
        </div>
        <input
          type="text"
          placeholder="Buscar ideas..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </header>
      <main className="flex-1 p-6">{children}</main>
    </div>
  )
}
