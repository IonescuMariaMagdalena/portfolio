import React, { useEffect, useState } from "react";
import {
  Main, Timeline, Expertise, Project, Contact, Navigation, Footer,
} from "./components";
import FadeIn from './components/FadeIn';
import './index.scss';
import Certifications from "./components/Certifications";
import Splash from "./components/Splash";
import About from "./components/About";


type ThemeMode = 'dark' | 'light';

export default function App() {
  const [mode, setMode] = useState<ThemeMode>('dark');
  const [showSplash, setShowSplash] = useState(true);

  const handleModeChange = () => setMode(m => (m === 'dark' ? 'light' : 'dark'));

  useEffect(() => {
    // blochează scroll-ul cât timp e splash
    if (showSplash) document.body.classList.add('no-scroll');
    else document.body.classList.remove('no-scroll');
    return () => document.body.classList.remove('no-scroll');
  }, [showSplash]);

  useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);

  return (
    <>
      {showSplash && <Splash onFinish={() => setShowSplash(false)} />}
      <div className={`main-container ${mode === 'dark' ? 'dark-mode' : 'light-mode'}`} style={{ opacity: showSplash ? 0 : 1, transition: 'opacity .4s ease .1s' }}>
        <Navigation parentToChild={{ mode }} modeChange={handleModeChange} />
        <FadeIn transitionDuration={700}>
          <Main />
          <About />
          <Expertise />
          <Certifications />
          <Timeline />
          <Project />
          <Contact />
        </FadeIn>
        <Footer />
      </div>
    </>
  );
}
