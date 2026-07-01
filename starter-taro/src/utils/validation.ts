/**
 * Zod 通用校验 Schema
 *
 * 提供项目中常用的校验规则，使用 zod 4.x API。
 * 配合 react-hook-form + @hookform/resolvers 使用。
 */

import { z } from 'zod'

// ─── 手机号 ─────────────────────────────────────────────────
//      中国大陆手机号（1xx-xxxx-xxxx）

export const phoneSchema = z
  .string()
  .regex(/^1[3-9]\d{9}$/, '请输入正确的手机号')

// ─── 邮箱 ───────────────────────────────────────────────────

export const emailSchema = z.string().email('请输入正确的邮箱地址')

// ─── 密码 ───────────────────────────────────────────────────
//      8~32 位，包含字母和数字

export const passwordSchema = z
  .string()
  .min(8, '密码至少 8 位')
  .max(32, '密码最多 32 位')
  .regex(/^(?=.*[a-zA-Z])(?=.*\d)/, '密码需包含字母和数字')

// ─── 验证码 ─────────────────────────────────────────────────

export const codeSchema = z.string().length(6, '验证码为 6 位数字')

// ─── URL ────────────────────────────────────────────────────

export const urlSchema = z.string().url('请输入正确的 URL')

// ─── 登录表单 ───────────────────────────────────────────────

export const loginSchema = z.object({
  account: z.string().min(1, '请输入账号'),
  password: passwordSchema,
})

export type LoginForm = z.infer<typeof loginSchema>

// ─── 注册表单 ───────────────────────────────────────────────

export const registerSchema = z
  .object({
    nickname: z.string().min(2, '昵称至少 2 位').max(20, '昵称最多 20 位'),
    phone: phoneSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
    code: codeSchema,
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: '两次密码不一致',
    path: ['confirmPassword'],
  })

export type RegisterForm = z.infer<typeof registerSchema>

// ─── 分页参数 ───────────────────────────────────────────────

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
})

export type PaginationParams = z.infer<typeof paginationSchema>
