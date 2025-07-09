import React, { useState } from 'react';
import { Home, Wrench, Image, Info, Rocket, Zap, Settings, BarChart3 } from 'lucide-react';

// Types
interface VehicleComponent {
  id: string;
  name: string;
  type: 'chassis' | 'engine' | 'nose' | 'directional_control' | 'fuel_system';
  icon: string;
  stats: {
    power: number;
    speed: number;
    durability: number;
    efficiency: number;
  };
}

interface Vehicle {
  chassis: VehicleComponent | null;
  engine: VehicleComponent | null;
  nose: VehicleComponent | null;
  directional_control: VehicleComponent | null;
  fuelSystem: VehicleComponent | null;
}

interface Mission {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirements: {
    power: number;
    speed: number;
    durability: number;
    efficiency: number;
  };
  recommendedComponents: {
    chassis: string[];
    engine: string[];
    nose: string[];
    directional_control: string[];
    fuel_system: string[];
  };
  challenges: string[];
}

// Mission types data
const missionTypes: Mission[] = [
  {
    id: 'satellite_orbit',
    name: 'Satellite Deployment',
    description: 'Launch satellites into stable Earth orbit for communication, weather monitoring, or GPS systems.',
    icon: '🛰️',
    requirements: { power: 85, speed: 80, durability: 75, efficiency: 85 },
    recommendedComponents: {
      chassis: ['falcon9', 'starship'],
      engine: ['merlin', 'raptor'],
      nose: ['pointed_nose', 'radome'],
      directional_control: ['gimbaled-nozzle', 'reaction-control-thrusters'],
      fuel_system: ['kerosene', 'liquid_hydrogen']
    },
    challenges: ['Precise orbital insertion', 'Payload protection', 'Cost efficiency']
  },
  {
    id: 'short_flight',
    name: 'Short-Range Flight',
    description: 'Regional passenger transport, cargo delivery, or urban air mobility missions under 500 miles.',
    icon: '✈️',
    requirements: { power: 70, speed: 75, durability: 80, efficiency: 90 },
    recommendedComponents: {
      chassis: ['b737', 'c130'],
      engine: ['ge90', 'electric'],
      nose: ['rounded_nose', 'pointed_nose'],
      directional_control: ['fly-by-wire-ailerons'],
      fuel_system: ['jet_a1', 'electric']
    },
    challenges: ['Fuel efficiency', 'Passenger comfort', 'Airport compatibility']
  },
  {
    id: 'long_flight',
    name: 'Long-Range Flight',
    description: 'Intercontinental passenger transport, cargo delivery, or military missions over 3000 miles.',
    icon: '🌍',
    requirements: { power: 80, speed: 85, durability: 85, efficiency: 95 },
    recommendedComponents: {
      chassis: ['b737', 'c130'],
      engine: ['ge90', 'f135'],
      nose: ['pointed_nose', 'radome'],
      directional_control: ['fly-by-wire-ailerons'],
      fuel_system: ['jet_a1', 'liquid_hydrogen']
    },
    challenges: ['Extended range', 'Fuel capacity', 'Passenger amenities']
  },
  {
    id: 'combat_mission',
    name: 'Combat Operations',
    description: 'Air superiority, ground attack, reconnaissance, or defensive missions requiring high performance.',
    icon: '⚔️',
    requirements: { power: 95, speed: 95, durability: 80, efficiency: 60 },
    recommendedComponents: {
      chassis: ['f16'],
      engine: ['f135', 'raptor'],
      nose: ['pointed_nose', 'radome'],
      directional_control: ['fly-by-wire-ailerons', 'gimbaled-nozzle'],
      fuel_system: ['jet_a1', 'kerosene']
    },
    challenges: ['Extreme maneuverability', 'Stealth capability', 'Weapon systems']
  },
  {
    id: 'mars_mission',
    name: 'Mars Exploration',
    description: 'Interplanetary travel to Mars for crew transport, cargo delivery, or scientific exploration.',
    icon: '🔴',
    requirements: { power: 90, speed: 85, durability: 95, efficiency: 90 },
    recommendedComponents: {
      chassis: ['starship'],
      engine: ['raptor', 'ion_drive'],
      nose: ['rounded_nose', 'radome'],
      directional_control: ['gimbaled-nozzle', 'reaction-control-thrusters'],
      fuel_system: ['liquid_hydrogen', 'nuclear']
    },
    challenges: ['Deep space travel', 'Life support', 'Landing capability']
  },
  {
    id: 'space_station',
    name: 'Space Station Resupply',
    description: 'Deliver cargo, crew, and supplies to international space stations or orbital facilities.',
    icon: '🏭',
    requirements: { power: 85, speed: 75, durability: 90, efficiency: 80 },
    recommendedComponents: {
      chassis: ['falcon9', 'starship'],
      engine: ['merlin', 'raptor'],
      nose: ['rounded_nose'],
      directional_control: ['gimbaled-nozzle', 'reaction-control-thrusters'],
      fuel_system: ['kerosene', 'liquid_hydrogen']
    },
    challenges: ['Precise docking', 'Cargo protection', 'Crew safety']
  },
  {
    id: 'scientific_probe',
    name: 'Scientific Research',
    description: 'Deep space exploration, atmospheric research, or scientific data collection missions.',
    icon: '🔬',
    requirements: { power: 70, speed: 60, durability: 95, efficiency: 99 },
    recommendedComponents: {
      chassis: ['starship'],
      engine: ['ion_drive', 'raptor'],
      nose: ['radome', 'pointed_nose'],
      directional_control: ['reaction-control-thrusters'],
      fuel_system: ['electric', 'nuclear']
    },
    challenges: ['Long-duration missions', 'Precision instruments', 'Data transmission']
  }
];

