import "./Projects.css";
import { AnimatePresence, motion, spring } from "motion/react";
import { useEffect, useState ,useRef } from "react";

const projectsData = [
  {
    title : "OCPInterns",
    type : "Personal",
    summary : "Web application platform that streamlines and centerlize internship applications and mentor management, driving efficiency and supporting OCP Group’s digital transformation.",
    technologies : ["Node.js" , "ExpressJs" , "MongoDB" , "React" , "TailWindCSS"],
    githubURL : "https://github.com/eayzaid/OCPInterns"
  }
]

const TechBadge = ({title})=><li className="technology-badge">{title}</li>

const ProjectCard = ({ type , title, githubURL, summary ,technologies}) => {
  return (
    <motion.section
      className={`projects-card-container`}
      whileHover={{ scale: 1.05 }}
      transition={{ type: spring }}
    >
        <h2>{title}</h2>
        <h3>{type}</h3>
        <p>{summary}</p>
        <ul className="project-technologies">
          {
            technologies.map((element , idx) => <TechBadge key={idx} title={element} />)
          }
        </ul>
        <a href={githubURL}>Go to {">"}</a>
    </motion.section>
  );
};


export default function Projects() {

  return (
    <article className="projects-container" style={{ position: 'relative' }}>
      <h1>Projects</h1>
      {
        projectsData.map((element) => <ProjectCard {...element} />)
      }
    </article>
  );
}
