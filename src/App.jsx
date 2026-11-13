import { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter as Router, Routes, Route, NavLink, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { Home, BookOpen, HelpCircle, Bookmark, Settings, Scale, Landmark, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Screens
import LandingPage from './screens/LandingPage';
import HomeScreen from './screens/HomeScreen';
import LawCategoryScreen from './screens/LawCategoryScreen';
import LawDetailScreen from './screens/LawDetailScreen';
import QuizScreen from './screens/QuizScreen';
import CourtScenarioScreen from './screens/CourtScenarioScreen';
import BookmarksScreen from './screens/BookmarksScreen';
import SettingsScreen from './screens/SettingsScreen';
import UPSCModeScreen from './screens/UPSCModeScreen';
import ConstitutionHome from './screens/ConstitutionHome';
import ConstitutionArticleScreen from './screens/ConstitutionArticleScreen';
import ConstitutionWrits from './screens/ConstitutionWrits';
import ConstitutionalBodies from './screens/ConstitutionalBodies';
import ConstitutionSchedules from './screens/ConstitutionSchedules';
import UPSCAmendments from './screens/UPSCAmendments';
import UPSCLandmarkCases from './screens/UPSCLandmarkCases';
import UPSCInterviewPrep from './screens/UPSCInterviewPrep';
import UPSCOfTheDay from './screens/UPSCOfTheDay';

// Desktop Components
import DesktopSidebar from './components/DesktopSidebar';
import DesktopHeader from './components/DesktopHeader';
import NyayaBot from './components/NyayaBot';

// Services
import { getSettings, updateSettings } from './services/progressService';
import { getCurrentUser, logout } from './services/authService';
import './index.css';

export const AppContext = createContext();

export function useAppContext() {
  return useContext(AppContext);
}

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(() => getCurrentUser());
  const [refreshKey, setRefreshKey] = useState(0);
  const [theme, setTheme] = useState(() => getSettings().theme || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Keep currentUser synced
  useEffect(() => {
    setCurrentUser(getCurrentUser());
  }, [location.pathname]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    updateSettings({ theme: newTheme });
  };

  const handleLoginSuccess = () => {
    const user = getCurrentUser();
    setCurrentUser(user);
    setRefreshKey((k) => k + 1);
    navigate('/');
  };

  const handleLogout = () => {
    logout();
    setCurrentUser(null);
    setRefreshKey((k) => k + 1);
    navigate('/landing');
  };

  const refresh = () => {
    setCurrentUser(getCurrentUser());
    setRefreshKey((k) => k + 1);
  };

  const contextValue = {
    refreshKey,
    refresh,
    theme,
    toggleTheme,
    currentUser,
    handleLogout,
  };

  const isLandingRoute = location.pathname === '/landing';

  // If user is on /landing, show the landing page
  if (isLandingRoute) {
    return (
      <AppContext.Provider value={contextValue}>
        <LandingPage onLoginSuccess={handleLoginSuccess} />
      </AppContext.Provider>
    );
  }

  // If no user is logged in and trying to access root or protected pages, show Landing Page
  if (!currentUser && location.pathname === '/') {
    return (
      <AppContext.Provider value={contextValue}>
        <LandingPage onLoginSuccess={handleLoginSuccess} />
      </AppContext.Provider>
    );
  }

  return (
    <AppContext.Provider value={contextValue}>
      <div className="desktop-app-layout">
        {/* Desktop Sidebar (hidden on mobile via CSS) */}
        <DesktopSidebar currentUser={currentUser} onLogout={handleLogout} />

        {/* Main Content Area */}
        <div className="desktop-main-wrapper">
          <DesktopHeader currentUser={currentUser} onLogout={handleLogout} />

          <main className="desktop-content-canvas">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
                className="desktop-page-container"
              >
                <Routes>
                  <Route path="/" element={<HomeScreen />} />
                  <Route path="/landing" element={<LandingPage onLoginSuccess={handleLoginSuccess} />} />
                  <Route path="/category/:categoryId" element={<LawCategoryScreen />} />
                  <Route path="/law/:lawId" element={<LawDetailScreen />} />
                  <Route path="/quiz" element={<QuizScreen />} />
                  <Route path="/quiz/:lawId" element={<QuizScreen />} />
                  <Route path="/scenario" element={<CourtScenarioScreen />} />
                  <Route path="/scenario/:lawId" element={<CourtScenarioScreen />} />
                  <Route path="/bookmarks" element={<BookmarksScreen />} />
                  <Route path="/settings" element={<SettingsScreen />} />
                  <Route path="/constitution" element={<ConstitutionHome />} />
                  <Route path="/constitution/article/:articleId" element={<ConstitutionArticleScreen />} />
                  <Route path="/constitution/writs" element={<ConstitutionWrits />} />
                  <Route path="/constitution/bodies" element={<ConstitutionalBodies />} />
                  <Route path="/constitution/schedules" element={<ConstitutionSchedules />} />
                  <Route path="/upsc" element={<UPSCModeScreen />} />
                  <Route path="/upsc/amendments" element={<UPSCAmendments />} />
                  <Route path="/upsc/cases" element={<UPSCLandmarkCases />} />
                  <Route path="/upsc/interview" element={<UPSCInterviewPrep />} />
                  <Route path="/upsc/daily" element={<UPSCOfTheDay />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </motion.div>
            </AnimatePresence>
          </main>
        </div>

        {/* Bottom Tab Bar (Only visible on small mobile screens) */}
        <nav className="tab-bar mobile-tab-bar">
          <NavLink to="/" className={({ isActive }) => `tab-bar-item ${isActive ? 'active' : ''}`} end>
            <Home className="tab-bar-icon" size={20} />
            <span>Home</span>
          </NavLink>
          <NavLink to="/constitution" className={({ isActive }) => `tab-bar-item ${isActive ? 'active' : ''}`}>
            <Landmark className="tab-bar-icon" size={20} />
            <span>Constitution</span>
          </NavLink>
          <NavLink to="/quiz" className={({ isActive }) => `tab-bar-item ${isActive ? 'active' : ''}`}>
            <HelpCircle className="tab-bar-icon" size={20} />
            <span>Quiz</span>
          </NavLink>
          <NavLink to="/upsc" className={({ isActive }) => `tab-bar-item ${isActive ? 'active' : ''}`}>
            <Award className="tab-bar-icon" size={20} />
            <span>UPSC</span>
          </NavLink>
          <NavLink to="/bookmarks" className={({ isActive }) => `tab-bar-item ${isActive ? 'active' : ''}`}>
            <Bookmark className="tab-bar-icon" size={20} />
            <span>Saved</span>
          </NavLink>
          <NavLink to="/settings" className={({ isActive }) => `tab-bar-item ${isActive ? 'active' : ''}`}>
            <Settings className="tab-bar-icon" size={20} />
            <span>Settings</span>
          </NavLink>
        </nav>

        {/* NyayaBot AI Floating Assistant */}
        <NyayaBot />
      </div>
    </AppContext.Provider>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
