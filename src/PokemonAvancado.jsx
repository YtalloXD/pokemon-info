import { useEffect, useState } from "react";
import SorteadorPokemon from "./SorteadorPokemon";
import "./PokemonAvancado.css";

export default function PokemonAvancado() {
  const [pokemon, setPokemon] = useState(null);
  const [weaknesses, setWeaknesses] = useState([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      const numPokemon = Math.floor(Math.random() * 151) + 1;
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${numPokemon}`
      );
      const data = await res.json();
      setPokemon(data);

      // Fetch weaknesses (type info)
      const typeUrls = data.types.map((t) => t.type.url);
      const weaknessesSet = new Set();

      for (const url of typeUrls) {
        const res = await fetch(url);
        const typeData = await res.json();

        typeData.damage_relations.double_damage_from.forEach((weakness) =>
          weaknessesSet.add(weakness.name)
        );
      }

      setWeaknesses(Array.from(weaknessesSet));
    };

    fetchPokemon();
  }, []);

  return (
    <div>
      {pokemon ? (
        <>
          <h3>
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            <SorteadorPokemon />
          </h3>

          <p className="pokemonInfo">
            <strong>Type(s): </strong>
            {pokemon.types.map((t) => t.type.name).join(", ")}

            <strong>Weakness(es): </strong>
            {weaknesses.length ? weaknesses.join(", ") : "Loading..."}
          </p>
        </>
      ) : (
        <p>Loading Pokémon...</p>
      )}
    </div>
  );
}
