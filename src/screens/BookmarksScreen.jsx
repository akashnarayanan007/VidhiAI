import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookmarkX, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { getLawById, categories } from '../services/lawService';
import { getBookmarkedLaws, toggleBookmark } from '../services/progressService';
import { useAppContext } from '../App';

export default function BookmarksScreen() {
  const navigate = useNavigate();
  const { refreshKey, refresh } = useAppContext();
  const [activeCategory, setActiveCategory] = useState('All');
  const [revisionMode, setRevisionMode] = useState(false);
  const [revisionIndex, setRevisionIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const bookmarkIds = getBookmarkedLaws();
  const bookmarkedLaws = useMemo(() =>
    bookmarkIds.map(id => getLawById(id)).filter(Boolean),
    [bookmarkIds, refreshKey]
  );

  const filteredLaws = activeCategory === 'All'
    ? bookmarkedLaws
    : bookmarkedLaws.filter(l => l.category === activeCategory);

  const usedCategories = [...new Set(bookmarkedLaws.map(l => l.category))];

  const handleUnbookmark = (lawId, e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark(lawId);
    refresh();
  };

  if (bookmarkedLaws.length === 0) {
    return (
      <div className="screen">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
          <h1 style={{ fontSize: 'var(--text-xl)', fontWeight: 700 }}>🔖 Bookmarks</h1>
        </div>
        <div className="empty-state">
          <div className="empty-state-icon">🔖</div>
          <div className="empty-state-title">No bookmarks yet</div>
          <div className="empty-state-text">Save laws while reading to build your revision list. Tap the bookmark icon on any law to save it.</div>
          <Link to="/" className="btn btn-primary" style={{ marginTop: 'var(--space-4)' }}>
            Start Exploring
          </Link>
        </div>
      </div>
    );
  }

  // Revision Mode (Flashcards)
  if (revisionMode && filteredLaws.length > 0) {
    const law = filteredLaws[revisionIndex];
    return (
      <div className="screen">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
          <button className="btn btn-ghost btn-sm" onClick={() => setRevisionMode(false)}>
            <ArrowLeft size={16} /> Back
          </button>
          <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)', fontWeight: 600 }}>
            {revisionIndex + 1} / {filteredLaws.length}
          </span>
        </div>

        <div className="progress-bar" style={{ marginBottom: 'var(--space-4)', height: 4 }}>
          <div className="progress-bar-fill" style={{ width: `${((revisionIndex + 1) / filteredLaws.length) * 100}%` }} />
        </div>

        <div className="flashcard" onClick={() => setFlipped(!flipped)} style={{ marginBottom: 'var(--space-4)' }}>
          <div className={`flashcard-inner ${flipped ? '' : ''}`} style={flipped ? { transform: 'rotateY(180deg)' } : {}}>
            <div className="flashcard-front">
              <div style={{ fontSize: 'var(--text-sm)', opacity: 0.8, marginBottom: 'var(--space-2)' }}>{law.shortName}</div>
              <div style={{ fontSize: 'var(--text-xl)', fontWeight: 800 }}>{law.sectionNumber}</div>
              <div style={{ fontSize: 'var(--text-lg)', fontWeight: 600, marginTop: 'var(--space-2)' }}>{law.title}</div>
              <div style={{ fontSize: 'var(--text-xs)', marginTop: 'var(--space-4)', opacity: 0.7 }}>Tap to reveal →</div>
            </div>
            <div className="flashcard-back" style={{ transform: 'rotateY(180deg)' }}>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)', lineHeight: 'var(--leading-relaxed)', textAlign: 'left', overflow: 'auto' }}>
                <strong>{law.title}</strong>
                <br /><br />
                {law.simplifiedExplanation?.slice(0, 200)}...
                {law.importantCases?.length > 0 && (
                  <>
                    <br /><br />
                    <strong>Key Case:</strong> {law.importantCases[0].caseName} ({law.importantCases[0].year})
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <button
            className="btn btn-outline btn-lg"
            style={{ flex: 1 }}
            onClick={() => { setRevisionIndex(Math.max(0, revisionIndex - 1)); setFlipped(false); }}
            disabled={revisionIndex === 0}
          >
            ← Previous
          </button>
          <button
            className="btn btn-primary btn-lg"
            style={{ flex: 1 }}
            onClick={() => {
              if (revisionIndex < filteredLaws.length - 1) {
                setRevisionIndex(revisionIndex + 1);
                setFlipped(false);
              } else {
                setRevisionMode(false);
              }
            }}
          >
            {revisionIndex < filteredLaws.length - 1 ? 'Next →' : '✓ Done'}
          </button>
        </div>

        <Link to={`/law/${law.id}`} className="btn btn-ghost btn-block" style={{ marginTop: 'var(--space-3)' }}>
          📖 Read Full Details
        </Link>
      </div>
    );
  }

  return (
    <div className="screen">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
        <h1 style={{ fontSize: 'var(--text-xl)', fontWeight: 700 }}>🔖 Bookmarks</h1>
        <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)' }}>{bookmarkedLaws.length} saved</span>
      </div>

      {/* Revision Mode Button */}
      <button
        className="btn btn-primary btn-block"
        style={{ marginBottom: 'var(--space-4)' }}
        onClick={() => { setRevisionMode(true); setRevisionIndex(0); setFlipped(false); }}
      >
        <RotateCcw size={16} /> Revise All ({filteredLaws.length} cards)
      </button>

      {/* Category Filters */}
      <div className="filter-chips" style={{ marginBottom: 'var(--space-4)' }}>
        <button className={`filter-chip ${activeCategory === 'All' ? 'active' : ''}`} onClick={() => setActiveCategory('All')}>
          All
        </button>
        {usedCategories.map(cat => (
          <button key={cat} className={`filter-chip ${activeCategory === cat ? 'active' : ''}`} onClick={() => setActiveCategory(cat)}>
            {cat}
          </button>
        ))}
      </div>

      {/* Bookmarked Laws */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {filteredLaws.map((law, i) => (
          <motion.div
            key={law.id}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            <Link to={`/law/${law.id}`} className="law-card">
              <div className="law-card-header">
                <div>
                  <div className="law-card-section">{law.sectionNumber} — {law.shortName}</div>
                  <div className="law-card-title">{law.title}</div>
                </div>
                <button
                  className="bookmark-btn active"
                  onClick={(e) => handleUnbookmark(law.id, e)}
                  title="Remove bookmark"
                >
                  <BookmarkX size={18} />
                </button>
              </div>
              <div className="law-card-summary">{law.simplifiedExplanation}</div>
              <div className="law-card-footer">
                <span className={`badge badge-${law.category.toLowerCase()}`}>{law.category}</span>
                <span className={`badge badge-${law.difficulty.toLowerCase()}`}>{law.difficulty}</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
