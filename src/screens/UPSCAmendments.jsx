import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Star, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import AMENDMENTS from '../data/upscAmendmentsData';

export default function UPSCAmendments() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filterYear, setFilterYear] = useState('all');

  const years = ['all', ...new Set(AMENDMENTS.map(a => a.year).sort((a, b) => a - b))];

  const filtered = AMENDMENTS.filter(a => {
    const matchSearch = !search || 
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.reason.toLowerCase().includes(search.toLowerCase()) ||
      a.num.toString().includes(search);
    const matchYear = filterYear === 'all' || a.year === parseInt(filterYear);
    return matchSearch && matchYear;
  });

  return (
    <div className="screen">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 'var(--space-3)' }}>
        <button className="btn btn-icon btn-ghost" onClick={() => navigate('/upsc')}>
          <ArrowLeft size={20} />
        </button>
        <div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', fontWeight: 600 }}>UPSC</div>
          <div style={{ fontSize: 'var(--text-lg)', fontWeight: 800 }}>Amendments Tracker</div>
        </div>
      </div>

      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 'var(--space-3)' }}>
        All 106 constitutional amendments with UPSC context — year asked, example questions, and reasons for enactment.
      </p>

      <div className="upsc-amend-search">
        <Search size={16} color="var(--text-tertiary)" style={{ flexShrink: 0 }} />
        <input
          type="text"
          placeholder="Search amendment number, title, or reason..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="upsc-amend-filters">
        <Filter size={14} color="var(--text-tertiary)" style={{ flexShrink: 0 }} />
        {years.slice(0, 10).map(y => (
          <button key={y} className={`upsc-filter-chip ${filterYear === (y === 'all' ? 'all' : y.toString()) ? 'active' : ''}`}
            onClick={() => setFilterYear(y === 'all' ? 'all' : y.toString())}>
            {y === 'all' ? 'All' : y}
          </button>
        ))}
        {years.length > 10 && <span style={{ fontSize: 10, color: 'var(--text-tertiary)' }}>...</span>}
      </div>

      <div className="upsc-amendments-list">
        {filtered.map((a, i) => (
          <motion.div
            key={a.num}
            className="upsc-amend-card"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.008 }}
          >
            <div className="upsc-amend-top">
              <div className="upsc-amend-num">
                <span>{a.num < 10 ? `0${a.num}` : a.num}</span>
              </div>
              <div className="upsc-amend-header">
                <div className="upsc-amend-year">{a.year}</div>
                <div className="upsc-amend-title">{a.title}</div>
              </div>
            </div>
            <div className="upsc-amend-reason">
              <span className="upsc-amend-label">Why:</span> {a.reason}
            </div>
            {a.upscYear !== '—' && (
              <div className="upsc-amend-upsc">
                <Star size={12} />
                <span>Asked: {a.upscYear}</span>
              </div>
            )}
            {a.exampleQ && (
              <div className="upsc-amend-example">
                <span>Example Q:</span> {a.exampleQ}
              </div>
            )}
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <div className="empty-state"><div className="empty-state-title">No amendments found</div></div>
        )}
      </div>
    </div>
  );
}
