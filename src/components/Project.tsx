import React, { useState } from "react";
import { motion } from "framer-motion";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import CloseIcon from "@mui/icons-material/Close";
import "../assets/styles/Project.scss";

// Images
import wardrobe from "../assets/images/wardrobe.jpg";
import phishing from "../assets/images/phising.jpg";
import secure from "../assets/images/secureshare.jpeg";
import placeholder from "../assets/images/umplut.jpeg";

/* ======================
   Types
   ====================== */
type Detail = { heading: string; text: string };

type Proj = {
  title: string;
  summary: string;
  implementation: string;
  tech: string[];
  highlights?: string[];
  status?: "In progress" | "Done";
  image?: string;
  period?: string;                    // e.g., "Apr 29, 2025 – present"
  role?: string;                      // e.g., "Solo Developer"
  outcome?: string;                   // impact/results
  links?: { label: string; href: string }[];
  details?: Detail[];                 // rich sections for the modal
};

/* ======================
   Animations
   ====================== */
const fade = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.05 },
  }),
};

/* ======================
   Data
   ====================== */
const projects: Proj[] = [
  // ——— RPA / Automation
  {
    title: "Account Balance Verification Bot (ACME S1↔S3)",
    summary:
      "UiPath robot that reconciles account balances between ACME System 1 (web) and ACME System 3 (desktop).",
    implementation:
      "REFramework pipeline: pull work items from S1 using stable selectors → orchestrate desktop steps in S3 → compare values → write an auditable Excel (status, diffs, timestamps) and mark outcomes.",
    tech: ["UiPath Studio", "REFramework", "Selectors", "Excel"],
    highlights: [
      "≥98% reliability in testing",
      "Automatic retries on transient failures",
      "Structured logs for audit",
    ],
    status: "Done",
    image: placeholder,
    role: "RPA Developer",
    outcome:
      "Significantly reduces manual reconciliation time and provides full traceability.",
    details: [
      {
        heading: "Problem",
        text:
          "Finance needed a consistent way to reconcile balances across a web system (S1) and a legacy desktop app (S3). Manual checks were slow and error-prone.",
      },
      {
        heading: "Approach",
        text:
          "I designed a robust REFramework process with clear states and retry logic. Stable selectors extracted data from S1; desktop automation handled S3 reliably.",
      },
      {
        heading: "Architecture",
        text:
          "Dispatcher retrieves work items from S1; Performer validates in S3 and writes results to a structured Excel (status, diffs, timestamps). Orchestrator queues enable scaling.",
      },
      {
        heading: "Results",
        text:
          "Achieved ≥98% reliability in UAT. Reduced manual effort dramatically and produced auditable evidence for each transaction.",
      },
      {
        heading: "Next steps",
        text:
          "Add anomaly thresholds and a dashboard with Power BI for daily monitoring.",
      },
    ],
  },

  {
    title: "Phishing Email Detection Bot",
    summary:
      "Security automation that flags suspicious emails, quarantines them, generates Excel reports and notifies IT/Sec.",
    implementation:
      "Inbox scan (Outlook/IMAP) → sender & link checks via regex + whitelists/blacklists → move to quarantine folder → daily Excel report → SMTP summary email.",
    tech: ["UiPath Studio", "Outlook/IMAP", "Regex", "Excel", "SMTP"],
    highlights: [
      "~80% less manual triage",
      "Configurable rules without redeploy",
      "Automated daily summary",
    ],
    status: "Done",
    image: phishing,
    role: "Automation Engineer",
    outcome:
      "Cuts incident response time for repetitive phishing waves and improves visibility.",
    details: [
      {
        heading: "Problem",
        text:
          "Recurring phishing campaigns overloaded the IT mailbox. Analysts spent hours triaging similar emails.",
      },
      {
        heading: "Detection Rules",
        text:
          "Heuristics for sender domain reputation, suspicious TLDs, link patterns, and keyword hits. All rules are config-driven for quick tuning.",
      },
      {
        heading: "Workflow",
        text:
          "Scan inbox, label & quarantine suspected items, write a daily Excel report and email a short summary with counts and top indicators.",
      },
      {
        heading: "Impact",
        text:
          "Approximately 80% reduction in manual triage. Analysts focus on edge cases; common patterns are auto-handled.",
      },
      {
        heading: "Future Work",
        text:
          "Add URL sandbox checks and a small ML model for better precision on borderline cases.",
      },
    ],
  },

  {
    title: "Secure File Sharing Platform",
    summary:
      "Web app for uploading, encrypting and sharing files with role-based access and an audit trail.",
    implementation:
      "Express REST API, JWT auth (access + refresh), streamed uploads with validation, encryption in transit & at rest, time-limited share links (TTL), audit logging; React frontend.",
    tech: ["React", "Node.js", "Express", "PostgreSQL", "JWT"],
    highlights: [
      "TTL share links with revocation",
      "RBAC (admin/user) protected routes",
      "Full audit (who/what/when)",
    ],
    status: "In progress",
    image: secure,
    role: "Full-stack Developer",
    outcome: "MVP with clear access policies and event traceability.",
    details: [
      {
        heading: "Goal",
        text:
          "Make file exchange safe for non-technical users while meeting basic compliance expectations.",
      },
      {
        heading: "Security",
        text:
          "Files are validated and streamed to storage. JWT with refresh tokens, password hashing, per-link TTL and one-click revocation.",
      },
      {
        heading: "Data Model",
        text:
          "PostgreSQL stores users, roles, file metadata, and an append-only audit trail for downloads and link actions.",
      },
      {
        heading: "Frontend",
        text:
          "Clean React UI with drag-and-drop uploads, progress meters, and role-aware navigation.",
      },
      {
        heading: "Roadmap",
        text:
          "Virus scanning on upload, S3-compatible storage, and admin analytics for usage trends.",
      },
    ],
  },

  // ——— AI / CV
  {
    title: "Real-Time Hand Gesture Recognition (GA-Optimized CNN)",
    summary:
      "Hands-free media control (play/pause, volume, next/prev) from webcam in real-time.",
    implementation:
      "OpenCV pipeline → preprocessing (ROI/normalization) → CNN classifier for gestures; hyperparameters tuned with a Genetic Algorithm; OS media controls integration.",
    tech: ["Python", "OpenCV", "PyTorch", "Genetic Algorithm"],
    highlights: [
      "<30ms/frame on CPU",
      "+6–10% accuracy vs baseline with GA",
      "Confidence fallback to keyboard",
    ],
    status: "In progress",
    image: placeholder,
    period: "Apr 29, 2025 – present",
    role: "ML Engineer",
    outcome:
      "Stable prototype for low-latency media control with robust accuracy.",
    details: [
      {
        heading: "Problem",
        text:
          "Control media players without touching the keyboard, using only simple hand gestures captured by a webcam.",
      },
      {
        heading: "Dataset & Preprocessing",
        text:
          "Balanced samples for each gesture; background normalization and ROI cropping to minimize noise across lighting conditions.",
      },
      {
        heading: "Model",
        text:
          "Compact CNN trained in PyTorch. Genetic Algorithm tunes learning rate, kernel sizes and augmentation intensity to improve accuracy.",
      },
      {
        heading: "Performance",
        text:
          "End-to-end latency under 30 ms/frame on CPU. Confidence threshold with graceful fallback to keyboard events.",
      },
      {
        heading: "Next steps",
        text:
          "Add temporal smoothing and few-shot personalization per user to increase stability.",
      },
    ],
  },

  // ——— WebAuthn/Face
  {
    title: "Biometric Authentication (face-api.js)",
    summary:
      "In-browser facial login using webcam — on-device embeddings, no server-side ML.",
    implementation:
      "face-api.js for detection + embeddings; enrollment and real-time verification; clear UI states (enroll/verify/error).",
    tech: ["JavaScript", "face-api.js", "HTML/CSS"],
    highlights: ["On-device embeddings", "Basic liveness", "Accessible UX"],
    status: "Done",
    image: placeholder,
    period: "Mar 23–28, 2025",
    role: "Frontend Engineer",
    outcome:
      "Complete MVP for facial login in the browser with low latency.",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/IonescuMariaMagdalena/Facial-Recognition-Login",
      },
    ],
    details: [
      {
        heading: "Why",
        text:
          "Experiment to evaluate feasibility of face-based login fully in the browser, preserving privacy by keeping embeddings locally.",
      },
      {
        heading: "How it works",
        text:
          "Enroll once to store a local descriptor; subsequent sessions compare live embedding with the stored one and unlock on match.",
      },
      {
        heading: "Security",
        text:
          "Basic liveness (motion and brightness checks). No server-side ML; only UI state changes after successful match.",
      },
      {
        heading: "Limitations",
        text:
          "Lighting and camera quality influence confidence; not a replacement for enterprise-grade MFA but great as a demo.",
      },
    ],
  },

  // ——— Security / Systems
  {
    title: "Intrusion Detection & Prevention (Python)",
    summary:
      "Detects port scans, brute-force and DoS; auto-blocks IPs with iptables and sends alerts.",
    implementation:
      "Traffic monitoring with rule engine (rate patterns + signatures); dynamic blacklist via iptables; alerting and rotating logs.",
    tech: ["Python", "iptables", "Linux"],
    highlights: [
      "Config-driven rules",
      "Auto-unban after TTL",
      "Log rotation for high volume",
    ],
    status: "Done",
    image: placeholder,
    period: "Feb 7–10, 2025",
    role: "Security Engineer",
    outcome:
      "Faster response to common attacks with automated containment.",
    details: [
      {
        heading: "Threat Model",
        text:
          "Focus on common external threats: noisy port scans, dictionary attacks against SSH, and simple DoS patterns.",
      },
      {
        heading: "Engine",
        text:
          "Streaming counters per IP and signature checks; offenders are pushed to iptables with a TTL, then auto-unbanned.",
      },
      {
        heading: "Ops",
        text:
          "Structured logs with rotation. Email/Slack hooks can be added for alerting.",
      },
    ],
  },

  // ——— Web / Utility
  {
    title: "Password Strength Checker",
    summary:
      "Client-side password strength validator with instant feedback.",
    implementation:
      "Custom rules (length, character diversity, forbidden patterns) + visual score indicator and guidance.",
    tech: ["HTML", "CSS", "JavaScript"],
    highlights: ["Zero dependencies", "Clear UX hints", "Copy-safe UI"],
    status: "Done",
    image: placeholder,
    period: "Feb 20–23, 2025",
    role: "Frontend Developer",
    outcome: "Lightweight utility that can be embedded in existing forms.",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/IonescuMariaMagdalena/Password-Strength-Checker",
      },
    ],
    details: [
      {
        heading: "UX",
        text:
          "Instant feedback as the user types, with actionable tips rather than only a numeric score.",
      },
      {
        heading: "Rules",
        text:
          "Entropy-inspired scoring that rewards variety and penalizes common patterns and leaked substrings (optional).",
      },
      {
        heading: "Integration",
        text:
          "Drop-in script that exposes a function and small CSS snippet; no external dependencies.",
      },
    ],
  },

  // ——— Data / DSP
  {
    title: "A Music Analyzer",
    summary:
      "Classifies track mood (happy/neutral/sad) from audio features with a simple web UI.",
    implementation:
      "Feature extraction (tempo/tonality etc.), classical ML classification; lightweight HTML/CSS presentation layer.",
    tech: ["Python", "NumPy", "scikit-learn", "HTML/CSS"],
    highlights: ["Clear feature plots", "Modular pipeline", "Reproducible notebooks"],
    status: "Done",
    image: placeholder,
    period: "Apr 10–19, 2024",
    role: "Data/ML Developer",
    outcome:
      "Educational tool for quick exploration of song characteristics.",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/IonescuMariaMagdalena/A-music-analyzer",
      },
    ],
    details: [
      {
        heading: "Pipeline",
        text:
          "From raw audio to features (tempo, key, spectral stats), then a compact classical classifier for mood prediction.",
      },
      {
        heading: "Visualization",
        text:
          "Charts that explain which features drive a given classification, making it easier to trust the output.",
      },
      {
        heading: "Use cases",
        text:
          "Didactic demo for DSP/ML courses and a base for playlist mood tagging.",
      },
    ],
  },

  // ——— Games
  {
    title: "2D Game in OpenGL (C++)",
    summary:
      "2D arcade game with collisions, basic physics and dual player control.",
    implementation:
      "Light scene engine, keyboard input handling, collision logic and real-time OpenGL rendering.",
    tech: ["C++", "OpenGL"],
    highlights: ["Tidy ECS-style structure (lightweight)", "Smooth input loop", "Basic physics"],
    status: "Done",
    image: placeholder,
    period: "Nov 9–28, 2024",
    role: "Game/Engine Programmer",
    outcome: "Playable demo with stable performance.",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/IonescuMariaMagdalena/2D-Game-OpenGL",
      },
    ],
    details: [
      {
        heading: "Core",
        text:
          "Minimal entity/component structure, sprite batching, and fixed-time updates for predictability.",
      },
      {
        heading: "Gameplay",
        text:
          "Two-player mode, basic physics and collision responses tuned for arcade feel.",
      },
      {
        heading: "Performance",
        text:
          "Efficient render loop and texture management for steady FPS on modest hardware.",
      },
    ],
  },

  // ——— IoT / Mobile
  {
    title: "Smart Wardrobe (Flutter + Arduino)",
    summary: "Suggests outfits based on temperature and weather.",
    implementation:
      "Arduino reads sensor; Flutter app consumes Weather API; extendable recommendation rules; clean mobile UI.",
    tech: ["Flutter", "Arduino", "HTTP API"],
    highlights: ["Extendable outfit rules", "Clean mobile UI", "Ready for profiles"],
    status: "Done",
    image: wardrobe,
    period: "Dec 9–14, 2024",
    role: "Solo Developer",
    outcome: "Demonstrable MVP with contextual recommendations.",
    links: [
      { label: "GitHub Profile", href: "https://github.com/IonescuMariaMagdalena" },
    ],
    details: [
      {
        heading: "Idea",
        text:
          "Help users decide what to wear using a small rules engine that mixes current temperature with personal preferences.",
      },
      {
        heading: "Hardware & App",
        text:
          "Arduino sensors for local measurements; Flutter UI that shows suggestions and allows quick feedback to refine rules.",
      },
      {
        heading: "Extensions",
        text:
          "Multiple profiles, wardrobe inventory, and season-based presets.",
      },
    ],
  },
];

