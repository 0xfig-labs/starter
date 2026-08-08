import { describe, expect, it } from 'vitest'
import worker from '../src/index'
import { app, createApp } from '../src/app'

describe('API starter', () => {
  it('returns health status and request id', async () => {
    const response = await app.request('http://localhost/health')

    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ status: 'ok' })
    expect(response.headers.get('X-Request-ID')).toBeTruthy()
  })

  it('accepts a valid request id', async () => {
    const response = await app.request('http://localhost/health', {
      headers: { 'X-Request-ID': 'request-123' },
    })

    expect(response.headers.get('X-Request-ID')).toBe('request-123')
  })

  it('returns a safe not-found response', async () => {
    const response = await app.request('http://localhost/missing')

    expect(response.status).toBe(404)
    expect(await response.json()).toEqual({
      error: 'not_found',
      message: 'Route not found',
    })
  })

  it('returns a safe internal error response', async () => {
    const broken = createApp()
    broken.get('/broken', () => {
      throw new Error('secret-value')
    })

    const response = await broken.request('http://localhost/broken')
    const body = await response.text()

    expect(response.status).toBe(500)
    expect(body).toBe(JSON.stringify({ error: 'internal_error', message: 'Internal server error' }))
    expect(body).not.toContain('secret-value')
  })

  it('exports both Worker handlers', () => {
    expect(worker.fetch).toBe(app.fetch)
    expect(worker.scheduled).toBeTypeOf('function')
  })
})
