import { Context, MiddlewareHandler, Next } from 'hono';
import { HTTPException } from 'hono/http-exception'
import { useAccount } from './account';



export type UserInfo = {
	name: string;
	id: string;
	role: "ADMIN" | "USER"
}

export type UserContext = Context<{ Variables: { user: UserInfo } }>

// Type context access
export function useUser(c: Context): UserInfo {
	const userContext = c as UserContext;
	return userContext.get("user");
}

// Main middleware
export const auth = (): MiddlewareHandler => {
	return async (c: UserContext, next) => {
		c.set("user", { name: 'moritz', id: '1234243', role: "ADMIN" });
		await next();
	}
}

// Helper middleware
export const isAdmin = async (c: Context<{ Variables: { user: UserInfo } }>, next: Next) => {
	const user = useUser(c);

	const account_id = useAccount(c);

	console.log("isAdmin",  account_id )
	if (user?.role !== 'ADMIN')
		throw new HTTPException(403, { message: 'Forbidden' })
	await next()
}

export const isUser = async (c: Context<{ Variables: { user: UserInfo } }>, next: Next) => {
	const user = useUser(c);

	const account_id = useAccount(c);

	console.log("user",  account_id )
	if (user?.role !== 'USER' && user?.role !== "ADMIN")
		throw new HTTPException(403, { message: 'Forbidden' })
	await next()
}
