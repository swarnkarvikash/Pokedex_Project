import PokemonList from "../pokemonList/PokemonList";
import Search from "../Search/Search";
import './Pokedex.css';

function Pokedex(){

    return(
        <div className="pokedex-wrapper">
            <h1 id="pokedex-heading">pokedex</h1>
            <Search />
            <PokemonList />
        </div>
    )
}

export default Pokedex;