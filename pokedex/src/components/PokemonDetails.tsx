import { useState } from 'react';
import type { PokemonCardProps } from '../types/types';
import Modal from './Modal';
import { CatchForm } from './CatchForm';


export function PokemonDetails(props: PokemonCardProps & {onCatch: () => void}) {
    const [catching, setCatching] = useState<boolean>(false);

    const handleCatch = () => {
        setCatching(true);
    }

    return (
        <div className="pokemon-card" onClick={props.onClick}>
            <h1>{props.pokemon.name}</h1>
            <button className="button" onClick={handleCatch}>Catch</button>
            <br />
            <img src={props.pokemon.sprites.front_default} alt={props.pokemon.name} />
            <br />
            {props.pokemon.types.map((type) => (
                <span key={type.name} style={{ marginRight: '8px', padding: '4px', border: '1px solid black', borderRadius: '4px', color: type.color}}>
                    {type.name}
                </span>
            ))}
            <h2>Stats</h2>
            <ul>
                <li>HP: {props.pokemon.stats.hp}</li>
                <li>Speed: {props.pokemon.stats.speed}</li>
                <li>Attack: {props.pokemon.stats.attack}</li>
                <li>Defense: {props.pokemon.stats.defense}</li>
                <li>Special Attack: {props.pokemon.stats.specialAttack}</li>
                <li>Special Defense: {props.pokemon.stats.specialDefense}</li>
            </ul>
            <h2>Moves</h2>
            <div style={{ maxHeight: '150px', overflowY: 'auto', border: '1px solid #ddd', padding: '8px', borderRadius: '4px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc', padding: '4px' }}>Name</th>
                            <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc', padding: '4px' }}>Power</th>
                            <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc', padding: '4px' }}>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.pokemon.moves.map((move) => (
                            <tr key={move.name}>
                                <td style={{ padding: '4px', borderBottom: '1px solid #eee' }}>{move.name}</td>
                                <td style={{ padding: '4px', borderBottom: '1px solid #eee' }}>{move.power ?? '-'}</td>
                                <td style={{ padding: '4px', borderBottom: '1px solid #eee' }}>
                                    {move.type?.name ? (
                                        <span style={{ display: 'inline-block', padding: '2px 6px', borderRadius: '4px', backgroundColor: move.type?.color ?? '#f0f0f0' }}>
                                            {move.type.name}
                                        </span>
                                    ) : (
                                        '-'
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Modal isOpen={catching} onClose={() => setCatching(false)}>
                <CatchForm pokemon={props.pokemon} onClick={() => {}} onCatch={props.onCatch}  />
            </Modal>
        </div>
    )
}

