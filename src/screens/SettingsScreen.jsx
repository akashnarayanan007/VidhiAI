import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Moon, Sun, Volume2, Key, Database, Trash2, Info, Shield, User, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { getSettings, updateSettings, getStudyStats, getAllBadges, resetProgress } from '../services/progressService';
import { getCurrentUser, logout, DEMO_USER } from '../services/authService';
import { useAppContext } from '../App';

export default function SettingsScreen() {
  const navigate = useNavigate();
  const { theme, toggleTheme, handleLogout } = useAppContext();
  const [settings, setSettings] = useState(getSettings());
  const [apiKey, setApiKey] = useState(settings.apiKey || '');
  const [showApiKey, setShowApiKey] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [seedStatus, setSeedStatus] = useState('');

  const currentUser = getCurrentUser() || DEMO_USER;
  const stats = getStudyStats();
  const badges = getAllBadges();

  const handleUserLogout = () => {
    if (handleLogout) {
      handleLogout();
    } else {
      logout();
      navigate('/landing');
    }
  };

  const handleSpeedChange = (speed) => {
    const newSettings = { ...settings, voiceSpeed: speed };
    setSettings(newSettings);
    updateSettings(newSettings);
  };

  const handleApiKeySave = () => {
    updateSettings({ apiKey });
    setSettings({ ...settings, apiKey });
  };

  const handleReset = () => {
    resetProgress();
    setShowResetConfirm(false);
    window.location.reload();
  };

  const handleSeed = async () => {
    setSeedStatus('Seeding database...');
    try {
      const res = await fetch('/api/seed', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setSeedStatus(`✅ ${data.count} laws seeded successfully! (${data.total} total in database)`);
        setTimeout(() => setSeedStatus(''), 4000);
      } else {
        setSeedStatus(`❌ Error: ${data.error}`);
      }
    } catch {
      setSeedStatus('❌ Could not connect to server. Is the backend running?');
    }
  };

  return (
    <div className="screen">
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
        <h1 style={{ fontSize: 'var(--text-xl)', fontWeight: 700 }}>⚙️ Settings</h1>
      </div>

      {/* Account Profile Card */}
      <div className="card" style={{ marginBottom: 'var(--space-6)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          <div style={{
            width: 52,
            height: 52,
            borderRadius: '9999px',
            background: 'linear-gradient(135deg, var(--navy) 0%, #3B82F6 100%)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
            fontWeight: 800,
            boxShadow: '0 4px 12px rgba(0, 0, 128, 0.25)'
          }}>
            {currentUser?.initials || 'AS'}
          </div>
          <div>
            <div style={{ fontSize: 'var(--text-lg)', fontWeight: 800, color: 'var(--text-primary)' }}>
              {currentUser?.name || 'Adv. Akash Sharma'}
            </div>
            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
              {currentUser?.email || 'demo@vidhiai.in'}
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--saffron)', fontWeight: 700, marginTop: 2 }}>
              🎓 {currentUser?.role || 'UPSC Aspirant'} • Joined {currentUser?.joinedDate || '2024'}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <button
            className="btn btn-outline btn-sm"
            onClick={() => navigate('/landing')}
          >
            Landing Page
          </button>
          <button
            className="btn btn-sm"
            style={{ background: 'var(--error-bg)', color: 'var(--error)', border: '1px solid var(--error)' }}
            onClick={handleUserLogout}
          >
            <LogOut size={14} style={{ marginRight: 6 }} /> Sign Out
          </button>
        </div>
      </div>

      {/* Study Stats Summary */}
      <div className="card" style={{ marginBottom: 'var(--space-6)', background: 'linear-gradient(135deg, var(--accent-subtle) 0%, var(--primary-subtle) 100%)' }}>
        <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 700, marginBottom: 'var(--space-3)' }}>📊 Your Stats</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
          <div>
            <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--saffron)' }}>{stats.lawsRead}</div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>Laws Read</div>
          </div>
          <div>
            <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--green)' }}>{stats.quizzesTaken}</div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>Quizzes Taken</div>
          </div>
          <div>
            <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--accent)' }}>{stats.averageScore}%</div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>Avg Quiz Score</div>
          </div>
          <div>
            <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--error)' }}>🔥 {stats.streak}</div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>Day Streak</div>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="setting-group">
        <div className="setting-group-title">🏅 Badges</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-2)' }}>
          {badges.map(badge => (
            <motion.div
              key={badge.id}
              className="card"
              style={{
                padding: 'var(--space-3)',
                textAlign: 'center',
                opacity: badge.earned ? 1 : 0.4,
                filter: badge.earned ? 'none' : 'grayscale(1)',
              }}
              whileHover={{ scale: 1.03 }}
            >
              <div style={{ fontSize: '1.5rem', marginBottom: 4 }}>{badge.icon}</div>
              <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--text-primary)' }}>{badge.name}</div>
              <div style={{ fontSize: '0.625rem', color: 'var(--text-tertiary)' }}>{badge.description}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Appearance */}
      <div className="setting-group">
        <div className="setting-group-title">Appearance</div>
        <div className="card">
          <div className="setting-item">
            <div className="setting-label">
              <span className="setting-label-text">
                {theme === 'dark' ? <Moon size={16} style={{ display: 'inline', marginRight: 8 }} /> : <Sun size={16} style={{ display: 'inline', marginRight: 8 }} />}
                Dark Mode
              </span>
              <span className="setting-label-desc">Switch between light and dark theme</span>
            </div>
            <button className={`toggle ${theme === 'dark' ? 'active' : ''}`} onClick={toggleTheme} />
          </div>
        </div>
      </div>

      {/* Voice Settings */}
      <div className="setting-group">
        <div className="setting-group-title">🔊 Voice Settings</div>
        <div className="card">
          <div className="setting-item">
            <div className="setting-label">
              <span className="setting-label-text"><Volume2 size={16} style={{ display: 'inline', marginRight: 8 }} /> Reading Speed</span>
              <span className="setting-label-desc">Current: {settings.voiceSpeed}x</span>
            </div>
          </div>
          <div className="filter-chips" style={{ padding: 'var(--space-2) 0' }}>
            {[0.5, 0.75, 1, 1.25, 1.5, 2].map(speed => (
              <button
                key={speed}
                className={`filter-chip ${settings.voiceSpeed === speed ? 'active' : ''}`}
                onClick={() => handleSpeedChange(speed)}
              >
                {speed}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* API Key */}
      <div className="setting-group">
        <div className="setting-group-title">🤖 AI Features (Claude API)</div>
        <div className="card">
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginBottom: 'var(--space-3)', lineHeight: 'var(--leading-relaxed)' }}>
            Enter your Anthropic API key to enable AI-powered quiz generation, courtroom scenarios, and loophole analysis. Your key is stored locally and never sent to our servers.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <input
              type={showApiKey ? 'text' : 'password'}
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
              placeholder="sk-ant-api..."
              style={{
                flex: 1, padding: 'var(--space-2) var(--space-3)', borderRadius: 'var(--radius-md)',
                border: '1.5px solid var(--border-default)', background: 'var(--bg-card)', color: 'var(--text-primary)',
                fontSize: 'var(--text-sm)', outline: 'none', fontFamily: 'monospace',
              }}
            />
            <button className="btn btn-sm btn-ghost" onClick={() => setShowApiKey(!showApiKey)}>
              {showApiKey ? '🙈' : '👁️'}
            </button>
          </div>
          <button className="btn btn-primary btn-sm btn-block" style={{ marginTop: 'var(--space-2)' }} onClick={handleApiKeySave}>
            <Key size={14} /> Save API Key
          </button>
          {settings.apiKey && (
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--green)', marginTop: 'var(--space-2)', fontWeight: 600 }}>
              ✓ API key configured — AI features are enabled
            </div>
          )}
        </div>
      </div>

      {/* Seed Database */}
      <div className="setting-group">
        <div className="setting-group-title" style={{ color: 'var(--accent)' }}>🗄️ Database</div>
        <div className="card" style={{ borderColor: 'rgba(59, 130, 246, 0.2)' }}>
          <div className="setting-item" style={{ borderBottom: 'none' }}>
            <div className="setting-label">
              <span className="setting-label-text"><Database size={16} style={{ display: 'inline', marginRight: 8, color: 'var(--accent)' }} /> Seed Law Database</span>
              <span className="setting-label-desc">Populate the database with comprehensive law sections across all categories</span>
            </div>
            <button className="btn btn-sm" style={{ color: 'var(--accent)', border: '1px solid var(--accent)' }} onClick={handleSeed}>
              Seed
            </button>
          </div>
          {seedStatus && (
            <div style={{
              fontSize: 'var(--text-xs)', padding: 'var(--space-2) var(--space-3)',
              color: seedStatus.includes('error') ? 'var(--error)' : seedStatus.includes('already') ? 'var(--text-tertiary)' : 'var(--green)',
              fontWeight: 600,
            }}>
              {seedStatus}
            </div>
          )}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="setting-group">
        <div className="setting-group-title" style={{ color: 'var(--error)' }}>⚠️ Danger Zone</div>
        <div className="card" style={{ borderColor: 'rgba(220, 38, 38, 0.2)' }}>
          <div className="setting-item" style={{ borderBottom: 'none' }}>
            <div className="setting-label">
              <span className="setting-label-text"><Trash2 size={16} style={{ display: 'inline', marginRight: 8, color: 'var(--error)' }} /> Reset All Progress</span>
              <span className="setting-label-desc">Clear all read history, bookmarks, quiz scores, and streak</span>
            </div>
            <button className="btn btn-sm" style={{ color: 'var(--error)', border: '1px solid var(--error)' }} onClick={() => setShowResetConfirm(true)}>
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Reset Confirmation */}
      {showResetConfirm && (
        <div style={{
          position: 'fixed', inset: 0, background: 'var(--bg-overlay)', zIndex: 'var(--z-modal)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-4)',
        }}>
          <motion.div
            className="card"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{ maxWidth: 340, textAlign: 'center', padding: 'var(--space-6)' }}
          >
            <div style={{ fontSize: '2rem', marginBottom: 'var(--space-3)' }}>⚠️</div>
            <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: 'var(--space-2)' }}>Reset All Progress?</h3>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>
              This will permanently delete all your reading progress, bookmarks, quiz scores, and streak data. This cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
              <button className="btn btn-outline btn-lg" style={{ flex: 1 }} onClick={() => setShowResetConfirm(false)}>Cancel</button>
              <button className="btn btn-lg" style={{ flex: 1, background: 'var(--error)', color: 'white' }} onClick={handleReset}>Reset</button>
            </div>
          </motion.div>
        </div>
      )}

      {/* About */}
      <div className="card" style={{ marginTop: 'var(--space-4)' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: 'var(--space-2)' }}>⚖️</div>
          <div style={{ fontSize: 'var(--text-lg)', fontWeight: 800, background: 'linear-gradient(135deg, var(--saffron), var(--green))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            VidhiAI (VidhiMitra)
          </div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: 4 }}>
            Legal Intelligence Companion • UPSC Command Center
          </div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: 'var(--space-2)' }}>
            Desktop Edition v2.4
          </div>
        </div>
      </div>

      <div className="disclaimer">
        📋 This app is for educational purposes only. It does not constitute legal advice. Consult a qualified lawyer for legal matters.
      </div>
    </div>
  );
}
