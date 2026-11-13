import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Scale, BookOpen, Shield, Award, Sparkles, CheckCircle2,
  ArrowRight, Key, Lock, Mail, User, LogIn, ExternalLink,
  ChevronRight, Landmark, HelpCircle, FileText, Bot, Moon, Sun
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DEMO_USER, login, loginAsDemo, register } from '../services/authService';
import { useAppContext } from '../App';

export default function LandingPage({ onLoginSuccess }) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useAppContext();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  
  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('UPSC Aspirant');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleTestLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      loginAsDemo();
      setIsLoading(false);
      setShowAuthModal(false);
      if (onLoginSuccess) {
        onLoginSuccess();
      } else {
        navigate('/');
      }
    }, 400);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      if (authMode === 'login') {
        const res = login(email, password);
        if (res.success) {
          setIsLoading(false);
          setShowAuthModal(false);
          if (onLoginSuccess) onLoginSuccess();
          else navigate('/');
        } else {
          setError(res.error || 'Invalid credentials');
          setIsLoading(false);
        }
      } else {
        if (!email.trim() || !password.trim()) {
          setError('Please provide email and password');
          setIsLoading(false);
          return;
        }
        register(name, email, password, role);
        setIsLoading(false);
        setShowAuthModal(false);
        if (onLoginSuccess) onLoginSuccess();
        else navigate('/');
      }
    }, 400);
  };

  const fillTestCredentials = () => {
    setEmail(DEMO_USER.email);
    setPassword(DEMO_USER.password);
    setError('');
  };

  return (
    <div className="landing-page-root">
      {/* Top Navigation */}
      <header className="landing-navbar">
        <div className="landing-nav-inner">
          <div className="landing-brand" onClick={() => navigate('/landing')}>
            <div className="landing-logo-box">
              <Scale size={24} color="#FFFFFF" />
            </div>
            <div>
              <div className="landing-brand-title">
                Vidhi<span>AI</span>
                <span className="landing-badge-desktop">VidhiMitra Pro</span>
              </div>
              <div className="landing-brand-subtitle">Legal Intelligence & UPSC Workspace</div>
            </div>
          </div>

          <nav className="landing-nav-links">
            <a href="#features">Features</a>
            <a href="#constitution">Constitution</a>
            <a href="#upsc">UPSC Prep</a>
            <a href="#nyayabot">NyayaBot AI</a>
          </nav>

          <div className="landing-nav-actions">
            <button
              className="landing-theme-toggle"
              onClick={toggleTheme}
              title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            <button
              className="landing-btn-outline"
              onClick={() => {
                setAuthMode('login');
                setShowAuthModal(true);
              }}
            >
              <LogIn size={16} /> Sign In
            </button>

            <button
              className="landing-btn-primary"
              onClick={handleTestLogin}
            >
              ⚡ Quick Test Login
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="landing-hero-section">
        <div className="landing-hero-glow"></div>
        <div className="landing-hero-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="landing-hero-content"
          >
            <div className="landing-pill">
              <span className="pill-dot"></span>
              <span>Updated for BNS 2023 & Full Indian Constitution</span>
              <span className="pill-tag">2026 Edition</span>
            </div>

            <h1 className="landing-hero-heading">
              Master Indian Law & Ace <br />
              <span className="text-gradient-tricolor">UPSC Civil Services</span> with AI
            </h1>

            <p className="landing-hero-desc">
              The premier desktop workspace for Law Students, UPSC Aspirants, Legal Practitioners, and Citizens.
              Explore 395+ Constitutional Articles, 511+ BNS Sections, Landmark SC Judgments, and your personal AI Counsel.
            </p>

            {/* Test Login Callout Box */}
            <motion.div
              className="landing-demo-banner"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <div className="demo-banner-left">
                <div className="demo-badge-header">
                  <Key size={16} color="var(--saffron)" />
                  <span>PRE-CONFIGURED TEST CREDENTIALS</span>
                </div>
                <div className="demo-credentials-row">
                  <div className="demo-cred-item">
                    <span className="cred-label">Email:</span>
                    <span className="cred-val">{DEMO_USER.email}</span>
                  </div>
                  <div className="demo-cred-divider">•</div>
                  <div className="demo-cred-item">
                    <span className="cred-label">Password:</span>
                    <span className="cred-val">{DEMO_USER.password}</span>
                  </div>
                  <div className="demo-cred-divider">•</div>
                  <div className="demo-cred-item">
                    <span className="cred-label">Role:</span>
                    <span className="cred-val">{DEMO_USER.role}</span>
                  </div>
                </div>
              </div>

              <div className="demo-banner-right">
                <button
                  className="landing-btn-hero-instant"
                  onClick={handleTestLogin}
                  disabled={isLoading}
                >
                  <Sparkles size={18} />
                  <span>{isLoading ? 'Entering Workspace...' : '1-Click Test Login'}</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>

            {/* Alternative Action Buttons */}
            <div className="landing-hero-buttons">
              <button
                className="landing-btn-secondary"
                onClick={() => {
                  setAuthMode('login');
                  setShowAuthModal(true);
                }}
              >
                <LogIn size={18} />
                <span>Custom Email Sign In</span>
              </button>
              <button
                className="landing-btn-subtle"
                onClick={handleTestLogin}
              >
                <span>Continue as Guest Aspirant</span>
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Fast Stats Row */}
            <div className="landing-stats-grid">
              <div className="landing-stat-card">
                <div className="stat-number">395+</div>
                <div className="stat-label">Constitution Articles</div>
                <div className="stat-sub">Parts I to XXII + 12 Schedules</div>
              </div>
              <div className="landing-stat-card">
                <div className="stat-number">511+</div>
                <div className="stat-label">BNS & Criminal Laws</div>
                <div className="stat-sub">Side-by-side IPC Cross Reference</div>
              </div>
              <div className="landing-stat-card">
                <div className="stat-number">106+</div>
                <div className="stat-label">Constitutional Amendments</div>
                <div className="stat-sub">1951 to Present Day</div>
              </div>
              <div className="landing-stat-card">
                <div className="stat-number">24/7</div>
                <div className="stat-label">NyayaBot AI Tutor</div>
                <div className="stat-sub">Instant legal research & queries</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section id="features" className="landing-features-section">
        <div className="landing-section-header">
          <div className="landing-section-pill">FULL CAPABILITIES</div>
          <h2 className="landing-section-title">Engineered for Legal & Exam Excellence</h2>
          <p className="landing-section-sub">
            Built from the ground up for desktop productivity with rich research panels, side-by-side readings, and smart testing.
          </p>
        </div>

        <div className="landing-grid-container">
          <div className="feature-card">
            <div className="feature-icon-box saffron">
              <Landmark size={28} />
            </div>
            <h3>Complete Indian Constitution</h3>
            <p>
              Navigate all 22 Parts, 395 Articles, Writs (Habeas Corpus, Mandamus, Quo Warranto), and Constitutional Bodies with simplified language and original legal texts.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-box green">
              <Scale size={28} />
            </div>
            <h3>BNS, BNSS & BSA 2023 Codes</h3>
            <p>
              Understand the modern Bharatiya Nyaya Sanhita laws with clear explanations, punishments, bailable/non-bailable statuses, and old IPC section mapping.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-box navy">
              <Award size={28} />
            </div>
            <h3>UPSC GS-II Polity Command Center</h3>
            <p>
              Dedicated flashcards, landmark Supreme Court cases (Kesavananda Bharati, Maneka Gandhi, Puttaswamy), mains essay topics, and interview questions.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-box purple">
              <Bot size={28} />
            </div>
            <h3>NyayaBot AI Legal Assistant</h3>
            <p>
              Voice-enabled intelligent tutor capable of breaking down complex statutory sections, drafting arguments, and answering UPSC civil service queries instantly.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-box amber">
              <FileText size={28} />
            </div>
            <h3>Courtroom Case Simulation</h3>
            <p>
              Simulate realistic legal battles. Step into the shoes of the prosecution or defense, review facts, present laws, and receive judicial verdicts.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-box cyan">
              <CheckCircle2 size={28} />
            </div>
            <h3>Gamified Progress & Streaks</h3>
            <p>
              Daily streaks, study rings, chapter quizzes with explanations, bookmarks for high-yield laws, and achievement badges to keep your preparation on track.
            </p>
          </div>
        </div>
      </section>

      {/* UPSC Mode Spotlight */}
      <section id="upsc" className="landing-spotlight-section">
        <div className="landing-spotlight-card">
          <div className="spotlight-badge">🎓 UPSC CIVIL SERVICES READY</div>
          <h2>Prepare for GS Paper II & Judicial Services</h2>
          <p>
            Study with structured materials designed specifically for civil service and judicial aspirants.
            Access analytical breakdowns of landmark judgments, doctrine of basic structure, judicial review, and parliamentary privileges.
          </p>
          <div className="spotlight-features">
            <div className="spotlight-item">
              <CheckCircle2 size={20} color="var(--green)" />
              <span>Full Landmark Judgments Library with key ratios</span>
            </div>
            <div className="spotlight-item">
              <CheckCircle2 size={20} color="var(--green)" />
              <span>Constitutional Amendments 1st to 106th with UPSC significance</span>
            </div>
            <div className="spotlight-item">
              <CheckCircle2 size={20} color="var(--green)" />
              <span>Daily Prelims questions & Mains case study analysis</span>
            </div>
          </div>
          <div className="spotlight-action">
            <button className="landing-btn-primary" onClick={handleTestLogin}>
              Launch UPSC Study Mode <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="landing-brand-title">
              ⚖️ Vidhi<span>AI</span>
            </div>
            <p>VidhiMitra — Educational intelligence platform for Indian Law, Constitution of India, and UPSC Civil Services examination.</p>
          </div>
          <div className="footer-disclaimer">
            📋 <strong>Disclaimer:</strong> This application is intended strictly for educational, academic, and competitive exam preparation purposes. It does not constitute formal legal counsel.
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 VidhiAI (VidhiMitra). Dedicated to legal literacy and democratic enlightenment across India.</span>
        </div>
      </footer>

      {/* Auth Modal */}
      <AnimatePresence>
        {showAuthModal && (
          <div className="auth-modal-overlay" onClick={() => setShowAuthModal(false)}>
            <motion.div
              className="auth-modal-card"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
            >
              <div className="auth-modal-header">
                <div className="auth-modal-logo">
                  <Scale size={24} color="#FFFFFF" />
                </div>
                <div>
                  <h3 className="auth-modal-title">
                    {authMode === 'login' ? 'Welcome Back' : 'Create Free Account'}
                  </h3>
                  <p className="auth-modal-sub">
                    {authMode === 'login' ? 'Sign in to access your legal dashboard' : 'Join thousands of law students & UPSC aspirants'}
                  </p>
                </div>
              </div>

              {/* Quick Test Login Bar inside Modal */}
              <div className="modal-test-cred-bar">
                <div className="test-cred-text">
                  <span>⚡ Want immediate access?</span>
                  <small>Use pre-configured demo account</small>
                </div>
                <div className="test-cred-actions">
                  <button type="button" className="btn-auto-fill" onClick={fillTestCredentials}>
                    Fill Form
                  </button>
                  <button type="button" className="btn-instant-enter" onClick={handleTestLogin}>
                    1-Click Enter
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="auth-tabs">
                <button
                  className={`auth-tab ${authMode === 'login' ? 'active' : ''}`}
                  onClick={() => { setAuthMode('login'); setError(''); }}
                >
                  Sign In
                </button>
                <button
                  className={`auth-tab ${authMode === 'register' ? 'active' : ''}`}
                  onClick={() => { setAuthMode('register'); setError(''); }}
                >
                  New Account
                </button>
              </div>

              {error && <div className="auth-error-msg">{error}</div>}

              <form onSubmit={handleFormSubmit} className="auth-form">
                {authMode === 'register' && (
                  <div className="form-group">
                    <label>Full Name</label>
                    <div className="input-with-icon">
                      <User size={18} />
                      <input
                        type="text"
                        placeholder="e.g. Adv. Akash Sharma"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="form-group">
                  <label>Email Address</label>
                  <div className="input-with-icon">
                    <Mail size={18} />
                    <input
                      type="email"
                      placeholder="e.g. demo@vidhiai.in"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <div className="input-with-icon">
                    <Lock size={18} />
                    <input
                      type="password"
                      placeholder="e.g. vidhi2026"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {authMode === 'register' && (
                  <div className="form-group">
                    <label>Primary Focus</label>
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                      <option value="UPSC CSE Aspirant">UPSC CSE Aspirant</option>
                      <option value="Judiciary Services (PCS-J)">Judiciary Services (PCS-J)</option>
                      <option value="LL.B / Law Student">LL.B / Law Student</option>
                      <option value="Practicing Advocate">Practicing Advocate</option>
                      <option value="Informed Citizen">Informed Citizen</option>
                    </select>
                  </div>
                )}

                <button
                  type="submit"
                  className="auth-submit-btn"
                  disabled={isLoading}
                >
                  {isLoading ? 'Processing...' : (authMode === 'login' ? 'Sign In to Workspace' : 'Create Account')}
                </button>
              </form>

              <div className="auth-modal-footer">
                <button
                  type="button"
                  className="auth-cancel-btn"
                  onClick={() => setShowAuthModal(false)}
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

