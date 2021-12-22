import { graphqlHTTP } from 'express-graphql'
import express from 'express'
import mongoose from 'mongoose'

import { CONN_STRING, DB_NAME, PORT } from './config'
import { schema } from './grapghql'
;(async () => {
	const app = express()
	await mongoose.connect(CONN_STRING, { dbName: DB_NAME })

	app.use(
		'/graphql',
		graphqlHTTP({
			schema,
			graphiql: true,
		})
	)
	app.listen(PORT)
	console.log(`Running on: localhost:${PORT}/graphql`)
})()
