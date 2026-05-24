# Plan — Flujo Ideas

Web SPA para capturar, organizar y conectar ideas tipo kanban + lista.

---

## Stack

| Capa | Tecnología |
|------|-----------|
| Frontend | React 18 + Vite + Tailwind CSS 4 + React Router + @dnd-kit |
| Backend  | Node.js + Express + Prisma ORM |
| DB       | SQLite |
| Monorepo | pnpm workspaces |

## Modelo de datos

```
Idea
  id:          String (UUID)
  title:       String
  description: String?
  status:      Enum [SEED, ACTIVE, MATURE, ARCHIVED]
  tags:        String[] (array de strings)
  parentId:    String? (UUID, self-relation)
  createdAt:   DateTime
  updatedAt:   DateTime
```

## API REST

| Método | Ruta | Acción |
|--------|------|--------|
| GET    | /api/ideas | Listar (?status=&tag=&q=) |
| POST   | /api/ideas | Crear |
| GET    | /api/ideas/:id | Obtener una |
| PATCH  | /api/ideas/:id | Actualizar |
| DELETE | /api/ideas/:id | Eliminar |

## Vistas (MVP)

- **Board** — Kanban 4 columnas con drag & drop
- **Lista** — Tabla/lista con columnas sortables y filtros
- **Detail** — Modal con formulario completo
- **Search** — Barra de búsqueda global en header

## Tareas (orden)

1. Inicializar monorepo con pnpm workspaces
2. Configurar server: Express + Prisma + SQLite + CRUD
3. Configurar client: Vite + React + Tailwind + Router
4. Modelo Prisma + migración inicial
5. API REST completa
6. Componentes base: Layout, Header, Sidebar
7. Vista Board con drag & drop (@dnd-kit)
8. Vista Lista con filtros
9. Modal de detalle/edición
10. Barra de búsqueda global
11. Seed data de prueba
12. Conexión frontend-backend

## Decisiones tomadas

- Single-user local (sin auth)
- Vista kanban y lista (toggle)
- Mapa visual postergado
- pnpm workspaces (client/ + server/)
