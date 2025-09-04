import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import '../assets/styles/Timeline.scss';

function Timeline() {
  return (
    <div id="history">
      <div className="items-container">
        <h1>Career History</h1>
        <VerticalTimeline>

          {/* UiPath Internship */}
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'white', color: 'rgb(39, 40, 34)' }}
            contentArrowStyle={{ borderRight: '7px solid white' }}
            date="2025"
            iconStyle={{ background: '#5000ca', color: '#fff' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">RPA Intern</h3>
            <h4 className="vertical-timeline-element-subtitle">UiPath – București, România</h4>
            <p>
              3-month internship focused on automation with UiPath Studio and Orchestrator, 
              process analysis, RPA bots development (account reconciliation, phishing detection), 
              and documentation of business workflows.
            </p>
          </VerticalTimelineElement>

          {/* Bachelor's degree */}
          <VerticalTimelineElement
            className="vertical-timeline-element--education"
            date="2022 – present"
            iconStyle={{ background: '#5000ca', color: '#fff' }}
            icon={<FontAwesomeIcon icon={faGraduationCap} />}
          >
            <h3 className="vertical-timeline-element-title">FILS – Electronics, Telecommunications and Information Technology</h3>
            <h4 className="vertical-timeline-element-subtitle">Universitatea Politehnica din București</h4>
            <p>
             Faculty of Engineering in Foreign Languages--(ETTI). Focus areas: 
              software development, networking, cybersecurity, artificial intelligence, 
              digital signal processing, RPA and automation.
            </p>
          </VerticalTimelineElement>

          {/* High School */}
          <VerticalTimelineElement
            className="vertical-timeline-element--education"
            date="2018 – 2022"
            iconStyle={{ background: '#5000ca', color: '#fff' }}
            icon={<FontAwesomeIcon icon={faGraduationCap} />}
          >
            <h3 className="vertical-timeline-element-title">High School Diploma</h3>
            <h4 className="vertical-timeline-element-subtitle">Colegiul Național „Mircea cel Batran”, Rm. Valcea</h4>
            <p>
              Mathematics and Computer Science profile. Graduated with strong background 
              in STEM subjects and extracurricular projects.
            </p>
          </VerticalTimelineElement>

        </VerticalTimeline>
      </div>
    </div>
  );
}

export default Timeline;
