import React, { useState, useEffect } from 'react';

interface Section {
  id: string;
  name: string;
  color: string;
}

const VolumeScrollbar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);

  const sections: Section[] = [
    { id: 'home', name: 'Home', color: 'bg-accent' },
    { id: 'work', name: 'Work', color: 'bg-accent' },
    { id: 'blog', name: 'Blog', color: 'bg-accent' },
    { id: 'about', name: 'About', color: 'bg-accent' },
    { id: 'footer', name: 'Footer', color: 'bg-accent' },
  ];

  // Number of bars to display
  const numberOfBars = 40;

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = scrolled / documentHeight;

      setScrollProgress(progress);

      // Detect active section
      const sectionElements = sections.map(s => document.getElementById(s.id));
      let currentSection = 0;

      sectionElements.forEach((element, index) => {
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
            currentSection = index;
          }
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate bar height based on position and scroll progress
  const getBarHeight = (index: number) => {
    const barPosition = index / (numberOfBars - 1); // 0 to 1

    // Bars grow taller as you scroll down
    // Early bars are short, later bars are tall
    const baseHeight = 20 + (barPosition * 60); // 20% to 80% height

    // Dim bars that haven't been scrolled to yet
    if (barPosition > scrollProgress) {
      return baseHeight * 0.3; // Dimmed bars are 30% of their potential height
    }

    return baseHeight;
  };

  // Check if bar should be highlighted based on active section
  const isBarInActiveSection = (index: number) => {
    const barPosition = index / (numberOfBars - 1);
    const sectionSize = 1 / sections.length;
    const sectionStart = activeSection * sectionSize;
    const sectionEnd = (activeSection + 1) * sectionSize;

    return barPosition >= sectionStart && barPosition <= sectionEnd;
  };

  return (
    <div className="fixed right-6 top-0 h-screen flex items-center z-50 pointer-events-none">
      <div className="flex items-end gap-[2px] h-full py-20">
        {Array.from({ length: numberOfBars }).map((_, index) => {
          const height = getBarHeight(index);
          const isActive = isBarInActiveSection(index);
          const barPosition = index / (numberOfBars - 1);
          const isPassed = barPosition <= scrollProgress;

          return (
            <div
              key={index}
              className={`w-[3px] rounded-full transition-all duration-300 ${
                isPassed
                  ? isActive
                    ? 'bg-accent'
                    : 'bg-muted-foreground/40'
                  : 'bg-muted-foreground/10'
              }`}
              style={{
                height: `${height}%`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default VolumeScrollbar;
