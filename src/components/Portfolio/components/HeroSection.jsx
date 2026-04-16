import { Github, Linkedin, Mail, Phone, Globe, School, X } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Grainient from "../../Grainient";
import "./HeroSection.css";

const MotionButton = motion.button;
const MotionSpan = motion.span;
const MotionAnchor = motion.a;

const iconMap = {
  email: Mail,
  phone: Phone,
  github: Github,
  linkedin: Linkedin,
};

function HeroSection({ hero }) {
  const [typedChars, setTypedChars] = useState(0);
  const [namePhase, setNamePhase] = useState("typing");
  const [contactsOpen, setContactsOpen] = useState(false);

  const firstName = hero.name.first;
  const lastName = hero.name.last;
  const animatedLastName = lastName.toLowerCase() === "ayman" ? `${lastName}e` : lastName;
  const shouldDeleteLastCharacter = animatedLastName !== lastName;
  const totalChars = firstName.length + animatedLastName.length;
  const finalChars = firstName.length + lastName.length;

  useEffect(() => {
    setTypedChars(0);
    setNamePhase("typing");
  }, [firstName, lastName]);

  useEffect(() => {
    if (namePhase !== "typing") {
      return undefined;
    }

    if (typedChars >= totalChars) {
      setNamePhase(shouldDeleteLastCharacter ? "hold" : "done");
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setTypedChars((current) => Math.min(current + 1, totalChars));
    }, 90);

    return () => window.clearTimeout(timer);
  }, [namePhase, typedChars, totalChars, shouldDeleteLastCharacter]);

  useEffect(() => {
    if (namePhase !== "hold") {
      return undefined;
    }

    const holdTimer = window.setTimeout(() => {
      setTypedChars(finalChars);
      setNamePhase("done");
    }, 780);

    return () => window.clearTimeout(holdTimer);
  }, [namePhase, finalChars]);

  const typedFirst = firstName.slice(0, Math.min(typedChars, firstName.length));
  const typedLast = animatedLastName.slice(0, Math.max(typedChars - firstName.length, 0));
  const activeLine = typedChars <= firstName.length ? "first" : "last";

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

        {hero.schoolBadge && (
          <a className="school-badge" href={hero.schoolBadge.href} target="_blank" rel="noopener noreferrer" aria-label={hero.schoolBadge.label}>
            <School aria-hidden="true" />
            <span>{hero.schoolBadge.label}</span>
          </a>
        )}

        <div className="hero-name" aria-label={`${hero.name.first} ${hero.name.last}`}>
          <span className={`line ${activeLine === "first" ? "typing-caret" : ""}`}>{typedFirst}</span>
          <span className={`line ${activeLine === "last" ? "typing-caret" : ""}`}>{typedLast}</span>
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

      <div className={`contact-orbit ${contactsOpen ? "is-open" : ""}`}>
        <MotionButton
          type="button"
          className="contact-orbit-trigger"
          aria-label={contactsOpen ? "Close contacts" : "Open contacts"}
          aria-expanded={contactsOpen}
          onClick={() => setContactsOpen((open) => !open)}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 350, damping: 26 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {contactsOpen ? (
              <MotionSpan
                key="close"
                className="contact-orbit-close-icon-wrap"
                initial={{ opacity: 0, scale: 0.65, rotate: -80 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.65, rotate: 80 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                aria-hidden="true"
              >
                <X className="contact-orbit-close-icon" aria-hidden="true" />
              </MotionSpan>
            ) : (
              <MotionSpan
                key="dot"
                className="contact-orbit-dot"
                initial={{ opacity: 0, scale: 0.65 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.65 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                aria-hidden="true"
              />
            )}
          </AnimatePresence>
        </MotionButton>

        <div className="contact-orbit-nodes" aria-hidden={!contactsOpen}>
          <AnimatePresence>
            {contactsOpen &&
              hero.contacts.map((contact, index) => {
                const Icon = iconMap[contact.type] ?? Globe;
                const offset = { x: 0, y: -(index + 1) * 70 };

                return (
                  <MotionAnchor
                    key={contact.label}
                    className="contact-node"
                    href={contact.href}
                    target={contact.external ? "_blank" : undefined}
                    rel={contact.external ? "noreferrer" : undefined}
                    aria-label={`${contact.label}: ${contact.value}`}
                    data-label={`${contact.label}: ${contact.value}`}
                    initial={{ opacity: 0, x: 0, y: 0, scale: 0.55 }}
                    animate={{
                      opacity: 1,
                      x: offset.x,
                      y: offset.y,
                      scale: 1,
                      transition: {
                        type: "spring",
                        stiffness: 320,
                        damping: 28,
                        delay: index * 0.04,
                      },
                    }}
                    exit={{
                      opacity: 0,
                      x: 0,
                      y: 0,
                      scale: 0.55,
                      transition: {
                        duration: 0.22,
                        ease: "easeInOut",
                        delay: (hero.contacts.length - index - 1) * 0.03,
                      },
                    }}
                  >
                    <Icon aria-hidden="true" />
                  </MotionAnchor>
                );
              })}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}

export default HeroSection;
