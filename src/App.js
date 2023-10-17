import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const url = "https://pokeapi.co/api/v2/pokemon/";
  const [pokemons, setPokemons] = useState([]);

  const fetchInfo = async () => {
    const response = await axios.get(url);
    const rawPokemons = response.data.results;
    await Promise.all(
      rawPokemons.map(async (pokemon) => {
        const pokemonData = await axios.get(pokemon.url);
        pokemon.sprite = pokemonData.data.sprites.front_default;
      })
    );
    setPokemons(rawPokemons);
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div>
      {pokemons.map((pokemon, index) => {
        return (
          <div key={index}>
            <img src={pokemon.sprite} alt={`Sprite for ${pokemon.name}`}></img>
            {pokemon.name}
          </div>
        );
      })}
    </div>
  );
}

export default App;