/* ======================
   Component
   ====================== */
export default function Project() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<Proj | null>(null);

  const openModal = (p: Proj) => {
    setActive(p);
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
    setActive(null);
  };

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
            <button
              className="project-click"
              onClick={() => openModal(p)}
              aria-label={`Open ${p.title}`}
            >
              {p.status && (
                <span
                  className={`badge ${p.status === "In progress" ? "warn" : "ok"}`}
                >
                  {p.status}
                </span>
              )}
              <img
                src={p.image || placeholder}
                className="zoom"
                alt={p.title}
                width="100%"
              />
            </button>

            <h2 onClick={() => openModal(p)} className="project-title">
              {p.title}
            </h2>
            <p>{p.summary}</p>

            {/* quick stack chips */}
            <div className="chips">
              {p.tech.slice(0, 4).map((t) => (
                <Chip key={t} label={t} size="small" className="chip" />
              ))}
            </div>

            {p.links && p.links[0] && (
              <a
                className="project-link"
                href={p.links[0].href}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                {p.links[0].label}
              </a>
            )}
          </motion.div>
        ))}
      </div>

      {/* Modal with full details */}
      <Dialog open={open} onClose={closeModal} maxWidth="md" fullWidth>
        <IconButton aria-label="close" onClick={closeModal} className="close-btn">
          <CloseIcon />
        </IconButton>

        <DialogContent dividers className="project-modal">
          {active && (
            <>
              <h2>{active.title}</h2>

              {/* meta */}
              {(active.period || active.role) && (
                <p className="muted">
                  {active.period && (
                    <>
                      <strong>Period:</strong> {active.period}
                    </>
                  )}
                  {active.period && active.role && " · "}
                  {active.role && (
                    <>
                      <strong>Role:</strong> {active.role}
                    </>
                  )}
                </p>
              )}

              <p className="summary">{active.summary}</p>

              {active.image && (
                <img src={active.image} alt={active.title} className="hero" />
              )}

              <h4>How I implemented it</h4>
              <p>{active.implementation}</p>

              <h4>Tech used</h4>
              <div className="chips">
                {active.tech.map((t) => (
                  <Chip key={t} label={t} className="chip" />
                ))}
              </div>

              {active.highlights && active.highlights.length > 0 && (
                <>
                  <h4>Highlights</h4>
                  <ul className="tech-list">
                    {active.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                </>
              )}

              {active.outcome && (
                <>
                  <h4>Outcome / Results</h4>
                  <p>{active.outcome}</p>
                </>
              )}

              {/* NEW: rich details */}
              {active.details && active.details.length > 0 && (
                <div className="details">
                  {active.details.map((d, i) => (
                    <section key={`${active.title}-sec-${i}`}>
                      <h4>{d.heading}</h4>
                      <p>{d.text}</p>
                    </section>
                  ))}
                </div>
              )}

              {active.links && active.links.length > 0 && (
                <div className="links-row">
                  {active.links.map((l) => (
                    <a
                      key={l.href}
                      className="btn-outline"
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
