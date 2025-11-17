import { useEffect, useState } from 'react';
import { PokemonAPI } from '../api/pokemonApi';
import type { Pokemon } from '../types/types';
import { PokemonCard } from './PokemonCard';

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick: () => void;
}

export function PokemonList() {
    const [pokemon, setPokemon] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        const fetchPokemon = async () => {
            setLoading(true);
            const pokemonList = await PokemonAPI.getAllPokemon(currentPage);
            setPokemon(pokemonList);
            setLoading(false);
        }
        fetchPokemon();
    }, [currentPage]);

    const handleCardClick = (pokemon: Pokemon) => {
        console.log('Clicked Pokemon:', pokemon.name);
    }

    const handlePrevClick = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    const handleNextClick = () => {
        setCurrentPage(currentPage + 1);
    }

    return (
        <div>
            <div>
                <h2>Pokemon List</h2>
            </div>
            <button onClick={handlePrevClick} disabled={currentPage === 1}>Previous</button>
            <button onClick={handleNextClick}>Next</button>
            <div>
                {pokemon.map(p => (
                    <PokemonCard key={p.id} pokemon={p} onClick={() => handleCardClick(p)} />
                ))}
            </div>
        </div>
    )
}

