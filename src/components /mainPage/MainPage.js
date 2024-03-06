
import React, { useState, useEffect } from 'react';
import PokemonCard from "../pokemonCard/PokemonCard";
import Pagination from "../pagination /Pagination";

const MainPage = () => {
    const [pokemonData, setPokemonData] = useState([]);
    const [totalPokemon, setTotalPokemon] = useState(0);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchPokemonPage = async () => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${(page - 1) * 10}`);
                const data = await response.json();
                setPokemonData(data.results);
                setTotalPokemon(data.count);
            } catch (error) {
                console.error("error fetching pokemon page", error);
            }
        };

        fetchPokemonPage();
    }, [page]);

    const handleNext = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const handlePrev = () => {
        setPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    return (
        <div>

            {pokemonData.map((pokemon) => (
                <PokemonCard key={pokemon.name} pokemon={pokemon} />
            ))}

            <Pagination
                handleNext={handleNext}
                handlePrev={handlePrev}
                page={page}
                total={totalPokemon}
            />
        </div>
    );
};

export default MainPage;
