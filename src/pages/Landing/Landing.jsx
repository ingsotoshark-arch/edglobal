import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Hero from '../../components/Hero/Hero';
import ValueProposition from '../../components/ValueProposition/ValueProposition';
import HowItWorks from '../../components/HowItWorks/HowItWorks';
import Destinations from '../../components/Destinations/Destinations';
import About from '../../components/About/About';
import Testimonials from '../../components/Testimonials/Testimonials';
import Contact from '../../components/Contact/Contact';
import Footer from '../../components/Footer/Footer';

const Landing = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ValueProposition />
        <HowItWorks />
        <Destinations />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default Landing;
