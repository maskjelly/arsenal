import React from 'react';

const Banner: React.FC = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="flex items-center justify-center px-4 py-3 text-sm font-medium bg-white border-y-2 border-black">
        <div className="absolute inset-0">
          {/* Industrial pattern background */}
          <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,_transparent_0px,_transparent_10px,_#000_10px,_#000_12px)] opacity-5"></div>
          <div className="absolute inset-0 bg-[repeating-linear-gradient(-45deg,_transparent_0px,_transparent_10px,_#000_10px,_#000_12px)] opacity-5"></div>
          
          {/* Warning stripes on sides */}
          <div className="absolute left-0 top-0 bottom-0 w-2 bg-[repeating-linear-gradient(135deg,_#000_0px,_#000_10px,_#facc15_10px,_#facc15_20px)]"></div>
          <div className="absolute right-0 top-0 bottom-0 w-2 bg-[repeating-linear-gradient(135deg,_#000_0px,_#000_10px,_#facc15_10px,_#facc15_20px)]"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 flex items-center gap-2 font-mono">
          <div className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse"></div>
          <span className="relative">
            <span className="font-bold tracking-tight">NOTICE:</span>{" "}
            <span className="text-neutral-800">AI generated answers will not be generated as I HAVE RAN OUT OF CREDITS</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Banner;
