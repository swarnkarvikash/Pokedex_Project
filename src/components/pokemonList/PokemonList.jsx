import { useEffect, useState } from "react";
import axios from 'axios';
import './PokemonList.css';
import Pokemon from "../Pokemon/Pokemon";

function PokemonList(){

    // const [pokemonList, setPokemonList] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);

    // const [pokedexUrl, setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon');

    // const [nextUrl, setNexturl] = useState('');
    // const [prevUrl, setPrevUrl] = useState('');

    const [pokemonListState, setPokemonListState] = useState({
      pokemonList:[],
      isLoading: true,
      pokedexUrl: 'https://pokeapi.co/api/v2/pokemon',
      nextUrl: '',
      prevUrl: ''
    });
    

    async function downloadPokemons(){
        //setIsLoading(true);
        setPokemonListState((state) => ({ ...state, isLoading: true }));
        const response = await axios.get(pokemonListState.pokedexUrl);
        console.log(response.data);
        setPokemonListState((state) => ({
            ...state,
            nextUrl: response.data.next,
            prevUrl: response.data.previous
          }));
        // setPrevUrl(response.data.previous);
        const pokemonResults = response.data.results;
        console.log(pokemonResults);
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

    useEffect(() =>{
        downloadPokemons();
    },[pokemonListState.pokedexUrl]);
    return(
        <div className="pokemon-list-wrapper">
          <div className="pokemon-wrapper">
          {(pokemonListState.isLoading) ? 'Loading...' : 
            pokemonListState.pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />)
          }
          </div>
          <div className="controls">
            <button disabled={pokemonListState.prevUrl == null} onClick={() => {
              const urlToSet = pokemonListState.prevUrl;
              setPokemonListState({...pokemonListState, pokedexUrl: urlToSet}) }}>Prev</button>
            <button disabled={pokemonListState.nextUrl == null} onClick={() => {
              const urlToSet = pokemonListState.nextUrl;
              setPokemonListState({...pokemonListState, pokedexUrl: urlToSet}) }}>Next</button>
          </div>
        </div>
    )
}

export default PokemonList;