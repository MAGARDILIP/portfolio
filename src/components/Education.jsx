import useScrollReveal from '../hooks/useScrollReveal';
import { education } from '../data/portfolioData';
import './Education.css';

export default function Education() {
  const ref = useScrollReveal();

  return (
    <section id="education" className="section education">
      <div className="container">
        <div className="section-header">
          <span className="section-label">// Education</span>
          <h2 className="section-title">Academic Journey</h2>
          <div className="section-divider" />
        </div>

        <div className="education__timeline reveal" ref={ref}>
          {education.map((edu, i) => (
            <div key={i} className="education__item reveal-child">
              <div className="education__dot">
                {edu.current && <span className="education__dot-pulse" />}
              </div>
              <div className="education__card">
                <div className="education__card-header">
                  <h3 className="education__degree">{edu.degree}</h3>
                  <span className="education__period">{edu.period}</span>
                </div>
                <p className="education__institution">{edu.institution}</p>
                <p className="education__location">{edu.location}</p>
                <div className="education__score">
                  <span className="education__score-badge">{edu.score}</span>
                  {edu.current && <span className="tag">Current</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
