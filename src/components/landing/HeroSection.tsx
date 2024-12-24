import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Brain, Database, Boxes, ChevronDown, Code, Layers, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from './Navbar';
// Separate interfaces for FeatureCard and InteractiveNode
interface FeatureCardProps {
    icon: React.FC;
    title: string;
    description: string;
    delay: number;
}

interface InteractiveNodeProps {
    icon: React.FC;
    x: number;
    y: number;
    delay: number;
    title: string;
}

const FeatureCard = ({ icon: Icon, title, description, delay }: FeatureCardProps) => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="relative p-6 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 cursor-pointer group"
        >
            <motion.div
                animate={{
                    scale: isHovered ? 1.05 : 1,
                    rotateY: isHovered ? 180 : 0
                }}
                transition={{ duration: 0.3 }}
                className="mb-4"
            >
                <Icon  />
            </motion.div>
            <h3 className="mb-2 text-xl font-semibold text-white">{title}</h3>
            <p className="text-white/70 text-sm">{description}</p>
            <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 w-full origin-left"
            />
        </motion.div>
    );
};

const InteractiveNode = ({ icon: Icon, x, y, delay, title }: InteractiveNodeProps) => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
      
        <motion.div
            className="absolute"
            style={{ left: `${x}%`, top: `${y}%` }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            <motion.div
                animate={{ 
                    scale: isHovered ? 1.2 : 1,
                    boxShadow: isHovered ? "0 0 20px rgba(0, 255, 255, 0.5)" : "none"
                }}
                className="flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 backdrop-blur-lg border border-white/20"
            >
              
                <Icon  />
            </motion.div>
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-black/80 rounded-lg text-white text-sm whitespace-nowrap"
                    >
                        {title}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const ScrollIndicator = () => (
    <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/50 flex flex-col items-center"
    >
        <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
        >
            <ChevronDown className="w-6 h-6" />
        </motion.div>
        <span className="text-sm">Scroll to explore</span>
    </motion.div>
);
interface HeroSectionProps {
  children?: React.ReactNode; // Add this line to accept children
}

export const HeroSection: React.FC<HeroSectionProps> = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const createConnection = (startX: number, startY: number, endX: number, endY: number, delay: number) => {
            const line = document.createElement('div');
            line.className = 'absolute h-px bg-gradient-to-r from-cyan-400 to-purple-400';
            
            const angle = Math.atan2(endY - startY, endX - startX);
            const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
            
            line.style.width = `${length}px`;
            line.style.left = `${startX}px`;
            line.style.top = `${startY}px`;
            line.style.transform = `rotate(${angle}rad)`;
            line.style.transformOrigin = '0 0';
            line.style.opacity = '0';
            
            container.appendChild(line);
            
            setTimeout(() => {
                line.style.transition = 'opacity 0.8s ease-in-out';
                line.style.opacity = '0.3';
            }, delay);
        };

        setTimeout(() => {
            const nodes = container.getElementsByClassName('rounded-xl');
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const rect1 = nodes[i].getBoundingClientRect();
                    const rect2 = nodes[j].getBoundingClientRect();
                    createConnection(
                        rect1.left + rect1.width / 2,
                        rect1.top + rect1.height / 2,
                        rect2.left + rect2.width / 2,
                        rect2.top + rect2.height / 2,
                        i * 300
                    );
                }
            }
        }, 1500);
    }, []);

    return (
      
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <Navbar/>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,200,255,0.1),transparent_50%)]" />
            
            <div ref={containerRef} className="absolute inset-0">
                <InteractiveNode icon={Brain} x={20} y={30} delay={0.3} title="AI Model Trading" />
                <InteractiveNode icon={Cpu} x={80} y={20} delay={0.6} title="Computing Power" />
                <InteractiveNode icon={Boxes} x={30} y={70} delay={0.9} title="Blockchain Storage" />
                <InteractiveNode icon={Lock} x={70} y={60} delay={1.2} title="Secure Transactions" />
                <InteractiveNode icon={Code} x={50} y={40} delay={1.5} title="Smart Contracts" />
                <InteractiveNode icon={Layers} x={90} y={80} delay={1.8} title="Federated Learning" />
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent pointer-events-none"
            />

            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
                <div className="max-w-5xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                    >
                        <h1 className="mb-6 text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 md:text-7xl">
                            AIONex: AI Trading Revolution
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.4 }}
                    >
                        <p className="mb-8 text-xl text-white/90 md:text-2xl leading-relaxed">
                        Step into the future of AI commerce. Buy, sell, and trade AI models, rent powerful computing resources, and execute AI operations on-chain with unmatched security and transparency.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="flex flex-col gap-4 sm:flex-row justify-center mb-16"
                    >
                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:from-cyan-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-300"
                        >
                            Launch Platform
                            
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="text-white border-white/20 backdrop-blur-sm hover:bg-white/10 transform hover:scale-105 transition-all duration-300"
                        >
                            View Documentation
                        </Button>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        
                    </div>
                </div>
                <ScrollIndicator />
            </div>
        </div>
    );
}