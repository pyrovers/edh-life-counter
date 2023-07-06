import './App.css';
import { Game } from './features/game/Game';

import { useEffect } from 'react';
import { setLocalStorageValue } from './utils/localStorage';
import { ConfigProvider } from './features/config/ConfigProvider';

const App = () => {
  // const rootState = useAppSelector(selectRoot);

  // // ローカルストレージから状態を復帰する
  // useEffect(() => {
  //   const beforeUnload = (event: BeforeUnloadEvent) => {
  //     setLocalStorageValue(rootState);
  //   };
  //   window.addEventListener('beforeunload', beforeUnload);
  //   return () => {
  //     window.removeEventListener('beforeunload', beforeUnload);
  //   };
  // }, [rootState]);

  return (
    <div className="App">
      <main className="App-header">
        <ConfigProvider>
          <Game />
        </ConfigProvider>
      </main>
    </div>
  );
};

export default App;
