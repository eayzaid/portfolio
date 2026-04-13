import { Github, Linkedin, Mail, Phone, Globe } from "lucide-react";
import Grainient from "../../Grainient";
import "./HeroSection.css";

const iconMap = {
  email: Mail,
  phone: Phone,
  github: Github,
  linkedin: Linkedin,
};

function HeroSection({ hero }) {
  return (
    <header className="hero-viewport">
      <div className="hero-grainient" aria-hidden="true">
        <Grainient
          timeSpeed={0.12}
          colorBalance={-0.12}
          warpStrength={0.7}
          warpFrequency={3.8}
          warpSpeed={1.2}
          warpAmplitude={70}
          blendAngle={-18}
          blendSoftness={0.12}
          rotationAmount={220}
          noiseScale={2.4}
          grainAmount={0.09}
          grainScale={3.2}
          grainAnimated
          contrast={1.16}
          gamma={1.0}
          saturation={0.96}
          zoom={1.05}
          color1="#f6fcf6"
          color2="#9fbea7"
          color3="#557a62"
        />
      </div>
      <div className="hero-overlay" aria-hidden="true" />

      <div className="hero-inner">
        <p className="availability-badge">
          <span className="online-dot" aria-hidden="true" />
          {hero.availability}
        </p>

        <div className="hero-name" aria-label={`${hero.name.first} ${hero.name.last}`}>
          <span>{hero.name.first}</span>
          <span>{hero.name.last}</span>
        </div>

        <p className="hero-title">{hero.title}</p>
        <p className="intro">{hero.summary}</p>

        <div className="contact-badges">
          {hero.contacts.map((contact) => {
            const Icon = iconMap[contact.type] ?? Globe;
            return (
              <a
                key={contact.label}
                className="contact-badge"
                href={contact.href}
                target={contact.external ? "_blank" : undefined}
                rel={contact.external ? "noreferrer" : undefined}
              >
                <Icon aria-hidden="true" />
                <span>
                  {contact.label}: {contact.value}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </header>
  );
}

export default HeroSection;
