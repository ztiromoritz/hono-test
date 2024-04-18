import { Hono, Context  } from 'hono';
import { HTTPException } from 'hono/http-exception'

const ACCOUNT_CONTEXT = "ACCOUNT_CONTEXT";

export type AccountContext = {
	account_id: string;
}

// Type context access
export function useAccount(c: Context<AccountContext> ):AccountContext{
	return c.get(ACCOUNT_CONTEXT)
}

// Main middleware
export const account = ():MiddlewareHandler => async (c: Context<AuthContext>, next)=>{
  c.set(ACCOUNT_CONTEXT, { account_id });
	await next();
}


