FROM mongo

COPY ./pokemons.json /pokemons.json

CMD mongoimport --host mongodb --db be-challenge --collection pokemons --type json --file /pokemons.json --jsonArray