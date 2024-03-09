import React, { useEffect, useState } from 'react';
import axios from 'axios';
import classes from './PokemonCard.module.css';
import { Link } from 'react-router-dom';


const PokemonCard = ({pokemon}) => {
    const [pokemonOne, setPokemonOne] = useState({})
    const getPokemon = async () => {
        try {
            const { data } = await axios.get(pokemon.url)
            return data
        } catch(e) {
            console.log('Error', e.message);
        }
    }

    useEffect(() => {
        getPokemon().then(pokemon=>setPokemonOne(pokemon))
    }, [[]]);

    return (
        <div className={classes.pokemons}>
        <li className={classes.info} style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "350px",
            height: "450px",
            border: "5px solid rgb(248,233,54)",
            borderRadius: "800px",
            backgroundColor:"rgba(3,3,3,0.32)",
            overflow: "hidden",
        }}>
            <div style={{
                width: "300px",
                height: "300px",
                borderRadius: "50%",
                overflow: "hidden",
                marginBottom: "10px",
            }}>
                <img style={{
                    width: "100%",
                    height: "100%",
                }} src={pokemonOne?.sprites?.other?.dream_world?.front_default} alt="" />
            </div>
            <div style={{
                textAlign: "center",




            }}>
                <p style={{
                    fontWeight:"bold",
                    fontSize:"25px",
                    color:"rgb(248,233,54)",
                }}>{pokemon.name}</p>
                <Link className={classes.link} to={`/pokemon/${pokemonOne.id}`}>подробнее</Link>
            </div>
        </li>
        </div>


    );
};

export default PokemonCard;