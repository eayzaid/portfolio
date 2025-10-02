import { Mail, Linkedin, Download } from "lucide-react";
import "./Navbar.css";
import { motion } from "motion/react";

export default function Navbar() {
  const handleDownloadResume = () => {
    // Replace with your actual resume file path
    const resumeUrl = "/resume.pdf";
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = "Zaidane_Ayman_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
            href="mailto:your.email@example.com" 
            className="navbar-link"
            aria-label="Email"
          >
            <Mail className="navbar-icon" />
          </a>

          <a 
            href="https://linkedin.com/in/yourprofile" 
            target="_blank" 
            rel="noopener noreferrer"
            className="navbar-link"
            aria-label="LinkedIn"
          >
            <Linkedin className="navbar-icon" />
          </a>

          <button 
            onClick={handleDownloadResume}
            className="navbar-resume-btn"
            aria-label="Download Resume"
          >
            <Download className="navbar-icon" />
            <span className="navbar-resume-text">Resume</span>
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
