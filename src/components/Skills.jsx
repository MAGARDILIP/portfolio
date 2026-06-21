import useScrollReveal from '../hooks/useScrollReveal';
import { skills } from '../data/portfolioData';
import './Skills.css';

const levelPercent = { expert: 90, advanced: 75, intermediate: 60 };

export default function Skills() {
  const ref = useScrollReveal();
  const categories = [...new Set(skills.map((s) => s.category))];

  return (
    <section id="skills" className="section skills">
      <div className="container">
        <div className="section-header">
          <span className="section-label">// Tech Stack</span>
          <h2 className="section-title">Skills & Technologies</h2>
          <div className="section-divider" />
        </div>

        <div className="reveal" ref={ref}>
          {categories.map((cat) => (
            <div key={cat} className="skills__category">
              <h3 className="skills__category-title">{cat}</h3>
              <div className="skills__grid">
                {skills
                  .filter((s) => s.category === cat)
                  .map((skill, i) => (
                    <div key={skill.name} className="skills__card reveal-child" style={{ '--delay': `${i * 0.08}s` }}>
                      <div className="skills__card-header">
                        <span className="skills__icon">{skill.icon}</span>
                        <span className="skills__name">{skill.name}</span>
                        <span className="skills__level-label">{skill.level}</span>
                      </div>
                      <div className="skills__bar-track">
                        <div
                          className="skills__bar-fill"
                          style={{ '--fill-width': `${levelPercent[skill.level]}%` }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
