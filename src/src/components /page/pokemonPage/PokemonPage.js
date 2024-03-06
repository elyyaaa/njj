import React, {useEffect, useState} from 'react';
import axios from 'axios';
import PokemonCard from "../../pokemonCard/PokemonCard";
import Pagination from "../../pagination /Pagination";
import classes from "../pokemonPage/PokemoPage.module.css";


const PokemonPage = () => {
    const [ pokemonList, setPokemonList ] = useState([]);
    const [ loading, setLoading ] = useState(false);

    const [offset, setOffset] = useState(1)
    const [limit, setLimit] = useState(10)

    const handleNext =  () => {
        setOffset(prev=>prev+limit)
    }
    const handlePrev =  () => {
        setOffset(prev=>prev-limit)
    }

    const page = Math.floor(offset/limit)+1
    const getPokemonsList = async() => {
        setLoading(true);

        try {
            const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`);
            return data.results;
        } catch(e) {
            console.log('Error', e.message);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        getPokemonsList().then((pokemonList) => setPokemonList(pokemonList));
    }, [limit, offset]);

    return (
        <>
            {
                loading
                    ?
                    <p>Loading</p>
                    :
                    <>
                        <ul className={classes.list}>
                            {pokemonList.map(pokemon => <PokemonCard key={pokemon.name} pokemon={pokemon}/>)}
                        </ul>
                        <Pagination handleNext={handleNext} page={page} handlePrev={handlePrev}/>

                    </>


            }
        </>
    );
};

export default PokemonPage;