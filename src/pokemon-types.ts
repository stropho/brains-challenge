export interface Pokemon {
	id: string
	name: string
	classification: string
	types: string[]
	resistant: string[]
	weaknesses: string[]
	weight: Weight
	height: Height
	fleeRate: number
	previousEvolutions: PreviousEvolutionS[]
	evolutionRequirements: EvolutionRequirements
	evolutions: Evolution[]
	maxCP: number
	maxHP: number
	attacks: Attacks
}

export interface Weight {
	minimum: string
	maximum: string
}

export interface Height {
	minimum: string
	maximum: string
}

export interface PreviousEvolutionS {
	id: number
	name: string
}

export interface EvolutionRequirements {
	amount: number
	name: string
}

export interface Evolution {
	id: number
	name: string
}

export interface Attacks {
	fast: Fast[]
	special: Special[]
}

export interface Fast {
	name: string
	type: string
	damage: number
}

export interface Special {
	name: string
	type: string
	damage: number
}
