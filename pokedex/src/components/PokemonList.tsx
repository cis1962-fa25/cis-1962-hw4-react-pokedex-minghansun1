import { useEffect, useState } from 'react';
import { PokemonAPI } from '../api/PokemonAPI';
import type { Pokemon } from '../types/types';
import Modal from './Modal';
import { PokemonCard } from './PokemonCard';
import { PokemonDetails } from './PokemonDetails';

export function PokemonList() {
    const [pokemon, setPokemon] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

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
        setModalOpen(true);
        setSelectedPokemon(pokemon);
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
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                <PokemonDetails pokemon={selectedPokemon!} onClick={() => {}} />
            </Modal>
        </div>
    )
}

