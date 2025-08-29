// src/pages/Home.tsx
import React from 'react';
import { MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout/layout';

const services = [
  { title: 'Plumbing', desc: 'High-quality plumbing services you can trust.' },
  { title: 'Electrical', desc: 'Reliable electrical solutions for your home and office.' },
  { title: 'Carpentry', desc: 'Expert carpentry services with attention to detail.' },
];

const Home = () => {
  return (
    <Layout title="KSA Maintenance">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center mt-10 px-4">
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="w-28 h-28 bg-gradient-to-r from-amber-400 to-orange-400 rounded-3xl flex items-center justify-center mb-6 shadow-lg"
        >
          <MessageSquare className="w-12 h-12 text-white animate-pulse" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-gray-700 mb-6 max-w-2xl"
        >
          Providing top-notch maintenance services with reliability, trust, and excellence.
        </motion.p>
      </section>

      {/* Services Section */}
      <section id="services" className="mt-16 text-center">
        <motion.h3
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-semibold mb-12 text-gray-800"
        >
          Our Services
        </motion.h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-amber-400 to-orange-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                <MessageSquare className="w-10 h-10 text-white animate-bounce" />
              </div>
              <h4 className="text-xl font-semibold mb-2 text-gray-800">{service.title}</h4>
              <p className="text-gray-600">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="mt-16 text-center mb-10 px-4">
        <motion.h3
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-semibold mb-6 text-gray-800"
        >
          About Us
        </motion.h3>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto bg-white rounded-3xl p-8 shadow-lg"
        >
          <p className="text-gray-700 text-lg leading-relaxed">
            KSA Maintenance is a trusted maintenance service provider delivering excellence
            in plumbing, electrical, and carpentry services. Our team ensures timely, reliable,
            and high-quality solutions for your home and office needs.
          </p>
        </motion.div>
      </section>
    </Layout>
  );
};

export default Home;
