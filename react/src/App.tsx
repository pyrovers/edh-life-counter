import './App.css';
import { Game } from './features/game/Game';

import { useEffect } from 'react';
import { setLocalStorageValue } from './utils/localStorage';
import { selectRoot } from './app/store';
import { useAppSelector } from './app/hooks';

const App = () => {
  const rootState = useAppSelector(selectRoot);

  useEffect(() => {
    const beforeUnload = (event: BeforeUnloadEvent) => {
      setLocalStorageValue(rootState);
    };
    window.addEventListener('beforeunload', beforeUnload);
    return () => {
      window.removeEventListener('beforeunload', beforeUnload);
    };
  }, [rootState]);

  return (
    <div className="App">
      <main className="App-header">
        <Game />
      </main>
    </div>
  );
};

export default App;
