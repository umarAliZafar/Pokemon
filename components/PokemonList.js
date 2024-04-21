import { useState } from 'react';
import { useQuery } from 'react-query';
import PokemonDetails from '../components/PokemonDetail';  // Import the new PokemonDetails component

function PokemonList({ categoryUrl }) {
  const { data, isLoading, isError } = useQuery(['pokemon', categoryUrl], () =>
    fetch(categoryUrl).then((res) => res.json())
  );

  const [selectedPokemon, setSelectedPokemon] = useState(null);  // State to hold the selected Pokemon

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading Pokemons.</p>;

  const handleChange = (e) => {
    const selectedName = e.target.value;
    const selectedPoke = data.pokemon.find(poke => poke.pokemon.name === selectedName);
    setSelectedPokemon(selectedPoke);
  };

  return (
    <div>
      <h2>Pokemons</h2>
      <select onChange={handleChange}>
        <option>Select a Pokemon</option>
        {data.pokemon.map((poke) => (
          <option key={poke.pokemon.name} value={poke.pokemon.name}>{poke.pokemon.name}</option>
        ))}
      </select>
      {selectedPokemon && <PokemonDetails pokemon={selectedPokemon.pokemon} />}
    </div>
  );
}

export default PokemonList;
