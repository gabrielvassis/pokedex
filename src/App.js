import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const url = "https://pokeapi.co/api/v2/pokemon/";
  const [pokemons, setPokemons] = useState([]);

  const fetchInfo = async () => {
    const response = await axios.get(url);
    setPokemons(response.data.results);
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div>
      {pokemons.map((pokemon, index) => {
        return (
          <div key={index}>
            <p style={{ fontSize: 20, color: "red" }}>{pokemon.name}</p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
