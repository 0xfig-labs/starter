import { Hono } from 'hono'
import { requestIdSchema, type Bindings } from './lib/env'
import { registerHealthRoute } from './routes/health'

export function createApp() {
  const app = new Hono<{ Bindings: Bindings }>()

  app.use('*', async (c, next) => {
    const supplied = requestIdSchema.safeParse(c.req.header('X-Request-ID'))
    const requestId = supplied.success ? supplied.data : crypto.randomUUID()
    c.header('X-Request-ID', requestId)
    await next()
  })

  registerHealthRoute(app)
  app.notFound((c) => c.json({ error: 'not_found', message: 'Route not found' }, 404))
  app.onError((_error, c) => {
    return c.json({ error: 'internal_error', message: 'Internal server error' }, 500)
  })

  return app
}

export const app = createApp()
