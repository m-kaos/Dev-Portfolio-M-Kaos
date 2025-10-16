import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations/translations';
import picture from '../imgs/image.png';

const About: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language].about;

  return (
    <section className="min-h-screen px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-16">
          <h2 className="text-6xl md:text-8xl font-light">02</h2>
          <h3 className="text-3xl md:text-4xl font-light">{t.title}</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <div className="w-full h-96 bg-gray-200 rounded-2xl mb-8 flex items-center justify-center">
              <img src={picture} alt="Mauricio Guerra Navarro" className="w-full rounded-2xl h-full object-cover" />
            </div>
            <p className="text-lg leading-relaxed">
              {t.intro}
            </p>

            <p className="text-lg leading-relaxed text-muted-foreground">
              {t.bio}
            </p>
          </div>

          <div className="space-y-6">


            <div className="pt-6">
              <h4 className="text-xl font-light mb-4">{t.skillsTitle}</h4>
              <div className="flex flex-wrap gap-2">
                {['HTML5', 'CSS3', 'Tailwind', 'React', 'Javascript', 'Typescript', 'Next.js', 'Docker', 'AWS', 'Google Cloud', 'Firebase', 'AI Agents', 'n8n', 'Chatbots', 'Automation', 'SEO', 'Branding'].map(
                  (skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm hover:bg-accent/10 hover:text-accent transition-colors cursor-pointer"
                    >
                      {skill}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="pt-6">
              <h4 className="text-xl font-light mb-4">{t.servicesTitle}</h4>
              <div className="space-y-4">
                <div className="border-l-2 border-accent pl-4 hover:border-accent/50 transition-colors">
                  <p className="font-medium">{t.services.automation.title}</p>
                  <p className="text-sm text-muted-foreground">{t.services.automation.description}</p>
                </div>
                <div className="border-l-2 border-accent pl-4 hover:border-accent/50 transition-colors">
                  <p className="font-medium">{t.services.webDev.title}</p>
                  <p className="text-sm text-muted-foreground">{t.services.webDev.description}</p>
                </div>
                <div className="border-l-2 border-accent pl-4 hover:border-accent/50 transition-colors">
                  <p className="font-medium">{t.services.appDev.title}</p>
                  <p className="text-sm text-muted-foreground">{t.services.appDev.description}</p>
                </div>
                <div className="border-l-2 border-border pl-4 hover:border-accent/20 transition-colors">
                  <p className="font-medium">{t.services.seo.title}</p>
                  <p className="text-sm text-muted-foreground">{t.services.seo.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
