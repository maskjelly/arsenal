import React from 'react';

const Banner: React.FC = () => {
  return (
    <div className="bg-yellow-400 text-black text-center py-2 font-bold border-t-4 border-b-4 border-yellow-600 
                    relative overflow-hidden shadow-lg rounded-md mx-4 mt-4 transform transition-all duration-300 hover:translate-y-1">
      <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,_#000_0px,_#000_10px,_#facc15_10px,_#facc15_20px)] 
                      opacity-20"></div>
      <span className="relative z-10">
        Currently under development, thus is slow and raggy 
      </span>
    </div>
  );
};

export default Banner;
