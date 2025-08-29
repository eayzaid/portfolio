import { linearGradient } from "motion/react-client";
import "./Experiances.css";
import { AnimatePresence, motion, spring } from "motion/react";
import { useEffect, useState , useRef } from "react";

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
    role: "Competitive Programming Pole Chief",
    summary:
      "Led workshops on algorithms and problem-solving for 30 members, boosting participation and member activity by 200% in one year.",
  },
];


const SummaryCard = ({ summary, active, position }) => {
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

const ExperianceCard = ({ tag, role, title, imageUrl, summary, period, onHover, onLeave }) => {
  return (
    <motion.section
      className={`experiance-card-container ${tag && "nice-experiance"}`}
      whileHover={{ scale: 1.05 }}
      transition={{ type: spring }}
      onHoverStart={() => {
        onHover(summary);
      }}
      onHoverEnd={() => {
        onLeave();
      }}
    >
      <img className="experiance-card-image" src={imageUrl} />
      <div className="experiance-card-info">
        <h2>{role}</h2>
        <h3>{title}</h3>
        <h4>{period}</h4>
      </div>
    </motion.section>
  );
};

export default function Experiances() {
  const [activeSummary, setActiveSummary] = useState(null);
  const [mousePosition, setMousePosition] = useState({ clientX: 0, clientY: 0 });
  const experiancesRef = useRef(null);

  useEffect(() => {
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
  }, []);

  return (
    <article ref={experiancesRef} className="experiances-container" style={{ position: 'relative' }}>
      <h1>Experiances</h1>
      {experienceData.map((element, index) => (
        <ExperianceCard 
          key={index} 
          {...element} 
          onHover={setActiveSummary}
          onLeave={() => setActiveSummary(null)}
        />
      ))}
      
      <SummaryCard 
        summary={activeSummary} 
        active={!!activeSummary} 
        position={mousePosition} 
      />
    </article>
  );
}
