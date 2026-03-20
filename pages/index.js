import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Slider images (replace with your actual images)
  const topSliderImages = [
    'https://images.unsplash.com/photo-1573164713988-3385a4d1aec5?w=600',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600',
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600',
    'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600',
  ];

  const bottomSliderImages = [
    'https://images.unsplash.com/photo-1559136555-9303aea8ebd?w=600',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600',
    'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?w=600',
    'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600',
    'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600',
  ];

  // Testimonials data
  const testimonials = [
    { name: 'Rahul Sharma', role: 'CEO, TechCorp', text: 'ShiPu Ai has transformed how we handle customer support. The response time is incredible!' },
    { name: 'Priya Singh', role: 'Product Manager', text: 'The AI understands context perfectly. It\'s like having a super-smart team member.' },
    { name: 'Amit Patel', role: 'Startup Founder', text: 'We\'ve seen 70% faster response times since implementing ShiPu Ai.' },
    { name: 'Neha Gupta', role: 'Customer Success', text: 'Our customers love how natural the conversations feel. Highly recommended!' },
  ];

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const openHelp = () => setIsHelpOpen(true);
  const closeHelp = () => setIsHelpOpen(false);

  return (
    <>
      <Head>
        {/* Favicon - using your logo */}
        <link rel="icon" href="https://shipu.c0m.in/logo.png" />
        <link rel="apple-touch-icon" href="https://shipu.c0m.in/logo.png" />
        
        {/* Font Awesome for premium SVG icons */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        
        {/* Google Fonts */}
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <div style={styles.container}>
        {/* Background layers */}
        <div style={styles.background}>
          <div style={styles.gradientSphere}></div>
          <div style={styles.gradientSphere}></div>
          <div style={styles.gradientSphere}></div>
        </div>

        {/* Logo in header with premium styling */}
        <header style={styles.header}>
          <div style={styles.logoContainer}>
            <img 
              src="https://shipu.c0m.in/logo.png" 
              alt="ShiPu Ai Logo" 
              style={styles.logo}
              onError={(e) => {
                e.target.style.display = 'none';
                // Fallback text logo if image fails
                e.target.parentElement.innerHTML = '<span style="color: #7BC9FF; font-size: 1.5rem; font-weight: 600;">ShiPu</span>';
              }}
            />
          </div>
        </header>

        {/* Hero Section */}
        <section style={styles.hero}>
          <div style={styles.heroContent}>
            <h1 style={styles.title}>
              ShiPu<span style={styles.titleLight}>Ai</span>
            </h1>
            <p style={styles.subtitle}>
              Next-generation AI conversation platform for modern businesses
            </p>
            <button style={styles.heroButton} onClick={openHelp}>
              <span style={styles.buttonText}>Start Free Trial</span>
              <span style={styles.buttonGlow}></span>
            </button>
          </div>
        </section>

        {/* Services with Premium SVG Icons */}
        <section style={styles.services}>
          <h2 style={styles.sectionTitle}>Powerful Features</h2>
          <div style={styles.cardGrid}>
            <div style={styles.serviceCard}>
              <div style={styles.cardIcon}>
                <i className="fas fa-robot" style={styles.svgIcon}></i>
              </div>
              <h3 style={styles.cardTitle}>AI-Powered</h3>
              <p style={styles.cardText}>Advanced natural language processing for human-like conversations</p>
            </div>
            <div style={styles.serviceCard}>
              <div style={styles.cardIcon}>
                <i className="fas fa-bolt" style={styles.svgIcon}></i>
              </div>
              <h3 style={styles.cardTitle}>Instant Response</h3>
              <p style={styles.cardText}>Lightning-fast answers to customer queries 24/7</p>
            </div>
            <div style={styles.serviceCard}>
              <div style={styles.cardIcon}>
                <i className="fas fa-shield-alt" style={styles.svgIcon}></i>
              </div>
              <h3 style={styles.cardTitle}>Enterprise Security</h3>
              <p style={styles.cardText}>Bank-level encryption and data protection</p>
            </div>
            <div style={styles.serviceCard}>
              <div style={styles.cardIcon}>
                <i className="fas fa-chart-line" style={styles.svgIcon}></i>
              </div>
              <h3 style={styles.cardTitle}>Analytics</h3>
              <p style={styles.cardText}>Deep insights into customer interactions</p>
            </div>
          </div>
        </section>

        {/* Dual Direction Slider with Transparent Light Blue Cards */}
        <section style={styles.sliderSection}>
          <h2 style={styles.sectionTitle}>Trusted by Industry Leaders</h2>
          
          {/* Top Slider - Right to Left */}
          <div style={styles.sliderContainer}>
            <div style={styles.topSliderTrack}>
              {topSliderImages.concat(topSliderImages).map((img, index) => (
                <div key={index} style={styles.sliderCard}>
                  <img src={img} alt="slide" style={styles.sliderImage} />
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Slider - Left to Right */}
          <div style={styles.sliderContainer}>
            <div style={styles.bottomSliderTrack}>
              {bottomSliderImages.concat(bottomSliderImages).map((img, index) => (
                <div key={index} style={styles.sliderCard}>
                  <img src={img} alt="slide" style={styles.sliderImage} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Cards with Premium Radius */}
        <section style={styles.features}>
          <h2 style={styles.sectionTitle}>Why Choose ShiPu Ai</h2>
          <div style={styles.featureGrid}>
            <div style={styles.featureCard}>
              <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=400" alt="feature" style={styles.featureImage} />
              <div style={styles.featureContent}>
                <h3 style={styles.featureTitle}>Seamless Integration</h3>
                <p style={styles.featureText}>Connect with your existing tools in minutes</p>
              </div>
            </div>
            <div style={styles.featureCard}>
              <img src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400" alt="feature" style={styles.featureImage} />
              <div style={styles.featureContent}>
                <h3 style={styles.featureTitle}>24/7 Availability</h3>
                <p style={styles.featureText}>Never miss a customer query again</p>
              </div>
            </div>
            <div style={styles.featureCard}>
              <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400" alt="feature" style={styles.featureImage} />
              <div style={styles.featureContent}>
                <h3 style={styles.featureTitle}>Multi-language Support</h3>
                <p style={styles.featureText}>Communicate in 50+ languages</p>
              </div>
            </div>
            <div style={styles.featureCard}>
              <img src="https://images.unsplash.com/photo-1559136555-9303aea8ebd?w=400" alt="feature" style={styles.featureImage} />
              <div style={styles.featureContent}>
                <h3 style={styles.featureTitle}>Custom Branding</h3>
                <p style={styles.featureText}>White-label solution for your brand</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section style={styles.testimonials}>
          <h2 style={styles.sectionTitle}>What Our Clients Say</h2>
          <div style={styles.testimonialContainer}>
            <div style={styles.testimonialCard}>
              <p style={styles.testimonialText}>"{testimonials[currentSlide].text}"</p>
              <div style={styles.testimonialAuthor}>
                <strong>{testimonials[currentSlide].name}</strong>
                <span style={styles.testimonialRole}>{testimonials[currentSlide].role}</span>
              </div>
            </div>
            <div style={styles.testimonialDots}>
              {testimonials.map((_, index) => (
                <span
                  key={index}
                  style={{
                    ...styles.dot,
                    backgroundColor: index === currentSlide ? '#7BC9FF' : 'rgba(123, 201, 255, 0.3)',
                  }}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={styles.cta}>
          <div style={styles.ctaContent}>
            <h2 style={styles.ctaTitle}>Ready to Transform Your Customer Experience?</h2>
            <p style={styles.ctaText}>Join thousands of businesses using ShiPu Ai</p>
            <button style={styles.ctaButton} onClick={openHelp}>
              Get Started Now
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer style={styles.footer}>
          ©2026 ShiPu Ai - Developed by Chitron Bhattacharjee
        </footer>

        {/* Modal */}
        {isHelpOpen && (
          <div style={styles.modalOverlay} onClick={closeHelp}>
            <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <div style={styles.modalHeader}>
                <span style={styles.modalTitle}>Help Center</span>
                <button style={styles.modalClose} onClick={closeHelp}>×</button>
              </div>
              <iframe
                src="/help"
                style={styles.iframe}
                title="Help Center"
                frameBorder="0"
              />
            </div>
          </div>
        )}

        {/* Animation Keyframes */}
        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          
          @keyframes slideRightToLeft {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          
          @keyframes slideLeftToRight {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
        `}</style>
      </div>
    </>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    width: '100%',
    position: 'relative',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    overflow: 'hidden',
    background: '#0A1929',
  },

  background: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 30% 50%, rgba(123, 201, 255, 0.1) 0%, rgba(10, 25, 41, 0.6) 50%, #0A1929 100%)',
    zIndex: 0,
  },

  gradientSphere: {
    position: 'absolute',
    borderRadius: '50%',
    filter: 'blur(80px)',
    opacity: 0.4,
    animation: 'float 20s infinite alternate',
  },

  header: {
    position: 'relative',
    zIndex: 20,
    padding: '20px 40px',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  logoContainer: {
    width: '60px',
    height: '60px',
    backgroundColor: '#FFFFFF',
    borderRadius: '16px', // Premium corner radius
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8px',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(123, 201, 255, 0.3) inset',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    ':hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 15px 30px -5px rgba(123, 201, 255, 0.4), 0 0 0 2px rgba(123, 201, 255, 0.4) inset',
    },
  },

  logo: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    borderRadius: '12px', // Slightly smaller radius for image
  },

  hero: {
    position: 'relative',
    zIndex: 10,
    minHeight: '80vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    backdropFilter: 'blur(10px)',
  },

  heroContent: {
    maxWidth: '900px',
    textAlign: 'center',
    animation: 'fadeInUp 1s ease',
  },

  title: {
    fontSize: 'clamp(3.5rem, 10vw, 6rem)',
    fontWeight: 600,
    margin: '0 0 1rem',
    letterSpacing: '-0.03em',
    color: '#FFFFFF',
    textShadow: '0 10px 30px rgba(0,0,0,0.2)',
  },

  titleLight: {
    fontWeight: 300,
    background: 'linear-gradient(135deg, #7BC9FF, #4A9EFF, #1E6DFF)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },

  subtitle: {
    fontSize: 'clamp(1.2rem, 4vw, 1.5rem)',
    color: 'rgba(200, 230, 255, 0.9)',
    margin: '0 0 3rem',
    fontWeight: 400,
    letterSpacing: '0.5px',
  },

  heroButton: {
    position: 'relative',
    padding: '1.2rem 3.5rem',
    fontSize: '1.2rem',
    fontWeight: 500,
    color: '#FFFFFF',
    background: 'linear-gradient(135deg, #7BC9FF, #4A9EFF, #1E6DFF)',
    border: 'none',
    borderRadius: '60px',
    cursor: 'pointer',
    boxShadow: '0 15px 35px -10px rgba(123, 201, 255, 0.5)',
    transition: 'all 0.3s ease',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    overflow: 'hidden',
  },

  buttonGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 3s infinite',
  },

  services: {
    position: 'relative',
    zIndex: 10,
    padding: '100px 20px',
    background: 'rgba(10, 25, 41, 0.8)',
    backdropFilter: 'blur(10px)',
  },

  sectionTitle: {
    fontSize: 'clamp(2rem, 5vw, 3rem)',
    fontWeight: 600,
    textAlign: 'center',
    color: '#FFFFFF',
    marginBottom: '3rem',
    background: 'linear-gradient(135deg, #7BC9FF, #FFFFFF)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },

  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '30px',
    maxWidth: '1200px',
    margin: '0 auto',
  },

  serviceCard: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(123, 201, 255, 0.2)',
    borderRadius: '30px', // Premium radius
    padding: '30px',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    animation: 'float 6s ease-in-out infinite',
    ':hover': {
      transform: 'translateY(-10px)',
      borderColor: 'rgba(123, 201, 255, 0.5)',
      boxShadow: '0 20px 40px -10px rgba(123, 201, 255, 0.3)',
    },
  },

  cardIcon: {
    marginBottom: '20px',
    fontSize: '3rem',
    color: '#7BC9FF',
  },

  svgIcon: {
    fontSize: '3rem',
    color: '#7BC9FF',
    filter: 'drop-shadow(0 5px 15px rgba(123, 201, 255, 0.4))',
  },

  cardTitle: {
    fontSize: '1.5rem',
    color: '#7BC9FF',
    marginBottom: '15px',
  },

  cardText: {
    color: 'rgba(255, 255, 255, 0.7)',
    lineHeight: 1.6,
  },

  sliderSection: {
    position: 'relative',
    zIndex: 10,
    padding: '80px 0',
    overflow: 'hidden',
  },

  sliderContainer: {
    width: '100%',
    overflow: 'hidden',
    marginBottom: '30px',
  },

  topSliderTrack: {
    display: 'flex',
    gap: '20px',
    animation: 'slideRightToLeft 30s linear infinite',
    width: 'fit-content',
  },

  bottomSliderTrack: {
    display: 'flex',
    gap: '20px',
    animation: 'slideLeftToRight 30s linear infinite',
    width: 'fit-content',
  },

  sliderCard: {
    flex: '0 0 300px',
    height: '200px',
    borderRadius: '25px', // Premium radius
    overflow: 'hidden',
    boxShadow: '0 10px 30px -10px rgba(0,0,0,0.3)',
    border: '1px solid rgba(123, 201, 255, 0.3)',
    backgroundColor: 'rgba(123, 201, 255, 0.1)', // Transparent light blue
    backdropFilter: 'blur(5px)',
  },

  sliderImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    opacity: 0.9,
  },

  features: {
    position: 'relative',
    zIndex: 10,
    padding: '100px 20px',
    background: 'rgba(10, 25, 41, 0.6)',
    backdropFilter: 'blur(10px)',
  },

  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
    maxWidth: '1200px',
    margin: '0 auto',
  },

  featureCard: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(123, 201, 255, 0.2)',
    borderRadius: '30px', // Premium radius
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    ':hover': {
      transform: 'translateY(-5px)',
      borderColor: 'rgba(123, 201, 255, 0.5)',
      boxShadow: '0 20px 40px -10px rgba(123, 201, 255, 0.3)',
    },
  },

  featureImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  },

  featureContent: {
    padding: '20px',
  },

  featureTitle: {
    fontSize: '1.3rem',
    color: '#7BC9FF',
    marginBottom: '10px',
  },

  featureText: {
    color: 'rgba(255, 255, 255, 0.7)',
    lineHeight: 1.6,
  },

  testimonials: {
    position: 'relative',
    zIndex: 10,
    padding: '100px 20px',
  },

  testimonialContainer: {
    maxWidth: '800px',
    margin: '0 auto',
  },

  testimonialCard: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(123, 201, 255, 0.2)',
    borderRadius: '40px', // Premium radius
    padding: '40px',
    textAlign: 'center',
    animation: 'fadeInUp 0.5s ease',
  },

  testimonialText: {
    fontSize: '1.2rem',
    color: '#FFFFFF',
    lineHeight: 1.8,
    marginBottom: '20px',
    fontStyle: 'italic',
  },

  testimonialAuthor: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },

  testimonialRole: {
    color: 'rgba(123, 201, 255, 0.7)',
    fontSize: '0.9rem',
  },

  testimonialDots: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '30px',
  },

  dot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },

  cta: {
    position: 'relative',
    zIndex: 10,
    padding: '120px 20px',
    background: 'linear-gradient(135deg, rgba(123, 201, 255, 0.1), rgba(30, 109, 255, 0.1))',
    backdropFilter: 'blur(10px)',
    textAlign: 'center',
  },

  ctaContent: {
    maxWidth: '800px',
    margin: '0 auto',
  },

  ctaTitle: {
    fontSize: 'clamp(2rem, 5vw, 3rem)',
    fontWeight: 600,
    color: '#FFFFFF',
    marginBottom: '1rem',
  },

  ctaText: {
    fontSize: '1.2rem',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: '2rem',
  },

  ctaButton: {
    padding: '1.2rem 4rem',
    fontSize: '1.2rem',
    fontWeight: 600,
    color: '#0A1929',
    background: '#7BC9FF',
    border: 'none',
    borderRadius: '60px',
    cursor: 'pointer',
    boxShadow: '0 15px 35px -10px #7BC9FF',
    transition: 'all 0.3s ease',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    ':hover': {
      transform: 'scale(1.05)',
      background: '#4A9EFF',
    },
  },

  footer: {
    position: 'relative',
    zIndex: 10,
    textAlign: 'center',
    padding: '30px',
    color: 'rgba(123, 201, 255, 0.5)',
    fontSize: '0.9rem',
    borderTop: '1px solid rgba(123, 201, 255, 0.1)',
    background: 'rgba(10, 25, 41, 0.8)',
    backdropFilter: 'blur(10px)',
  },

  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 10, 25, 0.8)',
    backdropFilter: 'blur(15px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px',
    animation: 'fadeInUp 0.3s ease',
  },

  modalContent: {
    width: '100%',
    maxWidth: '1100px',
    height: '80vh',
    background: 'rgba(255, 255, 255, 0.98)',
    borderRadius: '30px', // Premium radius
    overflow: 'hidden',
    boxShadow: '0 50px 100px -20px rgba(0, 0, 0, 0.5)',
    animation: 'fadeInUp 0.5s ease',
  },

  modalHeader: {
    padding: '18px 28px',
    background: 'linear-gradient(135deg, #0A1A2F 0%, #1E3A5F 100%)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid rgba(123, 201, 255, 0.3)',
  },

  modalTitle: {
    color: '#7BC9FF',
    fontSize: '1.1rem',
    fontWeight: 400,
    letterSpacing: '1px',
    textTransform: 'uppercase',
  },

  modalClose: {
    background: 'none',
    border: 'none',
    color: 'rgba(123, 201, 255, 0.6)',
    fontSize: '2rem',
    lineHeight: 1,
    cursor: 'pointer',
    padding: '0 10px',
    transition: 'all 0.3s ease',
    ':hover': {
      color: '#7BC9FF',
      transform: 'rotate(90deg)',
    },
  },

  iframe: {
    width: '100%',
    height: 'calc(100% - 62px)',
    border: 'none',
    display: 'block',
  },
};

// Global styles for pseudo-classes
<style jsx global>{`
  body {
    margin: 0;
    padding: 0;
    background: #0A1929;
  }

  button:hover {
    transform: scale(1.02) !important;
    box-shadow: 0 20px 40px -10px rgba(123, 201, 255, 0.5) !important;
  }

  button:active {
    transform: scale(0.98) !important;
  }

  .gradientSphere:nth-child(1) {
    width: 600px;
    height: 600px;
    top: -200px;
    left: -200px;
    background: radial-gradient(circle, rgba(123, 201, 255, 0.3) 0%, rgba(74, 158, 255, 0.1) 70%);
    animation-delay: 0s;
  }
  
  .gradientSphere:nth-child(2) {
    width: 500px;
    height: 500px;
    bottom: -150px;
    right: -150px;
    background: radial-gradient(circle, rgba(74, 158, 255, 0.3) 0%, rgba(30, 109, 255, 0.1) 70%);
    animation-delay: -5s;
  }
  
  .gradientSphere:nth-child(3) {
    width: 400px;
    height: 400px;
    top: 40%;
    left: 30%;
    background: radial-gradient(circle, rgba(30, 109, 255, 0.3) 0%, rgba(123, 201, 255, 0.1) 70%);
    animation-delay: -10s;
  }
`}</style>
