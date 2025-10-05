import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Check, Sparkles } from 'lucide-react';
import * as Icons from 'lucide-react';
import { useRef } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const servicesData: Record<string, any> = {
  'digital-strategy': {
    title: 'Digital Strategy',
    icon: 'Target',
    description: 'Transform your business with comprehensive digital strategies that drive growth and innovation.',
    longDescription: 'Our digital strategy services help you navigate the complex digital landscape with confidence. We analyze your business goals, market position, and target audience to create actionable roadmaps that deliver measurable results.',
    features: [
      'Market Research & Analysis',
      'Competitor Benchmarking',
      'Digital Transformation Roadmap',
      'Technology Stack Consultation',
      'ROI Optimization',
      'Performance Analytics',
    ],
    benefits: [
      'Increased market share',
      'Enhanced operational efficiency',
      'Data-driven decision making',
      'Competitive advantage',
    ],
    image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  'creative-design': {
    title: 'Creative Design',
    icon: 'Palette',
    description: 'Award-winning design that captivates audiences and drives conversions.',
    longDescription: 'We create stunning visual experiences that tell your brand story and engage your audience. From initial concepts to final execution, our design process is collaborative, iterative, and focused on delivering exceptional results.',
    features: [
      'Brand Identity Design',
      'UI/UX Design',
      'Motion Graphics',
      'Illustration & Iconography',
      'Design Systems',
      'Prototyping & Testing',
    ],
    benefits: [
      'Stronger brand recognition',
      'Improved user engagement',
      'Higher conversion rates',
      'Consistent brand experience',
    ],
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  'development': {
    title: 'Development',
    icon: 'Code',
    description: 'Cutting-edge web and mobile development with the latest technologies.',
    longDescription: 'Our development team brings your vision to life with clean, scalable code and modern architecture. We specialize in creating high-performance applications that are secure, maintainable, and built to grow with your business.',
    features: [
      'Full-Stack Web Development',
      'Mobile App Development',
      'API Development & Integration',
      'Cloud Infrastructure',
      'Performance Optimization',
      'Security & Compliance',
    ],
    benefits: [
      'Fast, responsive applications',
      'Scalable architecture',
      'Reduced maintenance costs',
      'Enhanced security',
    ],
    image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  'brand-identity': {
    title: 'Brand Identity',
    icon: 'Sparkles',
    description: 'Building memorable brands that resonate with your audience.',
    longDescription: 'Your brand is more than just a logo. We help you craft a complete brand identity that reflects your values, connects with your audience, and stands out in the marketplace.',
    features: [
      'Brand Strategy',
      'Logo Design',
      'Visual Identity Systems',
      'Brand Guidelines',
      'Marketing Collateral',
      'Brand Messaging',
    ],
    benefits: [
      'Distinctive market presence',
      'Customer loyalty',
      'Premium positioning',
      'Unified brand experience',
    ],
    image: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  'user-experience': {
    title: 'User Experience',
    icon: 'Users',
    description: 'Intuitive interfaces designed for optimal user engagement.',
    longDescription: 'Great UX is invisible. We design interfaces that feel natural and intuitive, removing friction and delighting users at every touchpoint. Our user-centered approach ensures your digital products are both beautiful and functional.',
    features: [
      'User Research',
      'Information Architecture',
      'Wireframing & Prototyping',
      'Usability Testing',
      'Interaction Design',
      'Accessibility Compliance',
    ],
    benefits: [
      'Higher user satisfaction',
      'Reduced support costs',
      'Increased retention',
      'Better conversion rates',
    ],
    image: 'https://images.pexels.com/photos/3183165/pexels-photo-3183165.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  'innovation-lab': {
    title: 'Innovation Lab',
    icon: 'Lightbulb',
    description: 'Experimental solutions pushing the boundaries of digital experiences.',
    longDescription: 'Step into the future with our Innovation Lab. We explore emerging technologies and experimental approaches to create groundbreaking digital experiences that give you a competitive edge.',
    features: [
      'AI & Machine Learning',
      'AR/VR Experiences',
      'Blockchain Solutions',
      'IoT Integration',
      'Voice & Conversational UI',
      'Emerging Tech Exploration',
    ],
    benefits: [
      'First-mover advantage',
      'Innovative solutions',
      'Future-proof technology',
      'Market differentiation',
    ],
    image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
};

export const ServiceDetail = () => {
  const { slug } = useParams();
  const service = slug ? servicesData[slug] : null;
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);

  const heroVisible = useScrollAnimation(heroRef);
  const featuresVisible = useScrollAnimation(featuresRef);
  const benefitsVisible = useScrollAnimation(benefitsRef);

  if (!service) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Service Not Found</h1>
          <Link to="/" className="text-cyan-400 hover:text-cyan-300">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = (Icons as any)[service.icon] || Icons.Circle;

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <div className="relative">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float"
            style={{ animationDelay: '0s' }}
          />
          <div
            className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-float"
            style={{ animationDelay: '2s' }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-8 py-20">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-12 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />
            Back to Home
          </Link>

          <div
            ref={heroRef}
            className="perspective-1000"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible
                ? 'rotateX(0deg) translateY(0)'
                : 'rotateX(-15deg) translateY(50px)',
              transition: 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
              <div>
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mb-6 transform hover:rotate-12 transition-transform duration-500">
                  <IconComponent className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">
                  {service.title}
                </h1>
                <p className="text-2xl text-gray-300 mb-8">
                  {service.description}
                </p>
                <p className="text-lg text-gray-400 leading-relaxed">
                  {service.longDescription}
                </p>
              </div>

              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
                <img
                  src={service.image}
                  alt={service.title}
                  className="relative rounded-2xl w-full h-[500px] object-cover transform group-hover:scale-105 transition-all duration-700"
                />
              </div>
            </div>
          </div>

          <div
            ref={featuresRef}
            className="mb-32"
            style={{
              opacity: featuresVisible ? 1 : 0,
              transform: featuresVisible ? 'translateY(0)' : 'translateY(50px)',
              transition: 'all 0.8s',
            }}
          >
            <h2 className="text-5xl font-bold text-white mb-12 text-center">
              What We Offer
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {service.features.map((feature: string, index: number) => (
                <div
                  key={feature}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 hover:border-cyan-500 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/20"
                  style={{
                    opacity: featuresVisible ? 1 : 0,
                    transform: featuresVisible
                      ? 'translateY(0) rotateY(0deg)'
                      : 'translateY(30px) rotateY(-10deg)',
                    transition: all 0.6s ${index * 0.1}s cubic-bezier(0.34, 1.56, 0.64, 1),
                  }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center mb-4">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{feature}</h3>
                </div>
              ))}
            </div>
          </div>

          <div
            ref={benefitsRef}
            className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-12 border border-gray-800"
            style={{
              opacity: benefitsVisible ? 1 : 0,
              transform: benefitsVisible
                ? 'scale(1) rotateX(0deg)'
                : 'scale(0.9) rotateX(5deg)',
              transition: 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <h2 className="text-5xl font-bold text-white mb-12 text-center">
              Key Benefits
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {service.benefits.map((benefit: string, index: number) => (
                <div
                  key={benefit}
                  className="flex items-start gap-4 group"
                  style={{
                    opacity: benefitsVisible ? 1 : 0,
                    transform: benefitsVisible ? 'translateX(0)' : 'translateX(-30px)',
                    transition: all 0.6s ${index * 0.15}s,
                  }}
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-125 transition-transform duration-300">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-xl text-gray-300 group-hover:text-white transition-colors">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-20">
            <Link to="/contact">
              <button className="px-12 py-5 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-full font-semibold text-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-500 transform hover:scale-110">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};