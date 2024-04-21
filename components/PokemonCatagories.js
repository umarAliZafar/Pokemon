import { useState, useEffect } from 'react';
import { useQuery, } from 'react-query';
import SearchPokemon from './SearchPokemon';
import PokemonList from './PokemonList';
function PokemonCategories() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState(null);

  const { data, isLoading, isError } = useQuery('categories', () =>
    fetch('https://pokeapi.co/api/v2/type/').then((res) => res.json())
  );


  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  useEffect(() => {

    const newFilteredCategories = data?.results?.filter((category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    console.log(newFilteredCategories);
    
    setFilteredCategories(newFilteredCategories);
  }, [searchTerm, data]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category.url);
    setSelectedCategoryName(category.name)
  };


  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading categories.</p>;

  return (
    <div>
      <SearchPokemon onSearch={handleSearch} />
      <h1>Pokemon Categories</h1>
      <ul>
        {filteredCategories.map((category) => (
          <li key={category.name} onClick={() => handleCategoryClick(category)}>{category.name}</li>
        ))}
      </ul>
      {selectedCategory && <PokemonList categoryUrl={selectedCategory}  categoryName={selectedCategoryName}/>}

    </div>
  );
}

export default PokemonCategories;
 