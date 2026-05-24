import type { Idea, IdeaStatus } from '../types'

const BASE = '/api/ideas'

export async function fetchIdeas(params?: {
  status?: IdeaStatus
  tag?: string
  q?: string
}): Promise<Idea[]> {
  const searchParams = new URLSearchParams()
  if (params?.status) searchParams.set('status', params.status)
  if (params?.tag) searchParams.set('tag', params.tag)
  if (params?.q) searchParams.set('q', params.q)

  const url = searchParams.toString() ? `${BASE}?${searchParams}` : BASE
  const res = await fetch(url)
  return res.json()
}

export async function fetchIdea(id: string): Promise<Idea> {
  const res = await fetch(`${BASE}/${id}`)
  return res.json()
}

export async function createIdea(data: {
  title: string
  description?: string
  status?: IdeaStatus
  tags?: string[]
  parentId?: string
}): Promise<Idea> {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}

export async function updateIdea(
  id: string,
  data: Partial<{
    title: string
    description: string
    status: IdeaStatus
    tags: string[]
    parentId: string | null
  }>
): Promise<Idea> {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}

export async function deleteIdea(id: string): Promise<void> {
  await fetch(`${BASE}/${id}`, { method: 'DELETE' })
}
