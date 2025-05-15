'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { 
  Users, 
  Briefcase, 
  Award, 
  Globe, 
  MapPin, 
  Clock 
} from 'react-feather'; // Assuming you're using react-feather for icons
import HeroSection from '@/components/Hero'; // Make sure this component exists
import AboutUs from '@/components/about';

// Animation variants for reuse
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

// Component for section titles
const SectionTitle = ({ subtitle, title }) => (
  <div className="mb-12 text-center">
    <p className="text-[#7F1C75] text-sm sm:text-base font-semibold tracking-wider uppercase mb-2">
      {subtitle}
    </p>
    <h2 className="text-3xl sm:text-4xl font-bold">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7F1C75] to-[#29146F]">
        {title}
      </span>
    </h2>
    <div className="w-24 h-1 bg-[#7F1C75] mx-auto mt-4"></div>
  </div>
);


const LogoCard = ({ name }) => (
  <div className="flex items-center justify-center min-w-64 h-32 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300 group">
    <div className="text-center p-6">
      <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
        <span className="text-white font-bold text-xl">
          {name.substring(0, 2).toUpperCase()}
        </span>
      </div>
      <h3 className="text-gray-800 font-semibold text-lg group-hover:text-blue-600 transition-colors">
        {name}
      </h3>
    </div>
  </div>
);

{/* Statistics Card Component */}
// const StatCard = ({ number, text }) => (
//   <motion.div 
//     className="text-center p-6 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100"
//     whileHover={{ y: -4 }}
//     transition={{ duration: 0.2 }}
//   >
//     <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
//       {number}
//     </div>
//     <p className="text-gray-600 font-medium">{text}</p>
//   </motion.div>
// );

