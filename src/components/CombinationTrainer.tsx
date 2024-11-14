import React, { useState, useEffect } from 'react';
import { Dumbbell, RefreshCw, Shield, Zap } from 'lucide-react';

interface Combination {
  id: number;
  combo: string;
  code: string;
  type: 'basic' | 'advanced' | 'defensive' | 'counter';
  description: string;
  focus: string[];
}

const combinations: Combination[] = [
  // Basic Combinations
  { id: 1, combo: 'Jab - Cross', code: '1-2', type: 'basic', description: 'Classic power combo', focus: ['Speed', 'Power'] },
  { id: 2, combo: 'Jab - Cross - Hook', code: '1-2-3', type: 'basic', description: 'Basic three-punch combo', focus: ['Flow', 'Power'] },
  { id: 3, combo: 'Double Jab - Cross', code: '1-1-2', type: 'basic', description: 'Distance setup combo', focus: ['Speed', 'Setup'] },
  
  // Advanced Combinations
  { id: 4, combo: 'Jab - Cross - Hook - Cross', code: '1-2-3-2', type: 'advanced', description: 'Power finishing combo', focus: ['Power', 'Stamina'] },
  { id: 5, combo: 'Jab - Body Hook - Hook', code: '1-3b-3', type: 'advanced', description: 'Level change attack', focus: ['Timing', 'Body Work'] },
  { id: 6, combo: 'Cross - Hook - Cross', code: '2-3-2', type: 'advanced', description: 'Power combination', focus: ['Power', 'Speed'] },
  
  // Defensive Combinations
  { id: 7, combo: 'Slip Left - Right Hook - Cross', code: 'SL-3-2', type: 'defensive', description: 'Counter after slip', focus: ['Defense', 'Counters'] },
  { id: 8, combo: 'Block - Jab - Cross - Hook', code: 'B-1-2-3', type: 'defensive', description: 'Block and counter', focus: ['Defense', 'Timing'] },
  { id: 9, combo: 'Duck - Body Hook - Hook', code: 'D-3b-3', type: 'defensive', description: 'Duck under and attack', focus: ['Defense', 'Body Work'] },
  
  // Counter Combinations
  { id: 10, combo: 'Slip Right - Cross - Hook', code: 'SR-2-3', type: 'counter', description: 'Slip and counter combo', focus: ['Timing', 'Counters'] },
  { id: 11, combo: 'Block - Double Jab - Cross', code: 'B-1-1-2', type: 'counter', description: 'Block and pressure', focus: ['Defense', 'Pressure'] },
  { id: 12, combo: 'Parry - Cross - Hook - Cross', code: 'P-2-3-2', type: 'counter', description: 'Parry and punish', focus: ['Defense', 'Power'] }
];

const TypeBadge = ({ type }: { type: string }) => {
  const colors = {
    basic: 'bg-blue-100 text-blue-800',
    advanced: 'bg-purple-100 text-purple-800',
    defensive: 'bg-green-100 text-green-800',
    counter: 'bg-orange-100 text-orange-800'
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[type as keyof typeof colors]}`}>
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </span>
  );
};

export default function CombinationTrainer() {
  const [currentCombo, setCurrentCombo] = useState(combinations[0]);
  const [comboCount, setComboCount] = useState(0);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [interval, setIntervalTime] = useState(10000);

  const generateNewCombo = () => {
    const filteredCombos = selectedType === 'all'
      ? combinations
      : combinations.filter(combo => combo.type === selectedType);
    const newCombo = filteredCombos[Math.floor(Math.random() * filteredCombos.length)];
    setCurrentCombo(newCombo);
  };

  useEffect(() => {
    const timer = setInterval(generateNewCombo, interval);
    return () => clearInterval(timer);
  }, [interval, selectedType]);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Combination Trainer</h2>
        <button
          onClick={generateNewCombo}
          className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200"
        >
          <RefreshCw size={20} />
        </button>
      </div>

      {/* Type Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {['all', 'basic', 'advanced', 'defensive', 'counter'].map(type => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-3 py-1 rounded-lg text-sm ${
              selectedType === type
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            } transition-colors duration-200`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Current Combination Display */}
      <div className="space-y-6">
        <div className="text-center p-8 bg-gray-50 rounded-xl">
          <div className="flex justify-center space-x-2 mb-4">
            <TypeBadge type={currentCombo.type} />
          </div>
          <div className="text-3xl font-bold text-gray-800 mb-2">{currentCombo.combo}</div>
          <div className="text-lg text-gray-600 mb-2">Code: {currentCombo.code}</div>
          <div className="text-sm text-gray-500">{currentCombo.description}</div>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {currentCombo.focus.map((focus, index) => (
              <span key={index} className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-xs">
                {focus}
              </span>
            ))}
          </div>
        </div>

        {/* Interval Control */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <span className="text-sm text-gray-600">Change Interval:</span>
          <div className="flex space-x-2">
            {[5000, 10000, 15000].map((time) => (
              <button
                key={time}
                onClick={() => setIntervalTime(time)}
                className={`px-3 py-1 rounded-lg text-sm ${
                  interval === time
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                {time / 1000}s
              </button>
            ))}
          </div>
        </div>

        {/* Progress Tracking */}
        <div className="flex items-center justify-between">
          <div className="text-lg font-medium text-gray-700">
            Completed: {comboCount}
          </div>
          <button
            onClick={() => setComboCount(count => count + 1)}
            className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
          >
            <Dumbbell size={20} />
            <span>Complete</span>
          </button>
        </div>
      </div>
    </div>
  );
}