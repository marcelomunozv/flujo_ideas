import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { Idea } from '../types'
import IdeaCard from './IdeaCard'

interface SortableCardProps {
  idea: Idea
  onClick: () => void
}

export default function SortableCard({ idea, onClick }: SortableCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: idea.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <IdeaCard idea={idea} onClick={onClick} />
    </div>
  )
}
