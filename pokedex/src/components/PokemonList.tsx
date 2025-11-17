import { useEffect, useState } from 'react';
import { PokemonAPI } from '../api/PokemonAPI';
import '../App.css';
import type { Pokemon } from '../types/types';
import Modal from './Modal';
import { PokemonCard } from './PokemonCard';
import { PokemonDetails } from './PokemonDetails';

export function PokemonList(props: {update: number, onUpdate: () => void}) {
    const [pokemon, setPokemon] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
    const [updated, setUpdated] = useState<boolean>(false);

    useEffect(() => {
        const fetchPokemon = async () => {
            setLoading(true);
            try {
                const pokemonList = await PokemonAPI.getAllPokemon(currentPage);
                setPokemon(pokemonList);
                setLoading(false);
            } catch (err) {
                const errMessage = (err as Error).message;
                setError('Failed to fetch Pokemon.' + (err as Error).message);
                setError(errMessage);
                setLoading(false);
                console.log(err);
            }
        }
        fetchPokemon();
    }, [currentPage, props.update, updated]);

    const handleCardClick = (pokemon: Pokemon) => {
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
                <h1>Pokemon List</h1>
            </div>
            <button onClick={handlePrevClick} disabled={currentPage === 1}>Previous</button>
            <button onClick={handleNextClick}>Next</button>
            {loading ? (
                <div>
                    <h3>Loading...</h3>
                    <div className="spinner"></div>
                </div>
            ) : (
                <div>
                    {pokemon.map(p => (
                    <PokemonCard key={p.id} pokemon={p} onClick={() => handleCardClick(p)} />
                    ))}
                </div>
            )}
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                <PokemonDetails pokemon={selectedPokemon!} onClick={() => {}} onCatch={() => {setUpdated(true); setModalOpen(false); props.onUpdate();}} />
            </Modal>
            <Modal isOpen={error!=null} onClose={() => setError(null)}>
                <div>
                    <h3>Error fetching Pokemon:</h3>
                    <p>{error}</p>
                </div>
            </Modal>
        </div>
    )
}
