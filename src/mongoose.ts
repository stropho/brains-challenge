import mongoose from 'mongoose'
import type { Pokemon } from './pokemon-types'

// Generated with help of https://transform.tools/json-to-mongoose
export const PokemonSchemaDefinition = {
	_id: {
		type: mongoose.Types.ObjectId,
	},
	id: {
		type: 'String',
	},
	name: {
		type: 'String',
	},
	classification: {
		type: 'String',
	},
	types: {
		type: ['String'],
	},
	resistant: {
		type: ['String'],
	},
	weaknesses: {
		type: ['String'],
	},
	weight: {
		minimum: {
			type: 'String',
		},
		maximum: {
			type: 'String',
		},
	},
	height: {
		minimum: {
			type: 'String',
		},
		maximum: {
			type: 'String',
		},
	},
	fleeRate: {
		type: 'Number',
	},
	'Previous evolution(s)': {
		type: ['Mixed'],
		alias: 'previousEvolutions',
	},
	evolutionRequirements: {
		amount: {
			type: 'Number',
		},
		name: {
			type: 'String',
		},
	},
	evolutions: {
		type: ['Mixed'],
	},
	maxCP: {
		type: 'Number',
	},
	maxHP: {
		type: 'Number',
	},
	attacks: {
		fast: {
			type: ['Mixed'],
		},
		special: {
			type: ['Mixed'],
		},
	},
	favorite: {
		type: 'Boolean',
	},
}

export const allFieldsAndAliases = Object.keys(PokemonSchemaDefinition).reduce<
	string[]
>((acc, key) => {
	acc.push(key)
	const alias = PokemonSchemaDefinition[key].alias
	if (alias) acc.push(alias)
	return acc
}, [])
const PokemonSchema = new mongoose.Schema(PokemonSchemaDefinition)

export const PokemonModel = mongoose.model<Pokemon>('Pokemon', PokemonSchema)
