import { Clock, Zap, Target, Trophy } from 'lucide-react';
import React from 'react';

export interface Video {
  id: string;
  title: string;
  description: string;
  duration: string;
  durationSeconds: number;
  category: string;
  muxPlaybackId: string;
  order: number;
  isNew?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  count: number;
}

export const VIDEOS: Video[] = [
  {
    id: '1',
    title: "The Perfect Uppercut Mechanics",
    description: "Learn the proper weight transfer and hip rotation for devastating uppercuts. We'll break down the common mistakes and how to fix them.",
    duration: "12:40",
    durationSeconds: 760,
    category: "technique",
    muxPlaybackId: "yb2L3z3Z4IKQH02HYkf9xPToVYkOC85WA",
    order: 1,
    isNew: true
  },
  {
    id: '2',
    title: "Sparring Analysis: Keeping Range",
    description: "Film study session breaking down how to control distance and when to engage.",
    duration: "24:10",
    durationSeconds: 1450,
    category: "fight-iq",
    muxPlaybackId: "yb2L3z3Z4IKQH02HYkf9xPToVYkOC85WA",
    order: 2
  },
  {
    id: '3',
    title: "Heavy Bag: Power Generation",
    description: "A complete heavy bag workout focused on generating power from the ground up.",
    duration: "15:00",
    durationSeconds: 900,
    category: "drills",
    muxPlaybackId: "yb2L3z3Z4IKQH02HYkf9xPToVYkOC85WA",
    order: 3
  },
  {
    id: '4',
    title: "Defensive Head Movement Routine",
    description: "Daily drills to improve your slips, rolls, and pull-backs.",
    duration: "18:30",
    durationSeconds: 1110,
    category: "technique",
    muxPlaybackId: "yb2L3z3Z4IKQH02HYkf9xPToVYkOC85WA",
    order: 4,
    isNew: true
  },
  {
    id: '5',
    title: "Southpaw Strategy Guide",
    description: "How to fight southpaws and how to fight AS a southpaw.",
    duration: "21:00",
    durationSeconds: 1260,
    category: "fight-iq",
    muxPlaybackId: "yb2L3z3Z4IKQH02HYkf9xPToVYkOC85WA",
    order: 5
  },
  {
    id: '6',
    title: "Conditioning for Championship Rounds",
    description: "Build the gas tank to keep throwing in rounds 10-12.",
    duration: "45:00",
    durationSeconds: 2700,
    category: "conditioning",
    muxPlaybackId: "yb2L3z3Z4IKQH02HYkf9xPToVYkOC85WA",
    order: 6
  },
];

// Note: Icons will need to be re-instantiated in the component if we want to change size dynamically,
// but for static definitions this works if we just need the type or default. 
// However, cleaner to keep logic simple here.
// We will export the raw data and let the component map utilities if needed, 
// but for now we can keep the simple structure.
// WE WILL EXPORT A HELPER FUNCTION FOR CATEGORIES TO AVOID JSX IN LIB IF WE WERE STRICT,
// BUT FOR NOW WE WILL JUST EXPORT IDS and helper function in component.

export interface AudioWorkout {
  id: string;
  title: string;
  description: string;
  duration: string;
  durationSeconds: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: 'Technique' | 'Mindset' | 'Conditioning';
  subcategory: 'Shadow Boxing' | 'Heavy Bag' | 'Speed Work' | 'Roadwork' | 'HIIT' | 'Visualization' | 'Recovery' | 'Pre-Fight';
  audioUrl: string;
  color: string;
  isNew?: boolean;
}

