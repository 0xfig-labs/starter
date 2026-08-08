import type { Hono } from 'hono'
import type { Bindings } from '../lib/env'

export function registerHealthRoute(app: Hono<{ Bindings: Bindings }>) {
  app.get('/health', (c) => c.json({ status: 'ok' }))
}
