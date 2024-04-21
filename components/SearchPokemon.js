function SearchPokemon({ onSearch }) {
    const handleSearch = (e) => {
      onSearch(e.target.value);
    };
  
    return (
      <div>
        <input type="text" placeholder="Search Pokemon" onChange={handleSearch} />
      </div>
    );
  }
  
  export default SearchPokemon;
  