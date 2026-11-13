import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Filter, Mic } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import INTERVIEW_QA from '../data/upscInterviewQA';

export default function UPSCInterviewPrep() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  const categories = ['all', ...new Set(INTERVIEW_QA.map(q => q.category))];

  const filtered = INTERVIEW_QA.filter(q => {
    const matchSearch = !search ||
      q.question.toLowerCase().includes(search.toLowerCase()) ||
      q.answer.toLowerCase().includes(search.toLowerCase()) ||
      q.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchCat = category === 'all' || q.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div className="screen">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 'var(--space-3)' }}>
        <button className="btn btn-icon btn-ghost" onClick={() => navigate('/upsc')}>
          <ArrowLeft size={20} />
        </button>
        <div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', fontWeight: 600 }}>UPSC</div>
          <div style={{ fontSize: 'var(--text-lg)', fontWeight: 800 }}>Interview Prep — Law Q&A</div>
        </div>
      </div>

      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 'var(--space-3)' }}>
        Pre-built model answers for common IAS/IPS interview questions on legal issues. Each includes legal accuracy, policy angle, and officer\'s perspective.
      </p>

      <div className="upsc-amend-search">
        <Search size={16} color="var(--text-tertiary)" style={{ flexShrink: 0 }} />
        <input
          type="text"
          placeholder="Search questions, topics..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="upsc-interview-filters">
        {categories.map(c => (
          <button key={c} className={`upsc-filter-chip ${category === c ? 'active' : ''}`} onClick={() => setCategory(c)}>
            {c === 'all' ? 'All' : c}
          </button>
        ))}
      </div>

      <div className="upsc-interview-list">
        {filtered.map((q, i) => (
          <motion.div
            key={i}
            className="upsc-interview-card"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.02 }}
          >
            <div className="upsc-interview-question" onClick={() => setExpanded(expanded === i ? null : i)}>
              <div className="upsc-interview-category" style={{ background: getCategoryColor(q.category) }}>{q.category}</div>
              <p>"{q.question}"</p>
              {expanded !== i && <div className="upsc-case-hint">Tap to see model answer ▼</div>}
            </div>

            <AnimatePresence>
              {expanded === i && (
                <motion.div
                  className="upsc-interview-answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <p>{q.answer}</p>
                  <div className="upsc-interview-tags">
                    {q.tags.map(t => <span key={t} className="upsc-case-tag">{t}</span>)}
                  </div>
                  <div className="upsc-interview-upsc">
                    <strong>📌 UPSC Angle:</strong> {q.upscAngle}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <div className="empty-state"><div className="empty-state-title">No questions found</div></div>
        )}
      </div>
    </div>
  );
}

function getCategoryColor(cat) {
  const colors = {
    'Criminal Law & Policing': '#DC2626',
    'Constitutional Law': '#2563EB',
    'Judicial Reforms': '#7C3AED',
    'Social Justice': '#059669',
    'Law & Technology': '#EA580C',
    'Gender Justice': '#E91E63',
    'Administrative Law': '#0891B2',
    'International Law': '#1D4ED8',
  };
  return colors[cat] || '#666';
}
