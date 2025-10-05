import { linearGradient } from "motion/react-client";
import "./Experiances.css";
import { AnimatePresence, motion, spring } from "motion/react";
import { useEffect, useState , useRef } from "react";
import { createPortal } from "react-dom";

const experienceData = [
  {
    tag: true,
    period: "Summer 2025",
    imageUrl: "/OCPLogo.png",
    title: "OCP Group",
    role: "Software Engineering Intern",
    summary:
      "Built a full-stack platform with React and MongoDB to manage internships at OCP Group, improving efficiency and usability.",
  },
  {
    period: "2022-Present",
    imageUrl: "/CaravaneLogo.jpg",
    title: "Caravane El Hayat of ENSAM",
    role: "Social Media Specialist",
    summary:
      "Managed a 15-member media team, created social campaigns, increased engagement, and helped raise 200,000 Dhs in donations over three years.",
  },
  {
    period: "2024-2025",
    imageUrl: "/CSClubLogo.jpg",
    title: "Computer Science Club of ENSAM",
    role: "CP Pole Chief",
    summary:
      "Led workshops on algorithms and problem-solving for 30 members, boosting participation and member activity by 200% in one year.",
  },
];


const SummaryCard = ({ summary, active, position, isMobile, onClose }) => {
  if (isMobile) {
    // Mobile modal overlay version - use portal to render at body level
    const modalContent = (
      <AnimatePresence>
        {active && (
          <>
            {/* Blurred backdrop */}
            <motion.div
              className="summary-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={onClose}
            />
            
            {/* Centered summary card */}
            <motion.div
              className="summary-card summary-card-mobile"
              initial={{ opacity: 0, scale: 0.9, x: "-50%", y: "calc(-50% + 20px)" }}
              animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
              exit={{ opacity: 0, scale: 0.9, x: "-50%", y: "calc(-50% + 20px)" }}
              transition={{
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1],
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <p>{summary}</p>
            </motion.div>

            {/* Instruction text at bottom */}
            <motion.div
              className="summary-instruction"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <p>Click anywhere except the card to exit</p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );

    return createPortal(modalContent, document.body);
  }

  // Desktop version - follows cursor
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="summary-card"
          initial={{
            opacity: 0,
            scale: 0.8,
            x: position.clientX + 20,
            y: position.clientY + 20,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            x: position.clientX + 20,
            y: position.clientY + 20,
          }}
          exit={{
            opacity: 0,
            scale: 0.8,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
          }}
          style={{
            position: "absolute",
            zIndex: 1000,
            pointerEvents: "none",
          }}
        >
          <p>{summary}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ExperianceCard = ({ tag, role, title, imageUrl, summary, period, onHover, onLeave, onClick, isMobile }) => {
  return (
    <motion.section
      className={`experiance-card-container ${tag && "nice-experiance"}`}
      whileHover={!isMobile ? { scale: 1.05 } : {}}
      whileTap={isMobile ? { scale: 0.95 } : {}}
      transition={{ type: spring }}
      onHoverStart={() => {
        if (!isMobile) {
          onHover(summary);
        }
      }}
      onHoverEnd={() => {
        if (!isMobile) {
          onLeave();
        }
      }}
      onClick={() => {
        if (isMobile) {
          onClick(summary);
        }
      }}
    >
      <img className="experiance-card-image" src={imageUrl} />
      <div className="experiance-card-info">
        <div className="experiance-card-content">
          <h2>{role}</h2>
          <h3>{title}</h3>
        </div>
        <h4>{period}</h4>
      </div>
    </motion.section>
  );
};

export default function Experiances() {
  const [activeSummary, setActiveSummary] = useState(null);
  const [mousePosition, setMousePosition] = useState({ clientX: 0, clientY: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const experiancesRef = useRef(null);

  // Robust mobile detection
  useEffect(() => {
    const detectMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      
      // Check for mobile user agents
      const isMobileUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
      
      // Check for touch capability
      const isTouchDevice = ('ontouchstart' in window) || 
                           (navigator.maxTouchPoints > 0) || 
                           (navigator.msMaxTouchPoints > 0);
      
      // Check screen size as additional factor
      const isSmallScreen = window.innerWidth <= 768;
      
      // Consider it mobile if it has touch AND (small screen OR mobile UA)
      const mobile = isTouchDevice && (isSmallScreen || isMobileUA);
      
      setIsMobile(mobile);
    };
    
    detectMobile();
    window.addEventListener('resize', detectMobile);
    
    return () => {
      window.removeEventListener('resize', detectMobile);
    };
  }, []);

  // Handle mouse movement for desktop hover tooltip
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e) => {
      if (experiancesRef.current) {
        const rect = experiancesRef.current.getBoundingClientRect();
        setMousePosition({
          clientX: e.clientX - rect.left,
          clientY: e.clientY - rect.top
        });
      }
    };

    const node = experiancesRef.current;
    if (node) {
      node.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (node) {
        node.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [isMobile]);

  // Handle scroll to close summary on mobile
  useEffect(() => {
    if (!isMobile || !activeSummary) return;

    const handleScroll = () => {
      setActiveSummary(null);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile, activeSummary]);

  const handleCardClick = (summary) => {
    setActiveSummary(activeSummary === summary ? null : summary);
  };

  const handleCloseSummary = () => {
    setActiveSummary(null);
  };

  return (
    <article ref={experiancesRef} className="experiances-container" style={{ position: 'relative' }}>
      <h1>Experiences</h1>
      {experienceData.map((element, index) => (
        <ExperianceCard 
          key={index} 
          {...element}
          isMobile={isMobile}
          onHover={setActiveSummary}
          onLeave={() => setActiveSummary(null)}
          onClick={handleCardClick}
        />
      ))}
      
      <SummaryCard 
        summary={activeSummary} 
        active={!!activeSummary} 
        position={mousePosition}
        isMobile={isMobile}
        onClose={handleCloseSummary}
      />
    </article>
  );
}
