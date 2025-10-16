import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import MyWork from './components/MyWork';
import About from './components/About';
import Blog from './components/Blog';
import ThemeSelector from './components/ThemeSelector';
import CustomScrollbar from './components/CustomScrollbar';
import WorkAdmin from './components/WorkAdmin';
import { NavigationProvider, useNavigation } from './contexts/NavigationContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { ShaderAnimation } from "./components/shader-lines";

function MainLayout() {
  const { isCollapsed } = useNavigation();
  const { theme } = useTheme();

  return (
    <div className="min-h-screen bg-secondary relative">
      {/* Shader Background - Only in glass mode */}
      {theme === 'glass' && (
        <div className="fixed inset-0 z-0">
          <ShaderAnimation />
        </div>
      )}

      {/* Side Panels Navigation */}
      <Navigation />

      {/* Theme Selector */}
      <ThemeSelector />

      {/* Custom Scrollbar */}
      <CustomScrollbar lineCount={50} activeLinesCount={3} />

      {/* Main Content Area - Padding container */}
      <main
        className={`relative z-10 min-h-screen py-0 md:py-6 transition-all duration-300 ease-in-out ${
          isCollapsed ? 'ml-0 md:ml-6 mr-0 md:mr-24' : 'ml-0 md:ml-56 mr-0 md:mr-24'
        }`}
      >
        {/* Content Card - Changes based on theme */}
        <div
          className={`min-h-screen rounded-none md:rounded-2xl overflow-hidden shadow-sm transition-all duration-300 ${
            theme === 'glass'
              ? 'glass-panel'
              : 'bg-background'
          }`}
        >
          <section id="home">
            <Hero />
          </section>

          <section id="work">
            <MyWork />
          </section>

          <section id="about">
            <About />
          </section>

          {/*<section id="blog">
            <Blog />
          </section>*/}

          {/* Footer */}
          <footer id="footer" className="px-6 py-12 border-t border-border">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                  <p className="text-muted-foreground">
                    © 2025 Developer Portfolio. All rights reserved.
                  </p>
                </div>
                <div className="flex gap-6">
                  <a href="https://github.com/m-kaos" className="text-muted-foreground hover:text-accent transition-colors">
                    GitHub
                  </a>
                  <a href="https://x.com/war_navarro" className="text-muted-foreground hover:text-accent transition-colors">
                    Twitter
                  </a>
                  <a href="https://www.linkedin.com/in/mauricio-guerra-955628273/" className="text-muted-foreground hover:text-accent transition-colors">
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}

function AppContent() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/admin/work" element={<WorkAdmin />} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <NavigationProvider>
          <AppContent />
        </NavigationProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
