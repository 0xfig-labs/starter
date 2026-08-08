import { z } from 'zod'

export type Bindings = Record<string, string | undefined>

export const requestIdSchema = z.string().regex(/^[A-Za-z0-9._:-]{1,128}$/)
