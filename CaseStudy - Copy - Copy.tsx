import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { useRef } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const caseStudiesData: Record<string, any> = {
  'digital-innovation': {
    title: 'Digital Innovation',
    category: 'Digital',
    client: 'TechCorp Industries',
    year: '2024',
    description: 'A revolutionary approach to digital transformation with cutting-edge technology',
    challenge: 'TechCorp needed to modernize their legacy systems while maintaining business continuity and reducing operational costs.',
    solution: 'We implemented a phased digital transformation strategy, migrating critical systems to cloud infrastructure and introducing automation across key business processes.',
    results: [
      '65% reduction in operational costs',
      '3x faster deployment cycles',
      '99.9% system uptime',
      '40% increase in team productivity',
    ],
    images: [
      'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
  },
  'brand-evolution': {
    title: 'Brand Evolution',
    category: 'Branding',
    client: 'ModernLife Co.',
    year: '2024',
    description: 'Complete brand redesign focusing on modern aesthetics and user experience',
    challenge: 'ModernLife Co. struggled with an outdated brand identity that failed to resonate with their target demographic.',
    solution: 'We conducted extensive market research and user testing to develop a fresh, contemporary brand identity that speaks to modern consumers while honoring the company heritage.',
    results: [
      '85% increase in brand recognition',
      '120% growth in social engagement',
      '50% improvement in customer retention',
      'Award-winning brand identity',
    ],
    images: [
      'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/3183165/pexels-photo-3183165.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
  },
  'smart-solutions': {
    title: 'Smart Solutions',
    category: 'Technology',
    client: 'FutureAI Labs',
    year: '2024',
    description: 'AI-powered platform transforming business operations',
    challenge: 'FutureAI Labs needed an intelligent platform to automate complex business processes and provide predictive analytics.',
    solution: 'We developed a custom AI platform with machine learning capabilities, real-time data processing, and intuitive dashboards for actionable insights.',
    results: [
      '200% improvement in decision-making speed',
      '78% reduction in manual tasks',
      '$2M annual cost savings',
      '95% accuracy in predictions',
    ],
    images: [
      'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
  },
};

export const CaseStudy = () => {
  const { slug } = useParams();
  const caseStudy = slug ? caseStudiesData[slug] : null;
  const heroRef = useRef<HTMLDivElement>(null);
  const challengeRef = useRef<HTMLDivElement>(null);
  const solutionRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const heroVisible = useScrollAnimation(heroRef);
  const challengeVisible = useScrollAnimation(challengeRef);
  const solutionVisible = useScrollAnimation(solutionRef);
  const resultsVisible = useScrollAnimation(resultsRef);

  if (!caseStudy) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-8">
        <div className="text-center max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6" style={{
            textShadow: '0 0 40px rgba(6, 182, 212, 0.5)',
          }}>
            Project Under Development
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            This project is currently under development. We're always looking for exciting collaborations!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105"
            >
              Let's Collaborate
            </Link>
            <Link
              to="/"
              className="px-8 py-4 border-2 border-cyan-400 text-cyan-400 rounded-full font-semibold hover:bg-cyan-400/10 transition-all duration-300"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="relative">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute -top-1/2 left-0 w-full h-full bg-gradient-to-br from-blue-500/10 to-cyan-500/10 blur-3xl"
            style={{ transform: 'rotate(-12deg)' }}
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
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(50px)',
              transition: 'all 1s',
            }}
          >
            <div className="text-sm text-cyan-400 mb-4 font-semibold tracking-wider">
              {caseStudy.category} • {caseStudy.year}
            </div>
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-8">
              {caseStudy.title}
            </h1>
            <p className="text-2xl text-gray-400 mb-12 max-w-3xl">
              {caseStudy.description}
            </p>

            <div className="flex flex-wrap gap-8 mb-16">
              <div>
                <div className="text-gray-500 text-sm mb-2">Client</div>
                <div className="text-white text-xl font-semibold">{caseStudy.client}</div>
              </div>
              <div>
                <div className="text-gray-500 text-sm mb-2">Year</div>
                <div className="text-white text-xl font-semibold">{caseStudy.year}</div>
              </div>
              <div>
                <div className="text-gray-500 text-sm mb-2">Category</div>
                <div className="text-white text-xl font-semibold">{caseStudy.category}</div>
              </div>
            </div>

            <img
              src={caseStudy.images[0]}
              alt={caseStudy.title}
              className="w-full h-[600px] object-cover rounded-2xl mb-20"
            />
          </div>

          <div
            ref={challengeRef}
            className="mb-20"
            style={{
              opacity: challengeVisible ? 1 : 0,
              transform: challengeVisible
                ? 'translateX(0) rotateY(0deg)'
                : 'translateX(-50px) rotateY(-5deg)',
              transition: 'all 0.8s',
            }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">The Challenge</h2>
            <p className="text-xl text-gray-400 leading-relaxed max-w-4xl">
              {caseStudy.challenge}
            </p>
          </div>

          <div
            ref={solutionRef}
            className="grid md:grid-cols-2 gap-8 mb-20"
            style={{
              opacity: solutionVisible ? 1 : 0,
              transform: solutionVisible ? 'scale(1)' : 'scale(0.95)',
              transition: 'all 0.8s',
            }}
          >
            {caseStudy.images.slice(1).map((image: string, index: number) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-xl"
                style={{
                  opacity: solutionVisible ? 1 : 0,
                  transform: solutionVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: all 0.6s ${index * 0.2}s,
                }}
              >
                <img
                  src={image}
                  alt={${caseStudy.title} ${index + 2}}
                  className="w-full h-[400px] object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>

          <div className="mb-20">
            <h2 className="text-4xl font-bold text-white mb-6">Our Solution</h2>
            <p className="text-xl text-gray-400 leading-relaxed max-w-4xl">
              {caseStudy.solution}
            </p>
          </div>

          <div
            ref={resultsRef}
            className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-12 border border-gray-800"
            style={{
              opacity: resultsVisible ? 1 : 0,
              transform: resultsVisible
                ? 'translateY(0) rotateX(0deg)'
                : 'translateY(50px) rotateX(5deg)',
              transition: 'all 1s',
            }}
          >
            <h2 className="text-4xl font-bold text-white mb-12">Results</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {caseStudy.results.map((result: string, index: number) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-gray-700 hover:border-cyan-500 transition-all duration-500 transform hover:-translate-y-2"
                  style={{
                    opacity: resultsVisible ? 1 : 0,
                    transform: resultsVisible
                      ? 'translateY(0) scale(1)'
                      : 'translateY(30px) scale(0.9)',
                    transition: all 0.6s ${index * 0.15}s,
                  }}
                >
                  <div className="flex items-start gap-4">
                    <ExternalLink className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                    <p className="text-2xl text-white font-semibold">{result}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-20">
            <Link to="/contact">
              <button className="px-12 py-5 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-full font-semibold text-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-500 transform hover:scale-110">
                Start Your Project
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};