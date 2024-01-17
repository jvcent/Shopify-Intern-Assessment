import React from 'react';
import StopWatch from './StopWatch';
import StopWatchButton from './StopWatchButton';
import { useRef, useState } from "react";
import "./styles.css";

import '@shopify/polaris/build/esm/styles.css';

export default function App() {
    // timer is for stopwatch display, lapTimer is to track lap durations
    const [timer, setTimer] = useState(0);
    const [lapTimer, setLapTimer] = useState(0);

    const [isRunning, setIsRunning] = useState(false);
    const [laps, setLaps] = useState([]);

    let timeInterval = useRef(null);
    let lapInterval = useRef(null);

    /**
     * This function formats the stopWatch time into minutes, seconds, and miliseconds.
     *
     * @param {string} timer The current time to be displayed on the stopWatch.
     * @returns {Object} An object containing the properly formatted time values.
     */
    const formatTime = (timer: number) => {
        const minutes = Math.floor(timer / 60000)
        .toString()
        .padStart(2, "0");
        const seconds = Math.floor((timer / 1000) % 60)
        .toString()
        .padStart(2, "0");
        const milliseconds = (timer % 1000).toString().padStart(3, "0");

        return { minutes, seconds, milliseconds };
    };

    /**
     * This function starts the stopwatch and the lap timer
     */
    const handleStart = () => {
        if (isRunning) return;
        setIsRunning(true);
        timeInterval.current = setInterval(() => {
        setTimer((prev) => prev + 10);
        }, 10);
    };
    
    /**
     * This function pauses the stopwatch and the lap timer
     */
    const handlePause = () => {
        if (!isRunning) return;
        setIsRunning(false);
        clearInterval(timeInterval.current);
    };

    /**
     * This function resets the stopwatch and the lap timer to zero
     */
    const handleReset = () => {
        setIsRunning(false);
        clearInterval(timeInterval.current);
        setTimer(0);
    };

    const { minutes, seconds, milliseconds } = formatTime(timer);

    return(
        <div className="wrapper">
            <StopWatch minutes={minutes} seconds={seconds} milliseconds={milliseconds}  />
            <div className="button-container">
                <StopWatchButton label="START" onClick={handleStart} />
                <StopWatchButton label="PAUSE" onClick={handlePause} />
                <StopWatchButton label="RESET" onClick={handleReset} />
            </div>
            <div className="lap-container">
                {laps.map((lap) => {
                    return <p>{lap}</p>
                })}
            </div>
        </div>
    )
}