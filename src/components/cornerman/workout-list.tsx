import { Play, Clock, BarChart } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { AudioWorkout } from '@/lib/cornerman-data';

export { type AudioWorkout }; // Re-export for convenience if needed, or just use the imported one

interface AudioWorkoutListProps {
  workouts: AudioWorkout[];
  onSelectWorkout: (workout: AudioWorkout) => void;
  activeWorkoutId?: string;
}

export default function AudioWorkoutList({ workouts, onSelectWorkout, activeWorkoutId }: AudioWorkoutListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {workouts.map((workout, index) => (
        <motion.div
          key={workout.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`
            group relative border-2 border-[#0F172A] bg-white hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer overflow-hidden
            ${activeWorkoutId === workout.id ? 'ring-2 ring-[#2563EB] shadow-[8px_8px_0px_0px_rgba(74,111,165,0.3)]' : ''}
          `}
          onClick={() => onSelectWorkout(workout)}
        >
          <div className={`h-2 w-full ${workout.color}`} />

          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <span className={`
                        px-2 py-1 text-xs font-bold uppercase tracking-widest border border-current
                        ${workout.category === 'Technique' ? 'text-blue-600 bg-blue-50' : ''}
                        ${workout.category === 'Mindset' ? 'text-purple-600 bg-purple-50' : ''}
                        ${workout.category === 'Conditioning' ? 'text-orange-600 bg-orange-50' : ''}
                    `}>
                {workout.category}
              </span>
              <span className="text-xs font-body text-[#0F172A]/50">{workout.level}</span>
            </div>

            <h3 className="font-display text-xl uppercase mb-2 leading-tight group-hover:text-[#2563EB] transition-colors">
              {workout.title}
            </h3>
            <p className="font-body text-sm text-[#0F172A]/70 mb-6 line-clamp-2">
              {workout.description}
            </p>

            <div className="flex items-center justify-between border-t border-[#0F172A]/10 pt-4">
              <div className="flex items-center gap-2 text-sm font-bold text-[#0F172A]/60">
                <Clock size={16} />
                {workout.duration}
              </div>
              <button className="w-10 h-10 rounded-full bg-[#0F172A] flex items-center justify-center text-white group-hover:bg-[#2563EB] transition-colors">
                <Play size={16} fill="currentColor" className="ml-0.5" />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
