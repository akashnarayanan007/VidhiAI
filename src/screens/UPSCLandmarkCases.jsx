import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import UPSC_CASES from '../data/upscCasesData';

export default function UPSCLandmarkCases() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState(null);

  const filtered = UPSC_CASES.filter(c => 
    c.facts && c.facts.length > 5 && (
      !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.tags?.some(t => t.toLowerCase().includes(search.toLowerCase())) ||
      c.year.toString().includes(search)
    )
  );

  return (
    <div className="screen">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 'var(--space-3)' }}>
        <button className="btn btn-icon btn-ghost" onClick={() => navigate('/upsc')}>
          <ArrowLeft size={20} />
        </button>
        <div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', fontWeight: 600 }}>UPSC</div>
          <div style={{ fontSize: 'var(--text-lg)', fontWeight: 800 }}>Landmark Cases ({filtered.length})</div>
        </div>
      </div>

      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 'var(--space-3)' }}>
        100+ most important Supreme Court judgments with facts, judgment, significance, and UPSC angles.
      </p>

      <div className="upsc-amend-search">
        <Search size={16} color="var(--text-tertiary)" style={{ flexShrink: 0 }} />
        <input
          type="text"
          placeholder="Search case name, tag, year..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="upsc-cases-list">
        {filtered.map((c, i) => (
          <motion.div
            key={c.name}
            className={`upsc-case-card ${expanded === i ? 'expanded' : ''}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.003 }}
            onClick={() => setExpanded(expanded === i ? null : i)}
          >
            <div className="upsc-case-top">
              <div className="upsc-case-name">{c.name}</div>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap', marginTop: 2 }}>
                <span className="upsc-case-year">{c.year} • {c.court}</span>
                {c.tags?.slice(0, 3).map(t => <span key={t} className="upsc-case-tag">{t}</span>)}
              </div>
            </div>

            <AnimatePresence>
              {expanded === i && (
                <motion.div
                  className="upsc-case-body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="upsc-case-section">
                    <span className="upsc-case-label">Facts</span>
                    <p>{c.facts}</p>
                  </div>
                  <div className="upsc-case-section">
                    <span className="upsc-case-label">Judgment</span>
                    <p>{c.judgment}</p>
                  </div>
                  <div className="upsc-case-section">
                    <span className="upsc-case-label">Significance</span>
                    <p>{c.significance}</p>
                  </div>
                  <div className="upsc-case-section">
                    <span className="upsc-case-label">UPSC Angle</span>
                    {c.upsc && c.upsc !== '—' && (
                      <div className="upsc-case-upsc"><Star size={12} /> {c.upsc}</div>
                    )}
                    {c.tags?.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 6 }}>
                        {c.tags.map(t => <span key={t} className="upsc-case-tag">{t}</span>)}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {expanded !== i && (
              <div className="upsc-case-hint">Tap to view full case analysis ▼</div>
            )}
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <div className="empty-state"><div className="empty-state-title">No cases found</div></div>
        )}
      </div>
    </div>
  );
}
