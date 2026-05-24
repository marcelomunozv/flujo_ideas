import { useState, useEffect } from 'react'
import type { Idea, IdeaStatus } from '../types'
import { STATUS_LABELS } from '../types'

interface IdeaModalProps {
  idea?: Idea | null
  onClose: () => void
  onSave: (data: {
    title: string
    description: string
    status: IdeaStatus
    tags: string[]
  }) => void
  onDelete?: () => void
}

export default function IdeaModal({ idea, onClose, onSave, onDelete }: IdeaModalProps) {
  const [title, setTitle] = useState(idea?.title ?? '')
  const [description, setDescription] = useState(idea?.description ?? '')
  const [status, setStatus] = useState<IdeaStatus>(idea?.status ?? 'SEED')
  const [tagsInput, setTagsInput] = useState(idea?.tags.join(', ') ?? '')

  useEffect(() => {
    if (idea) {
      setTitle(idea.title)
      setDescription(idea.description ?? '')
      setStatus(idea.status)
      setTagsInput(idea.tags.join(', '))
    }
  }, [idea])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    onSave({
      title: title.trim(),
      description: description.trim(),
      status,
      tags: tagsInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    })
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={onClose}>
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-4">
          {idea ? 'Editar idea' : 'Nueva idea'}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Título de la idea"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            autoFocus
          />
          <textarea
            placeholder="Descripción (opcional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          />
          <div className="flex gap-4">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as IdeaStatus)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {Object.entries(STATUS_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Tags (separados por coma)"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex justify-between pt-2">
            <div>
              {idea && onDelete && (
                <button
                  type="button"
                  onClick={onDelete}
                  className="text-red-500 text-sm hover:text-red-700"
                >
                  Eliminar
                </button>
              )}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-800"
              >
                {idea ? 'Guardar' : 'Crear'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
