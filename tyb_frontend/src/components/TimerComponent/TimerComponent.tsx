import React, {useEffect, useState} from 'react';
import './TimerComponent.scss';


interface TimerProps {
    onTimeout: () => void;
    remainingTime: number;
    setRemainingTime: (time: (prevTime:number) => number) => void;
}

const TimerComponent: React.FC<TimerProps> = ({ onTimeout, remainingTime, setRemainingTime}) => {


    useEffect(() => {
        const timerId = setInterval(() => {
            setRemainingTime(prevTime => {
                const newTime = prevTime - 1;
                if (newTime <= 0) {
                    clearInterval(timerId);
                    onTimeout();
                }
                return newTime;
            });
        }, 1000);

        return () => clearInterval(timerId);
    }, [onTimeout]);

    const formatTime = (time: number): string => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="timer">
            <span className="time">{formatTime(remainingTime)}</span>
        </div>
    );
};

export default TimerComponent;
