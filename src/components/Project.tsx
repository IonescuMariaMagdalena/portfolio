import React, { useState } from "react";
import { motion } from "framer-motion";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import CloseIcon from "@mui/icons-material/Close";
import "../assets/styles/Project.scss";

// Images you already have
import wardrobe from "../assets/images/wardrobe.jpg";
import phishing from "../assets/images/phising.jpg";
import secure from "../assets/images/secureshare.jpeg";
// Generic placeholder when a project has no cover yet
import placeholder from "../assets/images/umplut.jpeg";

type Proj = {
  title: string;
  summary: string;         // short what/for whom
  implementation: string;  // how you built it
  tech: string[];          // stack
  highlights?: string[];   // key results/achievements
  link?: string;
  image?: string;
  status?: "In progress" | "Done";
};

const fade = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.05 } }),
};

const projects: Proj[] = [
  // ——— RPA / Automation
  {
    title: "Account Balance Verification Bot (ACME S1↔S3)",
    summary: "UiPath robot that reconciles account balances across ACME System 1 (web) and ACME System 3 (desktop).",
    implementation:
      "REFramework pipeline: pull work items from S1 with stable selectors → orchestrate desktop steps in S3 → compare values → write an auditable Excel (status, diffs, timestamps) and mark outcomes.",
    tech: ["UiPath Studio", "REFramework", "Selectors", "Excel"],
    highlights: ["≥98% reliability in testing", "Automatic retries on transient failures", "Structured logs for audit"],
    status: "Done",
    image: placeholder
  },
  {
    title: "Phishing Email Detection Bot",
    summary: "Security automation that identifies suspicious emails, quarantines them, reports to Excel and notifies IT/Sec.",
    implementation:
      "Inbox scan (Outlook/IMAP) → sender/link checks via regex + white/blacklists → move to quarantine folder → daily Excel report → SMTP summary email.",
    tech: ["UiPath Studio", "Outlook/IMAP", "Regex", "Excel", "SMTP"],
    highlights: ["~80% less manual triage", "Configurable rules without redeploy", "Daily automated summary"],
    status: "Done",
    image: phishing
  },
  {
    title: "Secure File Sharing Platform",
    summary: "Web app for uploading, encrypting and sharing files with role-based access and audit trail.",
    implementation:
      "Express REST API, JWT auth (access + refresh), streamed uploads with validation, encryption in transit & at rest, time-limited share links (TTL), audit logging; React frontend.",
    tech: ["React", "Node.js", "Express", "PostgreSQL", "JWT"],
    highlights: ["TTL share links + revocation", "RBAC (admin/user) protected routes", "Full audit (who/what/when)"],
    status: "In progress",
    image: secure
  },

  // ——— AI / CV
  {
    title: "Real-Time Hand Gesture Recognition (GA-Optimized CNN)",
    summary: "Hands-free media control (play/pause, volume, next/prev) from webcam in real-time.",
    implementation:
      "OpenCV pipeline → preprocessing (ROI/normalization) → CNN classifier for gestures; hyperparameters tuned with a Genetic Algorithm; OS media controls integration.",
    tech: ["Python", "OpenCV", "PyTorch", "Genetic Algorithm"],
    highlights: ["<30ms/frame inference on CPU", "+6–10% accuracy vs baseline with GA", "Confidence fallback to keyboard"],
    status: "In progress",
    image: placeholder
  },
  {
    title: "Biometric Authentication (face-api.js)",
    summary: "In-browser facial login using webcam — no server-side ML.",
    implementation:
      "face-api.js for detection + embeddings; enrollment and real-time verification; clean UI states (enroll/verify/error).",
    tech: ["JavaScript", "face-api.js", "HTML/CSS"],
    highlights: ["On-device embeddings", "Basic anti-spoofing (simple liveness)", "Accessible UI"],
    link: "https://github.com/IonescuMariaMagdalena/Facial-Recognition-Login",
    status: "Done",
    image: placeholder
  },

  // ——— Security / Systems
  {
    title: "Intrusion Detection & Prevention (Python)",
    summary: "Detects port scans, brute-force and DoS; auto-blocks IPs with iptables and sends alerts.",
    implementation:
      "Traffic monitoring with rule engine (rate patterns + signatures); dynamic blacklist via iptables; alerting and rotating logs.",
    tech: ["Python", "iptables", "Linux"],
    highlights: ["Config-driven rules", "Auto-unban after TTL", "Rotating logs for high volume"],
    status: "Done",
    image: placeholder
  },

  // ——— Web / Utility
  {
    title: "Password Strength Checker",
    summary: "Client-side password strength validator with instant feedback.",
    implementation:
      "Custom rules (length, character diversity, forbidden patterns) + visual score indicator and guidance.",
    tech: ["HTML", "CSS", "JavaScript"],
    highlights: ["Lightweight, no deps", "Clear UX hints", "Copy-safe UI"],
    link: "https://github.com/IonescuMariaMagdalena/Password-Strength-Checker",
    status: "Done",
    image: placeholder
  },

  // ——— Data / DSP
  {
    title: "A Music Analyzer",
    summary: "Classifies track mood (happy/neutral/sad) from audio features with a simple web UI.",
    implementation:
      "Feature extraction (tempo/tonality etc.), classical ML classification, lightweight presentation layer.",
    tech: ["Python", "NumPy", "Matplotlib", "HTML/CSS"],
    highlights: ["Clear feature plots", "Modular pipeline", "Reproducible notebooks"],
    link: "https://github.com/IonescuMariaMagdalena/A-music-analyzer",
    status: "Done",
    image: placeholder
  },

  // ——— Games
  {
    title: "2D Game in OpenGL (C++)",
    summary: "2D game with collisions and real-time rendering; dual player control.",
    implementation:
      "Simple scene engine, keyboard input handling, collision logic and OpenGL rendering.",
    tech: ["C++", "OpenGL"],
    highlights: ["Tidy ECS-style structure (lightweight)", "Smooth input loop", "Basic physics"],
    link: "https://github.com/IonescuMariaMagdalena/2D-Game-OpenGL",
    status: "Done",
    image: placeholder
  },

  // ——— IoT / Mobile
  {
    title: "Smart Wardrobe (Flutter + Arduino)",
    summary: "Suggests outfits based on temperature and weather.",
    implementation:
      "Arduino reads sensor; Flutter app fetches weather API and recommends outfits via a small rule engine.",
    tech: ["Flutter", "Arduino", "HTTP API"],
    highlights: ["Extendable outfit rules", "Clean mobile UI", "Ready for profiles"],
    link: "https://github.com/IonescuMariaMagdalena", // TODO: replace with exact repo
    status: "Done",
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
            viewport={{ once: true, margin: "-10% 0px" }}
            custom={idx}
            variants={fade}
          >
            <button className="project-click" onClick={() => openModal(p)} aria-label={`Open ${p.title}`}>
              {p.status && <span className={`badge ${p.status === "In progress" ? "warn" : "ok"}`}>{p.status}</span>}
              <img src={p.image || placeholder} className="zoom" alt={p.title} width="100%" />
            </button>
            <h2 onClick={() => openModal(p)} className="project-title">{p.title}</h2>
            <p>{p.summary}</p>
            {/* quick stack chips */}
            <div className="chips">
              {p.tech.slice(0, 4).map((t) => <Chip key={t} label={t} size="small" className="chip" />)}
            </div>
            {p.link && (
              <a className="project-link" href={p.link} target="_blank" rel="noreferrer">Open Repo</a>
            )}
          </motion.div>
        ))}
      </div>

      {/* Modal with full details */}
      <Dialog open={open} onClose={closeModal} maxWidth="md" fullWidth>
        <IconButton aria-label="close" onClick={closeModal} className="close-btn"><CloseIcon/></IconButton>
        <DialogContent dividers className="project-modal">
          {active && (
            <>
              <h2>{active.title}</h2>
              <p className="summary">{active.summary}</p>
              <img src={active.image || placeholder} alt={active.title} className="hero" />
              <h4>How I implemented it</h4>
              <p>{active.implementation}</p>
              <h4>Tech used</h4>
              <div className="chips">{active.tech.map((t) => <Chip key={t} label={t} className="chip" />)}</div>
              {active.highlights && active.highlights.length > 0 && (
                <>
                  <h4>Highlights</h4>
                  <ul className="tech-list">{active.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
                </>
              )}
              {active.link && <a className="btn-outline" href={active.link} target="_blank" rel="noreferrer">Open GitHub</a>}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
