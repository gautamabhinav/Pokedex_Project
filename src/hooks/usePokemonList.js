import axios from 'axios';
import React, { useEffect, useState } from 'react'

function usePokemonList() {
    const [pokemonListState, setPokemonListState] = useState({
        pokemonList: [],
        isLoading: true,
        pokedexUrl: 'https://pokeapi.co/api/v2/pokemon/',
        nextUrl: '',
        prevUrl: '',
    });
    
    async function downloadPokemons() {
        
        // setIsLoading(true);
        setPokemonListState((state) =>({...state, isLoading: true}));

        // console.log('pokemonListState',pokemonListState.pokedexUrl)
        
        const response = await axios.get(pokemonListState.pokedexUrl);   // this download list of 20 Pokemons
        // console.log(response.data);

        const pokemonresults = response.data.results;   // we get the array of pokemons from result
        console.log("response is", response.data, response.data.pokemon);
        // setNextUrl(response.data.next);  // previous code
        // setPreUrl(response.data.previous);

        console.log(pokemonListState);

        setPokemonListState((state) =>({
            // ...pokemonListState,
            ...state,
            nextUrl: response.data.next,
            prevUrl: response.data.previous
        }));

        const pokemonResultPromise = pokemonresults.map((pokemon) => axios.get(pokemon.url));
        // console.log(pokemonResultPromise);

        // Passing that promise array to axios.all
        const pokemonData = await axios.all(pokemonResultPromise);  // array of 20 pokemon  detailed data
        console.log(pokemonData);

        //now iterate on the data of each pokemon, and extract id, name, image, types
        const pokeListResult = pokemonData.map((pokeData) => {
            const pokemon = pokeData.data;
            return {
                id: pokemon.id,
                name: pokemon.name,
                image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
                types: pokemon.types 
            }
        })
        console.log(pokeListResult);
        // setPokemonList(pokeListResult);  // previous code
        // setIsLoading(false);

        setPokemonListState((state) =>({
            // ...pokemonListState,
            ...state,
            pokemonList: pokeListResult,
            isLoading: false
        }));
    }

    useEffect(() => {
        downloadPokemons();
    }, [pokemonListState.pokedexUrl])

    return [pokemonListState, setPokemonListState];
    
}

export default usePokemonList;