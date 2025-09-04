// /src/components/FullScreenLoader.tsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FullScreenLoaderProps {
  onLoadingComplete?: () => void;
  loadingTime?: number;
}

const Loader: React.FC<FullScreenLoaderProps> = ({ 
  onLoadingComplete, 
  loadingTime = 4000
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // Generate random particles for the glitter effect
  const generateParticles = (count: number) => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 2,
      delay: Math.random() * 2,
      duration: Math.random() * 2 + 1,
    }));
  };

  const [particles, setParticles] = useState(generateParticles(50));

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 100 / (loadingTime / 100);
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
            onLoadingComplete?.();
          }, 800);
          return 100;
        }
        return newProgress;
      });
    }, 100);

    // Regenerate particles every 2 seconds for continuous sparkle
    const particleInterval = setInterval(() => {
      setParticles(generateParticles(50));
    }, 2000);

    return () => {
      clearInterval(interval);
      clearInterval(particleInterval);
    };
  }, [loadingTime, onLoadingComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden w-full h-full"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { 
              duration: 0.8,
              ease: "easeInOut"
            }
          }}
          style={{
            background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)"
          }}
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Floating particles */}
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute rounded-full bg-gradient-to-br from-yellow-300 to-pink-500"
                initial={{ 
                  opacity: 0,
                  scale: 0,
                  x: `${particle.x}vw`,
                  y: `${particle.y}vh`
                }}
                animate={{ 
                  opacity: [0, 0.8, 0],
                  scale: [0, 1, 0],
                  x: [
                    `${particle.x}vw`,
                    `${particle.x + (Math.random() * 20 - 10)}vw`,
                    `${particle.x + (Math.random() * 40 - 20)}vw`
                  ],
                  y: [
                    `${particle.y}vh`,
                    `${particle.y + (Math.random() * 20 - 10)}vh`,
                    `${particle.y + (Math.random() * 40 - 20)}vh`
                  ]
                }}
                transition={{
                  duration: particle.duration,
                  delay: particle.delay,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
                style={{
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  filter: "blur(1px)"
                }}
              />
            ))}
            
            {/* Pulsing circles */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.1 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            >
              <div className="w-96 h-96 rounded-full border-4 border-purple-500" />
            </motion.div>
            
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1.5, opacity: 0.05 }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
            >
              <div className="w-96 h-96 rounded-full border-4 border-pink-500" />
            </motion.div>
          </div>

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            {/* Animated SVG */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative mb-8"
              style={{ width: "200px", height: "145px" }}
            >
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 197 143"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Animated gradient path */}
                <motion.path
                  d="M93.046 59.299L94.8329 56.2132C95.335 55.3461 96.5873 55.3469 97.0883 56.2147C97.3213 56.6183 97.321 57.1155 97.0875 57.5188L96.0589 59.2951L94.7297 61.5904L93.2928 64.0719C93.2762 64.1005 93.2762 64.1357 93.2927 64.1643L94.582 66.3974L97.0133 70.6086C97.7825 71.9409 99.7051 71.9421 100.476 70.6108L102.53 67.0644C103.302 65.7301 102.338 64.0602 100.796 64.0622L98.8127 64.0647C97.5401 64.0664 96.7444 62.6882 97.3821 61.5869L98.7113 59.2916C98.7454 59.2327 98.8307 59.2325 98.8647 59.2914L99.6097 60.5818C99.9674 61.2014 100.629 61.5827 101.344 61.5818L102.84 61.5799L105.794 61.5761C105.804 61.576 105.812 61.571 105.817 61.5628L107.139 59.2807L109.589 55.0496C110.361 53.7153 109.397 52.0454 107.855 52.0474L100.371 52.0571C100.338 52.0571 100.318 52.0919 100.334 52.1197L101.598 54.3074L103.364 57.3671C103.856 58.2198 103.242 59.2858 102.257 59.287C101.799 59.2876 101.376 59.0436 101.147 58.6471L100.117 56.8636L99.3746 55.5771L98.7941 54.5717L97.8692 52.9698C97.5115 52.3502 96.8501 51.9688 96.1346 51.9698L94.6387 51.9717L89.7185 51.9781C88.18 51.9801 87.2198 53.6457 87.989 54.9781L91.2274 60.5872C91.4656 60.9997 92.0609 61.0001 92.2996 60.5879L93.046 59.299Z"
                  fill="url(#paint0_linear_11_121)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                />
                
                {/* Animated paths with staggered animation */}
                <motion.path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M104.261 123.793L104.299 123.935L104.403 123.831L104.261 123.793Z"
                  fill="#D9D9D9"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                />
                
                <motion.path
                  d="M181.135 101.027L181.134 70.0928L111.042 2.20537e-06L103.068 7.97315L103.069 40.1102L172.56 109.602L181.135 101.027Z"
                  fill="#5C3C80"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
                
                <motion.path
                  d="M15.467 101.027L15.4671 70.0928L85.5599 2.20537e-06L93.5331 7.97315L93.533 40.1102L24.0416 109.602L15.467 101.027Z"
                  fill="#5C3C80"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.6 }}
                />
                
                <motion.path
                  d="M102.844 82.08L102.844 108.596L136.962 142.714L145.642 134.034V103.311L113.627 71.2964L102.844 82.08Z"
                  fill="#96397C"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.7 }}
                />
                
                <motion.path
                  d="M93.7578 82.08L93.7578 108.596L59.6397 142.714L50.9595 134.034V103.311L82.9742 71.2964L93.7578 82.08Z"
                  fill="#96397C"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                />
                
                <defs>
                  <motion.linearGradient
                    id="paint0_linear_11_121"
                    x1="99.071"
                    y1="46.3382"
                    x2="98.1379"
                    y2="73.8269"
                    gradientUnits="userSpaceOnUse"
                    animate={{
                      x1: ["99.071", "110", "99.071"],
                      x2: ["98.1379", "110", "98.1379"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <stop stopColor="#96397C" />
                    <stop offset="0.999163" stopColor="#5C3C80" />
                  </motion.linearGradient>
                </defs>
              </svg>
              
              {/* Pulsing circle animation */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.2, opacity: 0.3 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeOut"
                }}
              >
                <div className="w-16 h-16 rounded-full bg-purple-500" />
              </motion.div>
            </motion.div>

            {/* Progress bar */}
            <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden mb-4">
              <motion.div 
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Loading text with fade-in animation */}
            <motion.p 
              className="text-lg font-medium text-white mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Loading {Math.round(progress)}%
            </motion.p>
            
            {/* Dots animation */}
            <motion.div className="flex space-x-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full"
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.5, 1, 0.5],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.div>

            {/* Sparkling burst effects */}
            <motion.div
              className="absolute w-64 h-64 pointer-events-none"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 2, opacity: [0, 0.8, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            >
              <div className="w-full h-full rounded-full border-4 border-purple-300 opacity-30" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;