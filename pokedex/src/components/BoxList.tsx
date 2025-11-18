import { useEffect, useState } from 'react';
import { PokemonAPI } from '../api/PokemonAPI';
import '../App.css';
import type { BoxCardProps, } from '../types/types';
import { BoxCard } from './BoxCard';
import Modal from './Modal';

export function BoxList(props: {update: number, onUpdate: () => void}) {
    const [boxCardProps, setBoxCardProps] = useState<BoxCardProps[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [idToNameMap, setIdToNameMap] = useState<Map<string, string>>(new Map());
    const [currPage, setCurrPage] = useState<number>(1);
    const [updated, setUpdated] = useState<boolean>(false);

    const getIdToNameMap = async (pokemonId: string) => {
        if (idToNameMap.has(pokemonId)) {
            return idToNameMap.get(pokemonId)!;
        }
        const localMap = new Map(idToNameMap);
        let localCurrPage = currPage;
        
        while (true) {
            const pokemonList = await PokemonAPI.getAllPokemon(localCurrPage);
            for (const pokemon of pokemonList) {
                localMap.set(pokemon.id.toString(), pokemon.name);
            }
            setIdToNameMap(new Map(localMap));

            localCurrPage += 1;
            
            if (localMap.has(pokemonId)) {
                setCurrPage(localCurrPage + 1);
                return localMap.get(pokemonId)!;
            }
        }
    }

    useEffect(() => {
        const fetchBoxes = async () => {
            try {
                setLoading(true);
                const boxEntryList = await PokemonAPI.getBoxEntries();
                const propsList: BoxCardProps[] = [];
                for (const id of boxEntryList) {
                    const boxEntry = await PokemonAPI.getBoxEntry(id);
                    const pokemonName = await getIdToNameMap(boxEntry.pokemonId.toString());
                    const pokemon = await PokemonAPI.getPokemonByName(pokemonName);
                    const boxCardProp: BoxCardProps = {
                        entry: boxEntry,
                        pokemon: pokemon,
                        onEdit: () => {setUpdated(true); props.onUpdate();},
                        onDelete: () => {setUpdated(true); props.onUpdate();},
                    };
                    propsList.push(boxCardProp);
                }
                setBoxCardProps(propsList);
                setLoading(false);
                setUpdated(false);
            } catch (err) {
                const errMessage = (err as Error).message;
                setError('Failed to fetch Pokemon.' + (err as Error).message);
                setError(errMessage);
                setLoading(false);
                console.log(err);
            }
        }
        fetchBoxes();
    }, [updated, props.update]);

    return (
        <div>
            <div>
                <h1>Box List</h1>
            </div>
            {loading ? (
                <div>
                    <h3>Loading...</h3>
                    <div className="spinner"></div>
                </div>
            ) : (
                <div>
                    {boxCardProps.map((props, index) => (
                        <div className="entry-card">
                            <BoxCard key={index} {...props} />
                        </div>
                    ))}
                </div>
            )}
            <Modal isOpen={error!=null} onClose={() => setError(null)}>
                <div>
                    <h3>Error fetching Pokemon:</h3>
                    <p>{error}</p>
                </div>
            </Modal>
        </div>
    )
}
