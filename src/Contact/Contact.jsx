import "./Contact.css";
import { Mail, Linkedin, Github, Send } from "lucide-react";

export default function Contact() {
  return (
    <div className="contact-container">
      <h1>Get In Touch</h1>
      <p className="contact-description">
        I'm currently looking for internship opportunities for Summer 2026. 
        Whether you have a question or just want to say hi, feel free to reach out!
      </p>

      <div className="contact-links">
        <a 
          href="mailto:aymanzaidanepro@gmail.com" 
          className="contact-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Mail className="contact-icon" />
          <span>Email Me</span>
        </a>

        <a 
          href="https://www.linkedin.com/in/zaidane-ayman/" 
          className="contact-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Linkedin className="contact-icon" />
          <span>LinkedIn</span>
        </a>

        <a 
          href="https://github.com/eayzaid/" 
          className="contact-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github className="contact-icon" />
          <span>GitHub</span>
        </a>
      </div>

      <div className="contact-cta">
        <a href="mailto:aymanzaidanepro@gmail.com" className="contact-button">
          <Send className="button-icon" />
          <span>Send Message</span>
        </a>
      </div>

      <footer className="contact-footer">
        <p>© 2025 Ayman Zaidane. Built with React & Vite and Love</p>
      </footer>
    </div>
  );
}
