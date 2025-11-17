import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { PokemonList } from './components/PokemonList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PokemonList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
