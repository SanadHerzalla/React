import { useState, useEffect } from "react";
export default function Player({ name, symbol, isActive, onChangeName }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(name);

  useEffect(() => {
    setPlayerName(name);
  }, [name]);

  function handleEditClick() {
    setIsEditing(true);
  }

  function handleSaveClick() {
    setIsEditing(false);
    onChangeName(symbol, playerName);
  }

  function handleNameChange(event) {
    setPlayerName(event.target.value);
  }

  let playerNameField = <span className="player-name">{name}</span>;
  if (isEditing) {
    playerNameField = (
      <input
        type="text"
        required
        value={playerName}
        onChange={handleNameChange}
      />
    );
  }

  return (
    <li className={isActive ? 'active' : undefined }>
      <span className="player">
        {playerNameField}
        <span className="player-symbol">{symbol}</span>
      </span>
      {isEditing ? (
        <button onClick={handleSaveClick}>Save</button>
      ) : (
        <button onClick={handleEditClick}>Edit</button>
      )}
    </li>
  );
}