// Authentication Service for VidhiAI (VidhiMitra) Desktop

export const DEMO_USER = {
  id: 'demo-user-01',
  name: 'Adv. Akash Sharma',
  email: 'demo@vidhiai.in',
  password: 'vidhi2026',
  role: 'UPSC Aspirant & Legal Scholar',
  targetExam: 'UPSC CSE 2026 / Judiciary Exam',
  avatar: '⚖️',
  initials: 'AS',
  joinedDate: 'November 2024',
};

const AUTH_STORAGE_KEY = 'vidhi_auth_user';

export function getCurrentUser() {
  try {
    const data = localStorage.getItem(AUTH_STORAGE_KEY) || localStorage.getItem('kanoon_auth_user');
    if (data) {
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading auth state:', err);
  }
  return null;
}

export function login(email, password) {
  const cleanEmail = (email || '').trim().toLowerCase();
  const cleanPass = (password || '').trim();

  // If matches demo credentials (new or legacy)
  if (
    (cleanEmail === DEMO_USER.email.toLowerCase() && cleanPass === DEMO_USER.password) ||
    (cleanEmail === 'demo@kanoonsikho.in' && cleanPass === 'kanoon2026')
  ) {
    return loginAsDemo();
  }

  // Allow standard user login if credentials provided
  if (cleanEmail && cleanPass) {
    const user = {
      id: 'user-' + Date.now(),
      name: cleanEmail.split('@')[0].replace(/[._]/g, ' ').toUpperCase(),
      email: cleanEmail,
      role: 'Legal Scholar',
      targetExam: 'General Law & Competitive Exams',
      avatar: '🏛️',
      initials: cleanEmail.slice(0, 2).toUpperCase(),
      joinedDate: new Date().toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }),
    };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    return { success: true, user };
  }

  return { success: false, error: 'Please provide a valid email and password' };
}

export function loginAsDemo() {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(DEMO_USER));
  return { success: true, user: DEMO_USER };
}

export function register(name, email, password, role = 'UPSC Aspirant') {
  const cleanEmail = (email || '').trim().toLowerCase();
  const user = {
    id: 'user-' + Date.now(),
    name: name.trim() || 'Legal Learner',
    email: cleanEmail,
    role: role || 'UPSC Aspirant',
    targetExam: 'UPSC CSE & Judicial Services',
    avatar: '📖',
    initials: (name || cleanEmail).slice(0, 2).toUpperCase(),
    joinedDate: new Date().toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }),
  };
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  return { success: true, user };
}

export function logout() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
  return true;
}

