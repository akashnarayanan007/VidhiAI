import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, RotateCcw, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAllLaws, getLawById } from '../services/lawService';
import { generateScenario, evaluateArgument, isAIAvailable } from '../services/aiService';

export default function CourtScenarioScreen() {
  const { lawId } = useParams();
  const navigate = useNavigate();

  const [stage, setStage] = useState('setup'); // setup | loading | scenario | arguing | evaluating | result
  const [selectedLaw, setSelectedLaw] = useState(lawId || '');
  const [scenario, setScenario] = useState(null);
  const [role, setRole] = useState('');
  const [argument, setArgument] = useState('');
  const [evaluation, setEvaluation] = useState(null);
  const [error, setError] = useState('');

  const allLaws = getAllLaws();

  useEffect(() => {
    if (lawId) {
      setSelectedLaw(lawId);
    }
  }, [lawId]);

  const handleGenerate = async () => {
    setError('');
    setStage('loading');

    try {
      const law = selectedLaw
        ? getLawById(selectedLaw)
        : allLaws[Math.floor(Math.random() * allLaws.length)];

      if (!law) {
        setError('Could not find a suitable law.');
        setStage('setup');
        return;
      }

      const sc = await generateScenario(law);
      setScenario({ ...sc, law });
      setStage('scenario');
    } catch (err) {
      setError(err.message || 'Failed to generate scenario.');
      setStage('setup');
    }
  };

  const handleChooseRole = (r) => {
    setRole(r);
    setStage('arguing');
  };

  const handleSubmitArgument = async () => {
    if (!argument.trim()) return;
    setStage('evaluating');

    try {
      const result = await evaluateArgument(scenario, argument, role);
      setEvaluation(result);
      setStage('result');
    } catch (err) {
      setError(err.message || 'Failed to evaluate argument.');
      setStage('arguing');
    }
  };

  const handleReset = () => {
    setStage('setup');
    setScenario(null);
    setRole('');
    setArgument('');
    setEvaluation(null);
    setError('');
  };

  if (stage === 'setup') {
    return (
      <div className="screen">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
          <button className="btn btn-icon btn-ghost" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
          </button>
          <h1 style={{ fontSize: 'var(--text-xl)', fontWeight: 700 }}>🏛️ Courtroom Scenario</h1>
        </div>

        {error && (
          <div className="punishment-box" style={{ marginBottom: 'var(--space-4)' }}>{error}</div>
        )}

        <div className="card-featured" style={{ marginBottom: 'var(--space-4)' }}>
          <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: 'var(--space-2)' }}>Simulate a Real Court Case</h3>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>
            An AI-generated courtroom scenario will present you with a case. You'll choose to argue as the prosecution or defence, then write your argument. The AI will evaluate your legal reasoning.
          </p>
        </div>

        <div className="card" style={{ marginBottom: 'var(--space-4)' }}>
          <label style={{ fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: 'var(--space-2)', display: 'block', color: 'var(--text-secondary)' }}>
            Choose a Law for the Scenario
          </label>
          <select
            value={selectedLaw}
            onChange={e => setSelectedLaw(e.target.value)}
            style={{
              width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)',
              border: '1.5px solid var(--border-default)', background: 'var(--bg-card)', color: 'var(--text-primary)',
              fontSize: 'var(--text-sm)', outline: 'none',
            }}
          >
            <option value="">Random law</option>
            {allLaws.map(law => (
              <option key={law.id} value={law.id}>{law.sectionNumber} — {law.title}</option>
            ))}
          </select>
        </div>

        {!isAIAvailable() && (
          <div className="simplified-text" style={{ marginBottom: 'var(--space-4)', borderLeftColor: 'var(--saffron)' }}>
            💡 <strong>Tip:</strong> Add your Claude API key in Settings for AI-generated scenarios with realistic details and evaluation.
          </div>
        )}

        <button className="btn btn-secondary btn-block btn-lg" onClick={handleGenerate}>
          🏛️ Generate Scenario
        </button>
      </div>
    );
  }

  if (stage === 'loading' || stage === 'evaluating') {
    return (
      <div className="screen" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <div className="loading-spinner" />
        <p style={{ marginTop: 'var(--space-4)', color: 'var(--text-secondary)', fontWeight: 500 }}>
          {stage === 'loading' ? 'Preparing courtroom scenario...' : 'Evaluating your argument...'}
        </p>
      </div>
    );
  }

  if (stage === 'scenario') {
    return (
      <div className="screen">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
          <button className="btn btn-icon btn-ghost" onClick={handleReset}>
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 style={{ fontSize: 'var(--text-lg)', fontWeight: 700 }}>🏛️ {scenario.title}</h1>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
              {scenario.law?.sectionNumber} — {scenario.law?.shortName}
            </p>
          </div>
        </div>

        <div className="scenario-section">
          <div className="scenario-label">📋 Case Background</div>
          <div className="card">
            <div className="scenario-text">{scenario.background}</div>
          </div>
        </div>

        <div className="scenario-section">
          <div className="scenario-label">⚖️ Prosecution's Argument</div>
          <div className="card" style={{ borderLeft: '3px solid var(--green)' }}>
            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)', lineHeight: 'var(--leading-relaxed)' }}>
              {scenario.prosecution}
            </div>
          </div>
        </div>

        <div className="scenario-section">
          <div className="scenario-label">🛡️ Defense's Argument</div>
          <div className="card" style={{ borderLeft: '3px solid var(--error)' }}>
            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)', lineHeight: 'var(--leading-relaxed)' }}>
              {scenario.defense}
            </div>
          </div>
        </div>

        <div className="scenario-section">
          <div className="scenario-label">🤔 Judge's Consideration</div>
          <div className="card" style={{ borderLeft: '3px solid var(--accent)' }}>
            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)', lineHeight: 'var(--leading-relaxed)' }}>
              {scenario.judgeConsideration}
            </div>
          </div>
        </div>

        <div className="card-featured" style={{ marginTop: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
          <p style={{ fontSize: 'var(--text-base)', fontWeight: 600, lineHeight: 'var(--leading-relaxed)' }}>
            {scenario.challenge}
          </p>
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <button className="btn btn-success btn-lg" style={{ flex: 1 }} onClick={() => handleChooseRole('Prosecution')}>
            ⚖️ Prosecution
          </button>
          <button className="btn btn-outline btn-lg" style={{ flex: 1, borderColor: 'var(--error)', color: 'var(--error)' }} onClick={() => handleChooseRole('Defence')}>
            🛡️ Defence
          </button>
        </div>
      </div>
    );
  }

  if (stage === 'arguing') {
    return (
      <div className="screen">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
          <button className="btn btn-icon btn-ghost" onClick={() => setStage('scenario')}>
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 style={{ fontSize: 'var(--text-lg)', fontWeight: 700 }}>Argue for {role}</h1>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>{scenario.title}</p>
          </div>
        </div>

        <div className="card" style={{ marginBottom: 'var(--space-4)', borderLeft: `3px solid ${role === 'Prosecution' ? 'var(--green)' : 'var(--error)'}` }}>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>
            As a <strong>{role === 'Prosecution' ? 'prosecutor / civil servant' : 'defense lawyer'}</strong>, write your argument.
            Cite relevant legal provisions, case law, and address the opposing side's arguments.
          </p>
        </div>

        <textarea
          className="scenario-input"
          placeholder={`Write your ${role.toLowerCase()} argument here...\n\nTip: Cite specific sections, landmark cases, and address the loopholes.`}
          value={argument}
          onChange={e => setArgument(e.target.value)}
          style={{ minHeight: 200, marginBottom: 'var(--space-4)' }}
        />

        <button
          className="btn btn-primary btn-block btn-lg"
          onClick={handleSubmitArgument}
          disabled={argument.trim().length < 20}
          style={{ opacity: argument.trim().length < 20 ? 0.5 : 1 }}
        >
          <Send size={16} /> Submit Argument
        </button>
      </div>
    );
  }

  if (stage === 'result' && evaluation) {
    return (
      <div className="screen">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
          <button className="btn btn-icon btn-ghost" onClick={handleReset}>
            <ArrowLeft size={20} />
          </button>
          <h1 style={{ fontSize: 'var(--text-lg)', fontWeight: 700 }}>📊 Evaluation</h1>
        </div>

        {/* Score */}
        <motion.div
          className="score-card"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{ padding: 'var(--space-6)', marginBottom: 'var(--space-4)' }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', gap: 2, marginBottom: 'var(--space-2)' }}>
            {[...Array(10)].map((_, i) => (
              <Star key={i} size={20} fill={i < evaluation.score ? 'var(--saffron)' : 'none'} color={i < evaluation.score ? 'var(--saffron)' : 'var(--border-default)'} />
            ))}
          </div>
          <div className="score-value">{evaluation.score}/10</div>
        </motion.div>

        {/* Strengths */}
        <div className="card" style={{ marginBottom: 'var(--space-3)', borderLeft: '3px solid var(--green)' }}>
          <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--green)', marginBottom: 'var(--space-2)' }}>✅ What You Did Well</h3>
          <ul style={{ paddingLeft: 'var(--space-4)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>
            {evaluation.strengths?.map((s, i) => <li key={i} style={{ marginBottom: 4 }}>{s}</li>)}
          </ul>
        </div>

        {/* Weaknesses */}
        <div className="card" style={{ marginBottom: 'var(--space-3)', borderLeft: '3px solid var(--error)' }}>
          <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--error)', marginBottom: 'var(--space-2)' }}>❌ Areas to Improve</h3>
          <ul style={{ paddingLeft: 'var(--space-4)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>
            {evaluation.weaknesses?.map((w, i) => <li key={i} style={{ marginBottom: 4 }}>{w}</li>)}
          </ul>
        </div>

        {/* Model Answer */}
        <div className="card" style={{ marginBottom: 'var(--space-3)', borderLeft: '3px solid var(--accent)' }}>
          <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--accent)', marginBottom: 'var(--space-2)' }}>📝 Model Answer</h3>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>
            {evaluation.modelAnswer}
          </p>
        </div>

        {/* Court Decision */}
        <div className="card" style={{ marginBottom: 'var(--space-3)', borderLeft: '3px solid var(--saffron)' }}>
          <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--saffron-dark)', marginBottom: 'var(--space-2)' }}>⚖️ Court's Likely Decision</h3>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>
            {evaluation.courtDecision}
          </p>
        </div>

        {/* UPSC Tip */}
        <div className="simplified-text" style={{ marginBottom: 'var(--space-4)' }}>
          <strong>🎓 UPSC Tip:</strong> {evaluation.civilServiceTip}
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <button className="btn btn-primary btn-lg" style={{ flex: 1 }} onClick={handleReset}>
            <RotateCcw size={16} /> Try Another
          </button>
          <button className="btn btn-outline btn-lg" style={{ flex: 1 }} onClick={() => navigate('/')}>
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return null;
}
