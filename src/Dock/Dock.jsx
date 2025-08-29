import { useEffect, useState } from "react";
import "./Dock.css";
import { CircleStar, FolderGit, PencilRuler } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

const DynamicBadge = ({ text, mousePosition }) => {
  return (
    <AnimatePresence>
      {text && (
        <motion.div
          className="dynamic-badge"
          initial={{
            opacity: 0,
            scale: 0.8,
            x: mousePosition.x - window.innerWidth / 2,
            y: 40 + mousePosition.y - window.innerHeight,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            x: mousePosition.x - window.innerWidth / 2,
            y: 40 + mousePosition.y - window.innerHeight,
          }}
          exit={{
            opacity: 0,
            scale: 0.8,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
            mass: 0.8,
          }}
        >
          {text}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
const dockList = [
  { Icon: FolderGit, textName: "Projects", redirect: "/projects" },
  { Icon: CircleStar, textName: "Experiances", redirect: "/experiances" },
  { Icon: PencilRuler, textName: "Skills", redirect: "/skills" },
];

export default function Dock() {
  const [text, setText] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <footer className="dock-container">
      <DynamicBadge text={text} mousePosition={mousePosition} />
      <motion.ul 
        className="dock"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
          delay: 0.2
        }}
      >
        {dockList.map(({ Icon, textName, redirect }, idx) => (
          <Link key={idx} to={redirect}>
            <motion.li
              onMouseOver={() => setText(textName)}
              onMouseLeave={() => setText(null)}
              whileHover={{ 
                scale: 1.05,
              }}
              whileTap={{ 
                scale: 0.95,
                y: 2,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 17,
                mass: 0.8,
              }}
            >
              <Icon size={40} strokeWidth={0.9} />
            </motion.li>
          </Link>
        ))}
      </motion.ul>
    </footer>
  );
}
