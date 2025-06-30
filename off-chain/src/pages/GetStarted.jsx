
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Wallet, ArrowRight, Shield, Globe, Users, Zap } from 'lucide-react';

const GetStarted = () => {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnectWallet = async () => {
    setIsConnecting(true);
    // Simulate wallet connection
    setTimeout(() => {
      setIsConnecting(false);
      // Handle actual wallet connection logic here
    }, 2000);
  };

  const features = [
    {
      icon: Shield,
      title: "Zero-Knowledge Privacy",
      description: "Your identity and transactions are protected with advanced cryptographic proofs"
    },
    {
      icon: Globe,
      title: "Global Aid Distribution",
      description: "Reach communities across Africa with transparent, efficient aid delivery"
    },
    {
      icon: Users,
      title: "Community Verified",
      description: "Local verifiers ensure aid reaches those who need it most"
    },
    {
      icon: Zap,
      title: "Instant Transfers",
      description: "Fast, low-cost transactions powered by Midnight blockchain"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="absolute top-0 w-full z-50 px-6 py-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="text-white font-bold text-xl">CrisisChain</span>
          </div>
          <Link 
            to="/auth" 
            className="text-gray-300 hover:text-white transition-colors"
          >
            Sign In
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative px-6 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-40 -right-32 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
            </div>

            {/* Main content */}
            <div className="relative z-10">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Blockchain-Powered
                <span className="block bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                  Aid Distribution
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Revolutionizing humanitarian aid delivery across Africa with privacy-first blockchain technology, 
                zero-knowledge proofs, and community-driven verification.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                <button
                  onClick={handleConnectWallet}
                  disabled={isConnecting}
                  className="group bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  <Wallet className="w-5 h-5" />
                  <span>{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
                  {!isConnecting && (
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  )}
                </button>
                
                <Link
                  to="/identity"
                  className="group bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:bg-white/20 flex items-center space-x-2"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-20">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">$2.1M+</div>
                  <div className="text-gray-400">Aid Distributed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">15,000+</div>
                  <div className="text-gray-400">Lives Impacted</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">98%</div>
                  <div className="text-gray-400">Transparency Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="px-6 py-20 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Choose CrisisChain?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our platform combines cutting-edge blockchain technology with humanitarian values 
              to create the most transparent and efficient aid distribution system.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:transform hover:scale-105"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join the revolution in humanitarian aid distribution. Every contribution matters.
          </p>
          <Link
            to="/identity"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
          >
            <span>Start Your Journey</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            © 2025 CrisisChain. Empowering communities through blockchain technology.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default GetStarted;
