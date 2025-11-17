import { useEffect, useState } from 'react';
import type { BoxCardProps } from '../types/types';
import Modal from './Modal';
import { BoxEditForm } from './BoxEditForm';
import { BoxDeleteForm } from './BoxDeleteForm';


export function BoxCard(props: BoxCardProps) {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [editing, setEditing] = useState<boolean>(false);
    const [deleting, setDeleting] = useState<boolean>(false);

    useEffect(() => {
        const fetchBox = async () => {
            setLoading(true);
            try {
                setLoading(false);
            } catch (err) {
                const errMessage = (err as Error).message;
                setError('Failed to fetch Pokemon.' + (err as Error).message);
                setError(errMessage);
                setLoading(false);
                console.log(err);
            }
        }
        fetchBox();
    }, []);

    const handleEdit = () => {
        setEditing(true);
    }

    const handleDelete = () => {
        setDeleting(true);
    }

    return (
        <div>
            {loading ? (
                <div>
                    <h3>Loading...</h3>
                    <div className="spinner"></div>
                </div>
            ) : (
                <div>
                    <h2>{props.pokemon.name}</h2>
                    <br />
                    <img src={props.pokemon.sprites.front_default} alt={props.pokemon.name} />
                    <br />
                    <p> Catch Location: {props.entry.location}</p>
                    <p> Catch Date: {new Date(props.entry.createdAt).toLocaleDateString()}</p>
                    <p> Level: {props.entry.level}</p>
                    <p> Notes: {props.entry.notes}</p>
                    <br />
                    <button onClick={handleEdit}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                    <Modal isOpen={editing} onClose={() => setEditing(false)}>
                        <BoxEditForm entry = {props.entry} pokemon={props.pokemon} onEdit={props.onEdit} onDelete={props.onDelete} />
                    </Modal>
                    <Modal isOpen={deleting} onClose={() => setDeleting(false)}>
                        <BoxDeleteForm entry = {props.entry} pokemon={props.pokemon} onEdit={props.onEdit} onDelete={props.onDelete} />
                    </Modal>
                    <Modal isOpen={error!=null} onClose={() => setError(null)}>
                        <div>
                            <h3>Error fetching Pokemon:</h3>
                            <p>{error}</p>
                        </div>
                    </Modal>
                </div>
            )}
        </div>
    )
}

