import { useState, useEffect, useCallback } from 'react'
import type { Idea, IdeaStatus } from '../types'
import { STATUS_LABELS, STATUS_COLORS } from '../types'
import { fetchIdeas, updateIdea, createIdea, deleteIdea } from '../api/ideas'
import IdeaModal from '../components/IdeaModal'

export default function ListPage() {
  const [ideas, setIdeas] = useState<Idea[]>([])
  const [filterStatus, setFilterStatus] = useState<IdeaStatus | ''>('')
  const [searchQuery, setSearchQuery] = useState('')
  const [modalIdea, setModalIdea] = useState<Idea | null | undefined>(undefined)
  const [showModal, setShowModal] = useState(false)

  const loadIdeas = useCallback(async () => {
    const params: { status?: IdeaStatus; q?: string } = {}
    if (filterStatus) params.status = filterStatus as IdeaStatus
    if (searchQuery) params.q = searchQuery
    const data = await fetchIdeas(params)
    setIdeas(data)
  }, [filterStatus, searchQuery])

  useEffect(() => {
    loadIdeas()
  }, [loadIdeas])

  const handleSave = async (data: {
    title: string
    description: string
    status: IdeaStatus
    tags: string[]
  }) => {
    if (modalIdea) {
      await updateIdea(modalIdea.id, data)
    } else {
      await createIdea(data)
    }
    setShowModal(false)
    setModalIdea(undefined)
    await loadIdeas()
  }

  const handleDelete = async () => {
    if (modalIdea) {
      await deleteIdea(modalIdea.id)
      setShowModal(false)
      setModalIdea(undefined)
      await loadIdeas()
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Lista</h2>
        <button
          onClick={() => {
            setModalIdea(null)
            setShowModal(true)
          }}
          className="px-4 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-800"
        >
          + Nueva idea
        </button>
      </div>

      <div className="flex gap-3 mb-4">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as IdeaStatus | '')}
          className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm"
        >
          <option value="">Todos los estados</option>
          {Object.entries(STATUS_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Buscar por título..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm w-64"
        />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {ideas.length === 0 ? (
          <p className="text-gray-400 text-sm p-6 text-center">No hay ideas</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-4 py-3 font-medium text-gray-500">Título</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Estado</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Tags</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Creado</th>
              </tr>
            </thead>
            <tbody>
              {ideas.map((idea) => (
                <tr
                  key={idea.id}
                  className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    setModalIdea(idea)
                    setShowModal(true)
                  }}
                >
                  <td className="px-4 py-3 font-medium">{idea.title}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block text-xs px-2 py-0.5 rounded-full border ${STATUS_COLORS[idea.status]}`}
                    >
                      {STATUS_LABELS[idea.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {idea.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-xs">
                    {new Date(idea.createdAt).toLocaleDateString('es-CL')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <IdeaModal
          idea={modalIdea}
          onClose={() => {
            setShowModal(false)
            setModalIdea(undefined)
          }}
          onSave={handleSave}
          onDelete={modalIdea ? handleDelete : undefined}
        />
      )}
    </div>
  )
}
