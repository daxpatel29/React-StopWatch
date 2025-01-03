import React, { useEffect, useState } from 'react';

const Stopwatch = () => {
    let [flag, setFlag] = useState(true);
    let [hour, setHour] = useState(0);
    let [minute, setMinute] = useState(0);
    let [second, setSecond] = useState(0);
    let [time, setTime] = useState(0);

    let id;

    const divideTime = () => {
        if (time > 0) {
            
            setHour(Math.floor(time / 60));
            setMinute(time % 60);
            setSecond(0); 
            setTime(0);
            setFlag(false); 
        } else {
            clearInterval(id);
            setFlag(true);
            
            
        }
    };

    const resetTime = () => {
        clearInterval(id);
        setHour(0);
        setMinute(0);
        setSecond(0);
        setTime(0);
        setFlag(true);
    }


    useEffect(() => {
        if (!flag) {
            id = setInterval(() => {
                if (second > 0) {
                    setSecond(second-1);
                } else if (minute > 0) {
                    setSecond(59);
                    setMinute(minute-1);
                } else if (hour > 0) {
                    setSecond(59);
                    setMinute(59);
                    setHour(hour-1);
                } else {
                    clearInterval(id);
                    setFlag(true);
                }
            }, 1000);
        }

        return () => clearInterval(id); 
    }, [flag, hour, minute, second]);

    return (
        <div>
            <input
                type="number"
                onChange={(e) => setTime(Number(e.target.value))}
                disabled={!flag} 
            />

            <h1>
                {hour}:{minute}:{second}
            </h1>

            <button onClick={divideTime}>{flag ? 'Start' : 'Stop'}</button>
            <button onClick={resetTime}>Reset</button>
        </div>
    );
};

export default Stopwatch;