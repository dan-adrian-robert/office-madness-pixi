import React from 'react';
import './App.css';
import {GameView} from "./components/MapEditorView";
import {GameEngine} from "./engine/GameEngine";

export const gameEngine: GameEngine = new GameEngine();

function App() {
  return (
      <GameView/>
  );
}

export default App;
