import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCertificate,
  faCode,
  faNetworkWired,
  faTools,
  faComments,
  faLanguage,
  faRobot,
  faShieldAlt,
  faLaptopCode
} from '@fortawesome/free-solid-svg-icons';
import Chip from '@mui/material/Chip';
import { motion } from "framer-motion";
import '../assets/styles/Expertise.scss';

// ——— animatie fade-in pe scroll
const fade = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.05 }
  })
};

// IT Certifications
const certs = [
  "Certiport IC3 GS4",
  "Google IT Support Fundamentals",
  "Cisco Networking Academy",
  "Google IT Support",
  "NVIDIA – Computer Vision for Industrial Inspection",
  "UiPath Automation Developer Associate",
  "UiPath Automation Business Analyst Associate"
];

// Frontend & Web
const frontendWeb = [
  "HTML5",
  "CSS3",
  "JavaScript",
  "React",
  "Node.js",
  "Express",
  "PostgreSQL",
  "face-api.js",
  "Responsive UI",
  "Accessibility (a11y)"
];

// AI & Computer Vision
const aiCv = [
  "Face detection & recognition",
  "Real-time webcam pipelines",
  "Music mood classification",
  "Model tuning (heuristic/GA)"
];

// RPA & Automation
const rpa = [
  "UiPath Studio",
  "UiPath Orchestrator",
  "Process mapping (BA)",
  "Account Reconciliation Bot",
  "Phishing Detection Bot",
  "Excel Automation",
  "SMTP automation"
];

// Security & Networking
const securityNet = [
  "IDS/IPS (Python)",
  "Phishing Email Detection",
  "iptables (Linux)",
  "Port scan & brute-force detection",
  "Cisco: Switching/Routing",
  "Network interconnection"
];

// Systems, Mobile & Embedded
const systemsEmbedded = [
  "Linux basics",
  "Shell scripting",
  "C/C++ (OpenGL)",
  "Raspberry Pi Pico (Rust)",
  "Arduino",
  "Sensor integration",
  "Secure File Sharing Platform"
];

// Developer Tools
const devTools = [
  "Git / GitHub",
  "GitHub Actions (CI/CD)",
  "Visual Studio Code",
  "PyCharm",
  "IntelliJ IDEA",
  "Postman (API testing)",
  "Docker (basics)",
  "AWS & Azure (intro level)",
  "Linux CLI",
  "Excel (automation with UiPath)",
  "Jupyter Notebook",
  "Figma / UI mockups",
  "Microsoft Office Suite"
];

// Communication
const communication = [
  "Good listener",
  "Organizational & planning skills",
  "Creativity",
  "Decision-making",
  "Motivated"
];

// Languages
const languages = [
  "Romanian (native)",
  "English – C1 (all skills)",
  "German – B2 (all skills)",
  "Spanish – A1/A2"
];

function Expertise() {
  // definim blocurile ca să nu repetăm JSX-ul
  const blocks: { icon: any; title: string; items: string[] }[] = [
    { icon: faCertificate,  title: "IT Certifications",              items: certs },
    { icon: faLaptopCode,   title: "Frontend & Web",                 items: frontendWeb },
    { icon: faCode,         title: "AI & Computer Vision",           items: aiCv },
    { icon: faRobot,        title: "RPA & Automation",               items: rpa },
    { icon: faShieldAlt,    title: "Security & Networking",          items: securityNet },
    { icon: faNetworkWired, title: "Systems, Mobile & Embedded",     items: systemsEmbedded },
    { icon: faTools,        title: "Developer Tools",                items: devTools },
    { icon: faComments,     title: "Communication",                  items: communication },
    { icon: faLanguage,     title: "Languages",                      items: languages },
  ];

  return (
    <div className="container" id="expertise">
      <div className="skills-container">
        <h1>Expertise</h1>
        <div className="skills-grid">
          {blocks.map((b, i) => (
            <motion.div
              key={b.title}
              className="skill"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-10% 0px" }}
              custom={i}
              variants={fade}
            >
              <FontAwesomeIcon icon={b.icon} size="3x" />
              <h3>{b.title}</h3>
              <div className="flex-chips">
                {b.items.map((c, idx) => (
                  <Chip key={idx} className="chip" label={c} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Expertise;
