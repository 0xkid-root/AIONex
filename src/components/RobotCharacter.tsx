"use client"

import { motion } from "framer-motion"
import { useEffect, useRef } from "react"
import gsap from "gsap"

interface RobotProps {
  expression?: "normal" | "heart" | "star" | "hello"
  className?: string
}

export function RobotCharacter({ expression = "normal", className = "" }: RobotProps) {
  const robotRef = useRef<SVGSVGElement>(null)
  
  useEffect(() => {
    if (robotRef.current) {
      gsap.to(robotRef.current, {
        y: 15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      })
    }
  }, [])

  return (
    <motion.svg
      ref={robotRef}
      viewBox="0 0 200 240"
      className={`w-48 h-48 ${className}`}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
    >
      {/* Head */}
      <motion.path
        d="M40,40 C40,20 160,20 160,40 C160,60 160,100 160,100 L40,100 C40,100 40,60 40,40"
        fill="white"
        stroke="#e0e0e0"
        strokeWidth="2"
      />
      
      {/* Face */}
      <rect x="60" y="50" width="80" height="40" fill="#1a1a1a" rx="10" />
      
      {/* Eyes/Display */}
      {expression === "normal" && (
        <>
          <motion.ellipse
            cx="85"
            cy="70"
            rx="10"
            ry="5"
            fill="#29b6f6"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
          />
          <motion.ellipse
            cx="115"
            cy="70"
            rx="10"
            ry="5"
            fill="#29b6f6"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
          />
        </>
      )}
      
      {expression === "heart" && (
        <motion.path
          d="M90,60 C90,50 110,50 110,60 L100,75 L90,60"
          fill="#ff4081"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1.1 }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        />
      )}
      
      {expression === "hello" && (
        <text
          x="75"
          y="75"
          fill="#29b6f6"
          className="text-sm font-bold"
        >
          HELLO
        </text>
      )}

      {/* Body */}
      <motion.path
        d="M70,100 C110,100 130,120 130,150 C130,180 110,200 70,200 C30,200 10,180 10,150 C10,120 30,100 70,100"
        fill="white"
        stroke="#e0e0e0"
        strokeWidth="2"
      />
      
      {/* Arms */}
      <motion.ellipse
        cx="20"
        cy="140"
        rx="15"
        ry="20"
        fill="white"
        stroke="#e0e0e0"
        strokeWidth="2"
        animate={{ rotate: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.ellipse
        cx="120"
        cy="140"
        rx="15"
        ry="20"
        fill="white"
        stroke="#e0e0e0"
        strokeWidth="2"
        animate={{ rotate: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.svg>
  )
}

