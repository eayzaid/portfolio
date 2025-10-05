import { Mail, Linkedin, Download } from "lucide-react";
import "./Navbar.css";
import { motion } from "motion/react";

export default function Navbar() {


  return (
    <motion.nav 
      className="navbar"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="navbar-container">
        {/* Left side - Name */}
        <div className="navbar-left">
          <h1 className="navbar-name">Zaidane Ayman</h1>
        </div>

        {/* Right side - Links */}
        <div className="navbar-right">
          <a 
            href="mailto:aymanzaidanepro@gmail.com" 
            className="navbar-link"
            aria-label="Email"
          >
            <Mail className="navbar-icon" />
          </a>

          <a 
            href="https://linkedin.com/in/zaidane-ayman" 
            target="_blank" 
            rel="noopener noreferrer"
            className="navbar-link"
            aria-label="LinkedIn"
          >
            <Linkedin className="navbar-icon" />
          </a>

          <a 
            href="https://mypdfresumelink.creatpad.com"
            className="navbar-resume-btn"
            aria-label="Download Resume"
            style={{
              textDecoration : "none"
            }}
          >
            <Download className="navbar-icon" />
            <span className="navbar-resume-text">Resume</span>
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
