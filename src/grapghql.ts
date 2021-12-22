import { composeMongoose } from 'graphql-compose-mongoose'
import { schemaComposer } from 'graphql-compose'
import { PokemonModel, allFieldsAndAliases } from './mongoose'
import type { Pokemon } from './pokemon-types'
import type { Document } from 'mongoose'
import { removeSubset } from './utils'

const PokemonTC = composeMongoose<Document<Pokemon>>(PokemonModel as any) // sry, there is a type mismatch

const multiPokemonsNonFilterableFields = removeSubset(allFieldsAndAliases, [
	'name',
	'favorite',
	'types',
])

schemaComposer.Query.addFields({
	getPokemon: PokemonTC.mongooseResolvers.findOne({
		filter: {
			removeFields: removeSubset(allFieldsAndAliases, [
				'_id',
				'id',
				'name',
				'favorite',
			]),
		},
	}),
	getPokemons: PokemonTC.mongooseResolvers.findMany({
		filter: {
			removeFields: multiPokemonsNonFilterableFields,
		},
	}),
	getPokemonsPaginated: PokemonTC.mongooseResolvers.pagination({
		findManyOpts: {
			filter: {
				removeFields: multiPokemonsNonFilterableFields,
			},
		},
	}),
	getPokemonTypes: schemaComposer.createResolver({
		name: 'getPokemonTypes',
		type: 'type PokemonTypesList {data: [String]}',
		resolve: async () => {
			return { data: await PokemonModel.distinct('types') }
		},
	}),
})

const immutableFields = allFieldsAndAliases.filter((key) => key !== 'favorite')

schemaComposer.Mutation.addFields({
	updatePokemon: PokemonTC.mongooseResolvers.updateById({
		record: { removeFields: immutableFields },
	}),
})

export const schema = schemaComposer.buildSchema()
