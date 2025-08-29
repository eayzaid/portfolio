import ProfileCard from "./ProfileCard/ProfileCard";
import Experiances from "./Experiances/Experiances";
import Projects from "./Projects/Projects";
import Skills from "./Skills/Skills";

import "./App.css";
import Dock from "./Dock/Dock";
import { motion, AnimatePresence } from "motion/react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Aurora from "./Aurora/Aurora";
import { useState, useEffect, useRef } from "react";

function App() {
  const location = useLocation();
  
  // Define the order of components
  const componentOrder = [
    "/experiances", 
    "/projects",
    "/skills"
  ];
  
  // Track previous index with ref
  const previousIndexRef = useRef(0);
  const currentIndex = componentOrder.indexOf(location.pathname);
  
  // Determine animation direction based on indices
  const direction = currentIndex > previousIndexRef.current ? 1 : -1;
  
  // Update previous index after calculating direction
  useEffect(() => {
    const newIndex = componentOrder.indexOf(location.pathname);
    if (newIndex !== -1) {
      previousIndexRef.current = newIndex;
    }
  }, [location.pathname]);

  const pageVariants = {
    initial: (dir) => ({
      y: dir > 0 ? "30vh" : "-30vh",
      opacity: 0,
      scale: 0.96,
    }),
    in: {
      y: 0,
      opacity: 1,
      scale: 1,
    },
    out: (dir) => ({
      y: dir > 0 ? "-20vh" : "20vh",
      opacity: 0,
      scale: 0.97,
    })
  };

  const pageTransition = {
    type: "spring",
    stiffness: 200,
    damping: 35,
    mass: 1.2,
    opacity: {
      duration: 0.5,
      ease: "easeInOut",
    },
  };

  return (
    <>
      <Aurora
        colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
      />
      <motion.main className="page-container">
        {/* Persistent Profile Card on the left */}
        <div className="profile-sidebar">
          <ProfileCard />
        </div>
        
        {/* Main content area with page transitions */}
        <div className="content-area">
          <AnimatePresence mode="wait" custom={direction}>
            <Routes location={location} key={location.pathname}>
              <Route 
                path="/experiances" 
                element={
                  <motion.div
                    custom={direction}
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <Experiances />
                  </motion.div>
                } 
              />
              <Route 
                path="/projects" 
                element={
                  <motion.div
                    custom={direction}
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <Projects />
                  </motion.div>
                } 
              />
              <Route 
                path="/skills" 
                element={
                  <motion.div
                    custom={direction}
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <Skills />
                  </motion.div>
                } 
              />
              {/* Redirect root to experiences */}
              <Route path="/" element={<Navigate to="/experiances" replace />} />
            </Routes>
          </AnimatePresence>
        </div>
      </motion.main>
      <Dock />
    </>
  );
}

export default App;
