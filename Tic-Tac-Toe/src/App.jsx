import Player from "./component/Player";
import GameBoard from "./component/GameBoard";
import { useState } from "react";
import Log from "./component/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./component/GameOver";
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns){
  let currentPlayer = 'X';

  if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
    currentPlayer = 'O';
  } else if(gameTurns.length > 0 && gameTurns[0].player === 'O'){
    currentPlayer = 'X';
  }

  return currentPlayer;
}

function App() {
  const [players, setPlayers] = useState({
    X: 'Player 1',
    O: 'Player 2',
  });
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);

  const gameBoard = initialGameBoard.map((row) => [...row]);

  for (const turn of gameTurns) {
      const { square, player } = turn;
      const { row, column } = square;

      gameBoard[row][column] = player;
  }
  
  let winner = null;

  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]

    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
      winner = players[firstSquareSymbol];
    }
  }

  const hasDraw = gameTurns.length === 9 && winner === null;

  function handleSelectSquare(rowIndex, colIndex){
    if(winner !== null || hasDraw || gameBoard[rowIndex][colIndex] !== null){
      return;
    }
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [{ 
        square : {row: rowIndex, column: colIndex}, 
        player: currentPlayer},
        ...prevTurns  
      ]; 
    
      return updatedTurns;
    });
  }

  function handleRestart(){
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName){
    setPlayers(prevPlayers => {
      return{
        ...prevPlayers,
        [symbol]: newName
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player 
            name={players.X} 
            symbol="X" 
            isActive={activePlayer === 'X'}
            onChangeName={handlePlayerNameChange}
          />
          <Player 
            name={players.O} 
            symbol="O" 
            isActive={activePlayer === 'O'}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} hasDraw={hasDraw} onRestart={handleRestart}/>}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} disabled={winner !== null || hasDraw}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  ); 
}
  
export default App;