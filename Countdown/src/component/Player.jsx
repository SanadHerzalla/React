import { useState, useRef } from "react";
import Header from "./Header";

export default function Player() {
    const playerName = useRef();
    const [enteredPlayenName, setPlayerName] = useState(null);

    function handelCLick(){
        setPlayerName(playerName.current.value);
    }
    return (
    <div id="content">
        <Header/>
      <section id="player">
        <h2>Welcome {enteredPlayenName ?? 'unknown entity'}</h2>
        <p>
          <input 
            ref={playerName} 
            type="text" 
            />
          <button onClick={handelCLick}>Set Name</button>
        </p>
      </section>
    </div>
    );
  }
  