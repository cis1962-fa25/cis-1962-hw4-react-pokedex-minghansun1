import type { Pokemon } from '../types/types';

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick: () => void;
}

export function PokemonCard(props: PokemonCardProps) {
    return (
        <div className="pokemon-card" onClick={props.onClick}>
            <h1>{props.pokemon.name}</h1>
            <br />
            <img src={props.pokemon.sprites.front_default} alt={props.pokemon.name} />
        </div>
    )
}

