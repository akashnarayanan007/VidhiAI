import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search, ChevronRight, Volume2, BookOpen, ArrowRight,
  Sparkles, Award, Scale, Landmark, Flame, HelpCircle,
  FileText, ExternalLink, ShieldAlert, CheckCircle2, TrendingUp,
  BrainCircuit, Compass
} from 'lucide-react';
import { motion } from 'framer-motion';
import {
  categories, getAllLaws, getRandomLaw, getTotalLawCount,
  searchLaws, getCategoryStats
} from '../services/lawService';
import {
  getStreak, getStudyStats, getReadLaws, markLawAsRead
} from '../services/progressService';
import { getCurrentUser, DEMO_USER } from '../services/authService';
import { useAppContext } from '../App';

function ProgressRing({ progress, size = 84, strokeWidth = 7 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="progress-ring-container" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke="rgba(255, 255, 255, 0.2)" strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke="url(#dashGradient)" strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        <defs>
          <linearGradient id="dashGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#86EFAC" />
          </linearGradient>
        </defs>
      </svg>
      <div className="progress-ring-label">
        <span className="progress-ring-value" style={{ color: '#FFFFFF' }}>{Math.round(progress)}%</span>
        <span className="progress-ring-text" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>Coverage</span>
      </div>
    </div>
  );
}

