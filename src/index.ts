import { Hono } from 'hono'
import { showRoutes } from 'hono/dev'
import { auth, isAdmin, useUser } from './middleware/auth'
import { products } from './routes/product';
import { accountId } from './middleware/account';

const app = new Hono()
app.use(accountId());
app.use(auth());


app.get('/', isAdmin, (c) => {
	const user = useUser(c);
	return c.text('Hello Hono!' + JSON.stringify(user))
})

app.route("/accounts/:account_id/products/", products)

app.onError((error, c)=>{
	console.error(`${error}`)
	return c.text('Internal Server Error', 500)
})

showRoutes(app)

export default app
