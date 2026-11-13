import { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import { categories, getLawsByCategory, filterLaws } from '../services/lawService';
import { getReadLaws, getBookmarkedLaws } from '../services/progressService';

export default function LawCategoryScreen() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [difficulty, setDifficulty] = useState('All');
  const [status, setStatus] = useState('All');

  const category = categories.find(c => c.id === categoryId);
  const readLaws = getReadLaws();
  const bookmarks = getBookmarkedLaws();

  const laws = useMemo(() => {
    return filterLaws({
      category: categoryId,
      difficulty: difficulty !== 'All' ? difficulty : null,
      status: status !== 'All' ? status : null,
      search: searchQuery || null,
      bookmarks,
      readLaws,
    });
  }, [categoryId, difficulty, status, searchQuery, bookmarks, readLaws]);

  const allCategoryLaws = getLawsByCategory(categoryId);
  const readCount = allCategoryLaws.filter(l => readLaws.includes(l.id)).length;
  const progressPercent = allCategoryLaws.length > 0 ? (readCount / allCategoryLaws.length) * 100 : 0;

  const accentColor = category?.color || 'var(--primary)';

  if (!category) {
    return (
      <div className="screen">
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <div className="empty-state-title">Category not found</div>
          <Link to="/" className="btn btn-primary" style={{ marginTop: 'var(--space-4)' }}>Go Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="screen">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
        <button className="btn btn-icon btn-ghost" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <span style={{ fontSize: '1.5rem' }}>{category.icon}</span>
            <h1 style={{ fontSize: 'var(--text-xl)', fontWeight: 700 }}>{category.name}</h1>
          </div>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: 2 }}>{category.description}</p>
        </div>
      </div>

      {/* Progress */}
      <div className="card" style={{ marginBottom: 'var(--space-4)', padding: 'var(--space-3) var(--space-4)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
          <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>Progress</span>
          <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
            {readCount} / {allCategoryLaws.length} sections
          </span>
        </div>
        <div className="progress-bar">
          <motion.div
            className="progress-bar-fill"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ background: accentColor }}
          />
        </div>
      </div>

      {/* Search */}
      <div className="search-container" style={{ margin: '0 0 var(--space-3)' }}>
        <Search className="search-icon" size={18} />
        <input
          className="search-input"
          type="text"
          placeholder={`Search ${category.name} laws...`}
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Filters */}
      <div className="filter-chips" style={{ marginBottom: 'var(--space-4)' }}>
        {['All', 'Beginner', 'Intermediate', 'Advanced'].map(d => (
          <button key={d} className={`filter-chip ${difficulty === d ? 'active' : ''}`} onClick={() => setDifficulty(d)}>
            {d}
          </button>
        ))}
        <div style={{ width: 1, background: 'var(--border-default)', margin: '0 var(--space-1)' }} />
        {['All', 'Read', 'Unread', 'Bookmarked'].map(s => (
          <button key={s} className={`filter-chip ${status === s ? 'active' : ''}`} onClick={() => setStatus(s)}>
            {s}
          </button>
        ))}
      </div>

      {/* Law List */}
      {laws.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📭</div>
          <div className="empty-state-title">No laws found</div>
          <div className="empty-state-text">Try adjusting your filters or search query</div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {laws.map((law, i) => (
            <motion.div
              key={law.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <Link to={`/law/${law.id}`} className="law-card" style={{ borderLeft: `3px solid ${accentColor}` }}>
                <div className="law-card-header">
                  <div>
                    <div className="law-card-section">{law.sectionNumber}</div>
                    <div className="law-card-title">{law.title}</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                    <span className={`badge badge-${law.difficulty.toLowerCase()}`}>{law.difficulty}</span>
                    {readLaws.includes(law.id) && (
                      <span style={{ fontSize: '0.625rem', color: 'var(--green)', fontWeight: 600 }}>✓ Read</span>
                    )}
                  </div>
                </div>
                <div className="law-card-summary">{law.simplifiedExplanation}</div>
                <div className="law-card-footer">
                  <span className={`badge badge-${law.category.toLowerCase()}`}>{law.shortName}</span>
                  {law.tags.includes('UPSC important') && (
                    <span className="badge badge-upsc">UPSC</span>
                  )}
                  {law.importantCases?.length > 0 && (
                    <span style={{ fontSize: '0.625rem', color: 'var(--text-tertiary)' }}>
                      🏛️ {law.importantCases.length} case{law.importantCases.length > 1 ? 's' : ''}
                    </span>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
