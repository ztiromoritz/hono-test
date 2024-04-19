import { Hono, Context, Next } from 'hono';
import { createMiddleware } from 'hono/factory'

declare module 'hono' {
	interface ContextVariableMap {
		accountId?: string
	}
}

// Type context access
export const accountId = () =>
	createMiddleware(async (c: Context, next: Next) => {
		c.set("accountId", c.req.param("account_id"))
		await next()
	})



