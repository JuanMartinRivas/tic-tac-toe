import { useState } from 'react'
import './App.css'

function App() {
  const [gameActive, setGameActive] = useState(true);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [gameState, setGameState] = useState(['', '', '', '', '', '', '', '', '']);
  const [status, setStatus] = useState(`It's ${currentPlayer}'s turn`);

  const winningMessage = () => `Player ${currentPlayer} has won!`;
  const drawMessage = () => `Game ended in a draw!`;
  const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

  const winningConditions = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // top left to bottom right diagonal
    [2, 4, 6], // top right to bottom left diagonal
  ];

  const handleCellClick = (e) => {
    const clickedCell = e.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('tabindex'));

    if (gameState[clickedCellIndex] !== '' || !gameActive) {
      return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
  }

  const handleCellPlayed = (clickedCell, clickedCellIndex) => {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
  }

  const handleResultValidation = () => {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
      const winCondition = winningConditions[i];
      const a = gameState[winCondition[0]];
      const b = gameState[winCondition[1]];
      const c = gameState[winCondition[2]];
      if (a === '' || b === '' || c === '') {
        continue;
      }
      if (a === b && b === c) {
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      setStatus(winningMessage());
      setGameActive(false);
      return;
    }

    let roundDraw = !gameState.includes('');
    if (roundDraw) {
      setStatus(drawMessage());
      setGameActive(false);
      return;
    }

    handlePlayerChange();
  }

  const handlePlayerChange = () => {
    currentPlayer === 'X' ? setCurrentPlayer('O') : setCurrentPlayer('X');
    setStatus(currentPlayerTurn());
  }

  const handleRestartGame = () => {
    setGameActive(true);
    setCurrentPlayer('X');
    setGameState(['', '', '', '', '', '', '', '', '']);
    setStatus(currentPlayerTurn());
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = '');
  }

  return (
    <>
      <header className="App-header">
        <title>Tic Tac Toe</title>
      </header>
      <main>
        <h1 className='title'>Tic Tac Toe</h1>
        <div className='container'>
          <div tabIndex={0} className='cell' onClick={handleCellClick}></div>
          <div tabIndex={1} className='cell' onClick={handleCellClick}></div>
          <div tabIndex={2} className='cell' onClick={handleCellClick}></div>
          <div tabIndex={3} className='cell' onClick={handleCellClick}></div>
          <div tabIndex={4} className='cell' onClick={handleCellClick}></div>
          <div tabIndex={5} className='cell' onClick={handleCellClick}></div>
          <div tabIndex={6} className='cell' onClick={handleCellClick}></div>
          <div tabIndex={7} className='cell' onClick={handleCellClick}></div>
          <div tabIndex={8} className='cell' onClick={handleCellClick}></div>
        </div>
        <h2 className='game-status'>{status}</h2>
        <button className='game-restart' onClick={handleRestartGame}>Restart Game</button>
      </main>
    </>
  )
}

export default App
