


export default function GameBoard({onSelectSquare, board, disabled}) {
    

//   const [gameBoard, setGameBoard] = useState(initialGameBoard);

//   function handleSelectSquare(rowIndex, colIndex) {
//     setGameBoard((prevGameBoard) => {
//       const updatedBoard = prevGameBoard.map((row) => [...row]);

//       if (updatedBoard[rowIndex][colIndex]) {
//         return updatedBoard;
//       }

//       updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
//       return updatedBoard;
//     });
//     onSelectSquare();
//   }



  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => onSelectSquare(rowIndex, colIndex)} disabled={playerSymbol !== null || disabled}>{playerSymbol}</button>
              </li>
            ))}
          </ol> 
        </li>
      ))}
    </ol>
  );
}

