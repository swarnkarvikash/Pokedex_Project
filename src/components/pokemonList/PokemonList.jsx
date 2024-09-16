import { useEffect, useState } from "react";
import axios from 'axios';
import './PokemonList.css';
import Pokemon from "../Pokemon/Pokemon";

function PokemonList(){

    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    

    async function downloadPokemons(){
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
        const pokemonResults = response.data.results;
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
        setPokemonList(res);
        setIsLoading(false);
    }

    useEffect(() =>{
        downloadPokemons();
    },[]);
    return(
        <div className="pokemon-list-wrapper">
          <div>Pokemon List</div>
          {(isLoading) ? 'Loading...' : 
            pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} />)
          }

        </div>
    )
}

export default PokemonList;