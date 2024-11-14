import React from 'react';
import { Info } from 'lucide-react';

const techniques = [
  {
    id: 1,
    name: 'Jab (1)',
    description: 'A quick, straight punch thrown with the lead hand. Primarily used to create openings and maintain distance.',
    sideView: 'https://images.unsplash.com/photo-1552072092-7f9b8d63efcb?auto=format&fit=crop&w=800&q=80',
    frontView: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=800&q=80',
    key: 'Lead hand straight punch, rotate hips slightly, return quickly'
  },
  {
    id: 2,
    name: 'Cross (2)',
    description: 'A powerful straight punch thrown with the rear hand. Rotate hips and shoulders for maximum power.',
    sideView: 'https://images.unsplash.com/photo-1517438322307-e67111335449?auto=format&fit=crop&w=800&q=80',
    frontView: 'https://images.unsplash.com/photo-1517438984742-1262db08379e?auto=format&fit=crop&w=800&q=80',
    key: 'Rear hand straight punch, full hip rotation, chin protection'
  },
  {
    id: 3,
    name: 'Hook (3)',
    description: 'A powerful circular punch that can be thrown with either hand. Excellent for attacking around the guard.',
    sideView: 'https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&w=800&q=80',
    frontView: 'https://images.unsplash.com/photo-1517438397264-e6e319c2ce89?auto=format&fit=crop&w=800&q=80',
    key: 'Circular punch, 90-degree elbow, rotate entire body'
  },
  {
    id: 4,
    name: 'Uppercut (4)',
    description: 'An upward, vertical punch that targets the chin. Power comes from the legs and core rotation.',
    sideView: 'https://images.unsplash.com/photo-1517438397264-e6e319c2ce89?auto=format&fit=crop&w=800&q=80',
    frontView: 'https://images.unsplash.com/photo-1517438397264-e6e319c2ce89?auto=format&fit=crop&w=800&q=80',
    key: 'Vertical punch, bend knees, palm faces you'
  }
];

export default function TechniqueGuide() {
  return (
    <div className="space-y-8 w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Boxing Techniques</h2>
        <p className="text-gray-600 mb-4">
          Master these fundamental punches to build your boxing foundation. Pay attention to proper form and body mechanics.
        </p>
      </div>

      <div className="grid gap-6">
        {techniques.map((technique) => (
          <div key={technique.id} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Technique Info */}
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {technique.name}
                </h3>
                <p className="text-gray-600 mb-4">{technique.description}</p>
                
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <Info size={20} className="text-blue-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-blue-800 mb-1">Key Points</h4>
                      <p className="text-blue-700">{technique.key}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Technique Images */}
              <div className="flex-1 grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <img
                    src={technique.sideView}
                    alt={`${technique.name} - Side View`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <p className="text-sm text-center text-gray-500">Side View</p>
                </div>
                <div className="space-y-2">
                  <img
                    src={technique.frontView}
                    alt={`${technique.name} - Front View`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <p className="text-sm text-center text-gray-500">Front View</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}