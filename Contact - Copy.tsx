import { useState, useRef } from 'react';
import { ArrowLeft, Send, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const isVisible = useScrollAnimation(formRef as any);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', company: '', message: '' });
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
            style={{
              left: ${Math.random() * 100}%,
              top: ${Math.random() * 100}%,
              animationDelay: ${Math.random() * 3}s,
              opacity: Math.random() * 0.3 + 0.1,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-8 py-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-12"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>

        <div className="grid md:grid-cols-2 gap-16">
          <div
            ref={formRef as any}
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(-50px)',
              transition: 'all 0.8s',
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-10 h-10 text-cyan-400" />
              <h1 className="text-6xl font-bold text-white">Let's Talk</h1>
            </div>
            <p className="text-xl text-gray-400 mb-8">
              Have a project in mind? We'd love to hear about it. Share your ideas
              and let's create something amazing together.
            </p>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700">
                <h3 className="text-white font-semibold mb-2">Email</h3>
                <p className="text-cyan-400">work.suryasnata@gmail.com</p>
              </div>
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700">
                <h3 className="text-white font-semibold mb-2">Phone</h3>
                <p className="text-cyan-400">+91 89847 09915</p>
              </div>
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700">
                <h3 className="text-white font-semibold mb-2">Location</h3>
                <p className="text-cyan-400">Tangi, Cuttack</p>
              </div>
            </div>
          </div>

          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(50px)',
              transition: 'all 0.8s 0.2s',
            }}
          >
            {isSubmitted ? (
              <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl p-12 border border-cyan-500 flex items-center justify-center min-h-[500px]">
                <div className="text-center">
                  <div className="w-20 h-20 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                    <Send className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">
                    Message Sent!
                  </h3>
                  <p className="text-gray-300">
                    We'll get back to you within 24 hours.
                  </p>
                </div>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700"
              >
                <h2 className="text-3xl font-bold text-white mb-8">
                  Start Your Project
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-300 mb-2">Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-black border border-gray-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none transition-colors"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-black border border-gray-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Company</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-black border border-gray-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none transition-colors"
                      placeholder="Your Company"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Message</label>
                    <textarea
                      required
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      rows={5}
                      className="w-full px-4 py-3 bg-black border border-gray-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none transition-colors resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    Send Message
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};