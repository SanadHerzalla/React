import Player from "./component/Player";
import TimerChallenge from "./component/TimeChallenge";


function App() {
  return (
    <div id="content">
      <Player />
      <div id="challenges">
        <TimerChallenge 
          title="Easy" 
          targetTime={1}
          />

        <TimerChallenge 
          title="Meduim"
          targetTime={5}
        />
        <TimerChallenge
          title="getting tough"
          targetTime={10}
        />
        <TimerChallenge
          title="PROS ONLY"
          targetTime={15}
          />
      </div>
    </div>
  );
}

export default App;
