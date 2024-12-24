import { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';

const InnovativeSolutions = () => {
  const solutions = [
    { 
      title: "AI Model Licensing", 
      description: "Secure and transparent licensing for AI models with blockchain-backed verification",
      gradient: "from-cyan-500/30 via-blue-500/30 to-purple-500/30"
    },
    { 
      title: "Federated Learning", 
      description: "Collaborative AI model training while preserving data privacy and sovereignty",
      gradient: "from-purple-500/30 via-pink-500/30 to-red-500/30"
    },
    { 
      title: "Dynamic Pricing", 
      description: "Market-driven pricing algorithms that optimize value for both providers and users",
      gradient: "from-emerald-500/30 via-teal-500/30 to-cyan-500/30"
    }
  ];

  const containerRef = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  useEffect(() => {
    const cards = document.querySelectorAll('.solution-card');
    
    cards.forEach(card => {
      const shine = card.querySelector('.shine-effect');
      
      // Add mousemove event listener with explicit type casting
      card.addEventListener('mousemove', ((e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Update card rotation
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        gsap.to(card, {
          duration: 0.5,
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          ease: 'power2.out'
        });
        
        // Update shine effect position
        if (shine) {
          gsap.to(shine, {
            duration: 0.3,
            opacity: 1,
            x: x,
            y: y,
            ease: 'power2.out'
          });
        }
      }) as EventListener); // Explicitly cast to EventListener
      
      // Add mouseleave event listener
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          duration: 0.5,
          transform: 'perspective(1000px) rotateX(0) rotateY(0)',
          ease: 'power2.out'
        });
        
        const shine = card.querySelector('.shine-effect');
        if (shine) {
          gsap.to(shine, {
            duration: 0.3,
            opacity: 0,
            ease: 'power2.out'
          });
        }
      });
    });
  }, []);

  return (
    <div className="py-20 px-4 relative" ref={containerRef}>
      <motion.h2 
        className="text-6xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400"
        initial={{ opacity: 0, y: 30 }}
        animate={controls}
        variants={{
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.8 }}
      >
        Innovative Solutions
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        initial="hidden"
        animate={controls}
        variants={{
          visible: { transition: { staggerChildren: 0.2 } },
          hidden: {}
        }}
      >
        {solutions.map((solution, index) => (
          <motion.div
            key={index}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 50 }
            }}
            className="solution-card relative group"
          >
            <div className="relative h-[400px] p-8 rounded-2xl overflow-hidden backdrop-blur-xl border border-white/10 
                          bg-gradient-to-br from-white/5 to-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
                          hover:border-white/20 transition-all duration-500">
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${solution.gradient} opacity-0 
                            group-hover:opacity-100 transition-opacity duration-500 blur-xl`} />
              
              {/* Shine Effect */}
              <div className="shine-effect absolute w-32 h-32 bg-white/20 rounded-full blur-2xl pointer-events-none 
                            opacity-0 -translate-x-1/2 -translate-y-1/2" />
              
              {/* Content */}
              <div className="relative z-10 h-full flex flex-col">
                <h3 className="text-2xl font-bold text-white mb-4">{solution.title}</h3>
                <p className="text-white/70 mb-6">{solution.description}</p>
                
                {/* Demo Area */}
                <div className="flex-grow relative rounded-xl overflow-hidden 
                              bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md
                              group-hover:from-white/10 group-hover:to-white/20 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20" />
                </div>
                
                {/* Action Button */}
                <button className="mt-6 flex items-center gap-2 text-white/70 group-hover:text-white 
                                transition-colors duration-300">
                  <span>Learn more</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 
                                       transition-transform duration-300" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default InnovativeSolutions;