import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const url = "https://pokeapi.co/api/v2/pokemon/?limit=151";
  const [pokemons, setPokemons] = useState([]);

  const fetchInfo = async () => {
    const response = await axios.get(url);
    const rawPokemons = response.data.results;
    for (let i = 0; i < rawPokemons.length; i++) {
      const pokemonData = await axios.get(rawPokemons[i].url);
      rawPokemons[i].sprite = pokemonData.data.sprites.front_default;
    }
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
            <img src={pokemon.sprite}></img>
            {pokemon.name}
          </div>
        );
      })}
    </div>
  );
}

export default App;
