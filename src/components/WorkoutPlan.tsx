import React, { useState } from 'react';
import { Clock, Zap, Target, ArrowLeft, Info, Dumbbell, Heart, Flame } from 'lucide-react';
import Timer from './Timer';

const workouts = [
  {
    id: 1,
    title: 'Beginner Combo',
    duration: '30 min',
    intensity: 'Low',
    focus: 'Technique',
    rounds: 6,
    roundTime: 120,
    restTime: 60,
    type: 'boxing',
    combinations: [
      { sequence: '1-2', description: 'Jab-Cross', target: 'Head', reps: '10x' },
      { sequence: '1-1-2', description: 'Double Jab-Cross', target: 'Head', reps: '8x' },
      { sequence: '1-2-3', description: 'Jab-Cross-Hook', target: 'Head', reps: '6x' }
    ]
  },
  {
    id: 2,
    title: 'HIIT Boxing',
    duration: '45 min',
    intensity: 'High',
    focus: 'Cardio',
    rounds: 12,
    roundTime: 180,
    restTime: 45,
    type: 'boxing',
    combinations: [
      { sequence: '1-2-3-2', description: 'Jab-Cross-Hook-Cross', target: 'Head', reps: '8x' },
      { sequence: '1-2-3-6', description: 'Jab-Cross-Hook-Uppercut', target: 'Head-Body', reps: '6x' },
      { sequence: '1-2b-3-2', description: 'Jab-Body Cross-Hook-Cross', target: 'Mixed', reps: '6x' }
    ]
  },
  {
    id: 3,
    title: 'Power Punching',
    duration: '40 min',
    intensity: 'Medium',
    focus: 'Strength',
    rounds: 8,
    roundTime: 150,
    restTime: 60,
    type: 'boxing',
    combinations: [
      { sequence: '2-3-2', description: 'Cross-Hook-Cross', target: 'Head', reps: '8x' },
      { sequence: '1-6-3', description: 'Jab-Uppercut-Hook', target: 'Mixed', reps: '6x' },
      { sequence: '2b-3-6', description: 'Body Cross-Hook-Uppercut', target: 'Mixed', reps: '6x' }
    ]
  },
  {
    id: 4,
    title: 'Strength & Conditioning',
    duration: '50 min',
    intensity: 'High',
    focus: 'Full Body',
    rounds: 5,
    roundTime: 300,
    restTime: 90,
    type: 'strength',
    exercises: [
      { name: 'Push-ups', sets: 4, reps: '15-20', target: 'Upper Body' },
      { name: 'Squats', sets: 4, reps: '20', target: 'Lower Body' },
      { name: 'Burpees', sets: 3, reps: '10', target: 'Full Body' },
      { name: 'Mountain Climbers', sets: 3, reps: '30 sec', target: 'Core' }
    ]
  },
  {
    id: 5,
    title: 'Core & Mobility',
    duration: '35 min',
    intensity: 'Medium',
    focus: 'Core Strength',
    rounds: 4,
    roundTime: 240,
    restTime: 60,
    type: 'mobility',
    exercises: [
      { name: 'Plank Hold', sets: 3, reps: '45 sec', target: 'Core' },
      { name: 'Russian Twists', sets: 3, reps: '20 each side', target: 'Obliques' },
      { name: 'Hip Mobility Flow', sets: 2, reps: '60 sec', target: 'Hips' },
      { name: 'Shoulder Mobility', sets: 2, reps: '45 sec', target: 'Shoulders' }
    ]
  },
  {
    id: 6,
    title: 'Endurance Builder',
    duration: '60 min',
    intensity: 'High',
    focus: 'Cardio',
    rounds: 6,
    roundTime: 300,
    restTime: 120,
    type: 'cardio',
    exercises: [
      { name: 'Jump Rope', sets: 1, reps: '3 min', target: 'Full Body' },
      { name: 'High Knees', sets: 1, reps: '60 sec', target: 'Lower Body' },
      { name: 'Shadow Boxing', sets: 1, reps: '2 min', target: 'Upper Body' },
      { name: 'Jumping Jacks', sets: 1, reps: '60 sec', target: 'Full Body' }
    ]
  }
];

const WorkoutTypeIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'boxing':
      return <Dumbbell className="text-blue-500" />;
    case 'strength':
      return <Flame className="text-red-500" />;
    case 'mobility':
      return <Target className="text-green-500" />;
    case 'cardio':
      return <Heart className="text-pink-500" />;
    default:
      return <Info className="text-gray-500" />;
  }
};

const ExerciseList = ({ workout }: { workout: typeof workouts[0] }) => {
  if ('combinations' in workout) {
    return (
      <div className="space-y-3">
        {workout.combinations.map((combo, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-lg font-medium text-gray-800">{combo.sequence}</div>
                <div className="text-gray-600">{combo.description}</div>
              </div>
              <div className="flex flex-col items-end space-y-1">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                  {combo.target}
                </span>
                <span className="text-sm text-gray-600">{combo.reps}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {workout.exercises.map((exercise, index) => (
        <div key={index} className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-lg font-medium text-gray-800">{exercise.name}</div>
              <div className="text-gray-600">
                {exercise.sets} sets × {exercise.reps}
              </div>
            </div>
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
              {exercise.target}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function WorkoutPlan() {
  const [selectedWorkout, setSelectedWorkout] = useState<typeof workouts[0] | null>(null);
  const [showGuide, setShowGuide] = useState(false);

  if (selectedWorkout) {
    return (
      <div className="space-y-6 w-full max-w-md mx-auto">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSelectedWorkout(null)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <h2 className="text-2xl font-bold text-gray-800">{selectedWorkout.title}</h2>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center text-gray-600">
              <Clock size={18} className="mr-2" />
              <span>{selectedWorkout.duration}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Zap size={18} className="mr-2" />
              <span>Intensity: {selectedWorkout.intensity}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Target size={18} className="mr-2" />
              <span>Focus: {selectedWorkout.focus}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <WorkoutTypeIcon type={selectedWorkout.type} />
              <span className="ml-2 capitalize">{selectedWorkout.type}</span>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {selectedWorkout.type === 'boxing' ? 'Combinations' : 'Exercises'}
              </h3>
              {selectedWorkout.type === 'boxing' && (
                <button
                  onClick={() => setShowGuide(!showGuide)}
                  className="text-blue-500 hover:text-blue-600 flex items-center space-x-1"
                >
                  <Info size={16} />
                  <span className="text-sm">Legend</span>
                </button>
              )}
            </div>
            
            {showGuide && selectedWorkout.type === 'boxing' && <PunchLegend />}
            
            <ExerciseList workout={selectedWorkout} />
          </div>
          
          <Timer
            roundTime={selectedWorkout.roundTime}
            restTime={selectedWorkout.restTime}
            rounds={selectedWorkout.rounds}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800">Workout Plans</h2>
      
      <div className="grid gap-4">
        {workouts.map((workout) => (
          <div
            key={workout.id}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-2">
                <WorkoutTypeIcon type={workout.type} />
                <h3 className="text-xl font-semibold text-gray-800">{workout.title}</h3>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {workout.rounds} rounds
              </span>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center text-gray-600">
                <Clock size={18} className="mr-2" />
                <span>{workout.duration}</span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <Zap size={18} className="mr-2" />
                <span>Intensity: {workout.intensity}</span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <Target size={18} className="mr-2" />
                <span>Focus: {workout.focus}</span>
              </div>

              <div className="pt-2">
                <div className="text-sm text-gray-500">
                  {workout.type === 'boxing' ? 'Featured combinations:' : 'Featured exercises:'}
                </div>
                <div className="flex flex-wrap gap-2 mt-1">
                  {workout.type === 'boxing' ?
                    workout.combinations.map((combo, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                        {combo.sequence}
                      </span>
                    )) :
                    workout.exercises.map((exercise, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                        {exercise.name}
                      </span>
                    ))
                  }
                </div>
              </div>
            </div>
            
            <button
              onClick={() => setSelectedWorkout(workout)}
              className="mt-4 w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
              Start Workout
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}