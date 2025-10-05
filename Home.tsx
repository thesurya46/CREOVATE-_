import { useState, useEffect } from 'react';
import { Hero } from '../components/Hero';
import { Carousel } from '../components/Carousel';
import { Stats } from '../components/Stats';
import { Services } from '../components/Services';
import { WorkShowcase } from '../components/WorkShowcase';
import { Testimonials } from '../components/Testimonials';
import { Footer } from '../components/Footer';
import { Loader } from '../components/Loader';
import { CustomCursor } from '../components/CustomCursor';

const mockProjects = [
  {
    id: '1',
    title: 'Digital Innovation',
    description: 'A revolutionary approach to digital transformation with cutting-edge technology',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'Digital',
  },
  {
    id: '2',
    title: 'Brand Evolution',
    description: 'Complete brand redesign focusing on modern aesthetics and user experience',
    image: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'Branding',
  },
  {
    id: '3',
    title: 'Smart Solutions',
    description: 'AI-powered platform transforming business operations',
    image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'Technology',
  },
  {
    id: '4',
    title: 'Creative Studio',
    description: 'Immersive visual experience for creative professionals',
    image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'Design',
  },
  {
    id: '5',
    title: 'Future Commerce',
    description: 'Next-generation e-commerce platform with AR integration',
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'Commerce',
  },
];

const mockStats = [
  { id: '1', label: 'Projects Delivered', value: 250, suffix: '+' },
  { id: '2', label: 'Client Satisfaction', value: 98, suffix: '%' },
  { id: '3', label: 'Team Members', value: 4, suffix: '' },
  { id: '4', label: 'Years Experience', value: 5, suffix: '+' },
];

const mockServices = [
  {
    id: '1',
    title: 'Digital Strategy',
    description: 'Comprehensive digital transformation strategies tailored to your business needs',
    icon: 'Target',
  },
  {
    id: '2',
    title: 'Creative Design',
    description: 'Award-winning design that captivates and converts',
    icon: 'Palette',
  },
  {
    id: '3',
    title: 'Development',
    description: 'Cutting-edge web and mobile development with the latest technologies',
    icon: 'Code',
  },
  {
    id: '4',
    title: 'Brand Identity',
    description: 'Building memorable brands that resonate with your audience',
    icon: 'Sparkles',
  },
  {
    id: '5',
    title: 'User Experience',
    description: 'Intuitive interfaces designed for optimal user engagement',
    icon: 'Users',
  },
  {
    id: '6',
    title: 'Innovation Lab',
    description: 'Experimental solutions pushing the boundaries of digital experiences',
    icon: 'Lightbulb',
  },
];

const mockTestimonials = [
  {
    id: '1',
    client_name: 'Sonali Sahoo',
    client_role: '',
    content: 'Working with this team transformed our digital presence. Their attention to detail and innovative approach exceeded all expectations.',
    avatar_url: '',
    rating: 5,
  },
  {
    id: '2',
    client_name: 'Aniket Parida',
    client_role: '',
    content: 'Absolutely phenomenal work. They brought our vision to life with stunning visuals and seamless functionality.',
    avatar_url: '',
    rating: 5,
  },
  {
    id: '3',
    client_name: 'Suryasnata Panigrahi',
    client_role: '',
    content: 'The level of creativity and technical expertise is unmatched. Our platform now stands out in a crowded market.',
    avatar_url: '',
    rating: 5,
  },
];

export const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-black overflow-x-hidden">
      <CustomCursor />
      <Hero />
      <Carousel items={mockProjects} />
      <Stats stats={mockStats} />
      <Services services={mockServices} />
      <WorkShowcase projects={mockProjects} />
      <Testimonials testimonials={mockTestimonials} />
      <Footer />
    </div>
  );
};