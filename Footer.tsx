import { Github, Instagram, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <h3 className="text-4xl font-bold text-white mb-6">Let's Create Something Amazing</h3>
            <p className="text-gray-400 text-lg mb-6">
              Ready to transform your digital presence? Get in touch and let's start a conversation.
            </p>
            <Link to="/contact">
              <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105">
                Start a Project
              </button>
            </Link>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-lg">Company</h4>
            <ul className="space-y-3">
              {['About', 'Services', 'Work', 'Careers', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-lg">Connect</h4>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/thebitbusters?igsh=MWRsenA0dWRrMTltNA=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-cyan-500 hover:text-white transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/thesurya46"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-cyan-500 hover:text-white transition-all duration-300"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © 2025 Studio. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-cyan-500 hover:text-white transition-all duration-300 transform hover:scale-110"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-6 h-6" />
          </button>
        </div>
      </div>
    </footer>
  );
};