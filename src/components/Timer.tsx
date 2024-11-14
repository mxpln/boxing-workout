import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Bell } from 'lucide-react';

interface TimerProps {
  roundTime: number;
  restTime: number;
  rounds: number;
}

export default function Timer({ roundTime, restTime, rounds }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(roundTime);
  const [isActive, setIsActive] = useState(false);
  const [currentRound, setCurrentRound] = useState(1);
  const [isRest, setIsRest] = useState(false);

  useEffect(() => {
    let interval: number | undefined;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      const bell = new Audio('https://assets.mixkit.co/active_storage/sfx/2404/2404-preview.mp3');
      bell.play();
      
      if (isRest) {
        if (currentRound < rounds) {
          setCurrentRound((round) => round + 1);
          setTimeLeft(roundTime);
          setIsRest(false);
        } else {
          setIsActive(false);
        }
      } else {
        setTimeLeft(restTime);
        setIsRest(true);
      }
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, isRest, currentRound, rounds, roundTime, restTime]);

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(roundTime);
    setCurrentRound(1);
    setIsRest(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center space-y-6 w-full max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <div className="relative w-64 h-64">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-5xl font-bold text-gray-800">{formatTime(timeLeft)}</div>
        </div>
        <svg className="transform -rotate-90 w-full h-full">
          <circle
            className="text-gray-200"
            strokeWidth="12"
            stroke="currentColor"
            fill="transparent"
            r="120"
            cx="128"
            cy="128"
          />
          <circle
            className={`${isRest ? 'text-yellow-500' : 'text-blue-500'}`}
            strokeWidth="12"
            stroke="currentColor"
            fill="transparent"
            r="120"
            cx="128"
            cy="128"
            strokeDasharray={2 * Math.PI * 120}
            strokeDashoffset={2 * Math.PI * 120 * (1 - timeLeft / (isRest ? restTime : roundTime))}
          />
        </svg>
      </div>
      
      <div className="text-center space-y-2">
        <div className="text-2xl font-semibold text-gray-700">
          Round {currentRound}/{rounds}
        </div>
        <div className="text-lg font-medium text-gray-600">
          {isRest ? 'Rest Period' : 'Round in Progress'}
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={toggleTimer}
          className={`p-4 rounded-full ${
            isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
          } text-white transition-colors duration-200`}
        >
          {isActive ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <button
          onClick={resetTimer}
          className="p-4 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors duration-200"
        >
          <RotateCcw size={24} />
        </button>
      </div>
    </div>
  );
}