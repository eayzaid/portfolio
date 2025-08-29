import "./Skills.css";
import { AnimatePresence, motion, spring } from "motion/react";
import { useEffect, useState ,useRef } from "react";

const skillData = [
  {
    category: "Frontend Development",
    skills: [
      { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "HTML5", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS3", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      { name: "TailwindCSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" }
    ]
  },
  {
    category: "Backend Development", 
    skills: [
      { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Express.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
      { name: "Flask", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" },
      { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
      { name: "RESTful APIs", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" }
    ]
  },
  {
    category: "Tools & Technologies",
    skills: [
      { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "GitHub", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
      { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      { name: "VS Code", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
      { name: "Linux", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
      { name: "npm", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" }
    ]
  }
]

const SkillBadge = ({name, logo}) => (
  <li className="skill-badge">
    <img src={logo} alt={name} className="skill-logo" />
    <span>{name}</span>
  </li>
)

const SkillCategory = ({ category, skills }) => {
  return (
    <motion.section
      className={`skill-category-container`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: spring }}
    >
        <h2>{category}</h2>
        <ul className="skills-list">
          {
            skills.map((skill, idx) => <SkillBadge key={idx} name={skill.name} logo={skill.logo} />)
          }
        </ul>
    </motion.section>
  );
};


export default function Skills() {

  return (
    <article className="skills-container" style={{ position: 'relative' }}>
      <h1>Skills</h1>
      {
        skillData.map((element, index) => <SkillCategory key={index} {...element} />)
      }
    </article>
  );
}
