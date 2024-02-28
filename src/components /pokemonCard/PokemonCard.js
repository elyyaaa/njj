import React, { useState, useEffect } from 'react';

const PokemonCard = ({ pokemon }) => {
    const [pokemonData, setPokemonData] = useState(null);

    useEffect(() => {
        const fetchPokemonData = async () => {
            try {
                const response = await fetch(pokemon.url);
                const data = await response.json();
                setPokemonData(data);
            } catch (error) {
                console.error('Error fetching Pokemon data:', error);
            }
        };

        fetchPokemonData();
    }, [pokemon.url]);

    return (
        <div className="pokemon-card">
            {pokemonData && (
                <>
                    <h3>{pokemonData.name}</h3>
                    <img
                        src={pokemonData.sprites.other.dream_world.front_default}
                        alt={pokemonData.name}
                    />
                </>
            )}
        </div>
    );
};

export default PokemonCard;
