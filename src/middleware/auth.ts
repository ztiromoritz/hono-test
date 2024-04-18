import { Hono, Context, MiddlewareHandler } from 'hono';
import { HTTPException } from 'hono/http-exception'

const AUTH_CONTEXT = "AUTH_CONTEXT";

export type AuthContext = {
	user: {
		name: string;
		id: string;
		role: "ADMIN"|"USER"
	}
}

// Type context access
export function useAuth(c: Context<AuthContext> ):AuthContext{
	return c.get(AUTH_CONTEXT)
}

// Main middleware
export const auth = ():MiddlewareHandler=>{
	return async (c: Context<AuthContext>, next)=>{
    c.set(AUTH_CONTEXT, { user: { name: 'moritz', id: '1234243', role: "USER"}});
	  await next();
  }
}

// Helper middleware
export const isAdmin = async(c: Context<AuthContext>, next)=>{
	const authContext = useAuth(c);
	if(authContext?.user?.role !== 'ADMIN')
		throw new HTTPException(403, { message: 'Forbidden' })
  await next()
}
