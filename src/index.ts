import { Hono } from 'hono'
import { auth, isAdmin, useUser } from './middleware/auth'
import { products } from './routes/product';

const app = new Hono()
app.use(auth());

app.get('/', isAdmin, (c) => {
	const user = useUser(c);
	return c.text('Hello Hono!' + JSON.stringify(user))
})

app.route("/accounts/:account_id/products/", products)


export default app
