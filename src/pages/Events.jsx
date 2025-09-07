import React from 'react';

const eventList = [
  { name: 'AI Art Contest', description: 'Unleash your creativity and generate stunning visual masterpieces with cutting-edge AI models. Judged on originality, aesthetic, and technical skill.' },
  { name: 'Robotics Challenge', description: 'Design, build, and program autonomous bots to compete in a series of complex challenges. A true test of engineering and strategy.' },
  { name: 'Beat-the-AI Quiz', description: 'Pit your knowledge against our super-intelligent quiz AI. Topics range from tech history to quantum physics. Can you outsmart the machine?' },
  { name: 'VR Arena', description: 'Immerse yourself in competitive virtual reality games. From high-octane shooters to strategic puzzle solvers, the VR Arena has it all.' },
  { name: 'Quantum Hackathon', description: 'A 24-hour coding marathon focused on solving real-world problems using quantum computing principles. Prizes for the most innovative solutions.' },
  { name: 'Bio-Hacking Expo', description: 'Explore the intersection of biology and technology. See live demos of the latest in genetic engineering, prosthetics, and neural interfaces.' },
  { name: 'Keynote by Dr. Anya Sharma', description: 'Join the world-renowned AI ethicist Dr. Anya Sharma as she discusses the future of artificial general intelligence and its impact on society.'},
  { name: 'Drone Racing GP', description: 'Witness expert pilots navigate complex courses at breathtaking speeds in the FutureX Drone Racing Grand Prix. An adrenaline-pumping spectacle.'}
];

const Events = () => {
  return (
    <div className="pt-24 pb-12 px-4 text-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="section-title neon-text-blue">FutureX 2025 Events</h1>
        <p className="text-center text-gray-400 mb-12 max-w-3xl mx-auto">
          Dive into a diverse lineup of competitions, workshops, and talks designed to push the boundaries of technology.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {eventList.map(event => (
            <div key={event.name} className="event-card bg-gray-900/50 p-6 rounded-lg border-2 h-full flex flex-col">
              <h2 className="text-2xl font-bold mb-3 text-cyan-400">{event.name}</h2>
              <p className="text-gray-400 flex-grow">{event.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