export default function HomeScreen() {
  const { refreshKey } = useAppContext();
  const navigate = useNavigate();
  const [todayLaw, setTodayLaw] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);

  const currentUser = getCurrentUser() || DEMO_USER;
  const stats = getStudyStats();
  const totalLaws = getTotalLawCount();
  const progress = totalLaws > 0 ? (stats.lawsRead / totalLaws) * 100 : 0;
  const streak = getStreak();
  const categoryStats = getCategoryStats();

  useEffect(() => {
    const stored = sessionStorage.getItem('todayLaw');
    const storedDate = sessionStorage.getItem('todayLawDate');
    const today = new Date().toDateString();

    if (stored && storedDate === today) {
      setTodayLaw(JSON.parse(stored));
    } else {
      const readLaws = getReadLaws();
      const law = getRandomLaw(readLaws);
      setTodayLaw(law);
      sessionStorage.setItem('todayLaw', JSON.stringify(law));
      sessionStorage.setItem('todayLawDate', today);
    }
  }, [refreshKey]);

  useEffect(() => {
    if (searchQuery.trim()) {
      const results = searchLaws(searchQuery);
      setSearchResults(results.slice(0, 8));
      setShowSearch(true);
    } else {
      setSearchResults([]);
      setShowSearch(false);
    }
  }, [searchQuery]);

  const displayedCategories = showAllCategories ? categories : categories.slice(0, 12);

  return (
    <div className="desktop-dashboard-canvas">
      {/* Top Hero Banner — Desktop Wide Tricolor Gradient */}
      <motion.div
        className="dashboard-hero-banner"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="banner-left-content">
          <div className="banner-pill-badge">
            <span className="badge-chakra">⚖️</span>
            <span>Indian Law & UPSC Command Center</span>
            <span className="badge-live-tag">Updated 2026</span>
          </div>

          <h1 className="banner-greeting">
            Namaste, <span className="banner-user-name">{currentUser.name.split(' ')[0]}</span>!
          </h1>
          <p className="banner-tagline">
            Continue your mastery of the Indian Constitution, Bharatiya Nyaya Sanhita (BNS), and GS-II Landmark Precedents.
          </p>

          <div className="banner-cta-group">
            <Link to="/upsc" className="banner-btn-primary">
              <Award size={16} /> UPSC Mode Flashcards
            </Link>
            <Link to="/constitution" className="banner-btn-secondary">
              <Landmark size={16} /> Explore Constitution
            </Link>
            <Link to="/quiz" className="banner-btn-glass">
              <HelpCircle size={16} /> Daily Quiz
            </Link>
          </div>
        </div>

        <div className="banner-right-metrics">
          <div className="banner-metric-box streak-metric">
            <div className="metric-icon-wrap">
              <Flame size={24} color="#FF9933" />
            </div>
            <div className="metric-details">
              <div className="metric-big-num">{streak}</div>
              <div className="metric-sub-lbl">Day Learning Streak</div>
            </div>
          </div>

          <div className="banner-metric-box progress-metric">
            <ProgressRing progress={progress} size={80} strokeWidth={6} />
            <div className="metric-details">
              <div className="metric-sub-lbl">Library Studied</div>
              <div className="metric-bold-sub">{stats.lawsRead} of {totalLaws} Laws</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Multi-Column Content Area */}
      <div className="dashboard-grid-layout">
        {/* Left / Main Column (68%) */}
        <div className="dashboard-main-col">
          {/* Today's Law Spotlight Card */}
          {todayLaw && (
            <motion.section
              className="dashboard-section"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="section-title-bar">
                <div className="section-title-left">
                  <div className="section-icon-dot">📖</div>
                  <h2 className="section-title-text">Today's Featured Law</h2>
                </div>
                <span className="section-tag-pill">Daily Recommendation</span>
              </div>

              <div className="spotlight-card-desktop">
                <div className="spotlight-header-row">
                  <div className="spotlight-badges">
                    <span className={`badge badge-${(todayLaw.category || 'law').toLowerCase()}`}>
                      {todayLaw.category}
                    </span>
                    <span className={`badge badge-${(todayLaw.difficulty || 'beginner').toLowerCase()}`}>
                      {todayLaw.difficulty}
                    </span>
                    {todayLaw.bailable !== undefined && (
                      <span className={`badge ${todayLaw.bailable ? 'badge-success' : 'badge-danger'}`}>
                        {todayLaw.bailable ? 'Bailable' : 'Non-Bailable'}
                      </span>
                    )}
                  </div>
                  <div className="spotlight-meta-ref">
                    {todayLaw.sectionNumber} — {todayLaw.shortName}
                  </div>
                </div>

                <h3 className="spotlight-title">{todayLaw.title}</h3>

                <p className="spotlight-explanation">
                  {todayLaw.simplifiedExplanation}
                </p>

                {todayLaw.keyTakeaway && (
                  <div className="spotlight-takeaway-box">
                    <strong>💡 Legal Key Takeaway:</strong> {todayLaw.keyTakeaway}
                  </div>
                )}

                <div className="spotlight-actions-bar">
                  <Link to={`/law/${todayLaw.id}`} className="btn-spotlight-primary">
                    <BookOpen size={16} /> Read Full Analysis
                  </Link>
                  <Link to={`/quiz/${todayLaw.id}`} className="btn-spotlight-outline">
                    <HelpCircle size={16} /> Test Yourself
                  </Link>
                  <Link to={`/scenario/${todayLaw.id}`} className="btn-spotlight-outline">
                    <Scale size={16} /> Courtroom Case
                  </Link>
                </div>
              </div>
            </motion.section>
          )}

          {/* Legal Categories / Acts Library */}
          <motion.section
            className="dashboard-section"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="section-title-bar">
              <div className="section-title-left">
                <div className="section-icon-dot">🏛️</div>
                <h2 className="section-title-text">Statutory Domains & Acts</h2>
              </div>
              <button
                className="section-view-all-btn"
                onClick={() => setShowAllCategories((v) => !v)}
              >
                {showAllCategories ? 'Show Less' : `View All (${categories.length})`}
                <ArrowRight
                  size={14}
                  style={{
                    transform: showAllCategories ? 'rotate(90deg)' : 'none',
                    transition: 'transform 0.2s',
                  }}
                />
              </button>
            </div>

            <div className="category-desktop-grid">
              {displayedCategories.map((cat, i) => (
                <motion.div
                  key={cat.id}
                  whileHover={{ y: -3, transition: { duration: 0.15 } }}
                >
                  <Link to={`/category/${cat.id}`} className="category-desktop-card">
                    <div
                      className="category-card-icon"
                      style={{ background: `${cat.color}15`, color: cat.color }}
                    >
                      {cat.icon}
                    </div>
                    <div className="category-card-body">
                      <h4 className="category-card-title">{cat.name}</h4>
                      <div className="category-card-count">
                        {categoryStats[cat.id]?.total || cat.totalSections || 0} sections & articles
                      </div>
                    </div>
                    <ChevronRight className="category-card-arrow" size={16} />
                    <div className="category-color-strip" style={{ background: cat.color }} />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>

        {/* Right / Side Column (32%) */}
        <div className="dashboard-side-col">
          {/* Quick Study Performance Matrix */}
          <motion.section
            className="side-widget-card"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
          >
            <div className="widget-header">
              <TrendingUp size={18} color="var(--primary)" />
              <h3 className="widget-title">Study Performance</h3>
            </div>

            <div className="side-stats-grid">
              <div className="side-stat-item">
                <div className="stat-num saffron">{stats.lawsRead}</div>
                <div className="stat-label">Laws Studied</div>
              </div>
              <div className="side-stat-item">
                <div className="stat-num green">{stats.quizzesTaken}</div>
                <div className="stat-label">Quizzes Completed</div>
              </div>
              <div className="side-stat-item">
                <div className="stat-num navy">{stats.lawsBookmarked}</div>
                <div className="stat-label">High-Yield Saved</div>
              </div>
              <div className="side-stat-item">
                <div className="stat-num purple">{stats.totalStudyTime ? Math.round(stats.totalStudyTime / 60) : 12}m</div>
                <div className="stat-label">Study Duration</div>
              </div>
            </div>
          </motion.section>

          {/* UPSC GS-II Dedicated Launcher */}
          <motion.section
            className="side-widget-card upsc-special-card"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
          >
            <div className="widget-header">
              <Award size={18} color="#D97706" />
              <h3 className="widget-title">UPSC GS-II Polity Command</h3>
            </div>
            <p className="upsc-widget-desc">
              High-frequency constitutional provisions, landmark judgments, and interview practice questions.
            </p>

            <div className="upsc-widget-links">
              <Link to="/upsc/cases" className="upsc-nav-link">
                <span>🏛️ Landmark SC Judgments</span>
                <ChevronRight size={14} />
              </Link>
              <Link to="/upsc/amendments" className="upsc-nav-link">
                <span>📜 1st to 106th Amendments</span>
                <ChevronRight size={14} />
              </Link>
              <Link to="/upsc/interview" className="upsc-nav-link">
                <span>🎤 Judicial & UPSC Interview Q&A</span>
                <ChevronRight size={14} />
              </Link>
              <Link to="/upsc/daily" className="upsc-nav-link">
                <span>📅 Daily UPSC Question & Mains Drill</span>
                <ChevronRight size={14} />
              </Link>
            </div>
          </motion.section>

          {/* Courtroom Simulation Banner */}
          <motion.section
            className="side-widget-card court-sim-widget"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
          >
            <div className="court-sim-icon-box">⚖️</div>
            <h4 className="court-sim-title">Courtroom Scenario Simulator</h4>
            <p className="court-sim-desc">
              Roleplay real-world cases, test your arguments under the Bharatiya Nyaya Sanhita, and evaluate judicial verdicts.
            </p>
            <Link to="/scenario" className="court-sim-btn">
              Enter Courtroom Simulator <ArrowRight size={15} />
            </Link>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
