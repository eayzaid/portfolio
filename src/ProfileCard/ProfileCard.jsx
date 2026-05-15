import "./ProfileCard.css";
import ProfilePicture from "../assets/ProfilePicture.jpg";
import ProProfilePicture from "../assets/MyProImage.jpeg";
import { motion } from "motion/react";
import { useState } from "react";

export default function ProfileCard() {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <article>
      <motion.section
        className="profile-card"
        layout
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
        onClick={handleFlip}
      >
        <div className="state">
          <span>&#8226;</span> Looking for an Internship for the 2026 summer
        </div>
        
        <div className="picture-container">
          <motion.div
            className="picture-flip"
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{
              duration: 0.6,
              ease: [0.4, 0, 0.2, 1]
            }}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {/* Front side */}
            <img 
              className="picture picture-front" 
              src={ProfilePicture}
              style={{
                backfaceVisibility: "hidden",
              }}
            />
            {/* Back side */}
            <img 
              className="picture picture-back" 
              src={ProProfilePicture}
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            />
          </motion.div>
        </div>  

        <h1>
          Hello , I am <strong>Ayman Zaidane</strong>
        </h1>
        <h2>
          Undergraduate Computer Science student <br />
          Future Fullstack engineer and Cloud enthusiast
        </h2>
        <p>Meknes , Morocco &#x1f1f2;&#x1f1e6;</p>
      </motion.section>
    </article>
  );
}
