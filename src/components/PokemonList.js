import axios from "axios";
import { useState, useEffect } from "react";
import { Card, Button } from "antd";

const PokemonList = () => {
  const url = "https://pokeapi.co/api/v2/pokemon/?limit=1";
  const [pokemons, setPokemons] = useState([]);
  const [nextPokemonsToLoad, setNextPokemonsToLoad] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchInfo = async () => {
    const response = await axios.get(url);
    setNextPokemonsToLoad(response.data.next);
    const rawPokemons = response.data.results;
    await Promise.all(
      rawPokemons.map(async (pokemon) => {
        const pokemonData = await axios.get(pokemon.url);
        pokemon.sprite = pokemonData.data.sprites.front_default;
      })
    );
    setPokemons(rawPokemons);
  };

  const loadMorePokemons = async () => {
    setLoading(true);
    const response = await axios.get(nextPokemonsToLoad);
    setNextPokemonsToLoad(response.data.next);

    const addPokemons = response.data.results;
    await Promise.all(
      addPokemons.map(async (pokemon) => {
        const pokemonData = await axios.get(pokemon.url);
        pokemon.sprite = pokemonData.data.sprites.front_default;
      })
    );
    addPokemons.forEach((current) => {
      pokemons.push(current);
    });
    setPokemons(pokemons);
    setLoading(false);
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div>
      <Button
        type="primary"
        loading={loading}
        onClick={loadMorePokemons}
        style={{ width: 300, position: "fixed", zIndex: 1 }}
      >
        Load more
      </Button>
      <div style={{ paddingTop: 15 }}>
        {pokemons.map((pokemon, index) => {
          return (
            <Card key={index} title={pokemon.name} style={{ width: 300 }}>
              <img
                src={pokemon.sprite}
                alt={`Sprite for ${pokemon.name}`}
              ></img>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default PokemonList;
