import type { Idea } from '../types'
import { STATUS_COLORS } from '../types'

interface IdeaCardProps {
  idea: Idea
  onClick?: () => void
}

export default function IdeaCard({ idea, onClick }: IdeaCardProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-3 rounded-lg border-2 bg-white shadow-sm hover:shadow-md transition-shadow ${STATUS_COLORS[idea.status]}`}
    >
      <p className="font-medium text-sm leading-snug">{idea.title}</p>
      {idea.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {idea.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </button>
  )
}
