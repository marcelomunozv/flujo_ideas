export type IdeaStatus = 'SEED' | 'ACTIVE' | 'MATURE' | 'ARCHIVED'

export interface Idea {
  id: string
  title: string
  description: string | null
  status: IdeaStatus
  tags: string[]
  parentId: string | null
  createdAt: string
  updatedAt: string
  children?: Idea[]
  parent?: Idea | null
}

export const STATUS_LABELS: Record<IdeaStatus, string> = {
  SEED: 'Semilla',
  ACTIVE: 'En desarrollo',
  MATURE: 'Madura',
  ARCHIVED: 'Archivada',
}

export const STATUS_COLORS: Record<IdeaStatus, string> = {
  SEED: 'bg-seed/20 border-seed text-yellow-800',
  ACTIVE: 'bg-active/20 border-active text-blue-800',
  MATURE: 'bg-mature/20 border-mature text-green-800',
  ARCHIVED: 'bg-archived/20 border-archived text-gray-700',
}
