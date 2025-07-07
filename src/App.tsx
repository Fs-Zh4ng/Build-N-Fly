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
      <div className="text-2xl font-bold text-white flex items-center gap-4">

        <span className="gradient-text font-black tracking-tight text-4xl">
          Build-N-Fly
        </span>
      </div>
      <div className="flex gap-4">
        {[
          { id: 'home', label: 'Home', icon: Home },
          { id: 'build', label: 'Build', icon: Wrench },
          { id: 'gallery', label: 'Gallery', icon: Image },
          { id: 'about', label: 'About', icon: Info },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onPageChange(id)}
            className={`group flex items-center gap-4 px-8 py-4 rounded-2xl font-bold transition-all duration-300 border-2 shadow-lg ${
              currentPage === id 
                ? 'bg-gradient-to-r from-accent-primary to-accent-secondary text-white shadow-accent-primary/30 border-accent-primary/50 shadow-glow scale-105' 
                : 'bg-white/10 text-gray-200 hover:text-white border-white/30 hover:border-accent-primary/50 hover:bg-accent-primary/10 hover:shadow-accent-primary/20 hover:scale-105'
            }`}
          >
            <Icon size={24} className="transition-all duration-300 group-hover:scale-110" />
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
        <div className="mb-16 p-10 glass rounded-full animate-float shadow-glow border-2 border-accent-primary/30 mx-auto w-fit">
          <Rocket className="text-accent-primary animate-glow" size={80} />
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-12 leading-tight text-shadow max-w-6xl mx-auto px-4">
          Build Your Ultimate
          <span className="gradient-text block mt-6">
            Flying Machine
          </span>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
        {[
          { icon: Zap, title: 'Advanced Engines', desc: 'From chemical rockets to ion drives - choose your propulsion', color: 'from-orange-500 to-red-500' },
          { icon: Settings, title: 'Precision Chassis', desc: 'Aerospace-grade frames engineered for every mission profile', color: 'from-accent-primary to-accent-secondary' },
          { icon: Settings, title: 'Smart Controls', desc: 'AI-assisted directional systems for optimal flight dynamics', color: 'from-accent-tertiary to-green-500' },
          { icon: BarChart3, title: 'Real-time Analytics', desc: 'Live performance metrics and optimization suggestions', color: 'from-accent-secondary to-pink-500' },
        ].map((feature, index) => (
          <div 
            key={index} 
            className="card-hover glass p-10 rounded-2xl group h-full border-2 border-white/20 hover:border-accent-primary/50"
          >
            <div className={`p-8 bg-gradient-to-br ${feature.color} rounded-2xl w-fit mx-auto mb-8 group-hover:scale-110 transition-bounce shadow-dark border border-white/20`}>
              <feature.icon className="text-white" size={44} />
            </div>
            <h3 className="text-xl font-bold text-white mb-6 group-hover:gradient-text transition-smooth text-center">{feature.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-smooth font-light text-center">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ComponentSelector: React.FC<{
  title: string;
  components: VehicleComponent[];
  selectedComponents: VehicleComponent[];
  onSelect: (component: VehicleComponent) => void;
}> = ({ title, components, selectedComponents, onSelect }) => (
  <div className="mb-12">
    <h3 className="text-xl font-bold text-white mb-8 pb-4 border-b-2 border-accent-primary/30 flex items-center gap-4">
      <div className="w-3 h-3 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full animate-pulse-slow shadow-glow"></div>
      {title}
    </h3>
    <div className="space-y-6">
      {components.map((component) => {
        const isSelected = selectedComponents.some(c => c.id === component.id);
        return (
          <button
            key={component.id}
            onClick={() => onSelect(component)}
            className={`group w-full p-6 rounded-2xl border-2 transition-smooth text-left card-hover shadow-lg ${
              isSelected
                ? 'border-accent-primary bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10 text-white shadow-accent-primary/20 shadow-2xl' 
                : 'border-white/30 bg-white/5 text-gray-200 hover:border-accent-primary/50 hover:bg-white/10 hover:shadow-accent-primary/10 hover:shadow-xl'
            }`}
          >
            <div className="flex items-center gap-6">
              <div className={`text-3xl p-5 rounded-2xl transition-all duration-300 group-hover:scale-110 border-2 ${
                isSelected 
                  ? 'bg-accent-primary/20 shadow-glow border-accent-primary/50 shadow-accent-primary/30' 
                  : 'bg-white/10 border-white/30 group-hover:bg-accent-primary/10 group-hover:border-accent-primary/40'
              }`}>
                {component.icon}
              </div>
              <div className="flex-1">
                <span className="font-bold text-lg block mb-4 group-hover:text-accent-primary transition-colors">{component.name}</span>
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
          </button>
        );
      })}
    </div>
  </div>
);

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
    alert('🚀 Vehicle configuration saved! (This is a demo)');
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

  return (
    <div className="min-h-screen pt-40 pb-24 px-6 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
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

              <div className="space-y-12 max-h-[40vh] overflow-y-auto scrollbar-thin pr-4">
                <ComponentSelector
                  title="Chassis"
                  components={componentLibrary.filter(c => c.type === 'chassis')}
                  selectedComponents={getSelectedComponents('chassis')}
                  onSelect={handleComponentSelect}
                />
                <ComponentSelector
                  title="Engine"
                  components={componentLibrary.filter(c => c.type === 'engine')}
                  selectedComponents={getSelectedComponents('engine')}
                  onSelect={handleComponentSelect}
                />
                <ComponentSelector
                  title="Nose Cone"
                  components={componentLibrary.filter(c => c.type === 'nose')}
                  selectedComponents={getSelectedComponents('nose')}
                  onSelect={handleComponentSelect}
                />
                <ComponentSelector
                  title="Directional Control"
                  components={componentLibrary.filter(c => c.type === 'directional_control')}
                  selectedComponents={getSelectedComponents('directional_control')}
                  onSelect={handleComponentSelect}
                />
                <ComponentSelector
                  title="Fuel System"
                  components={componentLibrary.filter(c => c.type === 'fuel_system')}
                  selectedComponents={getSelectedComponents('fuel_system')}
                  onSelect={handleComponentSelect}
                />
              </div>
              
              <div className="flex gap-8 mt-12 pt-10 border-t-2 border-white/30">
                <button
                  onClick={saveVehicle}
                  disabled={completedComponents === 0}
                  className="flex-1 bg-gradient-to-r from-accent-tertiary to-green-500 text-white px-10 py-6 rounded-2xl text-lg font-bold hover:shadow-glow transition-smooth hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 border-2 border-accent-tertiary/50 shadow-lg"
                >
                  💾 Save Build
                </button>
                <button
                  onClick={resetVehicle}
                  className="flex-1 bg-gradient-to-r from-red-500/20 to-red-600/20 text-red-200 px-10 py-6 rounded-2xl text-lg font-bold border-2 border-red-500/40 hover:border-red-400/60 hover:bg-red-500/30 transition-smooth hover:scale-105 shadow-lg"
                >
                  🔄 Reset
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-12">
            <div className="glass rounded-3xl p-24 min-h-[600px] flex flex-col items-center justify-center border-4 border-dashed border-white/40 group hover:border-accent-primary/50 transition-smooth grid-pattern">
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