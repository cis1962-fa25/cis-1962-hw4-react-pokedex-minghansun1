import { useState } from 'react';
import './App.css';
import { BoxList } from './components/BoxList';
import { PokemonList } from './components/PokemonList';

function App() {
  const [state, setState] = useState<'pokemon' | 'box'>('pokemon');
  const [update, setUpdate] = useState<number>(0);

  const onUpdate = () => {
    setUpdate(update + 1);
  };
  
  const setStatePokemon = () => {
    setState('pokemon');
  };

  const setStateBox = () => {
    setState('box');
  };

  return (
    <div>
      <button className="button" onClick={setStatePokemon}>All Pokemon</button>
      <button className="button" onClick={setStateBox}>My Box</button>
      <div style={{ display: state === 'pokemon' ? 'block' : 'none' }}>
        <PokemonList update={update} onUpdate={onUpdate} />
      </div>

      <div style={{ display: state === 'box' ? 'block' : 'none' }}>
        <BoxList update={update} onUpdate={onUpdate} />
      </div>
    </div>
  );
}

export default App
