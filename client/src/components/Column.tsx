import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import type { Idea, IdeaStatus } from '../types'
import { STATUS_LABELS } from '../types'
import SortableCard from './SortableCard'

interface ColumnProps {
  status: IdeaStatus
  ideas: Idea[]
  onIdeaClick: (idea: Idea) => void
}

export default function Column({ status, ideas, onIdeaClick }: ColumnProps) {
  const { setNodeRef } = useDroppable({ id: status })

  return (
    <div className="flex flex-col gap-3 min-w-[260px] w-72">
      <div className="flex items-center justify-between px-1">
        <h2 className="font-semibold text-sm text-gray-700 uppercase tracking-wide">
          {STATUS_LABELS[status]}
        </h2>
        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
          {ideas.length}
        </span>
      </div>
      <div
        ref={setNodeRef}
        className="flex flex-col gap-2 bg-gray-50 rounded-xl p-3 min-h-[200px] border border-dashed border-gray-200"
      >
        <SortableContext items={ideas.map((i) => i.id)} strategy={verticalListSortingStrategy}>
          {ideas.map((idea) => (
            <SortableCard key={idea.id} idea={idea} onClick={() => onIdeaClick(idea)} />
          ))}
        </SortableContext>
      </div>
    </div>
  )
}