// Sample component data
const componentLibrary: VehicleComponent[] = [
  // Chassis
  {
    id: 'falcon9',
    name: 'Falcon 9 Core',
    type: 'chassis',
    icon: '🚀',
    stats: { power: 90, speed: 85, durability: 80, efficiency: 75 }
  },
  {
    id: 'starship',
    name: 'Starship Upper Stage',
    type: 'chassis',
    icon: '🛸',
    stats: { power: 95, speed: 90, durability: 85, efficiency: 80 }
  },
  {
    id: 'b737',
    name: 'Boeing 737',
    type: 'chassis',
    icon: '✈️',
    stats: { power: 70, speed: 75, durability: 85, efficiency: 80 }
  },
  {
    id: 'f16',
    name: 'F-16 Fighter Jet',
    type: 'chassis',
    icon: '🛫',
    stats: { power: 85, speed: 95, durability: 70, efficiency: 60 }
  },
  {
    id: 'c130',
    name: 'C-130 Hercules',
    type: 'chassis',
    icon: '📦',
    stats: { power: 80, speed: 60, durability: 95, efficiency: 65 }
  },
  
  // Engines
  {
    id: 'raptor',
    name: 'SpaceX Raptor',
    type: 'engine',
    icon: '🔥',
    stats: { power: 95, speed: 90, durability: 85, efficiency: 80 }
  },
  {
    id: 'merlin',
    name: 'Merlin 1D',
    type: 'engine',
    icon: '🦾',
    stats: { power: 85, speed: 80, durability: 80, efficiency: 75 }
  },
  {
    id: 'ge90',
    name: 'GE90 Turbofan',
    type: 'engine',
    icon: '🌪️',
    stats: { power: 80, speed: 70, durability: 90, efficiency: 85 }
  },
  {
    id: 'f135',
    name: 'F135 Afterburning Turbofan',
    type: 'engine',
    icon: '🔥',
    stats: { power: 90, speed: 95, durability: 75, efficiency: 60 }
  },
  {
    id: 'ion_drive',
    name: 'Ion Drive',
    type: 'engine',
    icon: '🧪',
    stats: { power: 60, speed: 40, durability: 90, efficiency: 99 }
  },
  

  {
    id: 'rounded_nose',
    name: 'Rounded Nose',
    type: 'nose',
    icon: '⚪',
    stats: { power: 70, speed: 60, durability: 90, efficiency: 85 }
  },
  {
    id: 'pointed_nose',
    name: 'Pointed Nose',
    type: 'nose',
    icon: '📍',
    stats: { power: 80, speed: 85, durability: 80, efficiency: 80 }
  },
  {
    id: 'radome',
    name: 'Radome (Sensor Nose)',
    type: 'nose',
    icon: '📡',
    stats: { power: 75, speed: 70, durability: 75, efficiency: 90 }
  },
  
// Directional Control System
{ id: 'gimbaled-nozzle', name: 'Gimbaled Nozzle', type: 'directional_control', icon: '🎯', stats: { power: 95, speed: 90, durability: 85, efficiency: 90 } },
{ id: 'reaction-control-thrusters', name: 'Reaction Control Thrusters', type: 'directional_control', icon: '🚀', stats: { power: 85, speed: 95, durability: 80, efficiency: 75 } },
{ id: 'fly-by-wire-ailerons', name: 'Fly-By-Wire Ailerons', type: 'directional_control', icon: '🕹️', stats: { power: 80, speed: 85, durability: 90, efficiency: 88 } },

  
  // Fuel System
  {
    id: 'kerosene',
    name: 'RP-1 Kerosene',
    type: 'fuel_system',
    icon: '⛽',
    stats: { power: 85, speed: 80, durability: 75, efficiency: 70 }
  },
  {
    id: 'liquid_hydrogen',
    name: 'Liquid Hydrogen (LH₂)',
    type: 'fuel_system',
    icon: '💧',
    stats: { power: 90, speed: 85, durability: 70, efficiency: 95 }
  },
  {
    id: 'jet_a1',
    name: 'Jet A-1',
    type: 'fuel_system',
    icon: '🛢️',
    stats: { power: 80, speed: 75, durability: 80, efficiency: 80 }
  },
  {
    id: 'electric',
    name: 'Electric Battery',
    type: 'fuel_system',
    icon: '🔋',
    stats: { power: 70, speed: 70, durability: 90, efficiency: 98 }
  },
  {
    id: 'nuclear',
    name: 'Nuclear Thermal',
    type: 'fuel_system',
    icon: '☢️',
    stats: { power: 95, speed: 85, durability: 90, efficiency: 90 }
  },
];

