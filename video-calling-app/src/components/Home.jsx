import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

import Faq from './Faq';
import Partnerlogo from './Partnerlogo';
import Testimonial from './Testimonial';
import Hero from './hero';


const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero/>
      <Partnerlogo/>
      <Testimonial />
      <Faq />
      <Footer />
     
      
     
    </div>
  );
};

export default Home;