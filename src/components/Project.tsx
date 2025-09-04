import React, { useState } from "react";
import '../assets/styles/Project.scss';
import { motion } from "framer-motion";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

//import mock01 from '../assets/images/mock01.png';
//import mock02 from '../assets/images/mock02.png';
//import mock03 from '../assets/images/mock03.png';
//import mock04 from '../assets/images/mock04.png';
//import mock05 from '../assets/images/mock05.png';
import wardrobe from '../assets/images/wardrobe.jpg';
//import mock07 from '../assets/images/mock07.png';
import phishing from '../assets/images/phising.jpg';
import umplut from '../assets/images/umplut.jpeg';
import secure from '../assets/images/secureshare.jpeg';

type Proj = {
  title: string;
  summary: string;
  implementation: string;
  tech: string[];
  link?: string;
  image?: string;
};

const fade = { hidden:{opacity:0, y:18}, show:(i:number)=>({opacity:1,y:0,transition:{duration:.5, delay:i*0.05}}) };

const projects: Proj[] = [
  {
    title: "Account Balance Verification Bot (ACME S1↔S3)",
    summary: "Reconciliere solduri între ACME System 1 (web) și System 3 (desktop).",
    implementation:
      "Robot UiPath care citește work items din S1, rulează pașii în aplicația desktop S3, extrage valorile și le compară; loghează diferențele în Excel și marchează statusul.",
    tech: ["UiPath Studio","Excel","Selectors","REFramework (opțional)"],
    
  },
  {
    title: "Phishing Email Detection Bot",
    summary: "Detectează și raportează emailuri cu potențial phishing.",
    implementation:
      "Parsează inbox-ul, validează domenii/linkuri (regex, whitelists), mută mesajele în folderul Phishing, generează raport Excel și trimite sumar prin SMTP către IT/Security.",
    tech: ["UiPath Studio","Outlook/IMAP","Regex","Excel","SMTP"],
    image: phishing
  },
  {
    title: "Secure File Sharing Platform",
    summary: "Platformă colaborativă de upload/criptare/partajare fișiere.",
    implementation:
      "Autentificare, roluri, upload cu progres, criptare la transfer/stocare, linkuri cu TTL și audit trail. Frontend reactiv + API REST.",
    tech: ["React","Node.js","Express","PostgreSQL","JWT"],
    image: secure
  },

  
  {
    title: "Real-Time Hand Gesture Recognition (GA-Optimized CNN)",
    summary: "Control media prin gesturi din webcam, în timp real.",
    implementation:
      "Pipeline video (webcam) → preprocessing → CNN pentru clasificare gesturi (play/pause, volum, next/prev). Hyperparametrii rețelei sunt optimizați cu Genetic Algorithm.",
    tech: ["Python","OpenCV","PyTorch","Genetic Algorithm"],
    
  },
  {
    title: "Biometric Authentication (face-api.js)",
    summary: "Login cu recunoaștere facială în browser.",
    implementation:
      "Înregistrare utilizator + verificare în timp real din webcam. Face detection, embeddings și matching. UI web simplu.",
    tech: ["JavaScript","face-api.js","HTML/CSS"],
    link: "https://github.com/IonescuMariaMagdalena/Facial-Recognition-Login",
    
  },
  {
    title: "Intrusion Detection & Prevention (Python)",
    summary: "Detectează port scanning/brute-force/DoS și blochează IP-uri.",
    implementation:
      "Monitorizare trafic și reguli extensibile; la incident, pune IP-ul pe blacklist cu iptables și trimite alertă.",
    tech: ["Python","iptables","Linux"],
   
  },

  {
    title: "Password Strength Checker",
    summary: "Evaluare complexitate parolă cu feedback instant.",
    implementation:
      "Reguli personalizate (lungime, diversitate caractere, pattern-uri interzise) + indicator vizual al scorului.",
    tech: ["HTML","CSS","JavaScript"],
    link: "https://github.com/IonescuMariaMagdalena/Password-Strength-Checker",
  },

  {
    title: "A Music Analyzer",
    summary: "Clasificare mood melodii (happy/neutral/sad).",
    implementation:
      "Extrage features din fișiere (tempo, tonalitate etc.), apoi clasificare + UI web de prezentare.",
    tech: ["Python","NumPy","Matplotlib","HTML/CSS"],
    link: "https://github.com/IonescuMariaMagdalena/A-music-analyzer",
  },
  {
    title: "2D Game in OpenGL (C++)",
    summary: "Joc 2D cu coliziuni și randare realtime.",
    implementation:
      "Motor simplu pentru scene, input tastatură, logică de coliziuni și randare cu OpenGL.",
    tech: ["C++","OpenGL"],
    link: "https://github.com/IonescuMariaMagdalena/2D-Game-OpenGL",
  },

  // ——— IoT
  {
    title: "Smart Wardrobe (Flutter + Arduino)",
    summary: "Sugerează outfit în funcție de temperatură.",
    implementation:
      "Arduino citește senzorul; aplicația Flutter ia meteo și propune ținute. (Înlocuiește link-ul de mai jos cu repo-ul corect.)",
    tech: ["Flutter","Arduino","HTTP API"],
    link: "https://github.com/IonescuMariaMagdalena", // TODO: pune linkul exact al repo-ului tău Smart Wardrobe
    image: wardrobe
  },
];

export default function Project() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<Proj | null>(null);

  const openModal = (p: Proj) => { setActive(p); setOpen(true); };
  const closeModal = () => { setOpen(false); setActive(null); };

  return (
    <div className="projects-container" id="projects">
      <h1>Personal Projects</h1>
      <div className="projects-grid">
        {projects.map((p, idx) => (
          <motion.div
            key={p.title}
            className="project"
            initial="hidden"
            whileInView="show"
            viewport={{ once:true, margin:"-10% 0px" }}
            custom={idx}
            variants={fade}
          >
            <button className="project-click" onClick={()=>openModal(p)} aria-label={`Open ${p.title}`}>
              <img src={p.image || umplut} className="zoom" alt={p.title} width="100%"/>
            </button>
            <h2 onClick={()=>openModal(p)} className="project-title">{p.title}</h2>
            <p>{p.summary}</p>
            {p.link && (
              <a className="project-link" href={p.link} target="_blank" rel="noreferrer">Open Repo</a>
            )}
          </motion.div>
        ))}
      </div>

      {/* Modal detalii proiect */}
      <Dialog open={open} onClose={closeModal} maxWidth="md" fullWidth>
        <IconButton aria-label="close" onClick={closeModal} className="close-btn"><CloseIcon/></IconButton>
        <DialogContent dividers className="project-modal">
          {active && (
            <>
              <h2>{active.title}</h2>
              <p className="summary">{active.summary}</p>
              <h4>How I implemented it</h4>
              <p>{active.implementation}</p>
              <h4>Tech used</h4>
              <ul className="tech-list">
                {active.tech.map(t => <li key={t}>{t}</li>)}
              </ul>
              {active.link && <a className="btn-outline" href={active.link} target="_blank" rel="noreferrer">Open GitHub</a>}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
