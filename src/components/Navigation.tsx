import React, { useState } from 'react';
import { Search, PanelLeftClose, PanelLeft, Home, Briefcase, PenLine, Mail, Send } from 'lucide-react';
import { useNavigation } from '../contexts/NavigationContext';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations/translations';
import LanguageSelector from './LanguageSelector';
import QuickDM from './QuickDM';

const Navigation: React.FC = () => {
  const { isCollapsed, toggleCollapse } = useNavigation();
  const { language } = useLanguage();
  const [isDMOpen, setIsDMOpen] = useState(false);
  const t = translations[language].nav;

  const menuItems = [
    { name: t.home, href: '#home', icon: Home },
    { name: t.work, href: '#work', icon: Briefcase },
    { name: t.about, href: '#about', icon: Mail },
    { name: t.blog, href: '#blog', icon: PenLine },
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <>
      {/* Left Navigation Panel - Smooth slide animation */}
      <nav
        className={`fixed left-0 top-0 h-screen w-58 bg-secondary transition-all duration-500 ease-in-out z-40 ${
          isCollapsed ? '-translate-x-full opacity-0' : 'translate-x-0 opacity-100'
        }`}
      >
        <div className="h-full w-52 flex flex-col justify-between p-6">
          {/* Top Section */}
          <div>
            {/* Search and Toggle buttons - Search far left, Toggle far right */}
            <div className="flex items-center justify-between mb-12">
              <button className="p-2 hover:bg-accent/10 hover:text-accent rounded-lg transition-colors">
                <Search className="w-5 h-5" />
              </button>
              <button
                onClick={toggleCollapse}
                className="p-2 hover:bg-accent/10 hover:text-accent rounded-lg transition-colors"
                aria-label="Toggle navigation"
              >
                <PanelLeftClose className="w-5 h-5" />
              </button>
            </div>

            {/* Menu Items */}
            <ul className="space-y-6">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      onClick={(e) => handleSmoothScroll(e, item.href)}
                      className="flex items-center gap-3 text-muted-foreground hover:text-accent transition-colors group"
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Bottom Section */}
          <div className="space-y-4">
            {/* Language Selector */}
            <div className="pb-4 border-b border-border">
              <LanguageSelector />
            </div>

            <button
              onClick={() => setIsDMOpen(true)}
              className="flex items-center gap-3 text-muted-foreground hover:text-accent transition-colors"
            >
              <Send className="w-5 h-5" />
              <span className="font-medium">{t.quickDM}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Collapsed Nav Button - Shows when nav is collapsed */}
      <button
        onClick={toggleCollapse}
        className={`fixed left-4 top-4 z-50 p-3 bg-secondary border border-border rounded-lg hover:bg-accent/10 hover:text-accent hover:border-accent transition-all duration-300 ${
          isCollapsed ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20 pointer-events-none'
        }`}
        aria-label="Open navigation"
      >
        <PanelLeft className="w-5 h-5" />
      </button>

      {/* Right Panel - No border - Hidden on mobile */}
      <aside className="hidden md:block fixed right-0 top-0 h-screen w-24 bg-secondary z-40" />

      {/* Quick DM Modal */}
      <QuickDM isOpen={isDMOpen} onClose={() => setIsDMOpen(false)} />
    </>
  );
};

export default Navigation;
