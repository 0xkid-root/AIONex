import React, { useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { motion, useAnimation, useInView } from 'framer-motion';
import gsap from 'gsap';

const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const containerRef = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "AI Research Director",
      rating: 5,
      text: "AIONex has revolutionized our AI model deployment pipeline. The platform's security features and intuitive interface have exceeded our expectations."
    },
    {
      name: "David Chen",
      role: "Blockchain Solutions Architect",
      rating: 5,
      text: "The integration of AI and blockchain is masterfully executed. Their federated learning solution has transformed how we handle sensitive data."
    },
    {
      name: "Emily Rodriguez",
      role: "Enterprise Tech Lead",
      rating: 4,
      text: "The marketplace has become our go-to platform for acquiring specialized AI models. The dynamic pricing model ensures we get fair value."
    },
    {
      name: "Michael Kim",
      role: "AI Startup Founder",
      rating: 5,
      text: "Game-changing platform for AI model licensing and deployment. We've reduced our time-to-market by 60% using AIONex's infrastructure."
    },
    {
      name: "Laura Martinez",
      role: "Data Science Manager",
      rating: 5,
      text: "AIONex's pre-trained models have significantly accelerated our data science projects. The seamless integration with our existing workflows is impressive."
    },
    {
      name: "James Lee",
      role: "CTO of Tech Innovators",
      rating: 5,
      text: "The scalability and reliability of AIONex's platform have been instrumental in handling our growing AI needs. Highly recommended!"
    },
    {
      name: "Sophia Patel",
      role: "Machine Learning Engineer",
      rating: 4,
      text: "The platform's modular architecture allows for easy customization. It's a great tool for both beginners and experienced ML practitioners."
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000); // Change testimonial every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [testimonials.length]);

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  useEffect(() => {
    const testimonialCard = document.querySelector('.testimonial-card');
    if (!testimonialCard) return;

    const shine = testimonialCard.querySelector('.shine-effect');

    // Add mousemove event listener with explicit type casting
    testimonialCard.addEventListener('mousemove', ((e: MouseEvent) => {
      const rect = testimonialCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Update card rotation
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      gsap.to(testimonialCard, {
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
    testimonialCard.addEventListener('mouseleave', () => {
      gsap.to(testimonialCard, {
        duration: 0.5,
        transform: 'perspective(1000px) rotateX(0) rotateY(0)',
        ease: 'power2.out'
      });

      if (shine) {
        gsap.to(shine, {
          duration: 0.3,
          opacity: 0,
          ease: 'power2.out'
        });
      }
    });
  }, []);

  const renderStars = (rating: number) => (
    <div className="flex gap-1">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={`w-4 h-4 transition-colors duration-300 ${
            index < rating 
              ? 'fill-cyan-400 text-cyan-400' 
              : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );

  return (
    <section className="py-12 relative overflow-hidden " ref={containerRef}>
      <div className="relative max-w-5xl mx-auto px-4">
        <motion.h2 
          className="text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400"
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.8 }}
        >
          What Our Users Say
        </motion.h2>
        
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <Card className="testimonial-card max-w-2xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="relative w-16 h-16  rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">{testimonials[currentIndex].name[0]}</span>
                </div>
                <div className="space-y-1 flex-1">
                  <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                    {testimonials[currentIndex].name}
                  </h3>
                  <p className="text-gray-300 text-sm font-medium">{testimonials[currentIndex].role}</p>
                  {renderStars(testimonials[currentIndex].rating)}
                  <p className="text-gray-100 text-base italic leading-relaxed mt-2">
                    "{testimonials[currentIndex].text}"
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="flex items-center justify-center mt-6 gap-4">
          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index 
                  ? 'bg-cyan-400 scale-125' 
                  : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % testimonials.length)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;