import React, {Component} from 'react';
import axios from "axios";
import PokemonCard from "../../pokemonCard/PokemonCard";
import Pagination from "../../pagination /Pagination";
import classes from "./PokemoPage.module.css";
class PokemonPageClass extends Component {
    constructor() {
        super();
        this.state = {
            pokemonList: [],
            loading:false,
            limit:10,
            offset:1
        }
    }
    handleNext =  () => {
        this.setState(prev=>({offset: prev.offset + this.state.limit}))
    }

    handlePrev =  () => {
        this.setState(prev=>({offset: prev.offset - this.state.limit}))
    }

    getPokemonsList = async(limit, offset) => {
        this.setState({loading: true});

        try {
            const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`);
            return this.setState({pokemonList: data.results})
        } catch(e) {
            console.log('Error', e.message);
        } finally {
            this.setState({loading: false});

        }
    };
    componentDidMount() {
        this.getPokemonsList(this.state.limit, this.state.offset)
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.offset !== this.state.offset) {
            this.getPokemonsList(this.state.limit, this.state.offset)
        }
    }
    render() {
        const {pokemonList, loading, offset, limit} = this.state
        const page = Math.floor(offset / limit) +1

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
                            <Pagination handleNext={this.handleNext} page={page} handlePrev={this.handlePrev}/>

                        </>


                }
            </>
        )
    }
}

export default PokemonPageClass;