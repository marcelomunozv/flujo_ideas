import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const seedIdeas = [
  { title: 'App de hábitos diarios', description: 'Una app para trackear hábitos con rachas y recordatorios', status: 'ACTIVE', tags: '["mobile","productividad"]' },
  { title: 'Blog personal con Astro', description: 'Migrar el blog a Astro para mejor performance', status: 'SEED', tags: '["web","blog"]' },
  { title: 'Sistema de inventario local', description: 'Inventario simple para negocio pequeño con QR', status: 'MATURE', tags: '["web","negocio"]' },
  { title: 'CLI para organizar notas', description: 'Herramienta de terminal para capturar ideas rápido', status: 'ARCHIVED', tags: '["cli","productividad"]' },
]

async function main() {
  console.log('Seeding...')
  for (const idea of seedIdeas) {
    await prisma.idea.create({ data: idea })
  }
  console.log('Done.')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