// Components
const Navigation: React.FC<{ currentPage: string; onPageChange: (page: string) => void }> = ({ currentPage, onPageChange }) => (
  <header className="glass-strong fixed top-0 left-0 right-0 z-50 border-b-2 border-white/30 backdrop-blur-xl">
    <nav className="flex justify-between items-center max-w-7xl mx-auto px-8 py-6">
      <div className="text-2xl font-bold text-center text-white flex items-center gap-4">

        <span className="header gradient-text text-center font-black tracking-tight text-6xl">
          Build-N-Fly
        </span>
      </div>
  <div className="flex justify-center-safe gap-6">
        {[
          { id: 'home', label: 'Home', icon: Home },
          { id: 'build', label: 'Build', icon: Wrench },
          { id: 'gallery', label: 'Gallery', icon: Image },
          { id: 'about', label: 'About', icon: Info },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onPageChange(id)}
            className={`nav-btn group flex justify-center items-center gap-4 px-8 py-4 rounded-2xl font-bold transition-all duration-300 border-2 shadow-lg ${
              currentPage === id 
                ? 'bg-gradient-to-r from-accent-primary to-accent-secondary text-white shadow-accent-primary/30 border-accent-primary/50 shadow-glow scale-105' 
                : 'bg-white/10 text-gray-200 hover:text-white border-white/30 hover:border-accent-primary/50 hover:bg-accent-primary/10 hover:shadow-accent-primary/20 hover:scale-105'
            }`}
          >
            <span className="hidden sm:block text-lg">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  </header>
);

const HomePage: React.FC<{ onStartBuild: () => void }> = ({ onStartBuild }) => (
  <div className="min-h-screen flex items-center justify-center px-6 sm:px-8 lg:px-12 py-32 animate-fade-in-up">
    <div className="max-w-7xl mx-auto w-full">
      <div className="text-center mb-32">
        <h1 className="text-4xl txt font-black text-white mb-12 leading-tight text-shadow max-w-6xl mx-auto px-4 ml-4">
          Build Your Ultimate Flying Machine
        
        </h1>
        <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-20 max-w-4xl mx-auto leading-relaxed font-light px-6">
          Design and customize aerospace vehicles with cutting-edge components, advanced propulsion systems, and precision control mechanisms
        </p>
        <button
          onClick={onStartBuild}
          className="btn-primary px-20 py-8 rounded-2xl text-xl font-bold transition-bounce hover:scale-105 group shadow-glow border-2 border-accent-primary/50 mx-auto"
        >
          <span className="flex items-center gap-4">
            <Wrench size={32} className="transition-smooth group-hover:rotate-12" />
            Start Building
          </span>
        </button>
      </div>

      <div className="cr-cont justify-center">
        <h1 className="text-4xl txt font-black text-white mb-12 leading-tight text-center text-shadow max-w-6xl mx-auto px-4 ml-4">
          Basics of Building Your Flying Machine
        
        </h1>
        {[
          { icon: Zap, title: 'Engines', desc: 'Engines are responsible for propulsion and thrust generation in flying machines. Choosing the right power engine is essential to ensure optimal fuel usage and travel efficiency.', color: 'from-orange-500 to-red-500' },
          { icon: Settings, title: 'Precision Chassis', desc: 'Aerospace-grade frames engineered for every mission profile', color: 'from-accent-primary to-accent-secondary' },
          { icon: Settings, title: 'Smart Controls', desc: 'AI-assisted directional systems for optimal flight dynamics', color: 'from-accent-tertiary to-green-500' },
          { icon: BarChart3, title: 'Real-time Analytics', desc: 'Live performance metrics and optimization suggestions', color: 'from-accent-secondary to-pink-500' },
        ].map((feature, index) => (
          <div 
            key={index} 
            className="glass p-10 rounded-2xl group h-full border-2 border-white/20 hover:border-accent-primary/50"
          >
            <h3 className="header font-black text-white mb-6 group-hover:gradient-text transition-smooth text-center">{feature.title}</h3>
            <p className="tex text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-smooth font-light text-center">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const MissionSelector: React.FC<{
  onMissionSelect: (mission: Mission) => void;
  onSkip: () => void;
}> = ({ onMissionSelect, onSkip }) => (
  <div className="min-h-screen flex items-center justify-center py-32 animate-fade-in-up">
    <div className="w-full">
      <div className="text-center mb-16 px-6">
        <div className="mb-12 p-10 glass rounded-full animate-float shadow-glow border-2 border-accent-secondary/30 mx-auto w-fit">
          <Rocket className="text-accent-secondary animate-glow" size={80} />
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-8 leading-tight text-shadow">
          What's Your
          <span className="gradient-text block mt-4">
            Mission?
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
          Choose your mission type to get optimized component recommendations and design guidance
        </p>
        <button
          onClick={onSkip}
          className="btn-secondary px-8 py-4 rounded-xl text-base font-semibold mb-12 hover:scale-105 transition-bounce"
        >
          Skip & Build Freely
        </button>
      </div>
      <div className="w-full items-center justify-center flex-1 border-2 border-white">
        {missionTypes.map((mission) => (
          <button
            key={mission.id}
            onClick={() => onMissionSelect(mission)}
            className=" card mb-12 flex-grow-1 p-10 mr-10 glass rounded-full animate-float shadow-glow border-2 border-accent-secondary/30 card-hover group hover:scale-105 transition-smooth"
          >
              <div className="text-6xl mb-6 mx-auto group-hover:scale-110 transition-bounce">
                {mission.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4 group-hover:gradient-text transition-smooth text-center">
                {mission.name}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-smooth font-light mb-6 text-center">
                {mission.description}
              </p>
              
              {/* Mission Requirements */}
              <div className="space-y-3 mb-6">
                <h4 className="text-accent-primary font-semibold text-xs uppercase tracking-wide">Requirements</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Power:</span>
                    <span className="text-red-300 font-semibold">{mission.requirements.power}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Speed:</span>
                    <span className="text-blue-300 font-semibold">{mission.requirements.speed}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Durability:</span>
                    <span className="text-green-300 font-semibold">{mission.requirements.durability}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Efficiency:</span>
                    <span className="text-purple-300 font-semibold">{mission.requirements.efficiency}%</span>
                  </div>
                </div>
              </div>

              {/* Key Challenges */}
              <div className="space-y-3">
                <h4 className="text-accent-secondary font-semibold text-xs uppercase tracking-wide">Key Challenges</h4>
                <ul className="space-y-1">
                  {mission.challenges.slice(0, 2).map((challenge, index) => (
                    <li key={index} className="text-gray-400 text-xs flex items-center gap-2">
                      <span className="text-accent-secondary">•</span>
                      {challenge}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 text-center">
                <span className="text-accent-primary text-sm font-semibold group-hover:text-white transition-colors">
                  Select Mission →
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>

);

// Component details data
const componentDetails: Record<string, {
  description: string;
  bestUsage: string;
  pros: string[];
  cons: string[];
  compatibility: string[];
}> = {
  // Chassis
  'falcon9': {
    description: 'Reusable first-stage booster designed for orbital payload delivery and landing.',
    bestUsage: 'Medium to heavy payload launches, satellite deployment, ISS resupply missions',
    pros: ['Proven reliability', 'Reusable design', 'Cost-effective', 'High thrust-to-weight ratio'],
    cons: ['Limited upper atmosphere performance', 'Requires precise landing systems'],
    compatibility: ['Merlin engines', 'RP-1 fuel systems', 'Grid fins for control']
  },
  'starship': {
    description: 'Next-generation fully reusable spacecraft for deep space missions.',
    bestUsage: 'Mars missions, Moon landing, heavy cargo transport, interplanetary travel',
    pros: ['Massive payload capacity', 'Fully reusable', 'Deep space capable', 'In-orbit refueling'],
    cons: ['Complex heat shield', 'High development cost', 'Requires multiple refueling'],
    compatibility: ['Raptor engines', 'Liquid methane fuel', 'Advanced heat shields']
  },
  'b737': {
    description: 'Commercial airliner chassis optimized for short to medium-haul flights.',
    bestUsage: 'Commercial passenger transport, regional flights, cargo delivery',
    pros: ['Fuel efficient', 'Proven safety record', 'Easy maintenance', 'Passenger comfort'],
    cons: ['Limited to atmospheric flight', 'Lower speed than military aircraft'],
    compatibility: ['Turbofan engines', 'Jet fuel systems', 'Traditional avionics']
  },
  'f16': {
    description: 'Lightweight fighter aircraft designed for air superiority and ground attack.',
    bestUsage: 'Air combat, precision strikes, reconnaissance, aerobatic demonstrations',
    pros: ['Exceptional maneuverability', 'High speed capability', 'Advanced avionics', 'Combat proven'],
    cons: ['High fuel consumption', 'Single engine dependency', 'Limited cargo capacity'],
    compatibility: ['Afterburning turbofans', 'Military-grade fuel', 'Fly-by-wire systems']
  },
  'c130': {
    description: 'Military transport aircraft designed for tactical airlift and cargo operations.',
    bestUsage: 'Cargo transport, troop deployment, humanitarian missions, rough airfield operations',
    pros: ['Rugged construction', 'Short runway capability', 'Large cargo capacity', 'Versatile missions'],
    cons: ['Lower speed', 'Higher maintenance', 'Fuel consumption on long flights'],
    compatibility: ['Turboprop engines', 'Multi-fuel capability', 'Robust landing gear']
  },
  
  // Engines
  'raptor': {
    description: 'Full-flow staged combustion methane-oxygen rocket engine with high efficiency.',
    bestUsage: 'Deep space missions, heavy lift applications, reusable spacecraft',
    pros: ['Highest efficiency', 'Deep throttling capability', 'Reusable design', 'Clean burning'],
    cons: ['Complex manufacturing', 'Requires cryogenic storage', 'High development cost'],
    compatibility: ['Starship chassis', 'Liquid methane fuel', 'Advanced cooling systems']
  },
  'merlin': {
    description: 'Kerosene-oxygen rocket engine optimized for first-stage boost applications.',
    bestUsage: 'First-stage boost, satellite launches, commercial payload delivery',
    pros: ['Proven reliability', 'Cost-effective', 'Quick turnaround', 'Sea-level optimized'],
    cons: ['Lower specific impulse', 'Not suitable for upper stages', 'RP-1 fuel residue'],
    compatibility: ['Falcon 9 chassis', 'RP-1 kerosene fuel', 'Gimbal control systems']
  },
  'ge90': {
    description: 'High-bypass turbofan engine designed for long-haul commercial aircraft.',
    bestUsage: 'Long-haul flights, heavy cargo transport, transcontinental routes',
    pros: ['Exceptional fuel efficiency', 'Low noise', 'High reliability', 'Long maintenance intervals'],
    cons: ['Heavy weight', 'Large size', 'High initial cost', 'Complex maintenance'],
    compatibility: ['Commercial aircraft', 'Jet A-1 fuel', 'Advanced engine management']
  },
  'f135': {
    description: 'Advanced afterburning turbofan with thrust vectoring capabilities.',
    bestUsage: 'Supersonic flight, air combat, vertical takeoff operations',
    pros: ['Thrust vectoring', 'Supersonic capability', 'Advanced materials', 'Multi-mission'],
    cons: ['High fuel consumption', 'Complex maintenance', 'Afterburner noise', 'Heat signature'],
    compatibility: ['Fighter aircraft', 'Military fuel grades', 'Advanced flight controls']
  },
  'ion_drive': {
    description: 'Electric propulsion system using ionized gas for ultra-efficient thrust.',
    bestUsage: 'Deep space missions, satellite station-keeping, interplanetary probes',
    pros: ['Extremely efficient', 'Long operational life', 'Precise control', 'Low fuel mass'],
    cons: ['Very low thrust', 'Requires electrical power', 'Complex power systems', 'Slow acceleration'],
    compatibility: ['Space-only vehicles', 'Electric power systems', 'Precision guidance']
  },
  
  // Nose Cones
  'rounded_nose': {
    description: 'Blunt nose cone optimized for atmospheric entry and heat dissipation.',
    bestUsage: 'Atmospheric entry, crew capsules, heat-sensitive cargo',
    pros: ['Excellent heat dissipation', 'Stable flight', 'Simple manufacturing', 'Crew safety'],
    cons: ['Higher drag', 'Lower efficiency', 'Speed limitations'],
    compatibility: ['Crew vehicles', 'Heat shields', 'Atmospheric flight systems']
  },
  'pointed_nose': {
    description: 'Sharp aerodynamic nose cone designed for maximum speed and efficiency.',
    bestUsage: 'High-speed flight, atmospheric ascent, supersonic applications',
    pros: ['Low drag', 'High speed capability', 'Fuel efficient', 'Aerodynamic excellence'],
    cons: ['Heat concentration', 'Structural stress', 'Limited payload volume'],
    compatibility: ['High-speed vehicles', 'Advanced materials', 'Cooling systems']
  },
  'radome': {
    description: 'Sensor-equipped nose cone with advanced radar and communication capabilities.',
    bestUsage: 'Scientific missions, military reconnaissance, communication satellites',
    pros: ['Advanced sensors', 'Multi-spectrum capability', 'Real-time data', 'Navigation assistance'],
    cons: ['Complex electronics', 'Higher cost', 'Electromagnetic interference', 'Maintenance complexity'],
    compatibility: ['Scientific payloads', 'Communication systems', 'Power-rich vehicles']
  },
  
  // Directional Control
  'gimbaled-nozzle': {
    description: 'Engine nozzle that can pivot to provide thrust vectoring control.',
    bestUsage: 'Rocket launches, precision landing, orbital maneuvering',
    pros: ['Precise control', 'No additional weight', 'High reliability', 'Rapid response'],
    cons: ['Engine complexity', 'Mechanical stress', 'Limited gimbal range'],
    compatibility: ['Rocket engines', 'Automated guidance', 'Landing systems']
  },
  'reaction-control-thrusters': {
    description: 'Small thrusters placed around the vehicle for attitude control.',
    bestUsage: 'Space maneuvering, docking operations, fine attitude control',
    pros: ['360-degree control', 'Precise positioning', 'Redundancy', 'Space-optimized'],
    cons: ['Fuel consumption', 'Complex plumbing', 'Multiple failure points'],
    compatibility: ['Space vehicles', 'Hypergolic fuels', 'Automated systems']
  },
  'fly-by-wire-ailerons': {
    description: 'Computer-controlled flight surfaces for atmospheric maneuvering.',
    bestUsage: 'Atmospheric flight, landing approach, aerodynamic control',
    pros: ['Stable flight', 'Computer assistance', 'Pilot safety', 'Efficient maneuvering'],
    cons: ['Atmospheric only', 'Electronic dependency', 'Complex software'],
    compatibility: ['Aircraft', 'Atmospheric flight', 'Advanced avionics']
  },
  
  // Fuel Systems
  'kerosene': {
    description: 'Refined petroleum fuel optimized for rocket propulsion systems.',
    bestUsage: 'First-stage rockets, cost-sensitive missions, proven applications',
    pros: ['Room temperature storage', 'High density', 'Proven technology', 'Cost-effective'],
    cons: ['Lower performance', 'Carbon deposits', 'Environmental impact'],
    compatibility: ['Merlin engines', 'First-stage boosters', 'Traditional rockets']
  },
  'liquid_hydrogen': {
    description: 'Cryogenic fuel offering the highest specific impulse for rocket engines.',
    bestUsage: 'Upper stages, deep space missions, maximum efficiency requirements',
    pros: ['Highest efficiency', 'Clean burning', 'Maximum performance', 'Space-optimized'],
    cons: ['Cryogenic storage', 'Low density', 'Boil-off losses', 'Complex handling'],
    compatibility: ['Upper stage engines', 'Deep space vehicles', 'Insulated tanks']
  },
  'jet_a1': {
    description: 'Standard aviation turbine fuel for commercial and military aircraft.',
    bestUsage: 'Commercial aviation, military aircraft, atmospheric flight',
    pros: ['Stable storage', 'Wide availability', 'Proven reliability', 'Temperature tolerance'],
    cons: ['Atmospheric only', 'Lower energy density', 'Environmental concerns'],
    compatibility: ['Turbine engines', 'Aircraft systems', 'Standard fuel systems']
  },
  'electric': {
    description: 'Battery-powered electric propulsion system for clean, quiet operation.',
    bestUsage: 'Short-range flight, urban air mobility, environmental missions',
    pros: ['Zero emissions', 'Quiet operation', 'Low maintenance', 'Instant torque'],
    cons: ['Limited range', 'Battery weight', 'Charging time', 'Weather sensitivity'],
    compatibility: ['Electric motors', 'Modern avionics', 'Lightweight structures']
  },
  'nuclear': {
    description: 'Nuclear thermal propulsion system for extended deep space missions.',
    bestUsage: 'Interplanetary travel, Mars missions, deep space exploration',
    pros: ['Extremely high efficiency', 'Long duration', 'High thrust', 'Unlimited fuel'],
    cons: ['Radiation concerns', 'Complex safety', 'High development cost', 'Political challenges'],
    compatibility: ['Deep space vehicles', 'Radiation shielding', 'Advanced cooling']
  }
};

const ComponentSelector: React.FC<{
  title: string;
  components: VehicleComponent[];
  selectedComponents: VehicleComponent[];
  onSelect: (component: VehicleComponent) => void;
  selectedMission?: Mission | null;
}> = ({ title, components, selectedComponents, onSelect, selectedMission }) => {
  const [expandedComponent, setExpandedComponent] = useState<string | null>(null);

  const getRecommendationLevel = (componentId: string): 'highly-recommended' | 'recommended' | 'neutral' => {
    if (!selectedMission) return 'neutral';
    
    const componentType = components.find(c => c.id === componentId)?.type;
    if (!componentType) return 'neutral';
    
    const recommendations = selectedMission.recommendedComponents[componentType as keyof typeof selectedMission.recommendedComponents];
    
    if (recommendations.slice(0, 2).includes(componentId)) return 'highly-recommended';
    if (recommendations.includes(componentId)) return 'recommended';
    return 'neutral';
  };

  return (
  <div className="mb-12">
    <h3 className="text-3xl font-extrabold text-white mb-8 pb-4 border-b-2 border-accent-primary/30 flex items-center gap-4">
      <div className="header w-1/50 h-1/50 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full animate-pulse-slow shadow-glow"></div>
      {title}
      {selectedMission && (
        <span className="text-base font-normal text-gray-400 ml-auto">
          for {selectedMission.name}
        </span>
      )}
    </h3>
    <div className="bg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
      {components.map((component) => {
        const isSelected = selectedComponents.some(c => c.id === component.id);
        const isExpanded = expandedComponent === component.id;
        const details = componentDetails[component.id];
        const recommendation = getRecommendationLevel(component.id);
        
        return (
          <div key={component.id} className="crd-cont">
            <button
              onClick={() => onSelect(component)}
              className={`crd group max-w-[100px] max-h-[100px] mx-auto p-2 rounded-lg border-2 transition-smooth text-left card-hover shadow ${
                isSelected
                  ? 'border-accent-primary bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10 text-white shadow-accent-primary/20 shadow-2xl' 
                  : recommendation === 'highly-recommended'
                  ? 'border-green-400/60 bg-green-500/10 text-gray-200 hover:border-green-400/80 hover:bg-green-500/20 hover:shadow-green-400/20 hover:shadow-xl'
                  : recommendation === 'recommended'
                  ? 'border-yellow-400/60 bg-yellow-500/10 text-gray-200 hover:border-yellow-400/80 hover:bg-yellow-500/20 hover:shadow-yellow-400/20 hover:shadow-xl'
                  : 'border-white/30 bg-white/5 text-gray-200 hover:border-accent-primary/50 hover:bg-white/10 hover:shadow-accent-primary/10 hover:shadow-xl'
              }`}
            >
              {/* Mission Recommendation Badge */}
              {selectedMission && recommendation !== 'neutral' && (
                <div className={`absolute -top-2 -right-2 px-3 py-1 rounded-full text-xs font-bold border-2 ${
                  recommendation === 'highly-recommended'
                    ? 'bg-green-500 text-white border-green-400 shadow-green-500/50 shadow-lg'
                    : 'bg-yellow-500 text-black border-yellow-400 shadow-yellow-500/50 shadow-lg'
                }`}>
                  {recommendation === 'highly-recommended' ? '⭐ OPTIMAL' : '✓ GOOD'}
                </div>
              )}
              
              <div className="flex items-center gap-3">
                <div className={`text-2xl p-2 rounded-xl transition-all duration-300 group-hover:scale-110 border-2 ${
                  isSelected 
                    ? 'bg-accent-primary/20 shadow-glow border-accent-primary/50 shadow-accent-primary/30' 
                    : recommendation === 'highly-recommended'
                    ? 'bg-green-500/20 border-green-400/50 group-hover:bg-green-500/30 group-hover:border-green-400/70'
                    : recommendation === 'recommended'
                    ? 'bg-yellow-500/20 border-yellow-400/50 group-hover:bg-yellow-500/30 group-hover:border-yellow-400/70'
                    : 'bg-white/10 border-white/30 group-hover:bg-accent-primary/10 group-hover:border-accent-primary/40'
                }`}>
                  {component.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg block mb-4 group-hover:text-accent-primary transition-colors">{component.name}</span>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedComponent(isExpanded ? null : component.id);
                      }}
                      className="p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      <Info size={18} className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                  <div className="flex gap-6 text-sm font-medium">
                    <span className="flex items-center gap-2 px-3 py-1 rounded-lg bg-red-500/20 text-red-300 border border-red-500/30">
                      <span>⚡</span> {component.stats.power}
                    </span>
                    <span className="flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      <span>🚀</span> {component.stats.speed}
                    </span>
                    <span className="flex items-center gap-2 px-3 py-1 rounded-lg bg-green-500/20 text-green-300 border border-green-500/30">
                      <span>🛡️</span> {component.stats.durability}
                    </span>
                    <span className="flex items-center gap-2 px-3 py-1 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      <span>⚙️</span> {component.stats.efficiency}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Mission Compatibility Info */}
              {selectedMission && recommendation !== 'neutral' && (
                <div className={`mt-4 p-3 rounded-lg border text-sm ${
                  recommendation === 'highly-recommended'
                    ? 'bg-green-500/10 border-green-400/30 text-green-300'
                    : 'bg-yellow-500/10 border-yellow-400/30 text-yellow-300'
                }`}>
                  <div className="flex items-center gap-2">
                    <span>{recommendation === 'highly-recommended' ? '⭐' : '✓'}</span>
                    <span className="font-semibold">
                      {recommendation === 'highly-recommended' ? 'Optimal' : 'Good'} for {selectedMission.name}
                    </span>
                  </div>
                </div>
              )}
            </button>

            {/* Expanded Details */}
            {isExpanded && details && (
              <div className="des ml-20 p-6 bg-black/40 rounded-xl border border-white/20 space-y-4 animate-fade-in-up">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Description */}
                  <div className="space-y-3">
                    <h4 className="text-accent-primary font-semibold text-sm uppercase tracking-wide">Description</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">{details.description}</p>
                  </div>

                  {/* Best Usage */}
                  <div className="space-y-3">
                    <h4 className="text-accent-secondary font-semibold text-sm uppercase tracking-wide">Best Usage</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">{details.bestUsage}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Pros */}
                  <div className="space-y-3">
                    <h4 className="text-green-400 font-semibold text-sm uppercase tracking-wide">Advantages</h4>
                    <ul className="space-y-2">
                      {details.pros.map((pro, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-gray-300">
                          <span className="text-green-400">✓</span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Cons */}
                  <div className="space-y-3">
                    <h4 className="text-red-400 font-semibold text-sm uppercase tracking-wide">Limitations</h4>
                    <ul className="space-y-2">
                      {details.cons.map((con, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-gray-300">
                          <span className="text-red-400">×</span>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Compatibility */}
                <div className="space-y-3">
                  <h4 className="text-accent-tertiary font-semibold text-sm uppercase tracking-wide">Compatibility</h4>
                  <div className="flex flex-wrap gap-2">
                    {details.compatibility.map((item, index) => (
                      <span key={index} className="px-3 py-1 bg-accent-tertiary/20 text-accent-tertiary text-xs rounded-full border border-accent-tertiary/30">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Detailed Stats Breakdown */}
                <div className="space-y-3">
                  <h4 className="text-blue-400 font-semibold text-sm uppercase tracking-wide">Performance Analysis</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(component.stats).map(([statKey, value]) => {
                      const statInfo = {
                        power: { label: 'Power Output', desc: 'Maximum thrust/energy generation', color: 'red' },
                        speed: { label: 'Speed Rating', desc: 'Maximum velocity capability', color: 'blue' },
                        durability: { label: 'Durability', desc: 'Resistance to stress/damage', color: 'green' },
                        efficiency: { label: 'Efficiency', desc: 'Fuel/energy consumption ratio', color: 'purple' }
                      }[statKey] || { label: statKey, desc: '', color: 'gray' };

                      return (
                        <div key={statKey} className="bg-white/5 p-3 rounded-lg border border-white/10">
                          <div className="text-xs text-gray-400 mb-1">{statInfo.label}</div>
                          <div className="text-lg font-bold text-white mb-1">{value}%</div>
                          <div className="text-xs text-gray-500">{statInfo.desc}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  </div>
  );
};

const VehicleVisualizer: React.FC<{ vehicle: Vehicle }> = ({ vehicle }) => {
  return (
    <div className="glass rounded-3xl p-12 border-2 border-white/20 mb-12">
      <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-4">
        <div className="p-3 glass rounded-xl border border-accent-primary/30">
          <Rocket className="text-accent-primary" size={24} />
        </div>
        Vehicle Preview
      </h3>
      
      <div className="relative min-h-[500px] flex flex-col items-center justify-center bg-gradient-to-b from-blue-950/20 to-black/20 rounded-2xl border-2 border-dashed border-white/30 overflow-hidden">
        {/* Space background effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/30 via-purple-950/20 to-black/40"></div>
        <div className="absolute top-4 left-4 w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-8 right-8 w-1 h-1 bg-blue-300 rounded-full animate-pulse"></div>
        <div className="absolute bottom-6 left-8 w-1.5 h-1.5 bg-purple-300 rounded-full animate-pulse"></div>
        <div className="absolute top-16 left-1/3 w-1 h-1 bg-yellow-300 rounded-full animate-pulse"></div>
        
        <div className="relative z-10 flex flex-col items-center space-y-4">
          {/* Nose Cone */}
          <div className={`transition-all duration-500 ${vehicle.nose ? 'opacity-100 scale-100' : 'opacity-30 scale-75'}`}>
            <div className={`w-16 h-20 flex items-center justify-center text-4xl rounded-t-full ${
              vehicle.nose 
                ? 'bg-gradient-to-b from-gray-300 to-gray-500 border-2 border-gray-400 shadow-lg' 
                : 'bg-gradient-to-b from-gray-600/50 to-gray-800/50 border-2 border-gray-600/50'
            }`}>
              {vehicle.nose ? vehicle.nose.icon : '⚪'}
            </div>
          </div>

          {/* Upper Section / Payload */}
          <div className={`transition-all duration-500 ${vehicle.chassis ? 'opacity-100 scale-100' : 'opacity-30 scale-75'}`}>
            <div className={`w-20 h-24 flex items-center justify-center text-3xl ${
              vehicle.chassis 
                ? 'bg-gradient-to-b from-blue-200 to-blue-400 border-2 border-blue-500 shadow-lg' 
                : 'bg-gradient-to-b from-gray-600/50 to-gray-800/50 border-2 border-gray-600/50'
            }`}>
              {vehicle.chassis ? vehicle.chassis.icon : '🚀'}
            </div>
          </div>

          {/* Directional Control / Fins */}
          <div className="relative">
            <div className={`transition-all duration-500 ${vehicle.directional_control ? 'opacity-100 scale-100' : 'opacity-30 scale-75'}`}>
              <div className={`w-20 h-16 flex items-center justify-center text-2xl ${
                vehicle.directional_control 
                  ? 'bg-gradient-to-b from-red-200 to-red-400 border-2 border-red-500 shadow-lg' 
                  : 'bg-gradient-to-b from-gray-600/50 to-gray-800/50 border-2 border-gray-600/50'
              }`}>
                {vehicle.directional_control ? vehicle.directional_control.icon : '🎯'}
              </div>
            </div>
            
            {/* Fins/Wings */}
            {vehicle.directional_control && (
              <div className="absolute top-2 left-0 right-0 flex justify-between">
                <div className="w-6 h-12 bg-gradient-to-r from-red-300 to-red-500 transform -rotate-12 -translate-x-2 border border-red-600 shadow-md"></div>
                <div className="w-6 h-12 bg-gradient-to-l from-red-300 to-red-500 transform rotate-12 translate-x-2 border border-red-600 shadow-md"></div>
              </div>
            )}
          </div>

          {/* Fuel System */}
          <div className={`transition-all duration-500 ${vehicle.fuelSystem ? 'opacity-100 scale-100' : 'opacity-30 scale-75'}`}>
            <div className={`w-20 h-20 flex items-center justify-center text-3xl ${
              vehicle.fuelSystem 
                ? 'bg-gradient-to-b from-green-200 to-green-400 border-2 border-green-500 shadow-lg' 
                : 'bg-gradient-to-b from-gray-600/50 to-gray-800/50 border-2 border-gray-600/50'
            }`}>
              {vehicle.fuelSystem ? vehicle.fuelSystem.icon : '⛽'}
            </div>
          </div>

          {/* Engine / Thrusters */}
          <div className={`transition-all duration-500 ${vehicle.engine ? 'opacity-100 scale-100' : 'opacity-30 scale-75'}`}>
            <div className={`w-24 h-16 flex items-center justify-center text-3xl rounded-b-lg ${
              vehicle.engine 
                ? 'bg-gradient-to-b from-orange-300 to-orange-500 border-2 border-orange-600 shadow-lg' 
                : 'bg-gradient-to-b from-gray-600/50 to-gray-800/50 border-2 border-gray-600/50'
            }`}>
              {vehicle.engine ? vehicle.engine.icon : '🔥'}
            </div>
          </div>

          {/* Engine Flame Effect */}
          {vehicle.engine && (
            <div className="flex space-x-1 animate-pulse">
              <div className="w-2 h-8 bg-gradient-to-t from-yellow-400 via-orange-500 to-red-500 rounded-full animate-bounce"></div>
              <div className="w-3 h-12 bg-gradient-to-t from-yellow-300 via-orange-400 to-red-400 rounded-full animate-bounce delay-75"></div>
              <div className="w-2 h-10 bg-gradient-to-t from-yellow-400 via-orange-500 to-red-500 rounded-full animate-bounce delay-150"></div>
            </div>
          )}
        </div>

        {/* Component Labels */}
        <div className="absolute top-4 right-4 space-y-2 text-xs">
          {vehicle.nose && (
            <div className="bg-black/60 text-white px-2 py-1 rounded border border-gray-400">
              Nose: {vehicle.nose.name}
            </div>
          )}
          {vehicle.chassis && (
            <div className="bg-black/60 text-white px-2 py-1 rounded border border-blue-400">
              Chassis: {vehicle.chassis.name}
            </div>
          )}
          {vehicle.directional_control && (
            <div className="bg-black/60 text-white px-2 py-1 rounded border border-red-400">
              Control: {vehicle.directional_control.name}
            </div>
          )}
          {vehicle.fuelSystem && (
            <div className="bg-black/60 text-white px-2 py-1 rounded border border-green-400">
              Fuel: {vehicle.fuelSystem.name}
            </div>
          )}
          {vehicle.engine && (
            <div className="bg-black/60 text-white px-2 py-1 rounded border border-orange-400">
              Engine: {vehicle.engine.name}
            </div>
          )}
        </div>

        {/* Instructions */}
        {Object.values(vehicle).every(component => component === null) && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-gray-400 p-8">
              <div className="text-6xl mb-4 opacity-50">🚀</div>
              <p className="text-lg font-medium">Select components to see your vehicle</p>
              <p className="text-sm">Watch it build in real-time!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const StatsPanel: React.FC<{ vehicle: Vehicle }> = ({ vehicle }) => {
  const calculateStats = () => {
    const components = [
      vehicle.chassis,
      vehicle.engine,
      vehicle.nose,
      vehicle.directional_control,
      vehicle.fuelSystem,
    ].filter(Boolean) as VehicleComponent[];

    if (components.length === 0) return { power: 0, speed: 0, durability: 0, efficiency: 0 };

    const totalStats = components.reduce(
      (acc, component) => ({
        power: acc.power + component.stats.power,
        speed: acc.speed + component.stats.speed,
        durability: acc.durability + component.stats.durability,
        efficiency: acc.efficiency + component.stats.efficiency,
      }),
      { power: 0, speed: 0, durability: 0, efficiency: 0 }
    );

    return {
      power: Math.round(totalStats.power / components.length),
      speed: Math.round(totalStats.speed / components.length),
      durability: Math.round(totalStats.durability / components.length),
      efficiency: Math.round(totalStats.efficiency / components.length),
    };
  };

  const stats = calculateStats();
  const statConfigs = [
    { key: 'power', label: 'Power', icon: '⚡', color: 'from-red-500 to-orange-500', bgColor: 'from-red-500/20 to-orange-500/20' },
    { key: 'speed', label: 'Speed', icon: '🚀', color: 'from-accent-primary to-blue-400', bgColor: 'from-accent-primary/20 to-blue-400/20' },
    { key: 'durability', label: 'Durability', icon: '🛡️', color: 'from-accent-tertiary to-green-400', bgColor: 'from-accent-tertiary/20 to-green-400/20' },
    { key: 'efficiency', label: 'Efficiency', icon: '⚙️', color: 'from-accent-secondary to-purple-400', bgColor: 'from-accent-secondary/20 to-purple-400/20' },
  ];

  return (
    <div className="glass-strong p-10 rounded-2xl shadow-dark border-2 border-white/10">
      <div className="flex items-center gap-5 mb-10">
        <div className="p-4 glass rounded-xl border border-accent-primary/30">
          <BarChart3 className="text-accent-primary" size={32} />
        </div>
        <h4 className="text-2xl font-black text-white">Performance Metrics</h4>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
        {statConfigs.map(({ key, label, icon, color, bgColor }) => {
          const value = stats[key as keyof typeof stats];
          return (
            <div key={key} className="group">
              <div className="flex justify-between items-center text-gray-300 mb-5">
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{icon}</span>
                  <span className="font-semibold text-lg">{label}</span>
                </div>
                <span className="font-black text-white text-2xl">{value}%</span>
              </div>
              <div className="relative">
                <div className="w-full bg-white/10 rounded-full h-5 overflow-hidden glass border border-white/20">
                  <div
                    className={`bg-gradient-to-r ${color} h-5 rounded-full transition-all duration-1000 ease-out relative overflow-hidden progress-glow`}
                    style={{ width: `${value}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                  </div>
                </div>
                <div className={`absolute inset-0 bg-gradient-to-r ${bgColor} rounded-full opacity-0 group-hover:opacity-100 transition-smooth -z-10 blur-md`}></div>
              </div>
            </div>
          );
        })}
      </div>
      {Object.values(stats).every(val => val === 0) && (
        <div className="text-center mt-10 p-8 glass rounded-xl border-2 border-white/10">
          <p className="text-gray-400 font-light text-lg">Select components to see performance metrics</p>
        </div>
      )}
    </div>
  );
};

const BuildPage: React.FC = () => {
  const [vehicle, setVehicle] = useState<Vehicle>({
    chassis: null,
    engine: null,
    nose: null,
    directional_control: null,
    fuelSystem: null,
  });
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [showMissionSelector, setShowMissionSelector] = useState(true);

  const handleComponentSelect = (component: VehicleComponent) => {
    setVehicle(prev => {
      switch (component.type) {
        case 'chassis':
          return { ...prev, chassis: component };
        case 'engine':
          return { ...prev, engine: component };
        case 'nose':
          return { ...prev, nose: component };
        case 'directional_control':
          return { ...prev, directional_control: component };
        case 'fuel_system':
          return { ...prev, fuelSystem: component };
        default:
          return prev;
      }
    });
  };

  const handleMissionSelect = (mission: Mission) => {
    setSelectedMission(mission);
    setShowMissionSelector(false);
  };

  const handleSkipMission = () => {
    setSelectedMission(null);
    setShowMissionSelector(false);
  };

  const changeMission = () => {
    setShowMissionSelector(true);
  };

  const resetVehicle = () => {
    setVehicle({
      chassis: null,
      engine: null,
      nose: null,
      directional_control: null,
      fuelSystem: null,
    });
  };

  const saveVehicle = () => {
    // In a real app, this would save to a database
    const missionText = selectedMission ? ` for ${selectedMission.name}` : '';
    alert(`🚀 Vehicle configuration saved${missionText}! (This is a demo)`);
  };

  const getSelectedComponents = (type: string) => {
    switch (type) {
      case 'chassis':
        return vehicle.chassis ? [vehicle.chassis] : [];
      case 'engine':
        return vehicle.engine ? [vehicle.engine] : [];
      case 'nose':
        return vehicle.nose ? [vehicle.nose] : [];
      case 'directional_control':
        return vehicle.directional_control ? [vehicle.directional_control] : [];
      case 'fuel_system':
        return vehicle.fuelSystem ? [vehicle.fuelSystem] : [];
      default:
        return [];
    }
  };

  const completedComponents = Object.values(vehicle).filter(Boolean).length;
  const totalComponents = 5;
  const completionPercentage = (completedComponents / totalComponents) * 100;

  // Calculate mission compatibility score
  const calculateMissionCompatibility = (): number => {
    if (!selectedMission || completedComponents === 0) return 0;
    
    const components = Object.values(vehicle).filter(Boolean) as VehicleComponent[];
    const vehicleStats = components.reduce(
      (acc, component) => ({
        power: acc.power + component.stats.power,
        speed: acc.speed + component.stats.speed,
        durability: acc.durability + component.stats.durability,
        efficiency: acc.efficiency + component.stats.efficiency,
      }),
      { power: 0, speed: 0, durability: 0, efficiency: 0 }
    );

    // Average the stats
    const avgStats = {
      power: vehicleStats.power / components.length,
      speed: vehicleStats.speed / components.length,
      durability: vehicleStats.durability / components.length,
      efficiency: vehicleStats.efficiency / components.length,
    };

    // Calculate how well vehicle stats meet mission requirements
    const compatibility = Object.entries(avgStats).reduce((acc, [key, value]) => {
      const requirement = selectedMission.requirements[key as keyof typeof selectedMission.requirements];
      const score = Math.min(value / requirement, 1.5); // Cap at 150% for bonus points
      return acc + score;
    }, 0);

    return Math.round((compatibility / 4) * 100); // Average and convert to percentage
  };

  const missionCompatibility = calculateMissionCompatibility();

  if (showMissionSelector) {
    return <MissionSelector onMissionSelect={handleMissionSelect} onSkip={handleSkipMission} />;
  }

  return (
    <div className="min-h-screen pt-40 pb-24 px-6 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Mission Header */}
        {selectedMission && (
          <div className="mb-12 glass p-8 rounded-2xl border-2 border-accent-secondary/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="text-5xl">{selectedMission.icon}</div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Mission: {selectedMission.name}</h2>
                  <p className="text-gray-300 max-w-2xl">{selectedMission.description}</p>
                </div>
              </div>
              <div className="text-right space-y-3">
                <div className={`text-2xl font-bold ${
                  missionCompatibility >= 80 ? 'text-green-400' : 
                  missionCompatibility >= 60 ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {missionCompatibility}% Compatible
                </div>
                <button
                  onClick={changeMission}
                  className="btn-secondary px-6 py-2 rounded-lg text-sm hover:scale-105 transition-bounce"
                >
                  Change Mission
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          <div className="lg:col-span-2">
            <div className="glass-strong p-12 rounded-3xl border-2 border-white/30 sticky top-40 shadow-dark">
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-3xl font-black text-white flex items-center gap-5">
                  <div className="p-5 glass rounded-2xl border-2 border-accent-primary/40 shadow-glow">
                    <Wrench className="text-accent-primary" size={32} />
                  </div>
                  Components
                </h2>
                <div className="text-right bg-white/5 p-4 rounded-xl border border-white/20">
                  <div className="text-sm text-gray-400 font-medium">Progress</div>
                  <div className="text-2xl font-black text-white">{completedComponents}/{totalComponents}</div>
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="mb-12">
                <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden glass border-2 border-white/20">
                  <div
                    className="bg-gradient-to-r from-accent-primary to-accent-secondary h-4 rounded-full transition-all duration-1000 ease-out progress-glow shadow-accent-primary/50 shadow-lg"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
                <div className="text-right mt-4">
                  <span className="text-base text-gray-300 font-medium">{Math.round(completionPercentage)}% Complete</span>
                </div>
              </div>

              <div className="header space-y-12 max-h-[40vh] overflow-y-auto scrollbar-thin pr-4">
                <ComponentSelector
                  title="Chassis"
                  components={componentLibrary.filter(c => c.type === 'chassis')}
                  selectedComponents={getSelectedComponents('chassis')}
                  onSelect={handleComponentSelect}
                  selectedMission={selectedMission}
                />
                <ComponentSelector
                  title="Engine"
                  components={componentLibrary.filter(c => c.type === 'engine')}
                  selectedComponents={getSelectedComponents('engine')}
                  onSelect={handleComponentSelect}
                  selectedMission={selectedMission}
                />
                <ComponentSelector
                  title="Nose Cone"
                  components={componentLibrary.filter(c => c.type === 'nose')}
                  selectedComponents={getSelectedComponents('nose')}
                  onSelect={handleComponentSelect}
                  selectedMission={selectedMission}
                />
                <ComponentSelector
                  title="Directional Control"
                  components={componentLibrary.filter(c => c.type === 'directional_control')}
                  selectedComponents={getSelectedComponents('directional_control')}
                  onSelect={handleComponentSelect}
                  selectedMission={selectedMission}
                />
                <ComponentSelector
                  title="Fuel System"
                  components={componentLibrary.filter(c => c.type === 'fuel_system')}
                  selectedComponents={getSelectedComponents('fuel_system')}
                  onSelect={handleComponentSelect}
                  selectedMission={selectedMission}
                />
              </div>
              
              <div className="flex gap-8 mt-12 pt-10 border-t-2 border-white/30">
                <button
                  onClick={saveVehicle}
                  disabled={completedComponents === 0}
                  className="btn-primary flex-1"
                >
                  💾 Save Build
                </button>
                <button
                  onClick={resetVehicle}
                  className="btn-primary flex-1 bg-gradient-to-r from-red-500/20 to-red-600/20 text-red-200 px-10 py-6 rounded-2xl text-lg font-bold border-2 border-red-500/40 hover:border-red-400/60 hover:bg-red-500/30 transition-smooth hover:scale-105 shadow-lg"
                >
                  🔄 Reset
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-12">
            <VehicleVisualizer vehicle={vehicle} />
            
            <div className="glass rounded-3xl p-24 min-h-[400px] flex flex-col items-center justify-center border-4 border-dashed border-white/40 group hover:border-accent-primary/50 transition-smooth grid-pattern">
              <div className="text-center max-w-2xl">
                <div className="text-9xl mb-16 animate-float">
                  {vehicle.chassis ? vehicle.chassis.icon : '🚀'}
                </div>
                <h2 className="text-4xl font-bold text-white mb-16 leading-relaxed px-4">
                  {vehicle.chassis ? vehicle.chassis.name : 'Select components to build your vehicle'}
                </h2>
                <div className="space-y-8 text-gray-300">
                  {vehicle.engine && (
                    <div className="flex items-center justify-center gap-8 p-8 glass rounded-2xl border-2 border-white/30 bg-white/5">
                      <span className="text-4xl">{vehicle.engine.icon}</span>
                      <span className="font-bold text-xl">Engine: {vehicle.engine.name}</span>
                    </div>
                  )}
                  {vehicle.directional_control && (
                    <div className="flex items-center justify-center gap-8 p-8 glass rounded-2xl border-2 border-white/30 bg-white/5">
                      <span className="text-4xl">{vehicle.directional_control.icon}</span>
                      <span className="font-bold text-xl">Control: {vehicle.directional_control.name}</span>
                    </div>
                  )}
                  {vehicle.fuelSystem && (
                    <div className="flex items-center justify-center gap-8 p-8 glass rounded-2xl border-2 border-white/30 bg-white/5">
                      <span className="text-4xl">{vehicle.fuelSystem.icon}</span>
                      <span className="font-bold text-xl">Fuel: {vehicle.fuelSystem.name}</span>
                    </div>
                  )}
                  {vehicle.nose && (
                    <div className="flex items-center justify-center gap-8 p-8 glass rounded-2xl border-2 border-white/30 bg-white/5">
                      <span className="text-4xl">{vehicle.nose.icon}</span>
                      <span className="font-bold text-xl">Nose: {vehicle.nose.name}</span>
                    </div>
                  )}
                </div>
                {completionPercentage === 100 && (
                  <div className="mt-16 p-10 bg-gradient-to-r from-accent-tertiary/30 to-accent-primary/30 rounded-2xl border-2 border-accent-tertiary/50 glass shadow-glow">
                    <p className="text-accent-tertiary font-bold text-2xl">🎉 Vehicle build complete!</p>
                    {selectedMission && (
                      <p className="text-white mt-4">
                        Mission Compatibility: <span className={`font-bold ${
                          missionCompatibility >= 80 ? 'text-green-400' : 
                          missionCompatibility >= 60 ? 'text-yellow-400' : 'text-red-400'
                        }`}>{missionCompatibility}%</span>
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
            <StatsPanel vehicle={vehicle} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onStartBuild={() => setCurrentPage('build')} />;
      case 'build':
        return <BuildPage />;
      case 'gallery':
        return (
          <div className="min-h-screen flex flex-col justify-center text-center px-6 sm:px-8 lg:px-12 py-32 animate-fade-in-up">
            <div className="max-w-6xl mx-auto w-full">
              <div className="mb-20 p-10 glass rounded-full w-fit mx-auto animate-float shadow-glow border-2 border-accent-secondary/30">
                <Image className="text-accent-secondary" size={80} />
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-12 gradient-text">Vehicle Gallery</h2>
              <div className="max-w-4xl mx-auto">
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-20 leading-relaxed font-light px-6">
                  Coming soon! View, share, and explore amazing vehicles created by the community.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-6">
                  {[
                    { icon: '🚀', title: 'Space Vehicles', desc: 'Rockets and spacecraft' },
                    { icon: '✈️', title: 'Aircraft', desc: 'Jets and planes' },
                    { icon: '🛸', title: 'Experimental', desc: 'Unique designs' },
                  ].map((category, index) => (
                    <div key={index} className="card-hover glass p-10 rounded-2xl h-full border-2 border-white/20 hover:border-accent-secondary/50">
                      <div className="text-6xl mb-8 mx-auto w-fit">{category.icon}</div>
                      <h3 className="text-xl font-bold text-white mb-6">{category.title}</h3>
                      <p className="text-gray-400 font-light leading-relaxed">{category.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 'about':
        return (
          <div className="min-h-screen flex flex-col justify-center text-center px-6 sm:px-8 lg:px-12 py-32 animate-fade-in-up">
            <div className="max-w-6xl mx-auto w-full">
              <div className="mb-20 p-10 glass rounded-full w-fit mx-auto animate-float shadow-glow border-2 border-accent-tertiary/30">
                <Info className="text-accent-tertiary" size={80} />
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-12 gradient-text">About Build-N-Fly</h2>
              <div className="max-w-5xl mx-auto">
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-20 leading-relaxed font-light px-6">
                  A cutting-edge vehicle design platform that empowers engineers, enthusiasts, and dreamers 
                  to create the next generation of aerospace vehicles.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-6 mb-16">
                  <div className="card-hover glass p-12 rounded-2xl text-left h-full border-2 border-white/20 hover:border-accent-primary/50">
                    <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-4">
                      <span className="text-accent-primary text-4xl">🛠️</span>
                      Advanced Engineering
                    </h3>
                    <p className="text-gray-300 leading-relaxed font-light text-lg">
                      Real-time performance calculations, component compatibility analysis, 
                      and optimization suggestions for your designs.
                    </p>
                  </div>
                  <div className="card-hover glass p-12 rounded-2xl text-left h-full border-2 border-white/20 hover:border-accent-secondary/50">
                    <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-4">
                      <span className="text-accent-secondary text-4xl">🚀</span>
                      Future Technology
                    </h3>
                    <p className="text-gray-300 leading-relaxed font-light text-lg">
                      From traditional chemical rockets to experimental ion drives and 
                      nuclear thermal propulsion systems.
                    </p>
                  </div>
                </div>
                <div className="glass rounded-2xl border-2 border-accent-primary/30 p-10 mx-6">
                  <p className="text-accent-primary font-semibold text-xl">
                    Built with React, TypeScript, and Tailwind CSS • Open Source • Community Driven
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <HomePage onStartBuild={() => setCurrentPage('build')} />;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-950 relative">
        {/* Animated background patterns */}
        <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/5 via-transparent to-accent-secondary/5 animate-pulse-slow"></div>
        <div className="absolute inset-0 grid-pattern opacity-20"></div>
        <div className="relative z-10">
          <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
          <main>
            {renderPage()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;