import ProfileCard from "./ProfileCard/ProfileCard";
import Experiances from "./Experiances/Experiances";
import Projects from "./Projects/Projects";
import Skills from "./Skills/Skills";
import Contact from "./Contact/Contact";
import Navbar from "./Navbar/Navbar";

import "./App.css";
import { motion, useInView } from "motion/react";
import DarkVeil from "./DarkVeil/DarkVeil";
import { useRef } from "react";

// ScrollSection component with intersection observer animations
const ScrollSection = ({ children, className = "", delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true, // Only animate once when first entering viewport
    margin: "0px 0px -100px 0px",
    amount: 0.1,
  });

  return (
    <motion.section
      ref={ref}
      className={`scroll-section ${className}`}
      initial={{
        opacity: 0,
        scale: 0.95,
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              scale: 1,
              transition: {
                duration: 0.8,
                delay: delay,
                ease: [0.4, 0, 0.2, 1],
              },
            }
          : undefined
      }
    >
      {children}
    </motion.section>
  );
};

function App() {
  return (
    <>
      <div style={{ 
        position: "fixed", 
        top: 0, 
        left: 0, 
        width: "100%", 
        height: "100vh", 
        zIndex: -1 
      }}>
        <DarkVeil />
      </div>

      <Navbar />

      <div className="scroll-container">
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.8,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          <ProfileCard />
        </motion.div>

        <main className="main-content">
          <ScrollSection className="section-experiences" delay={0.2}>
            <Experiances />
          </ScrollSection>

          <ScrollSection className="section-projects" delay={0.1}>
            <Projects />
          </ScrollSection>

          <ScrollSection className="section-skills" delay={0.3}>
            <Skills />
          </ScrollSection>

          <ScrollSection className="section-contact" delay={0.2}>
            <Contact />
          </ScrollSection>
        </main>
      </div>
    </>
  );
}

export default App;
