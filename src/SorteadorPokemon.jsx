import "./SorteadorPokemon.css";

export default function SorteadorPokemon() {
  let numPokemon = Math.round(Math.random() * 1025);
  let pokemonSorteador = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${numPokemon}.png`;

  return (
    <div className="pokemonDecor">
      Pokemon ID: {numPokemon} <br />
      <img src={pokemonSorteador} /> <br />
    </div>
  );
}
