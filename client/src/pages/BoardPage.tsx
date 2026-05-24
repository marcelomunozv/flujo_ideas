import { useState, useEffect, useCallback } from 'react'
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
} from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import type { Idea, IdeaStatus } from '../types'
import { fetchIdeas, updateIdea, createIdea, deleteIdea } from '../api/ideas'
import Column from '../components/Column'
import IdeaCard from '../components/IdeaCard'
import IdeaModal from '../components/IdeaModal'

const COLUMNS: IdeaStatus[] = ['SEED', 'ACTIVE', 'MATURE', 'ARCHIVED']

export default function BoardPage() {
  const [ideas, setIdeas] = useState<Idea[]>([])
  const [activeIdea, setActiveIdea] = useState<Idea | null>(null)
  const [modalIdea, setModalIdea] = useState<Idea | null | undefined>(undefined)
  const [showModal, setShowModal] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const loadIdeas = useCallback(async () => {
    const data = await fetchIdeas()
    setIdeas(data)
  }, [])

  useEffect(() => {
    loadIdeas()
  }, [loadIdeas])

  const grouped = COLUMNS.map((status) => ({
    status,
    ideas: ideas.filter((i) => i.status === status),
  }))

  const handleDragStart = (event: DragStartEvent) => {
    const idea = ideas.find((i) => i.id === event.active.id)
    if (idea) setActiveIdea(idea)
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    setActiveIdea(null)
    const { active, over } = event
    if (!over) return

    const ideaId = active.id as string
    const targetStatus = over.id as IdeaStatus

    if (COLUMNS.includes(targetStatus)) {
      const idea = ideas.find((i) => i.id === ideaId)
      if (idea && idea.status !== targetStatus) {
        await updateIdea(ideaId, { status: targetStatus })
        await loadIdeas()
      }
    }
  }

  const handleIdeaClick = (idea: Idea) => {
    setModalIdea(idea)
    setShowModal(true)
  }

  const handleNewIdea = () => {
    setModalIdea(null)
    setShowModal(true)
  }

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
        <h2 className="text-lg font-semibold text-gray-800">Board</h2>
        <button
          onClick={handleNewIdea}
          className="px-4 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-800"
        >
          + Nueva idea
        </button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-4 overflow-x-auto pb-4">
          {grouped.map(({ status, ideas: colIdeas }) => (
            <Column
              key={status}
              status={status}
              ideas={colIdeas}
              onIdeaClick={handleIdeaClick}
            />
          ))}
        </div>

        <DragOverlay>
          {activeIdea ? <IdeaCard idea={activeIdea} /> : null}
        </DragOverlay>
      </DndContext>

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
