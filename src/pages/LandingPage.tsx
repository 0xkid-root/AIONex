import { HeroSection } from '@/components/landing/HeroSection';
import { FeatureCard } from '@/components/landing/FeatureCard';
import { SolutionCard } from '@/components/landing/SolutionCard';
import { BackgroundAnimation } from '@/components/landing/BackgroundAnimation';
import { Button } from '@/components/ui/button';

export function LandingPage() {
  const features = [
    { title: 'AI Model Marketplace', description: 'Trade and discover AI models', icon: '🤖' },
    { title: 'AI Agent Rental', description: 'Rent AI agents', icon: '🔄' },
    { title: 'Computing Power', description: 'Access computing resources', icon: '💻' },
    { title: 'On-Chain Execution', description: 'Execute AI models on-chain', icon: '⚡' },
  ];

  return (
    <div className="min-h-screen">
      <HeroSection />
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Core Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Innovative Solutions</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <SolutionCard title="AI Model Licensing" description="Secure licensing" demo={<div className="h-40 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />} />
            <SolutionCard title="Federated Learning" description="Collaborative training" demo={<div className="h-40 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg" />} />
            <SolutionCard title="Dynamic Pricing" description="Market-driven pricing" demo={<div className="h-40 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg" />} />
          </div>
        </div>
      </section>
      <section className="py-20 bg-gradient-to-r from-green-500 to-blue-500 relative overflow-hidden">
        <BackgroundAnimation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-6">Join the Future of AI+Blockchain</h2>
            <p className="text-xl mb-8">Start building with AIONex today</p>
            <div className="flex justify-center gap-4">
              <Button size="lg" variant="secondary">Get Started</Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/20">Contact Us</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}