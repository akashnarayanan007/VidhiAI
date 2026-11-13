import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Clock, CheckCircle, XCircle, RotateCcw, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAllLaws, getLawById, categories } from '../services/lawService';
import { generateQuiz, isAIAvailable } from '../services/aiService';
import { addQuizScore } from '../services/progressService';

export default function QuizScreen() {
  const { lawId } = useParams();
  const navigate = useNavigate();

  const [stage, setStage] = useState('setup'); // setup | loading | quiz | result
  const [selectedLaw, setSelectedLaw] = useState(lawId || '');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [difficulty, setDifficulty] = useState('Intermediate');
  const [questionCount, setQuestionCount] = useState(5);
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [timer, setTimer] = useState(30);
  const [useTimer, setUseTimer] = useState(false);
  const [error, setError] = useState('');

  const allLaws = getAllLaws();

  useEffect(() => {
    if (lawId) {
      setSelectedLaw(lawId);
    }
  }, [lawId]);

  useEffect(() => {
    let interval;
    if (stage === 'quiz' && useTimer && timer > 0 && selectedAnswer === null) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    }
    if (timer === 0 && selectedAnswer === null) {
      handleAnswer(-1); // Time's up
    }
    return () => clearInterval(interval);
  }, [stage, timer, useTimer, selectedAnswer]);

  const handleStartQuiz = async () => {
    setError('');
    setStage('loading');

    try {
      let law;
      if (selectedLaw) {
        law = getLawById(selectedLaw);
      } else if (selectedCategory) {
        const categoryLaws = allLaws.filter(l => l.category === selectedCategory);
        law = categoryLaws[Math.floor(Math.random() * categoryLaws.length)];
      } else {
        law = allLaws[Math.floor(Math.random() * allLaws.length)];
      }

      if (!law) {
        setError('Could not find a suitable law for the quiz.');
        setStage('setup');
        return;
      }

      const quiz = await generateQuiz(law, difficulty, questionCount);
      setQuestions(quiz.map(q => ({ ...q, lawId: law.id, lawName: law.shortName, section: law.sectionNumber })));
      setCurrentQ(0);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setAnswers([]);
      setTimer(30);
      setStage('quiz');
    } catch (err) {
      setError(err.message || 'Failed to generate quiz. Please try again.');
      setStage('setup');
    }
  };

  const handleAnswer = (index) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    setShowExplanation(true);

    const isCorrect = index === questions[currentQ].correctIndex;
    setAnswers([...answers, { questionIndex: currentQ, selected: index, correct: isCorrect }]);
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setTimer(30);
    } else {
      // Calculate score
      const correctCount = [...answers, ...(selectedAnswer !== null ? [] : [])].filter(a => a.correct).length;
      const score = Math.round((correctCount / questions.length) * 100);
      addQuizScore(`quiz_${Date.now()}`, score, selectedCategory || 'Mixed');
      setStage('result');
    }
  };

  const correctCount = answers.filter(a => a.correct).length;
  const score = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;

  if (stage === 'setup') {
    return (
      <div className="screen">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
          <button className="btn btn-icon btn-ghost" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
          </button>
          <h1 style={{ fontSize: 'var(--text-xl)', fontWeight: 700 }}>❓ Quiz</h1>
        </div>

        {error && (
          <div className="punishment-box" style={{ marginBottom: 'var(--space-4)' }}>
            {error}
          </div>
        )}

        <div className="card" style={{ marginBottom: 'var(--space-4)' }}>
          <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 700, marginBottom: 'var(--space-3)' }}>Choose a Topic</h3>

          <label style={{ fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: 'var(--space-2)', display: 'block', color: 'var(--text-secondary)' }}>
            Specific Law (optional)
          </label>
          <select
            value={selectedLaw}
            onChange={e => { setSelectedLaw(e.target.value); setSelectedCategory(''); }}
            style={{
              width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)',
              border: '1.5px solid var(--border-default)', background: 'var(--bg-card)', color: 'var(--text-primary)',
              fontSize: 'var(--text-sm)', marginBottom: 'var(--space-3)', outline: 'none',
            }}
          >
            <option value="">Any law</option>
            {allLaws.map(law => (
              <option key={law.id} value={law.id}>{law.sectionNumber} — {law.title}</option>
            ))}
          </select>

          <label style={{ fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: 'var(--space-2)', display: 'block', color: 'var(--text-secondary)' }}>
            Or Category
          </label>
          <select
            value={selectedCategory}
            onChange={e => { setSelectedCategory(e.target.value); setSelectedLaw(''); }}
            style={{
              width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)',
              border: '1.5px solid var(--border-default)', background: 'var(--bg-card)', color: 'var(--text-primary)',
              fontSize: 'var(--text-sm)', marginBottom: 'var(--space-3)', outline: 'none',
            }}
          >
            <option value="">Any category</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
            ))}
          </select>
        </div>

        <div className="card" style={{ marginBottom: 'var(--space-4)' }}>
          <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 700, marginBottom: 'var(--space-3)' }}>Settings</h3>

          <label style={{ fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: 'var(--space-2)', display: 'block', color: 'var(--text-secondary)' }}>
            Difficulty
          </label>
          <div className="filter-chips" style={{ marginBottom: 'var(--space-3)' }}>
            {['Beginner', 'Intermediate', 'Advanced'].map(d => (
              <button key={d} className={`filter-chip ${difficulty === d ? 'active' : ''}`} onClick={() => setDifficulty(d)}>
                {d}
              </button>
            ))}
          </div>

          <label style={{ fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: 'var(--space-2)', display: 'block', color: 'var(--text-secondary)' }}>
            Questions: {questionCount}
          </label>
          <input
            type="range" min={3} max={10} value={questionCount}
            onChange={e => setQuestionCount(Number(e.target.value))}
            style={{ width: '100%', marginBottom: 'var(--space-3)', accentColor: 'var(--primary)' }}
          />

          <div className="setting-item" style={{ border: 'none', padding: 'var(--space-2) 0' }}>
            <span style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>⏱ Timer (30s per question)</span>
            <button className={`toggle ${useTimer ? 'active' : ''}`} onClick={() => setUseTimer(!useTimer)} />
          </div>
        </div>

        {!isAIAvailable() && (
          <div className="simplified-text" style={{ marginBottom: 'var(--space-4)', borderLeftColor: 'var(--saffron)' }}>
            💡 <strong>Tip:</strong> Add your Claude API key in Settings to get AI-generated questions. Without it, you'll get pre-built questions.
          </div>
        )}

        <button className="btn btn-primary btn-block btn-lg" onClick={handleStartQuiz}>
          <Zap size={18} /> Start Quiz
        </button>
      </div>
    );
  }

  if (stage === 'loading') {
    return (
      <div className="screen" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <div className="loading-spinner" />
        <p style={{ marginTop: 'var(--space-4)', color: 'var(--text-secondary)', fontWeight: 500 }}>Generating quiz questions...</p>
      </div>
    );
  }

  if (stage === 'result') {
    return (
      <div className="screen">
        <div className="score-card">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 10 }}
          >
            <div style={{ fontSize: '4rem', marginBottom: 'var(--space-2)' }}>
              {score >= 80 ? '🏆' : score >= 60 ? '👍' : score >= 40 ? '📚' : '💪'}
            </div>
            <div className="score-value">{score}%</div>
            <div className="score-label">
              {correctCount} out of {questions.length} correct
            </div>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)', marginTop: 'var(--space-2)' }}>
              {score >= 80 ? 'Excellent! You have a strong understanding of this law.' :
               score >= 60 ? 'Good job! A few more revisions and you\'ll master this.' :
               score >= 40 ? 'Not bad, but there\'s room for improvement. Review the law again.' :
               'Keep studying! Read the law details and try again.'}
            </p>
          </motion.div>

          <div style={{ marginTop: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <button className="btn btn-primary btn-block" onClick={() => { setStage('setup'); setAnswers([]); }}>
              <RotateCcw size={16} /> Take Another Quiz
            </button>
            <button className="btn btn-outline btn-block" onClick={() => navigate('/')}>
              Go Home
            </button>
          </div>
        </div>

        {/* Answer Review */}
        <div style={{ marginTop: 'var(--space-4)' }}>
          <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 700, marginBottom: 'var(--space-3)' }}>Review Answers</h3>
          {questions.map((q, i) => {
            const answer = answers[i];
            return (
              <div key={i} className="card" style={{ marginBottom: 'var(--space-3)', borderLeft: `3px solid ${answer?.correct ? 'var(--green)' : 'var(--error)'}` }}>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', fontWeight: 600, marginBottom: 4 }}>
                  Q{i + 1} {answer?.correct ? '✅' : '❌'}
                </div>
                <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>{q.question}</p>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--green)', fontWeight: 600 }}>
                  ✓ {q.options[q.correctIndex]}
                </p>
                {!answer?.correct && answer?.selected >= 0 && (
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--error)', fontWeight: 600, marginTop: 2 }}>
                    ✗ Your answer: {q.options[answer.selected]}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Quiz stage
  const q = questions[currentQ];
  const letters = ['A', 'B', 'C', 'D'];

  return (
    <div className="screen">
      {/* Progress Bar */}
      <div style={{ marginBottom: 'var(--space-4)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
          <button className="btn btn-icon btn-ghost btn-icon-sm" onClick={() => setStage('setup')}>
            <ArrowLeft size={18} />
          </button>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', fontWeight: 600 }}>
            {q?.lawName} • {q?.section}
          </span>
          {useTimer && (
            <div className={`quiz-timer ${timer <= 10 ? 'warning' : ''}`}>
              <Clock size={14} /> {timer}s
            </div>
          )}
        </div>
        <div className="progress-bar" style={{ height: 4 }}>
          <div className="progress-bar-fill" style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }} />
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
        >
          <div className="quiz-question-number">Question {currentQ + 1} of {questions.length}</div>
          <div className="quiz-question">{q?.question}</div>

          {/* Options */}
          <div style={{ marginBottom: 'var(--space-4)' }}>
            {q?.options?.map((opt, i) => {
              let className = 'quiz-option';
              if (selectedAnswer !== null) {
                if (i === q.correctIndex) className += ' correct';
                else if (i === selectedAnswer) className += ' wrong';
              } else if (selectedAnswer === i) {
                className += ' selected';
              }

              return (
                <motion.div
                  key={i}
                  className={className}
                  onClick={() => handleAnswer(i)}
                  whileHover={selectedAnswer === null ? { scale: 1.01 } : {}}
                  whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
                >
                  <div className="quiz-option-letter">{letters[i]}</div>
                  <div className="quiz-option-text">{opt}</div>
                  {selectedAnswer !== null && i === q.correctIndex && <CheckCircle size={18} color="var(--green)" />}
                  {selectedAnswer !== null && i === selectedAnswer && i !== q.correctIndex && <XCircle size={18} color="var(--error)" />}
                </motion.div>
              );
            })}
          </div>

          {/* Explanation */}
          <AnimatePresence>
            {showExplanation && q?.explanation && (
              <motion.div
                className="quiz-explanation"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                💡 <strong>Explanation:</strong> {q.explanation}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Next Button */}
          {selectedAnswer !== null && (
            <motion.button
              className="btn btn-primary btn-block btn-lg"
              style={{ marginTop: 'var(--space-4)' }}
              onClick={handleNext}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {currentQ < questions.length - 1 ? 'Next Question →' : 'See Results'}
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
