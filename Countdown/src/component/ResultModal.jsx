import { use } from "react";
import {createPortal} from 'react-dom';
export default function ResultModal({ dialogRef, targetTime, remainingTime, onReset }) {
    const userLost = remainingTime <= 0;
    const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
    const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);
    function handleClose() {
        onReset();              
    }

    return (
        <dialog ref={dialogRef} className="result-modal">
            {userLost && <h2>You Lost!</h2>}
            {!userLost && <h2>Your Score: {score}</h2>}
            <p>The target time was <strong>{targetTime} seconds.</strong>.</p>
            <p>You stopped the timer with <strong>{formattedRemainingTime} seconds left.</strong></p>

            <form method="dialog">
                <button onClick={handleClose}>Close</button>
            </form>
        </dialog>
    );
}
