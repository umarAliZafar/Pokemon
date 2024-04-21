import React,{ useState, useEffect } from 'react';
import { useQuery } from 'react-query';

function PokemonDetails({ pokemon }) {
  const { data, isLoading, isError } = useQuery(['pokemon-details', pokemon.url], () =>
    fetch(pokemon.url).then((res) => res.json())
  );

  const [ApexChart, setApexChart] = useState(null);

  useEffect(() => {
    import('react-apexcharts').then((module) => {
      setApexChart(React.memo(module.default));  // Wrap with React.memo
    });
  }, []);

  if (isLoading) return <p>Loading details...</p>;
  if (isError) return <p>Error loading details.</p>;

  const pokemonData = data;

  // Extracting stats from the Pokemon data
  const stats = pokemonData.stats.map(stat => ({
    label: stat.stat.name.toUpperCase(),
    value: stat.base_stat,
  }));

  // Creating data for the chart
  const chartOptions = {
    xaxis: {
      categories: stats.map(stat => stat.label),
    },
    yaxis: {
      title: {
        text: 'Base Stats',
      },
    },
  };

  const chartSeries = [{
    name: 'Base Stats',
    data: stats.map(stat => stat.value),
  }];

  return (
    <div>
      <h3>{pokemon.name}</h3>
      <div style={{flexDirection:'row',display:'flex'}}>
      <img src={pokemonData.sprites.front_default} alt={pokemon.name} />
      <ul>
        {stats.map(stat => (
          <li key={stat.label}>{stat.label}: {stat.value}</li>
        ))}
      </ul>
      </div>
      <h3>Graphical Presentation</h3>
      {/* Bar Chart */}
      {ApexChart && (
        <ApexChart
          options={chartOptions}
          series={chartSeries}
          type="bar"
          height={350}
        />
      )}

      {/* Individual stats */}
      
    </div>
  );
}

export default PokemonDetails;
