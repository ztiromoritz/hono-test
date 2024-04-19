import { Context, MiddlewareHandler, Next } from 'hono';
import { HTTPException } from 'hono/http-exception'
import { createMiddleware } from 'hono/factory';

declare module 'hono' {
  interface ContextVariableMap {
    user?: UserInfo
  }
}

export type UserInfo = {
	name: string;
	id: string;
	role: "ADMIN" | "USER"
}


// Type context access
export function useUser(c: Context){
	return c.get("user");
}

// Main middleware
export const auth = (): MiddlewareHandler => {
	return async (c: Context, next) => {
		c.set("user", { name: 'moritz', id: '1234243', role: "ADMIN" });
		await next();
	}
}

// Helper middleware
export const isAdmin = async (c: Context, next: Next) => {
	const user = c.get("user");
	const account_id = c.get("accountId");

	console.log("isAdmin",  account_id )
	if (user?.role !== 'ADMIN')
		throw new HTTPException(403, { message: 'Forbidden' })
	await next()
}


export const isAdmin2 = createMiddleware(async(c,next)=>{
	const user = c.get("user");
	const account_id = c.get("accountId");

	console.log("isAdmin",  account_id )

	if (user?.role !== 'ADMIN')
		throw new HTTPException(403, { message: 'Forbidden' })
	await next()
})

export const isUser = async (c: Context, next: Next) => {
	const user = c.get("user");
	const account_id = c.get("accountId");

	console.log("user",  account_id )
	if (user?.role !== 'USER' && user?.role !== "ADMIN")
		throw new HTTPException(403, { message: 'Forbidden' })
	await next()
}
