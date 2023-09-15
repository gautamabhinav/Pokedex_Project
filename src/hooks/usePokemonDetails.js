import axios from "axios";
import { useEffect, useState } from "react";
import usePokemonList from "./usePokemonList";

function usePokemonDetails(id) {
    const [pokemon, setPokemon] = useState({});
    let pokemonListHookResponse = [];
    async function downloadPokemon() {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
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
    }

    const [pokemonListState, setPokemonListState] = usePokemonList(); 


    useEffect(() => {
        downloadPokemon();
        console.log('list',pokemonListHookResponse.pokemonListState);
    }, []);

    return [pokemon];
}

export default usePokemonDetails;