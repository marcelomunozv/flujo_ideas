import { Router } from 'express'
import type { PrismaClient } from '@prisma/client'

export default function ideasRouter(prisma: PrismaClient) {
  const router = Router()

  // Listar ideas
  router.get('/', async (req, res) => {
    const { status, tag, q } = req.query
    const where: Record<string, unknown> = {}

    if (status) where.status = status
    if (tag) where.tags = { contains: tag as string }
    if (q) where.title = { contains: q as string }

    const ideas = await prisma.idea.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    })

    const parsed = ideas.map((idea) => ({
      ...idea,
      tags: JSON.parse(idea.tags),
    }))

    res.json(parsed)
  })

  // Obtener una idea
  router.get('/:id', async (req, res) => {
    const idea = await prisma.idea.findUnique({
      where: { id: req.params.id },
      include: { children: true, parent: true },
    })

    if (!idea) {
      res.status(404).json({ error: 'Idea not found' })
      return
    }

    res.json({ ...idea, tags: JSON.parse(idea.tags) })
  })

  // Crear idea
  router.post('/', async (req, res) => {
    const { title, description, status, tags, parentId } = req.body

    const idea = await prisma.idea.create({
      data: {
        title,
        description: description ?? null,
        status: status ?? 'SEED',
        tags: JSON.stringify(tags ?? []),
        parentId: parentId ?? null,
      },
    })

    res.status(201).json({ ...idea, tags: JSON.parse(idea.tags) })
  })

  // Actualizar idea
  router.patch('/:id', async (req, res) => {
    const { title, description, status, tags, parentId } = req.body
    const data: Record<string, unknown> = {}

    if (title !== undefined) data.title = title
    if (description !== undefined) data.description = description
    if (status !== undefined) data.status = status
    if (tags !== undefined) data.tags = JSON.stringify(tags)
    if (parentId !== undefined) data.parentId = parentId

    const idea = await prisma.idea.update({
      where: { id: req.params.id },
      data,
    })

    res.json({ ...idea, tags: JSON.parse(idea.tags) })
  })

  // Eliminar idea
  router.delete('/:id', async (req, res) => {
    await prisma.idea.delete({ where: { id: req.params.id } })
    res.status(204).end()
  })

  return router
}
