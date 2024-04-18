import { Hono, Context } from 'hono';
import { createMiddleware } from 'hono/factory'



// Type context access
export function useAccount(c: Context): string {
	return c.req.param("account_id")
}