// Stat card component
const StatCard = ({ icon, value, label }) => {
  const [count, setCount] = useState(0);
  const numericValue = parseInt(value.replace(/,/g, "").replace(/\+/g, ""));
  const hasPlus = value.includes("+");
  
  useEffect(() => {
    // Skip animation for non-numeric values
    if (isNaN(numericValue)) {
      return;
    }
    
    let start = 0;
    const duration = 2000; // 2 seconds
    const increment = numericValue / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start > numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [numericValue]);

  // Determine which icon to use
  const Icon = () => {
    switch (icon) {
      case "clients": return <Users size={24} className="text-[#7F1C75]" />;
      case "services": return <Briefcase size={24} className="text-[#7F1C75]" />;
      case "professionals": return <Award size={24} className="text-[#7F1C75]" />;
      case "countries": return <Globe size={24} className="text-[#7F1C75]" />;
      case "states": return <MapPin size={24} className="text-[#7F1C75]" />;
      case "experience": return <Clock size={24} className="text-[#7F1C75]" />;
      default: return null;
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 hover:border-[#7F1C75]/20 flex flex-col items-center">
      <div className="bg-[#7F1C75]/10 p-3 rounded-full mb-4">
        <Icon />
      </div>
      <h3 className="text-3xl font-bold text-[#29146F] mb-1">
        {isNaN(numericValue) ? value : count.toLocaleString()}{hasPlus ? "+" : ""}
      </h3>
      <p className="text-gray-600 text-sm font-medium">{label}</p>
    </div>
  );
};

// Card component for services
const ServiceCard = ({ icon, title, description }) => (
  <motion.div 
    className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
    whileHover={{ y: -5 }}
  >
    <div className="w-12 h-12 rounded-full bg-[#7F1C75]/10 flex items-center justify-center mb-4">
      <span className="text-2xl text-[#7F1C75]">{icon}</span>
    </div>
    <h3 className="text-xl font-bold mb-2 text-black">{title}</h3>
    <p className="text-[#4D4948]">{description}</p>
  </motion.div>
);

// Testimonial card component
const TestimonialCard = ({ quote, author, position }) => (
  <motion.div 
    className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
    whileHover={{ scale: 1.02 }}
  >
    <div className="mb-4 text-[#7F1C75]">
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>
    </div>
    <p className="text-[#4D4948] mb-4 italic">{quote}</p>
    <div>
      <p className="font-bold text-black">{author}</p>
      <p className="text-sm text-[#4D4948]">{position}</p>
    </div>
  </motion.div>
);

// Client logo component
const ClientLogo = ({ name }) => (
  <motion.div 
    className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center justify-center h-24"
    whileHover={{ scale: 1.05 }}
  >
    <span className="font-bold text-lg text-[#29146F]">{name}</span>
  </motion.div>
);

// Industry card component
const IndustryCard = ({ icon, name }) => (
  <motion.div 
    className="flex items-center space-x-3 bg-[#29146F]/5 p-3 rounded-full border border-[#29146F]/20"
    whileHover={{ scale: 1.03 }}
  >
    <span className="text-xl text-[#7F1C75]">{icon}</span>
    <span className="font-medium text-[#29146F]">{name}</span>
  </motion.div>
);

// FAQ component
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-gray-200 py-4">
      <button 
        className="flex justify-between items-center w-full text-left font-semibold text-black"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        <svg 
          className={`w-5 h-5 text-[#7F1C75] transition-transform ${isOpen ? 'transform rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="mt-2 text-[#4D4948]">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

const Stats = () => {
  return (
    <section id="stats" className="relative py-24 bg-white overflow-hidden">
      {/* Background pattern with subtle gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#7F1C75]/5 to-[#29146F]/5" />
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle, #4D4948 1px, transparent 1px)`,
              backgroundSize: '30px 30px',
            }}
          />
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div>
          <SectionTitle subtitle="Our Growth" title="KBG in Numbers" />
          
          {/* Stats cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-16">
            <StatCard icon="clients" value="10,000" label="Clients Served" />
            <StatCard icon="services" value="200" label="Business Services" />
            <StatCard icon="professionals" value="300" label="Certified Professionals" />
            <StatCard icon="countries" value="22" label="Countries Reached" />
            <StatCard icon="states" value="27" label="Indian States Covered" />
            <StatCard icon="experience" value="12" label="Years of Experience" />
          </div>
          
          {/* Bottom quote section */}
          <div className="text-center max-w-2xl mx-auto">
            <div className="flex items-center justify-center">
              <div className="h-px bg-gray-200 w-24"></div>
              <div className="px-4">
                <div className="p-3 bg-[#7F1C75]/10 rounded-full">
                  <svg className="w-6 h-6 text-[#7F1C75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
              </div>
              <div className="h-px bg-gray-200 w-24"></div>
            </div>
            <p className="text-lg text-[#4D4948] font-medium mt-4">
              Numbers backed by trust. Growth powered by service.
            </p>
          </div>
          
          {/* Decorative bottom wave */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden h-8">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full fill-white/30">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.11,141.89,111.27,221.93,101.6Z">
              </path>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function KBGWebsite() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="bg-white overflow-hidden">
      {/* About Us Section */}
      <HeroSection />
      <AboutUs />
      
      {/* Our Services Section */}
      <section id="services" className="relative py-20 bg-[#F9F9F9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <SectionTitle subtitle="Our Services" title="What We Offer" />
            
            <p className="text-center text-lg text-[#4D4948] mb-12 max-w-3xl mx-auto">
              Explore our wide range of services, crafted to meet the needs of startups, MSMEs, and large enterprises
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ServiceCard 
                icon="⚖️" 
                title="Legal Services" 
                description="Corporate & Business Law, Contract Drafting & Review, Legal Advisory & Representation"
              />
              <ServiceCard 
                icon="™️" 
                title="Trademark & IPR" 
                description="Trademark Registration & Renewal, Copyright & Patent Filing, Brand Protection Services"
              />
              <ServiceCard 
                icon="🏆" 
                title="ISO Certifications" 
                description="ISO 9001, ISO 14001, ISO 27001, Audit & Compliance Assistance, Certification Guidance"
              />
              <ServiceCard 
                icon="💼" 
                title="Business Consulting" 
                description="Business Formation & Structuring, Licensing & Compliance, Market Research & Strategy"
              />
              <ServiceCard 
                icon="🚀" 
                title="Startup Support" 
                description="Pitch Decks & Valuation Reports, Company Registration, Funding & Mentorship"
              />
              <ServiceCard 
                icon="💰" 
                title="Financial & HR Services" 
                description="Payroll Setup & Management, Accounting & Bookkeeping, Taxation, GST, TDS, etc."
              />
            </div>
            
            <motion.div 
              variants={itemVariants}
              className="text-center mt-12"
            >
              <p className="text-lg text-[#4D4948] mb-6">
                👉 Need a custom solution? Contact us and let's discuss your unique requirements.
              </p>
              <motion.button
                className="bg-[#7F1C75] text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center justify-center gap-2">
                  Contact Us Now
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <motion.div
          className="absolute top-20 right-0 w-64 h-64 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(127, 28, 117, 0.05) 0%, transparent 70%)',
          }}
          animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 left-0 w-48 h-48 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(41, 20, 111, 0.08) 0%, transparent 70%)',
          }}
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </section>
      
      {/* Stats Section */}
      <Stats />
      
      {/* Why Choose Us Section */}
      <section id="why-choose-us" className="relative py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <SectionTitle subtitle="Why Choose Us" title="KBG Advantage" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div 
                variants={itemVariants}
                className="relative order-2 lg:order-1"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-[#7F1C75]/5 p-6 rounded-xl border border-[#7F1C75]/20">
                    <div className="w-12 h-12 rounded-full bg-[#7F1C75]/10 flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-[#7F1C75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-black">Direct Access to Experts</h3>
                    <p className="text-[#4D4948]">
                      Our team includes lawyers, CAs, CSs, engineers, and consultants — no brokers or agents in between.
                    </p>
                  </div>
                  
                  <div className="bg-[#29146F]/5 p-6 rounded-xl border border-[#29146F]/20">
                    <div className="w-12 h-12 rounded-full bg-[#29146F]/10 flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-[#29146F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-black">Affordable Pricing</h3>
                    <p className="text-[#4D4948]">
                      We believe legal and business services shouldn't be expensive or confusing. Clear pricing. No surprises.
                    </p>
                  </div>
                  
                  <div className="bg-[#29146F]/5 p-6 rounded-xl border border-[#29146F]/20">
                    <div className="w-12 h-12 rounded-full bg-[#29146F]/10 flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-[#29146F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-black">Global Reach</h3>
                    <p className="text-[#4D4948]">
                      Services available across India's 27 states and trusted by clients in over 22 countries.
                    </p>
                  </div>
                  
                  <div className="bg-[#7F1C75]/5 p-6 rounded-xl border border-[#7F1C75]/20">
                    <div className="w-12 h-12 rounded-full bg-[#7F1C75]/10 flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-[#7F1C75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16.999l4.35-4.35a2.479 2.479 0 000-3.5 2.48 2.48 0 00-3.5 0l-.338.338a2.479 2.479 0 000 3.5m4.338-4.338L15.5 5.5m-2 4L16 7m-6-2l2-2m-8.863 10h0a4 4 0 01.993-4.993l2.664-2.253m-3.686 9.92L4 21v-7l5.014-5.014a2 2 0 12.828 0l-.707.707a1 1 0 001.414 1.414l4.336-4.336a1 1 0 00-1.591-1.21c-2.466 3.124-4.135 4.95-5.019 5.48a3 3 0 00-1.13 1.608c-.005.018-.177.928-.178.928a1.49 1.49 0 00.264.773c.613.842 4.139-.564 6.845-3.15.413-.39.487-1.07.106-1.496l-6.241-6.997a1 1 0 00-1.41-.12L4 10z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-black">24/7 Support</h3>
                    <p className="text-[#4D4948]">
                      With our 10-channel call system and auto-forwarding, we're available even after office hours to help.
                    </p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="space-y-6 order-1 lg:order-2">
                <h3 className="text-3xl font-bold text-black">
                  We Make Legal & Business Services <span className="text-[#7F1C75]">Simple</span>
                </h3>
                <p className="text-lg text-[#4D4948] leading-relaxed">
                  At KBG INDIA, we understand that navigating legal and business requirements can be overwhelming. That's why we've built a team of experts who provide clear, accessible, and effective solutions.
                </p>
                <p className="text-lg text-[#4D4948] leading-relaxed">
                  Our integrated approach means you get comprehensive services without the complexity. We handle the details so you can focus on what matters most—growing your business.
                </p>
                
                <div className="pt-6">
                  <motion.button
                    className="group relative overflow-hidden bg-[#7F1C75] text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Get Started
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Client Success Stories */}
      <section id="testimonials" className="relative py-20 bg-[#F9F9F9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <SectionTitle subtitle="Client Success Stories" title="What Our Clients Say" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              <TestimonialCard 
                quote="Satisfactory services rendered… all in time."
                author="Mr. Sudheer Kanakode"
                position="Manager, Pothys Super Stores"
              />
              <TestimonialCard 
                quote="KBG helped us secure ISO certification swiftly and smoothly. Highly recommended!"
                author="Operations Head"
                position="Kerala Tourism"
              />
              <TestimonialCard 
                quote="Trademark registration was a breeze with their guidance. The team is responsive and professional."
                author="Director"
                position="Aspire Systems"
              />
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Industries We Serve */}
      <section id="industries" className="relative py-20 bg-[#F9F9F9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <SectionTitle subtitle="Industries" title="Sectors We Serve" />
            
            <p className="text-center text-lg text-[#4D4948] mb-12 max-w-3xl mx-auto">
              We proudly serve diverse industries with specialized expertise
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <IndustryCard icon="🚀" name="Startups & Entrepreneurs" />
              <IndustryCard icon="🏭" name="Manufacturing & Industrial" />
              <IndustryCard icon="🏥" name="Healthcare & Pharma" />
              <IndustryCard icon="🏫" name="Educational Institutions" />
              <IndustryCard icon="💻" name="IT & Software" />
              <IndustryCard icon="🛍️" name="Retail & Ecommerce" />
              <IndustryCard icon="📊" name="Financial & Professional Services" />
            </div>
          </motion.div>
        </div>
      </section>
      
      <section id="clients" className="relative py-20 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <SectionTitle subtitle="Our Clients" title="Trusted By" />
      
      <p className="text-center text-lg text-[#4D4948] mb-16 max-w-3xl mx-auto">
        We're proud to have worked with some of the most innovative companies and organizations
      </p>
      
      {/* Infinite Carousel */}
      <div className="relative">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>
        
        {/* Carousel Container */}
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-12 whitespace-nowrap"
            animate={{
              x: [0, -2200],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
          >
            {/* First set of logos */}
            {[
              "Pothys",
              "Kerala Tourism", 
              "Aspire",
              "TechSolutions",
              "EduCare",
              "HealthPlus",
              "FinEdge",
              "RetailHub",
            ].map((client) => (
              <LogoCard key={client} name={client} />
            ))}
            
            {/* Duplicate set for seamless loop */}
            {[
              "Pothys",
              "Kerala Tourism",
              "Aspire", 
              "TechSolutions",
              "EduCare",
              "HealthPlus",
              "FinEdge",
              "RetailHub",
            ].map((client) => (
              <LogoCard key={`${client}-2`} name={client} />
            ))}
          </motion.div>
        </div>
      </div>
      
   
    </motion.div>
  </div>
</section>

      {/* FAQ Section */}
      <section id="faq" className="relative py-20 bg-[#F9F9F9]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <SectionTitle subtitle="FAQs" title="Common Questions" />
            
            <div className="mt-12 space-y-4">
              <FAQItem 
                question="How long does it take to register a company in India?"
                answer="The time varies based on the type of company and documentation. Typically, it takes 10-15 working days for a Private Limited Company, provided all documents are in order."
              />
              <FAQItem 
                question="What documents are needed for trademark registration?"
                answer="You'll need identity proof, address proof, business registration documents (if applicable), and a clear representation of your trademark (logo/brand name)."
              />
              <FAQItem 
                question="Do you offer services outside India?"
                answer="Yes! We serve clients in 22+ countries, offering international business setup, compliance, and legal services through our global network."
              />
              <FAQItem 
                question="How do you ensure data security?"
                answer="We're ISO 27001 certified for information security. All client data is encrypted, and we follow strict confidentiality protocols."
              />
              <FAQItem 
                question="Can you help with funding and investor pitches?"
                answer="Absolutely. Our startup services include pitch deck preparation, valuation reports, and connecting entrepreneurs with our investor network."
              />
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section id="contact" className="relative py-20 bg-gradient-to-r from-[#7F1C75] to-[#29146F]">
        <div className="absolute inset-0 opacity-10">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(to right, white 1px, transparent 1px),
                linear-gradient(to bottom, white 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Grow Your Business?
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-3xl mx-auto">
              Whether you're just starting out or looking to scale, our experts are here to help you navigate the legal and business landscape with confidence.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button
                className="bg-white text-[#7F1C75] px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Get a Free Consultation
              </motion.button>
              <motion.button
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Call Us: +91 1234567890
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-[#1A1A1A] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">KBG INDIA</h3>
              <p className="text-[#A3A3A3] mb-4">
                Your trusted partner for legal and business solutions across India and beyond.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-[#A3A3A3] hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091                  -4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#" className="text-[#A3A3A3] hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="#" className="text-[#A3A3A3] hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-[#A3A3A3] hover:text-white transition-colors">Home</a></li>
                <li><a href="#services" className="text-[#A3A3A3] hover:text-white transition-colors">Services</a></li>
                <li><a href="#about" className="text-[#A3A3A3] hover:text-white transition-colors">About Us</a></li>
                <li><a href="#testimonials" className="text-[#A3A3A3] hover:text-white transition-colors">Testimonials</a></li>
                <li><a href="#contact" className="text-[#A3A3A3] hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-[#A3A3A3] hover:text-white transition-colors">Legal Services</a></li>
                <li><a href="#" className="text-[#A3A3A3] hover:text-white transition-colors">Trademark & IPR</a></li>
                <li><a href="#" className="text-[#A3A3A3] hover:text-white transition-colors">ISO Certifications</a></li>
                <li><a href="#" className="text-[#A3A3A3] hover:text-white transition-colors">Business Consulting</a></li>
                <li><a href="#" className="text-[#A3A3A3] hover:text-white transition-colors">Startup Support</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2 text-[#A3A3A3]">
                <li className="flex items-start space-x-2">
                  <svg className="w-5 h-5 mt-0.5 text-[#7F1C75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>123 Business Street, Chennai, Tamil Nadu 600001</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-[#7F1C75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+91 1234567890</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-[#7F1C75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>info@kbgindia.com</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-[#333] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-[#A3A3A3] mb-4 md:mb-0">
              © {new Date().getFullYear()} KBG INDIA. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-[#A3A3A3] hover:text-white transition-colors text-sm">Privacy Policy</a>
              <a href="#" className="text-[#A3A3A3] hover:text-white transition-colors text-sm">Terms of Service</a>
              <a href="#" className="text-[#A3A3A3] hover:text-white transition-colors text-sm">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}