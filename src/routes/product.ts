import { Hono } from 'hono'
import { isAdmin, isUser } from '../middleware/auth'

export const products = new Hono()


products.get('/', isAdmin, (c) => {
	const p = c.get("accountId")
	return c.json('list products' + p)
})

products.post('/', isAdmin, (c) => c.json('create a product', 201))

products.get('/:product_id', isUser, (c) => c.json(`get ${c.req.param('product_id')}`))

