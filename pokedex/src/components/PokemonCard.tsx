import type { PokemonCardProps } from '../types/types';


export function PokemonCard(props: PokemonCardProps) {

    return (
        <div className="pokemon-card" onClick={props.onClick}>
            <h2>{props.pokemon.name}</h2>
            <br />
            <img src={props.pokemon.sprites.front_default} alt={props.pokemon.name} />
        </div>
    )
}

