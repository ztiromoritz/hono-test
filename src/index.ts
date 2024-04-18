import { Hono } from 'hono'
import {auth, useAuth,isAdmin } from './middleware/auth.ts'

const app = new Hono()
add.use(account())
app.use(auth());
app.get('/', isAdmin(), (c) => {
	const auth = useAuth(c);
  return c.text('Hello Hono!'+ JSON.stringify( auth?.user))
})

export default app
