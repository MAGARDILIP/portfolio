import { useState } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import { projects } from '../data/portfolioData';
import './Projects.css';

export default function Projects() {
  const ref = useScrollReveal();
  const [expanded, setExpanded] = useState(false);

  const VISIBLE_COUNT = 2;
  const visibleProjects = expanded ? projects : projects.slice(0, VISIBLE_COUNT);
  const hasMore = projects.length > VISIBLE_COUNT;

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <div className="section-header">
          <span className="section-label">// My Work</span>
          <h2 className="section-title">Featured Projects</h2>
          <div className="section-divider" />
        </div>

        <div className="projects__grid reveal" ref={ref}>
          {visibleProjects.map((project, i) => (
            <div key={project.id} className="projects__card reveal-child">
              <div className="projects__card-header">
                <div className="projects__card-top">
                  <svg className="projects__folder-icon" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                  <div className="projects__card-links">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="View Code">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                      </a>
                    )}
                    {project.live && (
                      <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label="Live Demo" title="Live Demo">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                      </a>
                    )}
                  </div>
                </div>
                {project.featured && <span className="projects__featured-badge">⭐ Featured</span>}
              </div>

              <h3 className="projects__title">{project.title}</h3>
              <p className="projects__tagline">{project.tagline}</p>
              <p className="projects__period">{project.period}</p>

              <ul className="projects__features">
                {project.features.map((f, j) => (
                  <li key={j}>
                    <span className="projects__bullet">▹</span>
                    {f}
                  </li>
                ))}
              </ul>

              <div className="projects__tech-stack">
                {project.techStack.map((tech) => (
                  <span key={tech} className="tag">{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {hasMore && (
          <button
            className="certifications__toggle"
            onClick={() => setExpanded((e) => !e)}
            aria-expanded={expanded}
            style={{ marginTop: '24px' }}
          >
            {expanded ? (
              <>
                Show Less
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
              </>
            ) : (
              <>
                Show More ({projects.length - VISIBLE_COUNT} more)
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
              </>
            )}
          </button>
        )}
      </div>
    </section>
  );
}
