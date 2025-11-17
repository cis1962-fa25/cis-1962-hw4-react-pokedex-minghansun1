import { useState } from 'react';
import { PokemonAPI } from '../api/PokemonAPI';
import '../App.css';
import type { InsertBoxEntry, PokemonCardProps } from '../types/types';
import Modal from './Modal';

export function CatchForm(props: PokemonCardProps & {onCatch: () => void}) {
    const [location, setLocation] = useState('');
    const [level, setLevel] = useState<number | ''>('');
    const [createdAt, setCreatedAt] = useState(new Date().toISOString().slice(0, 10));
    const [notes, setNotes] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!location.trim()) {
            setError('Location is required.');
            return;
        }

        const parsedLevel = typeof level === 'string' ? parseInt(level) : level;
        if (isNaN(parsedLevel) || parsedLevel < 1 || parsedLevel > 100) {
            setError('Level must be a number between 1 and 100.');
            return;
        }

        const dateObj = new Date(createdAt);
        if (isNaN(dateObj.getTime())) {
            setError('CreatedAt must be a valid date.');
            return;
        }

        const formData: InsertBoxEntry = {
            pokemonId: props.pokemon.id,
            location,
            level: parsedLevel,
            createdAt: dateObj.toISOString(),
            notes,
        };

        console.log('Submitting:', formData);

        const submitForm = async () => {
            try {
                const response = await PokemonAPI.addBoxEntry(formData);
                console.log('Box entry added:', response);
            } catch (err) {
                const errMessage = (err as Error).message;
                console.error('Error adding box entry:', errMessage);
                setError(errMessage);
            }
        };
        submitForm();
        props.onCatch();
    };

    return (
        <div>
            <h2>Catching {props.pokemon.name}...</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    pokemonId:
                    <input type="number" value={props.pokemon.id} disabled />
                </label>
                <br />
                <label>
                    location:
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    createdAt:
                    <input
                        type="date"
                        value={createdAt}
                        onChange={(e) => setCreatedAt(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    level:
                    <input
                        type="number"
                        value={level}
                        onChange={(e) => setLevel(Number(e.target.value))}
                        min={1}
                        max={100}
                    />
                </label>
                <br />
                <label>
                    notes:
                    <input
                        type="text"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </label>
                <br />
                <input type="submit" value="Submit" />
            </form>
            <Modal isOpen={error!=null} onClose={() => setError(null)}>
                <div>
                    <h3>Error catching Pokemon:</h3>
                    <p>{error}</p>
                </div>
            </Modal>
        </div>
    );
}