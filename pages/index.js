import { useState } from 'react';

export default function Home() {
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const openHelp = () => setIsHelpOpen(true);
  const closeHelp = () => setIsHelpOpen(false);

  return (
    <div style={styles.container}>
      {/* ব্যাকগ্রাউন্ড লেয়ার */}
      <div style={styles.background}></div>
      
      {/* কন্টেন্ট */}
      <main style={styles.main}>
        <div style={styles.content}>
          <h1 style={styles.title}>
            <span style={styles.titleGradient}>ShiPu</span> Ai
          </h1>
          <p style={styles.subtitle}>
            Instant answers, premium experience
          </p>
          <button style={styles.button} onClick={openHelp}>
            Start Chatting
          </button>
        </div>
      </main>

      {/* ফুটার - আপনার দেওয়া টেক্সট */}
      <footer style={styles.footer}>
        ©2026 ShiPu Ai - Developed by Chitron Bhattacharjee
      </footer>

      {/* মোডাল */}
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

      {/* অ্যানিমেশন স্টাইল */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    width: '100%',
    position: 'relative',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    overflow: 'hidden',
  },

  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, #0B1E33 0%, #1A3B5C 50%, #1E4A6F 100%)',
    zIndex: 0,
  },

  main: {
    position: 'relative',
    zIndex: 10,
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    paddingBottom: '80px', // ফুটারের জন্য স্পেস
  },

  content: {
    maxWidth: '800px',
    textAlign: 'center',
    animation: 'slideUp 0.8s ease-out',
  },

  title: {
    fontSize: 'clamp(3rem, 8vw, 5rem)',
    fontWeight: 700,
    margin: '0 0 1rem',
    letterSpacing: '-0.02em',
    color: '#FFFFFF',
    textShadow: '0 2px 10px rgba(0,20,40,0.3)',
  },

  titleGradient: {
    background: 'linear-gradient(135deg, #7BC9FF 0%, #4A9EFF 50%, #1E6DFF 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },

  subtitle: {
    fontSize: 'clamp(1.1rem, 3vw, 1.3rem)',
    color: 'rgba(255,255,255,0.8)',
    margin: '0 0 2.5rem',
    fontWeight: 400,
    letterSpacing: '0.3px',
  },

  button: {
    padding: '1rem 3rem',
    fontSize: '1.1rem',
    fontWeight: 600,
    color: '#FFFFFF',
    background: 'linear-gradient(135deg, #2A7BDE 0%, #1D4ED8 100%)',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    boxShadow: '0 10px 25px -5px rgba(26,67,113,0.5), 0 0 0 1px rgba(255,255,255,0.1) inset',
    transition: 'all 0.3s ease',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    textAlign: 'center',
    padding: '24px',
    color: 'rgba(255,255,255,0.6)',
    fontSize: '0.9rem',
    letterSpacing: '0.5px',
    zIndex: 20,
    borderTop: '1px solid rgba(255,255,255,0.1)',
    background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.2))',
  },

  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(8, 27, 51, 0.85)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px',
    animation: 'fadeIn 0.3s ease',
  },

  modalContent: {
    width: '100%',
    maxWidth: '1000px',
    height: '80vh',
    backgroundColor: '#FFFFFF',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
    animation: 'slideUp 0.4s ease',
  },

  modalHeader: {
    padding: '16px 24px',
    background: 'linear-gradient(135deg, #1A3B5C 0%, #0B1E33 100%)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  modalTitle: {
    color: '#FFFFFF',
    fontSize: '1.1rem',
    fontWeight: 500,
    letterSpacing: '0.3px',
  },

  modalClose: {
    background: 'none',
    border: 'none',
    color: 'rgba(255,255,255,0.7)',
    fontSize: '1.8rem',
    lineHeight: 1,
    cursor: 'pointer',
    padding: '0 8px',
    transition: 'color 0.2s',
  },

  iframe: {
    width: '100%',
    height: 'calc(100% - 60px)',
    border: 'none',
    display: 'block',
  },
};

// গ্লোবাল স্টাইল
<style jsx global>{`
  body {
    margin: 0;
    padding: 0;
  }
  
  button:hover {
    transform: translateY(-2px);
    box-shadow: 0 20px 30px -8px rgba(26,67,113,0.6), 0 0 0 1px rgba(255,255,255,0.2) inset;
  }
  
  .modalClose:hover {
    color: #FFFFFF;
  }
`}</style>
