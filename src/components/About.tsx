"use client";
import { motion, type Variants } from "framer-motion";

const EASE: [number, number, number, number] = [0.25, 0.8, 0.25, 1];

const fadeSection: Variants = {
  initial: { opacity: 0, y: 40 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: EASE },
  },
};

export default function AboutMe() {
  return (
    <motion.section
      id="about"
      aria-labelledby="about-title"
      className="scroll-mt-24 px-6 md:px-10 lg:px-24 py-16"
      variants={fadeSection}
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: true, margin: "-20% 0px" }}
    >
      {/* Conținut aliniat la stânga */}
      <div className="max-w-4xl">
        <header className="mb-8">
          <h2
            id="about-title"
            className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100"
          >
            About Me
          </h2>

          {/* Underline aliniat la stânga */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{
              width: "7rem",
              transition: { duration: 0.9, ease: EASE, delay: 0.2 },
            }}
            viewport={{ once: true }}
            className="h-1 rounded-full bg-violet-600/90 mt-2"
          />

          <p className="mt-4 text-base text-neutral-600 dark:text-neutral-300 font-medium">
            Building secure systems with real-world automation.
          </p>
        </header>

        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { duration: 1.0, ease: EASE, delay: 0.3 },
          }}
          viewport={{ once: true, margin: "-15% 0px" }}
          className="space-y-5 text-[15px] leading-7 text-neutral-800 dark:text-neutral-200"
        >
          <p className="m-0">
            I’m <strong>Maria Ionescu</strong>, a highly motivated fourth-year Electronic
            Engineering student at <strong>FILS (UPB)</strong> focused on{" "}
            <span className="rounded px-1 bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300">
              cybersecurity and security automation
            </span>
            .
          </p>

          <p className="m-0">
            Hands-on projects include a <strong>phishing-email detection bot in UiPath</strong>, a{" "}
            <strong>Python/Linux IDS/IPS using iptables</strong>, a{" "}
            <strong>secure file-sharing platform</strong> with <strong>JWT/RBAC</strong> and audit
            trail, and <strong>in-browser biometric authentication</strong> with{" "}
            <strong>face-api.js</strong>.
          </p>

          <p className="m-0">
            Comfortable across <strong>Python, Linux, UiPath, React/Node, and OpenCV</strong> for
            practical CV pipelines. Certified in <strong>UiPath (Developer & Business Analyst)</strong>{" "}
            and trained through <strong>Google IT Support</strong> and{" "}
            <strong>Cisco Networking Academy</strong>.
          </p>

          <p className="m-0">
            Passionate about <strong>national security, systems integration, and threat detection</strong>,
            I’m eager to contribute to a <strong>SOC</strong> or{" "}
            <strong>security-automation team</strong>.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
