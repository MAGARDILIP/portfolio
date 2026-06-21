import useScrollReveal from '../hooks/useScrollReveal';
import { personalInfo } from '../data/portfolioData';
import './About.css';

export default function About() {
  const ref = useScrollReveal();

  return (
    <section id="about" className="section about">
      <div className="container">
        <div className="section-header">
          <span className="section-label">// About Me</span>
          <h2 className="section-title">Who I Am</h2>
          <div className="section-divider" />
        </div>

        <div className="about__content reveal" ref={ref}>
          <div className="about__text">
            <p>{personalInfo.about}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
