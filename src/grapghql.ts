import { composeMongoose } from 'graphql-compose-mongoose'
import { schemaComposer } from 'graphql-compose'
import { PokemonModel, allFieldsAndAliases } from './mongoose'
import type { Pokemon } from './pokemon-types'
import type { Document } from 'mongoose'

const PokemonTC = composeMongoose<Document<Pokemon>>(PokemonModel as any) // sry, there is a type mismatch

const singlePokemonFilterables = new Set(['_id', 'id', 'name', 'favorite'])
const singlePokemonNonFilterFields = allFieldsAndAliases.filter(
	(key) => !singlePokemonFilterables.has(key)
)
schemaComposer.Query.addFields({
	getPokemon: PokemonTC.mongooseResolvers.findOne({
		filter: { removeFields: singlePokemonNonFilterFields },
	}),
})

const immutableFields = allFieldsAndAliases.filter((key) => key !== 'favorite')

schemaComposer.Mutation.addFields({
	updatePokemon: PokemonTC.mongooseResolvers.updateById({
		record: { removeFields: immutableFields },
	}),
})

export const schema = schemaComposer.buildSchema()
