import axios from "axios";
import { useEffect, useState } from "react";

function usePokemonDetails(id, pokemonName) {
    const [pokemon, setPokemon] = useState({});
    async function downloadPokemon() {
        try {
            let response;
            if(pokemonName){
                console.log('fetching by name')
                response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
            } else {
                response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            }
            console.log(response.data);
            const pokemonOfSameTypes = axios.get(`https://pokeapi.co/api/v2/type/${response.data.types ? response.data.types[0].type.name : ''}`);
            console.log('s', pokemonOfSameTypes)
            setPokemon(state => ({
                ...state,
                name: response.data.name,
                image: response.data.sprites.other.dream_world.front_default,
                weight: response.data.weight,
                height: response.data.height,
                types: response.data.types.map((t) => t.type.name)
            }));

            pokemonOfSameTypes.then((response) => {
                setPokemon(state => ({
                    ...state,
                    similarPokemons:  response.data.pokemon
                }));
            })
            console.log(response.data.types);
            setPokemonListState({... pokemonListState, type: response.data.types ? response.data.types[0].type.name : '' })
        } catch (error) {
            console.log('Something went wrong');
        }
        
    }

    const [pokemonListState, setPokemonListState] = useState({}); 


    useEffect(() => {
            downloadPokemon();
    }, []);

    return [pokemon];
}

export default usePokemonDetails;