import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Star, BookOpen, Gavel, Mic, Sun, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getUPSCImportantLaws, getLawById, getAllLaws } from '../services/lawService';
import { generateInterviewQuestion } from '../services/aiService';

export default function UPSCModeScreen() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('flashcards'); // flashcards | interview | essays
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [interviewLaw, setInterviewLaw] = useState('');
  const [interviewQ, setInterviewQ] = useState(null);
  const [showModelAnswer, setShowModelAnswer] = useState(false);
  const [loading, setLoading] = useState(false);

  const upscLaws = getUPSCImportantLaws();
  const allLaws = getAllLaws();

  // Essay topics linked to laws
  const essayTopics = [
    { topic: 'Right to Privacy in the Digital Age', laws: ['con-art-21', 'it-sec-66'], description: 'How Article 21 and the Puttaswamy judgment shape digital privacy in India' },
    { topic: 'Is the Death Penalty Justified?', laws: ['bns-sec-101'], description: 'Rarest of rare doctrine, Bachan Singh, and abolition debate' },
    { topic: 'Caste Discrimination: Law vs Reality', laws: ['con-art-15', 'scst-sec-3'], description: 'Constitutional provisions vs ground reality, SC/ST Act effectiveness' },
    { topic: 'Women\'s Safety: Are Laws Enough?', laws: ['bns-sec-63', 'bns-sec-85', 'dv-sec-3'], description: 'Nirbhaya, POCSO, domestic violence — legal framework and gaps' },
    { topic: 'Transparency in Governance: RTI at Crossroads', laws: ['rti-sec-3'], description: 'RTI Act\'s impact on governance, threats and dilution attempts' },
    { topic: 'Uniform Civil Code: Unity or Imposition?', laws: ['con-art-44', 'sma-sec-4'], description: 'Article 44, Shah Bano case, Goa model, and political debate' },
    { topic: 'Federal Structure Under Strain', laws: ['con-art-356', 'con-art-352'], description: 'Misuse of emergency provisions, S.R. Bommai, cooperative federalism' },
    { topic: 'Labour Rights in the Gig Economy', laws: ['mw-sec-3', 'id-sec-10'], description: 'Minimum wages, social security, and new-age platform workers' },
  ];

  const handleNextFlashcard = () => {
    setFlipped(false);
    setFlashcardIndex((flashcardIndex + 1) % upscLaws.length);
  };

  const handlePrevFlashcard = () => {
    setFlipped(false);
    setFlashcardIndex((flashcardIndex - 1 + upscLaws.length) % upscLaws.length);
  };

  const handleGenerateInterview = async () => {
    setLoading(true);
    setShowModelAnswer(false);
    try {
      const law = interviewLaw ? getLawById(interviewLaw) : upscLaws[Math.floor(Math.random() * upscLaws.length)];
      const q = await generateInterviewQuestion(law);
      setInterviewQ({ ...q, law });
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const sections = [
    { id: 'flashcards', label: '📇 Flashcards', desc: 'Quick revision cards' },
    { id: 'interview', label: '🎤 Interview', desc: 'Practice questions' },
    { id: 'essays', label: '📝 Essays', desc: 'Mains topics + laws' },
  ];

  return (
    <div className="screen">
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
        <h1 style={{ fontSize: 'var(--text-xl)', fontWeight: 700 }}>🎓 UPSC Mode</h1>
      </div>

      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-4)', lineHeight: 'var(--leading-relaxed)' }}>
        Focused preparation for Civil Services — flashcards for revision, interview practice questions, and essay topics connected to Indian laws.
      </p>

      {/* Quick Navigation to Sub-pages */}
      <div className="upsc-quick-grid">
        <Link to="/upsc/amendments" className="upsc-quick-card" style={{ borderLeftColor: '#FF9933' }}>
          <div className="upsc-quick-icon" style={{ background: 'rgba(255,153,51,0.1)', color: '#FF9933' }}><Star size={20} /></div>
          <span className="upsc-quick-title">Amendments Tracker</span>
          <span className="upsc-quick-sub">All 106 amendments with UPSC context</span>
        </Link>
        <Link to="/upsc/cases" className="upsc-quick-card" style={{ borderLeftColor: '#7C3AED' }}>
          <div className="upsc-quick-icon" style={{ background: 'rgba(124,58,237,0.1)', color: '#7C3AED' }}><BookOpen size={20} /></div>
          <span className="upsc-quick-title">Landmark Cases</span>
          <span className="upsc-quick-sub">100+ most important judgments</span>
        </Link>
        <Link to="/upsc/interview" className="upsc-quick-card" style={{ borderLeftColor: '#2563EB' }}>
          <div className="upsc-quick-icon" style={{ background: 'rgba(37,99,235,0.1)', color: '#2563EB' }}><Mic size={20} /></div>
          <span className="upsc-quick-title">Interview Prep</span>
          <span className="upsc-quick-sub">Model answers for law Q&A</span>
        </Link>
        <Link to="/upsc/daily" className="upsc-quick-card" style={{ borderLeftColor: '#059669' }}>
          <div className="upsc-quick-icon" style={{ background: 'rgba(5,150,105,0.1)', color: '#059669' }}><Sun size={20} /></div>
          <span className="upsc-quick-title">Daily Question</span>
          <span className="upsc-quick-sub">New UPSC law question every day</span>
        </Link>
      </div>

      {/* Section Tabs */}
      <div className="tab-container" style={{ marginBottom: 'var(--space-4)' }}>
        {sections.map(s => (
          <button
            key={s.id}
            className={`tab-button ${activeSection === s.id ? 'active' : ''}`}
            onClick={() => setActiveSection(s.id)}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Flashcards Section */}
      {activeSection === 'flashcards' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {upscLaws.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📇</div>
              <div className="empty-state-title">No UPSC-tagged laws found</div>
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)', fontWeight: 600 }}>
                  Card {flashcardIndex + 1} of {upscLaws.length}
                </span>
                <button className="btn btn-ghost btn-sm" onClick={() => { setFlashcardIndex(Math.floor(Math.random() * upscLaws.length)); setFlipped(false); }}>
                  🔀 Shuffle
                </button>
              </div>

              <div className="progress-bar" style={{ marginBottom: 'var(--space-3)', height: 4 }}>
                <div className="progress-bar-fill" style={{ width: `${((flashcardIndex + 1) / upscLaws.length) * 100}%` }} />
              </div>

              <div className="flashcard" onClick={() => setFlipped(!flipped)} style={{ marginBottom: 'var(--space-4)' }}>
                <div className="flashcard-inner" style={flipped ? { transform: 'rotateY(180deg)' } : {}}>
                  <div className="flashcard-front">
                    <span className={`badge badge-${upscLaws[flashcardIndex].category.toLowerCase()}`} style={{ marginBottom: 'var(--space-2)' }}>
                      {upscLaws[flashcardIndex].shortName}
                    </span>
                    <div style={{ fontSize: 'var(--text-xl)', fontWeight: 800 }}>
                      {upscLaws[flashcardIndex].sectionNumber}
                    </div>
                    <div style={{ fontSize: 'var(--text-lg)', fontWeight: 600, marginTop: 'var(--space-2)' }}>
                      {upscLaws[flashcardIndex].title}
                    </div>
                    <div style={{ fontSize: 'var(--text-xs)', marginTop: 'var(--space-4)', opacity: 0.7 }}>
                      Tap to reveal answer →
                    </div>
                  </div>
                  <div className="flashcard-back" style={{ transform: 'rotateY(180deg)', textAlign: 'left', overflow: 'auto' }}>
                    <p style={{ fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-relaxed)', marginBottom: 'var(--space-2)' }}>
                      {upscLaws[flashcardIndex].simplifiedExplanation?.slice(0, 250)}...
                    </p>
                    {upscLaws[flashcardIndex].importantCases?.[0] && (
                      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--accent)', fontWeight: 600 }}>
                        📌 {upscLaws[flashcardIndex].importantCases[0].caseName} ({upscLaws[flashcardIndex].importantCases[0].year})
                      </p>
                    )}
                    {upscLaws[flashcardIndex].punishment && (
                      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--error)', fontWeight: 600, marginTop: 4 }}>
                        ⚖️ {upscLaws[flashcardIndex].punishment?.slice(0, 100)}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                <button className="btn btn-outline btn-lg" style={{ flex: 1 }} onClick={handlePrevFlashcard}>
                  ← Previous
                </button>
                <button className="btn btn-primary btn-lg" style={{ flex: 1 }} onClick={handleNextFlashcard}>
                  Next →
                </button>
              </div>

              <Link to={`/law/${upscLaws[flashcardIndex].id}`} className="btn btn-ghost btn-block" style={{ marginTop: 'var(--space-3)' }}>
                📖 Read Full Details
              </Link>
            </>
          )}
        </motion.div>
      )}

      {/* Interview Section */}
      {activeSection === 'interview' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="card" style={{ marginBottom: 'var(--space-4)' }}>
            <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 700, marginBottom: 'var(--space-3)' }}>🎤 Interview Practice</h3>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-3)' }}>
              Get a UPSC interview-style question about any Indian law. Practice your answer, then see the model response.
            </p>

            <select
              value={interviewLaw}
              onChange={e => setInterviewLaw(e.target.value)}
              style={{
                width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)',
                border: '1.5px solid var(--border-default)', background: 'var(--bg-card)', color: 'var(--text-primary)',
                fontSize: 'var(--text-sm)', marginBottom: 'var(--space-3)', outline: 'none',
              }}
            >
              <option value="">Random UPSC-important law</option>
              {allLaws.map(law => (
                <option key={law.id} value={law.id}>{law.sectionNumber} — {law.title}</option>
              ))}
            </select>

            <button className="btn btn-secondary btn-block" onClick={handleGenerateInterview} disabled={loading}>
              {loading ? '⏳ Generating...' : '🎤 Generate Question'}
            </button>
          </div>

          {interviewQ && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <div className="card" style={{ marginBottom: 'var(--space-3)', borderLeft: '3px solid var(--accent)' }}>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>
                  {interviewQ.law?.sectionNumber} — {interviewQ.law?.shortName}
                </div>
                <div style={{ fontSize: 'var(--text-lg)', fontWeight: 700, lineHeight: 'var(--leading-relaxed)', color: 'var(--text-primary)' }}>
                  "{interviewQ.question}"
                </div>
              </div>

              <div className="card" style={{ marginBottom: 'var(--space-3)' }}>
                <h4 style={{ fontSize: 'var(--text-sm)', fontWeight: 700, marginBottom: 'var(--space-2)' }}>📌 Key Points to Cover:</h4>
                <ul style={{ paddingLeft: 'var(--space-4)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>
                  {interviewQ.keyPoints?.map((p, i) => <li key={i} style={{ marginBottom: 4 }}>{p}</li>)}
                </ul>
              </div>

              <button
                className="btn btn-outline btn-block"
                onClick={() => setShowModelAnswer(!showModelAnswer)}
                style={{ marginBottom: 'var(--space-3)' }}
              >
                {showModelAnswer ? '🙈 Hide Model Answer' : '👁️ Show Model Answer'}
              </button>

              <AnimatePresence>
                {showModelAnswer && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <div className="simplified-text" style={{ marginBottom: 'var(--space-3)' }}>
                      <strong>📝 Model Answer:</strong><br /><br />
                      {interviewQ.modelAnswer}
                    </div>
                    {interviewQ.followUp && (
                      <div className="card" style={{ borderLeft: '3px solid var(--saffron)' }}>
                        <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--saffron-dark)', marginBottom: 4 }}>
                          🔄 Follow-Up Question:
                        </div>
                        <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, lineHeight: 'var(--leading-relaxed)' }}>
                          "{interviewQ.followUp}"
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Essays Section */}
      {activeSection === 'essays' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-4)', lineHeight: 'var(--leading-relaxed)' }}>
            UPSC Mains essay topics connected to specific Indian laws. Read the laws first, then craft your essay with legal depth.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {essayTopics.map((essay, i) => (
              <motion.div
                key={i}
                className="card"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                style={{ borderLeft: '3px solid var(--saffron)' }}
              >
                <h4 style={{ fontSize: 'var(--text-base)', fontWeight: 700, marginBottom: 'var(--space-1)', lineHeight: 'var(--leading-tight)' }}>
                  📝 {essay.topic}
                </h4>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginBottom: 'var(--space-2)', lineHeight: 'var(--leading-relaxed)' }}>
                  {essay.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                  {essay.laws.map(id => {
                    const law = getLawById(id);
                    if (!law) return null;
                    return (
                      <Link key={id} to={`/law/${id}`} className="filter-chip active" style={{ fontSize: '0.625rem' }}>
                        {law.sectionNumber}
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
