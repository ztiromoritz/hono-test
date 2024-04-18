import { Hono } from 'hono'
import { isAdmin, isUser } from '../middleware/auth'

export const products = new Hono()

products.get('/', isUser, (c) => c.json('list products'))

products.post('/', isAdmin, (c) => c.json('create a product', 201))

products.get('/:product_id', isUser, (c) => c.json(`get ${c.req.param('product_id')}`))

