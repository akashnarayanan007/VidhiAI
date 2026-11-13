import { NavLink, useNavigate } from 'react-router-dom';
import {
  Home, Landmark, HelpCircle, Scale, Bookmark, Settings,
  LogOut, Sun, Moon, Flame, Shield, Award, Sparkles, BookOpen,
  ChevronRight, Compass, User
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppContext } from '../App';
import { logout } from '../services/authService';
import { getStreak, getStudyStats } from '../services/progressService';

export default function DesktopSidebar({ currentUser, onLogout }) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useAppContext();
  const streak = getStreak();
  const stats = getStudyStats();

  const handleSignOut = () => {
    logout();
    if (onLogout) {
      onLogout();
    } else {
      navigate('/landing');
    }
  };

  const navItems = [
    { section: 'LEARNING HUB' },
    { to: '/', label: 'Dashboard', icon: Home, end: true },
    { to: '/constitution', label: 'Constitution of India', icon: Landmark },
    { to: '/upsc', label: 'UPSC CSE Mode', icon: Award, badge: 'High Yield' },

    { section: 'PRACTICE & SIMULATION' },
    { to: '/quiz', label: 'Legal Quizzes', icon: HelpCircle },
    { to: '/scenario', label: 'Courtroom Simulation', icon: Scale },

    { section: 'MY WORKSPACE' },
    { to: '/bookmarks', label: 'Saved & Bookmarks', icon: Bookmark, count: stats.lawsBookmarked },
    { to: '/settings', label: 'Preferences & DB', icon: Settings },
  ];

  return (
    <aside className="desktop-sidebar">
      {/* Brand Header */}
      <div className="sidebar-brand-wrapper" onClick={() => navigate('/')}>
        <div className="sidebar-logo">
          <Scale size={24} color="#FFFFFF" />
        </div>
        <div className="sidebar-brand-text">
          <div className="sidebar-title">
            Vidhi<span>AI</span>
          </div>
          <div className="sidebar-subtitle">VidhiMitra Workspace</div>
        </div>
      </div>

      {/* Nav List */}
      <div className="sidebar-scrollable">
        <nav className="sidebar-nav">
          {navItems.map((item, idx) => {
            if (item.section) {
              return (
                <div key={idx} className="sidebar-section-header">
                  {item.section}
                </div>
              );
            }

            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `sidebar-nav-item ${isActive ? 'active' : ''}`
                }
              >
                <div className="sidebar-item-left">
                  <Icon className="sidebar-nav-icon" size={19} />
                  <span className="sidebar-nav-text">{item.label}</span>
                </div>
                {item.badge && (
                  <span className="sidebar-nav-badge">{item.badge}</span>
                )}
                {typeof item.count === 'number' && item.count > 0 && (
                  <span className="sidebar-nav-counter">{item.count}</span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Sidebar Study Tracker Card */}
        <div className="sidebar-tracker-card">
          <div className="tracker-header">
            <div className="tracker-flame-box">
              <Flame size={18} color="var(--saffron)" />
            </div>
            <div>
              <div className="tracker-streak-val">{streak} Day Streak</div>
              <div className="tracker-sub">Keep studying daily</div>
            </div>
          </div>
          <div className="tracker-stats-mini">
            <div className="tracker-mini-col">
              <span className="mini-num">{stats.lawsRead}</span>
              <span className="mini-lbl">Laws Read</span>
            </div>
            <div className="tracker-mini-col">
              <span className="mini-num">{stats.quizzesTaken}</span>
              <span className="mini-lbl">Quizzes</span>
            </div>
          </div>
        </div>
      </div>

      {/* User Footer Profile */}
      <div className="sidebar-user-footer">
        <div className="sidebar-user-info" onClick={() => navigate('/settings')}>
          <div className="sidebar-user-avatar">
            {currentUser?.initials || 'AS'}
          </div>
          <div className="sidebar-user-details">
            <div className="sidebar-user-name">
              {currentUser?.name || 'Adv. Akash Sharma'}
            </div>
            <div className="sidebar-user-role">
              {currentUser?.role || 'UPSC Aspirant'}
            </div>
          </div>
        </div>

        <div className="sidebar-footer-actions">
          <button
            className="sidebar-action-btn"
            onClick={toggleTheme}
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          >
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          </button>
          <button
            className="sidebar-action-btn logout-btn"
            onClick={handleSignOut}
            title="Log Out to Landing Page"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}

