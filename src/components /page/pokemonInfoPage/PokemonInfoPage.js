import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import classes from "./PokemonInfoPage.module.css";


const PokemonInfoPage = () => {
    const { id } = useParams();

    const [ pokemon, setPokemon ] = useState({});
    console.log(pokemon);
    const [ loading, setLoading ] = useState(false);

    const getPokemonById = async() => {
        setLoading(true);
        try {
            const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            return data;
        } catch(e) {
            console.log('Error', e.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
            getPokemonById().then(pokemon=>setPokemon(pokemon))
        }, [ id ]
    );


    return (
        <div>
            {
                loading
                    ?
                    <p>Загрузка</p>
                    :
                    <div className={classes.cards}>
                        <img style={{
                            width:"300px",
                            height:"300px",
                            paddingTop:"20px",
                            alignItems:"center"
                        }} src={pokemon?.sprites?.other?.dream_world?.front_default} alt="pokemon"/>
                       <div className={classes.card}>
                           <p>Name: {pokemon?.name}</p>
                           <p>Abilities: {pokemon?.abilities?.map(value=> value.ability.name).join(', ')}</p>
                           <p>Stats: {pokemon?.stats?.map(value=> value.stat.name).join(', ')}</p>
                           <p>Types: {pokemon?.types?.map(value=> value.type.name).join(', ')}</p>
                           <p>Some-moves: {pokemon?.moves?.slice(0,5).map(value=> value.move.name).join(', ')}</p>

                       </div>

                    </div>
            }
        </div>
    );
};

export default PokemonInfoPage;