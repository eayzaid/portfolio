import portfolioData from "./portfolioData.json";
import HeroSection from "./components/HeroSection";
import SectionCard from "./components/SectionCard";

function Portfolio() {
  return (
    <main className="app-root">
      <HeroSection hero={portfolioData.hero} />

      <div className="portfolio-shell">
        <SectionCard id="experience" title="Experience" delay="210ms">
          {portfolioData.experience.map((item) => (
            <article key={`${item.company}-${item.role}`} className="entry">
              <div>
                <h3>
                  {item.role} - {item.company}
                </h3>
                <p>{item.location}</p>
              </div>
              <p className="meta">{item.period}</p>
              <ul className="bullet-list compact">
                {item.achievements.map((achievement) => (
                  <li key={achievement}>{achievement}</li>
                ))}
              </ul>
            </article>
          ))}
        </SectionCard>

        <SectionCard id="projects" title="Projects" delay="270ms">
          <div className="project-grid">
            {portfolioData.projects.map((project) => (
              <article key={project.title} className="project-card">
                <h3>{project.title}</h3>
                <p className="stack">{project.stack}</p>
                <p>{project.description}</p>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Leadership & Involvement" delay="330ms">
          {portfolioData.leadership.map((item) => (
            <article key={`${item.title}-${item.organization}`} className="entry">
              <div>
                <h3>{item.title}</h3>
                <p>{item.organization}</p>
              </div>
              <p className="meta">{item.period}</p>
              <p>{item.details}</p>
            </article>
          ))}
        </SectionCard>

        <SectionCard title="Certifications" delay="390ms">
          <ul className="bullet-list compact">
            {portfolioData.certifications.map((certification) => (
              <li key={certification}>{certification}</li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Skills" delay="450ms">
          <div className="skills-grid">
            {portfolioData.skills.map((skillGroup) => (
              <div key={skillGroup.category} className="skill-row">
                <p className="skill-key">{skillGroup.category}</p>
                <p>{skillGroup.items.join(", ")}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard as="footer" title="Languages" delay="510ms">
          <p>{portfolioData.languages.join(", ")}</p>
        </SectionCard>
      </div>
    </main>
  );
}

export default Portfolio;
