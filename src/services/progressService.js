const STORAGE_KEY = 'kanoonSikho_progress';

function getProgress() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error('Error reading progress:', e);
  }
  return {
    lawsRead: [],
    lawsBookmarked: [],
    quizScores: [],
    studyStreak: 0,
    lastStudyDate: null,
    notificationTime: '08:00',
    totalStudyTime: 0,
    badges: [],
    settings: {
      voiceSpeed: 1,
      theme: 'light',
      apiKey: '',
    },
  };
}

function saveProgress(progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Error saving progress:', e);
  }
}

export function markLawAsRead(lawId) {
  const progress = getProgress();
  if (!progress.lawsRead.includes(lawId)) {
    progress.lawsRead.push(lawId);
  }
  updateStreak(progress);
  checkBadges(progress);
  saveProgress(progress);
  return progress;
}

export function toggleBookmark(lawId) {
  const progress = getProgress();
  const index = progress.lawsBookmarked.indexOf(lawId);
  if (index === -1) {
    progress.lawsBookmarked.push(lawId);
  } else {
    progress.lawsBookmarked.splice(index, 1);
  }
  saveProgress(progress);
  return progress;
}

export function isBookmarked(lawId) {
  return getProgress().lawsBookmarked.includes(lawId);
}

export function isRead(lawId) {
  return getProgress().lawsRead.includes(lawId);
}

export function getReadLaws() {
  return getProgress().lawsRead;
}

export function getBookmarkedLaws() {
  return getProgress().lawsBookmarked;
}

export function addQuizScore(quizId, score, category) {
  const progress = getProgress();
  progress.quizScores.push({
    quizId,
    score,
    category,
    date: new Date().toISOString(),
  });
  updateStreak(progress);
  checkBadges(progress);
  saveProgress(progress);
  return progress;
}

export function getQuizScores() {
  return getProgress().quizScores;
}

function updateStreak(progress) {
  const today = new Date().toDateString();
  const lastDate = progress.lastStudyDate ? new Date(progress.lastStudyDate).toDateString() : null;

  if (lastDate === today) return;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  if (lastDate === yesterday.toDateString()) {
    progress.studyStreak += 1;
  } else if (lastDate !== today) {
    progress.studyStreak = 1;
  }

  progress.lastStudyDate = new Date().toISOString();
}

export function getStreak() {
  const progress = getProgress();
  const today = new Date().toDateString();
  const lastDate = progress.lastStudyDate ? new Date(progress.lastStudyDate).toDateString() : null;

  if (!lastDate) return 0;
  if (lastDate === today) return progress.studyStreak;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  if (lastDate === yesterday.toDateString()) return progress.studyStreak;

  return 0;
}

export function getStudyStats() {
  const progress = getProgress();
  return {
    lawsRead: progress.lawsRead.length,
    lawsBookmarked: progress.lawsBookmarked.length,
    quizzesTaken: progress.quizScores.length,
    averageScore: progress.quizScores.length > 0
      ? Math.round(progress.quizScores.reduce((sum, q) => sum + q.score, 0) / progress.quizScores.length)
      : 0,
    streak: getStreak(),
    badges: progress.badges,
  };
}

const BADGE_DEFINITIONS = [
  { id: 'first_law', name: 'First Step', icon: '🌟', description: 'Read your first law', condition: p => p.lawsRead.length >= 1 },
  { id: 'ten_laws', name: 'Curious Mind', icon: '📖', description: 'Read 10 laws', condition: p => p.lawsRead.length >= 10 },
  { id: 'twenty_five_laws', name: 'Legal Scholar', icon: '🎓', description: 'Read 25 laws', condition: p => p.lawsRead.length >= 25 },
  { id: 'first_quiz', name: 'Quiz Starter', icon: '❓', description: 'Complete your first quiz', condition: p => p.quizScores.length >= 1 },
  { id: 'quiz_champion', name: 'Quiz Champion', icon: '🏆', description: 'Score 90%+ in 5 quizzes', condition: p => p.quizScores.filter(q => q.score >= 90).length >= 5 },
  { id: 'streak_7', name: '7-Day Streak', icon: '🔥', description: 'Study for 7 days in a row', condition: p => p.studyStreak >= 7 },
  { id: 'streak_30', name: '30-Day Streak', icon: '💪', description: 'Study for 30 days in a row', condition: p => p.studyStreak >= 30 },
  { id: 'bookworm', name: 'Bookworm', icon: '🔖', description: 'Bookmark 10 laws for revision', condition: p => p.lawsBookmarked.length >= 10 },
];

function checkBadges(progress) {
  BADGE_DEFINITIONS.forEach(badge => {
    if (!progress.badges.includes(badge.id) && badge.condition(progress)) {
      progress.badges.push(badge.id);
    }
  });
}

export function getAllBadges() {
  const progress = getProgress();
  return BADGE_DEFINITIONS.map(badge => ({
    ...badge,
    earned: progress.badges.includes(badge.id),
    condition: undefined,
  }));
}

export function getSettings() {
  return getProgress().settings;
}

export function updateSettings(newSettings) {
  const progress = getProgress();
  progress.settings = { ...progress.settings, ...newSettings };
  saveProgress(progress);
  return progress.settings;
}

export function resetProgress() {
  localStorage.removeItem(STORAGE_KEY);
}

export function getFullProgress() {
  return getProgress();
}
