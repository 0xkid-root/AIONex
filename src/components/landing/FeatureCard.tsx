import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface FeatureCardProps {
    icon: React.FC; // Ensure this is a React component
    title: string;
    description: string;
}

export const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
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
                <Icon />
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

export default FeatureCard;