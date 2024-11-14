import React, { useState } from 'react';
import { Timer as TimerIcon, Dumbbell, BarChart, Menu, BookOpen } from 'lucide-react';
import Timer from './components/Timer';
import CombinationTrainer from './components/CombinationTrainer';
import WorkoutPlan from './components/WorkoutPlan';
import TechniqueGuide from './components/TechniqueGuide';

function App() {
  const [activeTab, setActiveTab] = useState('timer');

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">BoxTrainer Pro</h1>
            <Menu className="md:hidden" size={24} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <nav className="flex flex-wrap space-x-2 md:space-x-4 bg-white rounded-lg shadow-md p-2">
            <button
              onClick={() => setActiveTab('timer')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                activeTab === 'timer'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <TimerIcon size={20} />
              <span>Timer</span>
            </button>
            <button
              onClick={() => setActiveTab('combinations')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                activeTab === 'combinations'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Dumbbell size={20} />
              <span>Combinations</span>
            </button>
            <button
              onClick={() => setActiveTab('workouts')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                activeTab === 'workouts'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <BarChart size={20} />
              <span>Workouts</span>
            </button>
            <button
              onClick={() => setActiveTab('techniques')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                activeTab === 'techniques'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <BookOpen size={20} />
              <span>Techniques</span>
            </button>
          </nav>
        </div>

        {/* Content Area */}
        <div className="max-w-2xl mx-auto">
          {activeTab === 'timer' && (
            <Timer roundTime={180} restTime={60} rounds={12} />
          )}
          {activeTab === 'combinations' && <CombinationTrainer />}
          {activeTab === 'workouts' && <WorkoutPlan />}
          {activeTab === 'techniques' && <TechniqueGuide />}
        </div>
      </main>
    </div>
  );
}

export default App;