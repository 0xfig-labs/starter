import { z } from 'zod'

const querySchema = z.object({
  name: z.string().optional()
})

export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery(event, querySchema.parse)
  return {
    ok: true,
    service: query.name ?? 'starter-nuxt'
  }
})
