import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Bookmark, BookmarkCheck, Volume2, Pause, Square, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getLawById, getRelatedLaws } from '../services/lawService';
import { toggleBookmark, isBookmarked, markLawAsRead } from '../services/progressService';
import { speak, pause, resume, stop, isSpeaking, isPausedState, SPEED_OPTIONS } from '../services/speechService';
import { useAppContext } from '../App';

const TABS = [
  { id: 'definition', label: '📖 Definition' },
  { id: 'explanation', label: '⚖️ Explanation' },
  { id: 'example', label: '📋 Example' },
  { id: 'cases', label: '🏛️ Cases' },
  { id: 'loopholes', label: '🔓 Loopholes' },
];

export default function LawDetailScreen() {
  const { lawId } = useParams();
  const navigate = useNavigate();
  const { refresh } = useAppContext();
  const [activeTab, setActiveTab] = useState('definition');
  const [bookmarked, setBookmarked] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);
  const [voiceSpeed, setVoiceSpeed] = useState(1);
  const [showVoicePlayer, setShowVoicePlayer] = useState(false);
  const [voiceLang, setVoiceLang] = useState('en-IN');

  const law = getLawById(lawId);
  const relatedLaws = law ? getRelatedLaws(lawId) : [];

  useEffect(() => {
    if (law) {
      setBookmarked(isBookmarked(lawId));
      markLawAsRead(lawId);
    }
  }, [lawId, law]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSpeaking(isSpeaking());
      setPaused(isPausedState());
    }, 300);
    return () => {
      clearInterval(interval);
      stop();
    };
  }, []);

  if (!law) {
    return (
      <div className="screen">
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <div className="empty-state-title">Law not found</div>
          <Link to="/" className="btn btn-primary" style={{ marginTop: 'var(--space-4)' }}>Go Home</Link>
        </div>
      </div>
    );
  }

  const handleBookmark = () => {
    toggleBookmark(lawId);
    setBookmarked(!bookmarked);
    refresh();
  };

  const getTabText = () => {
    switch (activeTab) {
      case 'definition':
        return `${law.sectionNumber} of ${law.lawName}. ${law.title}. ${law.definition}. Simplified: ${law.simplifiedExplanation}. ${law.punishment ? `Punishment: ${law.punishment}` : ''}`;
      case 'explanation':
        return `Explanation of ${law.sectionNumber}. ${law.simplifiedExplanation}. This law applies to: ${law.whoItAppliesTo}.`;
      case 'example':
        return `Real world example of ${law.sectionNumber}. ${law.realWorldExample}`;
      case 'cases':
        return law.importantCases?.map(c => `${c.caseName}, ${c.year}, ${c.court}. ${c.summary}. Significance: ${c.significance}`).join('. Next case: ') || 'No cases available.';
      case 'loopholes':
        return law.loopholes?.map(l => `Loophole: ${l.loopholeName}. ${l.description}. How people use it: ${l.howPeopleUseIt}. How to overcome: ${l.howToOvercome}`).join('. Next loophole: ') || 'No loopholes documented.';
      default:
        return law.simplifiedExplanation;
    }
  };

  const handleVoice = (lang) => {
    if (speaking && !paused) {
      pause();
    } else if (paused) {
      resume();
    } else {
      const l = lang || voiceLang;
      setVoiceLang(l);
      speak(getTabText(), voiceSpeed, l);
      setShowVoicePlayer(true);
    }
  };

  const handleStop = () => {
    stop();
    setShowVoicePlayer(false);
  };

  const handleSpeedChange = (speed) => {
    setVoiceSpeed(speed);
    if (speaking) {
      stop();
      setTimeout(() => speak(getTabText(), speed, voiceLang), 100);
    }
  };

  return (
    <div className="screen" style={{ paddingBottom: showVoicePlayer ? 180 : undefined }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
        <button className="btn btn-icon btn-ghost" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <button className={`bookmark-btn ${bookmarked ? 'active' : ''}`} onClick={handleBookmark}>
            {bookmarked ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
          </button>
        </div>
      </div>

      {/* Law Title */}
      <div style={{ marginBottom: 'var(--space-4)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)', flexWrap: 'wrap' }}>
          <span className={`badge badge-${law.category.toLowerCase()}`}>{law.category}</span>
          <span className={`badge badge-${law.difficulty.toLowerCase()}`}>{law.difficulty}</span>
          {law.tags.includes('UPSC important') && <span className="badge badge-upsc">UPSC</span>}
        </div>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-sm)', color: 'var(--accent)', fontWeight: 700 }}>
          {law.sectionNumber} — {law.shortName}
        </div>
        <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, lineHeight: 'var(--leading-tight)', marginTop: 4 }}>
          {law.title}
        </h1>
      </div>

      {/* Tabs */}
      <div className="tab-container" style={{ marginBottom: 'var(--space-1)' }}>
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="tab-content"
        >
          {activeTab === 'definition' && (
            <div>
              <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 700, marginBottom: 'var(--space-3)' }}>Legal Definition</h3>
              <div className="legal-text" style={{ marginBottom: 'var(--space-4)' }}>{law.definition}</div>

              <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 700, marginBottom: 'var(--space-3)' }}>In Simple Words</h3>
              <div className="simplified-text" style={{ marginBottom: 'var(--space-4)' }}>{law.simplifiedExplanation}</div>

              {law.punishment && (
                <>
                  <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 700, marginBottom: 'var(--space-3)' }}>⚠️ Punishment / Consequences</h3>
                  <div className="punishment-box">{law.punishment}</div>
                </>
              )}
            </div>
          )}

          {activeTab === 'explanation' && (
            <div>
              <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 700, marginBottom: 'var(--space-3)' }}>Step-by-Step Breakdown</h3>
              <div className="simplified-text" style={{ marginBottom: 'var(--space-4)' }}>{law.simplifiedExplanation}</div>

              <div className="card" style={{ marginBottom: 'var(--space-4)' }}>
                <h4 style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--accent)', marginBottom: 'var(--space-2)' }}>👤 Who Does This Apply To?</h4>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>{law.whoItAppliesTo}</p>
              </div>

              {law.punishment && (
                <div className="card" style={{ marginBottom: 'var(--space-4)' }}>
                  <h4 style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--error)', marginBottom: 'var(--space-2)' }}>⚖️ Legal Consequences</h4>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>{law.punishment}</p>
                </div>
              )}

              <div className="card">
                <h4 style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--green)', marginBottom: 'var(--space-2)' }}>📌 Key Tags</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                  {law.tags.map(tag => (
                    <span key={tag} className="filter-chip" style={{ cursor: 'default' }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'example' && (
            <div>
              <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 700, marginBottom: 'var(--space-3)' }}>📖 Real-World Example</h3>
              <div className="card" style={{ background: 'var(--info-bg)', borderLeft: '3px solid var(--accent)' }}>
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-base)', lineHeight: 'var(--leading-relaxed)', color: 'var(--text-primary)' }}>
                  {law.realWorldExample}
                </p>
              </div>

              <div style={{ marginTop: 'var(--space-6)' }}>
                <Link to={`/quiz/${law.id}`} className="btn btn-primary btn-block btn-lg">
                  ❓ Test Your Understanding
                </Link>
              </div>
            </div>
          )}

          {activeTab === 'cases' && (
            <div>
              <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 700, marginBottom: 'var(--space-3)' }}>
                🏛️ Landmark Cases ({law.importantCases?.length || 0})
              </h3>
              {(!law.importantCases || law.importantCases.length === 0) ? (
                <div className="empty-state" style={{ padding: 'var(--space-8)' }}>
                  <div className="empty-state-icon">📂</div>
                  <div className="empty-state-title">No cases documented</div>
                </div>
              ) : (
                law.importantCases.map((c, i) => (
                  <motion.div
                    key={i}
                    className="case-card"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="case-name">{c.caseName}</div>
                    <div className="case-meta">{c.year} • {c.court}</div>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)', lineHeight: 'var(--leading-relaxed)', marginBottom: 'var(--space-2)' }}>
                      {c.summary}
                    </p>
                    <div style={{ fontSize: 'var(--text-sm)', color: 'var(--green)', fontWeight: 600, lineHeight: 'var(--leading-relaxed)' }}>
                      ⭐ Significance: {c.significance}
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          )}

          {activeTab === 'loopholes' && (
            <div>
              <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 700, marginBottom: 'var(--space-3)' }}>
                🔓 Known Loopholes ({law.loopholes?.length || 0})
              </h3>
              {(!law.loopholes || law.loopholes.length === 0) ? (
                <div className="empty-state" style={{ padding: 'var(--space-8)' }}>
                  <div className="empty-state-icon">🔒</div>
                  <div className="empty-state-title">No loopholes documented</div>
                </div>
              ) : (
                law.loopholes.map((l, i) => (
                  <motion.div
                    key={i}
                    className="loophole-card"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="loophole-name">{l.loopholeName}</div>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)', lineHeight: 'var(--leading-relaxed)', marginBottom: 'var(--space-2)' }}>
                      {l.description}
                    </p>

                    <div style={{ marginBottom: 'var(--space-2)' }}>
                      <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--error)', marginBottom: 2 }}>🚨 How It's Used:</div>
                      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>{l.howPeopleUseIt}</p>
                    </div>

                    <div style={{ marginBottom: 'var(--space-2)' }}>
                      <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--green)', marginBottom: 2 }}>✅ How to Overcome:</div>
                      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>{l.howToOvercome}</p>
                    </div>

                    {l.courtStrategy && (
                      <div style={{ background: 'rgba(0,0,0,0.04)', borderRadius: 'var(--radius-md)', padding: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
                        <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--accent)', marginBottom: 2 }}>🎯 Court Strategy:</div>
                        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>{l.courtStrategy}</p>
                      </div>
                    )}
                  </motion.div>
                ))
              )}

              <div style={{ marginTop: 'var(--space-4)' }}>
                <Link to={`/scenario/${law.id}`} className="btn btn-secondary btn-block btn-lg">
                  🏛️ Try a Courtroom Scenario
                </Link>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Related Sections */}
      {relatedLaws.length > 0 && (
        <div style={{ marginTop: 'var(--space-6)' }}>
          <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 700, marginBottom: 'var(--space-3)' }}>🔗 Related Sections</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            {relatedLaws.map(rl => (
              <Link key={rl.id} to={`/law/${rl.id}`} className="law-card" style={{ padding: 'var(--space-3)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--accent)', fontWeight: 700 }}>{rl.sectionNumber}</span>
                    <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>{rl.title}</div>
                  </div>
                  <ChevronRight size={16} color="var(--text-tertiary)" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* FAB Voice Button */}
      <motion.button
        className="fab"
        onClick={() => handleVoice()}
        whileTap={{ scale: 0.9 }}
        animate={speaking && !paused ? { scale: [1, 1.1, 1] } : {}}
        transition={speaking && !paused ? { repeat: Infinity, duration: 1.5 } : {}}
      >
        {speaking && !paused ? <Pause size={24} /> : <Volume2 size={24} />}
      </motion.button>

      {/* Voice Player Bar */}
      <AnimatePresence>
        {showVoicePlayer && (
          <motion.div
            className="voice-player"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
          >
            <div className="voice-player-controls">
              <button className="btn btn-icon btn-icon-sm btn-primary" onClick={() => handleVoice()} style={{ width: 32, height: 32 }}>
                {speaking && !paused ? <Pause size={14} /> : <Volume2 size={14} />}
              </button>
              <button className="btn btn-icon btn-icon-sm btn-ghost" onClick={handleStop} style={{ width: 32, height: 32 }}>
                <Square size={14} />
              </button>
            </div>

            <span className="voice-text">
              {speaking && !paused ? '🔊 Reading...' : paused ? '⏸ Paused' : '📖 Ready'}
            </span>

            {/* Language Toggle */}
            <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
              <button
                className={`voice-lang-btn ${voiceLang === 'en-IN' ? 'active' : ''}`}
                onClick={() => {
                  const newLang = 'en-IN';
                  setVoiceLang(newLang);
                  if (speaking) { stop(); setTimeout(() => speak(getTabText(), voiceSpeed, newLang), 100); }
                }}
              >
                🔊 English
              </button>
              <button
                className={`voice-lang-btn ${voiceLang === 'hi-IN' ? 'active' : ''}`}
                onClick={() => {
                  const newLang = 'hi-IN';
                  setVoiceLang(newLang);
                  if (speaking) { stop(); setTimeout(() => speak(getTabText(), voiceSpeed, newLang), 100); }
                }}
              >
                🔊 हिन्दी
              </button>
            </div>

            {/* Speed Buttons */}
            <div className="voice-speed-buttons">
              {SPEED_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  className={`voice-speed-btn ${voiceSpeed === opt.value ? 'active' : ''}`}
                  onClick={() => handleSpeedChange(opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
