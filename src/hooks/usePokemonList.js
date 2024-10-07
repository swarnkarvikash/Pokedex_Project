import axios from "axios";
import { useEffect, useState } from "react";

function usePokemonList(){
    const [pokemonListState, setPokemonListState] = useState({
        pokemonList:[],
        isLoading: true,
        pokedexUrl: 'https://pokeapi.co/api/v2/pokemon',
        nextUrl: '',
        prevUrl: ''
      });

      async function downloadPokemons(){
        //setIsLoading(true);

        // setPrevUrl(response.data.previous);

          setPokemonListState((state) => ({ ...state, isLoading: true }));
          const response = await axios.get(pokemonListState.pokedexUrl);
          console.log(response.data);
          const pokemonResults = response.data.results;
          console.log(pokemonResults);
          console.log("response is", response.data.pokemon);
          setPokemonListState((state) => ({
              ...state,
              nextUrl: response.data.next,
              prevUrl: response.data.previous
            }));

        const pokemonresultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));
        const pokemonData = await axios.all(pokemonresultPromise);
        console.log(pokemonData);
        //save at pokemonlist
        const res = pokemonData.map((pokeData) => {
            const pokemon = pokeData.data;

            return {
                name : pokemon.name,
                image : (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
                types: pokemon.types,
                id : pokemon.id
            }
        })
        console.log(res);
        setPokemonListState((state) => ({
          ...state,
          pokemonList: res, 
          isLoading: false
        }));
        //setIsLoading(false);
    }

    useEffect(() => {
        downloadPokemons();
    },[pokemonListState.pokedexUrl]);

    return [pokemonListState, setPokemonListState];
}

export default usePokemonList;