export const AUDIO_WORKOUTS: AudioWorkout[] = [
  // === TECHNIQUE - Shadow Boxing ===
  {
    id: '1',
    title: 'Shadow Boxing: Fundamentals',
    description: 'Guided 3-minute rounds focusing on basic 1-2-3 combinations and footwork. Perfect for warm-ups.',
    duration: '15:00',
    durationSeconds: 900,
    level: 'Beginner',
    category: 'Technique',
    subcategory: 'Shadow Boxing',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    color: 'bg-blue-500'
  },
  {
    id: '2',
    title: 'Shadow Boxing: Pro Rounds',
    description: '6 rounds of advanced combinations with body movement, angles, and defensive work.',
    duration: '30:00',
    durationSeconds: 1800,
    level: 'Advanced',
    category: 'Technique',
    subcategory: 'Shadow Boxing',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    color: 'bg-blue-600',
    isNew: true
  },
  // === TECHNIQUE - Heavy Bag ===
  {
    id: '3',
    title: 'Heavy Bag: Power Punches',
    description: 'Focus on generating maximum power through proper hip rotation and weight transfer.',
    duration: '20:00',
    durationSeconds: 1200,
    level: 'Intermediate',
    category: 'Technique',
    subcategory: 'Heavy Bag',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    color: 'bg-red-500'
  },
  {
    id: '4',
    title: 'Heavy Bag: Speed Combinations',
    description: 'High-volume punch output with rapid combinations. Build hand speed and endurance.',
    duration: '18:00',
    durationSeconds: 1080,
    level: 'Intermediate',
    category: 'Technique',
    subcategory: 'Heavy Bag',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    color: 'bg-red-600',
    isNew: true
  },
  // === TECHNIQUE - Speed Work ===
  {
    id: '5',
    title: 'Speed Bag Rhythm',
    description: 'Develop timing and hand-eye coordination with guided speed bag intervals.',
    duration: '12:00',
    durationSeconds: 720,
    level: 'Beginner',
    category: 'Technique',
    subcategory: 'Speed Work',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    color: 'bg-yellow-500'
  },
  // === CONDITIONING - Roadwork ===
  {
    id: '6',
    title: 'Roadwork: 5K Pace',
    description: 'Coach Josh in your ear keeping you motivated and on pace for your morning 5K run.',
    duration: '25:00',
    durationSeconds: 1500,
    level: 'Intermediate',
    category: 'Conditioning',
    subcategory: 'Roadwork',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    color: 'bg-orange-500'
  },
  {
    id: '7',
    title: 'Roadwork: Hill Sprints',
    description: 'Interval hill training to build explosive leg power and championship-round cardio.',
    duration: '20:00',
    durationSeconds: 1200,
    level: 'Advanced',
    category: 'Conditioning',
    subcategory: 'Roadwork',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
    color: 'bg-orange-600',
    isNew: true
  },
  // === CONDITIONING - HIIT ===
  {
    id: '8',
    title: 'Fighter\'s Jump Rope',
    description: 'High-intensity jump rope intervals to improve footwork, conditioning, and coordination.',
    duration: '15:00',
    durationSeconds: 900,
    level: 'Intermediate',
    category: 'Conditioning',
    subcategory: 'HIIT',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    color: 'bg-green-500'
  },
  {
    id: '9',
    title: 'Tabata Burnout',
    description: 'Brutal 20-seconds-on, 10-seconds-off intervals. Not for the faint of heart.',
    duration: '16:00',
    durationSeconds: 960,
    level: 'Advanced',
    category: 'Conditioning',
    subcategory: 'HIIT',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
    color: 'bg-green-600'
  },
  // === MINDSET - Visualization ===
  {
    id: '10',
    title: 'Pre-Fight Visualization',
    description: 'Calm your nerves and visualize victory before stepping into the ring.',
    duration: '10:00',
    durationSeconds: 600,
    level: 'Advanced',
    category: 'Mindset',
    subcategory: 'Pre-Fight',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
    color: 'bg-purple-500'
  },
  {
    id: '11',
    title: 'Fight Night Mental Prep',
    description: 'Complete mental preparation routine for competition day. Get in the zone.',
    duration: '15:00',
    durationSeconds: 900,
    level: 'Advanced',
    category: 'Mindset',
    subcategory: 'Pre-Fight',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3',
    color: 'bg-purple-600',
    isNew: true
  },
  // === MINDSET - Recovery ===
  {
    id: '12',
    title: 'Post-Training Recovery',
    description: 'Guided cooldown with stretching, breathing, and muscle relaxation techniques.',
    duration: '20:00',
    durationSeconds: 1200,
    level: 'Beginner',
    category: 'Mindset',
    subcategory: 'Recovery',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3',
    color: 'bg-teal-500'
  }
];

// Helper functions for looking up content by ID
export const getAudioById = (id: string): AudioWorkout | undefined =>
  AUDIO_WORKOUTS.find(a => a.id === id);

export const getVideoById = (id: string): Video | undefined =>
  VIDEOS.find(v => v.id === id);
