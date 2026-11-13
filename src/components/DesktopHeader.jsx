import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, Flame, Bot, BookOpen, Sun, Moon, LogOut,
  ChevronDown, ExternalLink, HelpCircle, User
} from 'lucide-react';
import { searchLaws } from '../services/lawService';
import { getStreak, getStudyStats } from '../services/progressService';
import { useAppContext } from '../App';
import { logout } from '../services/authService';

export default function DesktopHeader({ currentUser, onLogout }) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const streak = getStreak();
  const stats = getStudyStats();

  const handleSearchChange = (e) => {
    const q = e.target.value;
    setSearchQuery(q);
    if (q.trim().length >= 2) {
      const results = searchLaws(q);
      setSearchResults(results.slice(0, 7));
      setShowSearch(true);
    } else {
      setSearchResults([]);
      setShowSearch(false);
    }
  };

  const handleSelectLaw = (lawId) => {
    setSearchQuery('');
    setShowSearch(false);
    navigate(`/law/${lawId}`);
  };

  const handleSignOut = () => {
    logout();
    if (onLogout) onLogout();
    else navigate('/landing');
  };

  return (
    <header className="desktop-header">
      {/* Global Search Bar */}
      <div className="header-search-container">
        <div className="header-search-box">
          <Search className="header-search-icon" size={17} />
          <input
            type="text"
            className="header-search-input"
            placeholder="Search across Constitution, BNS 2023, IPC, Landmark Cases... (Press /)"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => searchQuery.trim().length >= 2 && setShowSearch(true)}
            onBlur={() => setTimeout(() => setShowSearch(false), 250)}
          />
          <span className="search-shortcut-pill">Ctrl + K</span>
        </div>

        {/* Live Search Autocomplete Results */}
        {showSearch && searchResults.length > 0 && (
          <div className="header-search-dropdown">
            <div className="search-dropdown-header">Matching Laws & Articles</div>
            {searchResults.map((law) => (
              <div
                key={law.id}
                className="search-dropdown-item"
                onMouseDown={() => handleSelectLaw(law.id)}
              >
                <div className="search-dropdown-item-top">
                  <span className={`badge badge-${(law.category || 'law').toLowerCase()}`}>
                    {law.shortName || law.category}
                  </span>
                  <span className="search-dropdown-sec">{law.sectionNumber}</span>
                </div>
                <div className="search-dropdown-title">{law.title}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Header Right Widgets */}
      <div className="header-right-widgets">
        {/* Streak Pill */}
        <div className="header-stat-pill" title={`${streak} Day Learning Streak`}>
          <Flame size={16} color="var(--saffron)" />
          <span>{streak} Days</span>
        </div>

        {/* AI Tutor Pill */}
        <div className="header-stat-pill ai-pill">
          <Bot size={15} color="#2563EB" />
          <span>NyayaBot AI Ready</span>
          <span className="pulse-green-dot"></span>
        </div>

        {/* Theme Toggle */}
        <button
          className="header-icon-btn"
          onClick={toggleTheme}
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        {/* User Dropdown Pill */}
        <div className="header-user-wrapper">
          <button
            className="header-user-btn"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <div className="header-user-avatar">
              {currentUser?.initials || 'AS'}
            </div>
            <span className="header-user-name">
              {currentUser?.name ? currentUser.name.split(' ')[0] : 'Akash'}
            </span>
            <ChevronDown size={14} />
          </button>

          {showUserMenu && (
            <div className="header-user-dropdown" onMouseLeave={() => setShowUserMenu(false)}>
              <div className="user-dropdown-info">
                <div className="user-dropdown-name">{currentUser?.name || 'Adv. Akash Sharma'}</div>
                <div className="user-dropdown-email">{currentUser?.email || 'demo@vidhiai.in'}</div>
              </div>
              <div className="dropdown-divider"></div>
              <button
                className="user-dropdown-item"
                onClick={() => { setShowUserMenu(false); navigate('/settings'); }}
              >
                Settings & API Keys
              </button>
              <button
                className="user-dropdown-item"
                onClick={() => { setShowUserMenu(false); navigate('/landing'); }}
              >
                <ExternalLink size={14} /> View Landing Page
              </button>
              <div className="dropdown-divider"></div>
              <button
                className="user-dropdown-item logout"
                onClick={handleSignOut}
              >
                <LogOut size={14} /> Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

