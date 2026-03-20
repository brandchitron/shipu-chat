import { useState } from 'react';

export default function Home() {
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const openHelp = () => setIsHelpOpen(true);
  const closeHelp = () => setIsHelpOpen(false);

  return (
    <div style={styles.container}>
      {/* Ocean Wave Animation Background */}
      <div style={styles.oceanBackground}>
        <div style={styles.wave}></div>
        <div style={styles.wave}></div>
        <div style={styles.wave}></div>
      </div>

      {/* হিরো সেকশন – Start Chatting বাটন */}
      <section style={styles.hero}>
        <h1 style={styles.title}>ShiPu চ্যাট</h1>
        <p style={styles.subtitle}>সমুদ্রের মত গভীর জ্ঞান, তরঙ্গের মত দ্রুত উত্তর</p>
        <button style={styles.ctaButton} onClick={openHelp}>
          Start Chatting
        </button>
      </section>

      {/* মোডাল পপআপ (হেল্প সেন্টার) */}
      {isHelpOpen && (
        <div style={styles.modalOverlay} onClick={closeHelp}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>হেল্প সেন্টার</h2>
              <button style={styles.closeButton} onClick={closeHelp}>×</button>
            </div>
            <div style={styles.iframeContainer}>
              <iframe
                src="/help"
                style={styles.iframe}
                title="Help Center"
                frameBorder="0"
              />
            </div>
          </div>
        </div>
      )}

      {/* ফুটার */}
      <footer style={styles.footer}>
        <p>© ২০২৬ ShiPu চ্যাট - সমুদ্রের মত নির্মল অভিজ্ঞতা</p>
      </footer>

      {/* অ্যানিমেশন কীফ্রেম */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        @keyframes pulse-blue {
          0% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.7); }
          70% { box-shadow: 0 0 0 20px rgba(37, 99, 235, 0); }
          100% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0); }
        }
        @keyframes wave {
          0% { transform: translateX(0) translateZ(0) scaleY(1); }
          50% { transform: translateX(-25%) translateZ(0) scaleY(0.8); }
          100% { transform: translateX(-50%) translateZ(0) scaleY(1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// স্টাইল অবজেক্ট
const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    background: 'linear-gradient(145deg, #0c4a6e 0%, #075985 50%, #0284c7 100%)',
    color: '#f0f9ff',
    position: 'relative',
    margin: 0,
    padding: 0,
    overflow: 'hidden',
  },
  oceanBackground: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40vh',
    zIndex: 0,
  },
  wave: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '200%',
    height: '100%',
    background: 'rgba(37, 99, 235, 0.2)',
    borderRadius: '100% 100% 0 0',
    animation: 'wave 10s -3s linear infinite alternate',
    transform: 'translateX(0)',
    backdropFilter: 'blur(4px)',
    '::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'linear-gradient(180deg, transparent, rgba(37, 99, 235, 0.3))',
    }
  },
  hero: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '2rem',
    animation: 'float 6s ease-in-out infinite',
    position: 'relative',
    zIndex: 10,
  },
  title: {
    fontSize: 'clamp(2.5rem, 10vw, 5rem)',
    fontWeight: 800,
    background: 'linear-gradient(to right, #bae6fd, #7dd3fc, #38bdf8)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '1rem',
    letterSpacing: '-0.02em',
    textShadow: '0 0 30px rgba(56, 189, 248, 0.5)',
  },
  subtitle: {
    fontSize: 'clamp(1.1rem, 4vw, 1.5rem)',
    color: '#bae6fd',
    maxWidth: '600px',
    marginBottom: '2rem',
    lineHeight: 1.6,
    textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
  },
  ctaButton: {
    padding: '1rem 3rem',
    fontSize: '1.25rem',
    fontWeight: 600,
    color: 'white',
    background: 'linear-gradient(135deg, #0ea5e9, #2563eb, #1e40af)',
    border: 'none',
    borderRadius: '9999px',
    cursor: 'pointer',
    boxShadow: '0 10px 25px -5px rgba(37, 99, 235, 0.5), 0 0 0 2px rgba(255, 255, 255, 0.1) inset',
    transition: 'transform 0.2s, box-shadow 0.2s',
    animation: 'pulse-blue 3s infinite',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    backdropFilter: 'blur(5px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(2, 84, 145, 0.7)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '1rem',
    animation: 'fadeIn 0.3s',
  },
  modalContent: {
    backgroundColor: 'rgba(15, 23, 42, 0.9)',
    backdropFilter: 'blur(16px)',
    borderRadius: '24px',
    width: '100%',
    maxWidth: '1000px',
    height: '80vh',
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(56, 189, 248, 0.3) inset',
    border: '1px solid rgba(56, 189, 248, 0.3)',
    overflow: 'hidden',
    animation: 'slideUp 0.3s',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 1.5rem',
    borderBottom: '1px solid rgba(56, 189, 248, 0.3)',
    background: 'rgba(2, 62, 108, 0.8)',
    backdropFilter: 'blur(10px)',
  },
  modalTitle: {
    margin: 0,
    fontSize: '1.25rem',
    fontWeight: 600,
    color: '#e0f2fe',
    textShadow: '0 0 10px rgba(56, 189, 248, 0.5)',
  },
  closeButton: {
    background: 'transparent',
    border: 'none',
    color: '#bae6fd',
    fontSize: '2rem',
    lineHeight: 1,
    cursor: 'pointer',
    padding: '0 0.5rem',
    transition: 'color 0.2s, transform 0.2s',
  },
  iframeContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  iframe: {
    width: '100%',
    height: '100%',
    border: 'none',
  },
  footer: {
    textAlign: 'center',
    padding: '1.5rem',
    color: '#bae6fd',
    borderTop: '1px solid rgba(56, 189, 248, 0.3)',
    fontSize: '0.875rem',
    position: 'relative',
    zIndex: 10,
    backdropFilter: 'blur(5px)',
    background: 'rgba(2, 62, 108, 0.3)',
  },
};

// গ্লোবাল স্টাইল
<style jsx global>{`
  body {
    margin: 0;
    font-family: system-ui, -apple-system, sans-serif;
    background: #0c4a6e;
  }
  
  /* Hover Effects */
  button:hover {
    transform: scale(1.05);
    box-shadow: 0 20px 30px -5px rgba(37, 99, 235, 0.6), 0 0 0 3px rgba(255, 255, 255, 0.2) inset;
  }
  
  .closeButton:hover {
    color: white;
    transform: rotate(90deg);
  }
`}</style>
