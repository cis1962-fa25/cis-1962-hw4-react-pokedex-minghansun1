import { useState } from 'react';
import { PokemonAPI } from '../api/PokemonAPI';
import '../App.css';
import type { BoxCardProps } from '../types/types';
import Modal from './Modal';

export function BoxDeleteForm(props: BoxCardProps) {
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const submitForm = async () => {
            try {
                const response = await PokemonAPI.deleteBoxEntry(String(props.entry.id));
                console.log('Box entry deleted:', response);
            } catch (err) {
                const errMessage = (err as Error).message;
                console.error('Error deleting box entry:', errMessage);
                setError(errMessage);
            }
        };
        submitForm();
        props.onDelete(props.entry.id);
    };

    return (
        <div className="form">
            <h2>Deleting {props.pokemon.name}...</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <p>Are you sure you want to delete this entry?</p>
                <input className="button" type="submit" value="Submit" />
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