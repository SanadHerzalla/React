import { useEffect, useRef, useState } from "react";
import ResultModal from './ResultModal.jsx';

export default function TimerChallenge({ title, targetTime }) {
    const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
    const timer = useRef();
    const dialog = useRef();

    const timerIsActive =
        timeRemaining > 0 && timeRemaining < targetTime * 1000;

    useEffect(() => {
        if (timeRemaining <= 0) {
            clearInterval(timer.current);
            dialog.current.showModal();    
        }
    }, [timeRemaining]);


    function handelReset(){
        setTimeRemaining(targetTime * 1000);
    }

    function handleStart() {
        if (timer.current) clearInterval(timer.current);

        setTimeRemaining(targetTime * 1000); 
        timer.current = setInterval(() => {
            setTimeRemaining(prev => prev - 10);
        }, 10);
    }
    

    function handleStop() {
        clearInterval(timer.current);
        dialog.current.showModal();
    }

    return (
        <>
            <ResultModal
                dialogRef={dialog}
                targetTime={targetTime}
                remainingTime={timeRemaining}
                onReset = {handelReset}
            />

            <section className="challenge">
                <h2>{title}</h2>

                <p className="challenge-time">
                    {targetTime} second{targetTime > 1 ? 's' : ''}
                </p>

                <p>
                    <button onClick={timerIsActive ? handleStop : handleStart}>
                        {timerIsActive ? "Stop" : "Start"} Challenge
                    </button>
                </p>

                <p className={timerIsActive ? "active" : undefined}>
                    {timerIsActive ? "Time is running" : "Time inactive"}
                </p>
            </section>
        </>
    );
}
