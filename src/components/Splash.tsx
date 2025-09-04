import React, { useEffect } from "react";
import { motion } from "framer-motion";
import "./Splash.scss";
import logo from "../assets/images/IMM.png"; 
type Props = { onFinish: () => void; durationMs?: number };

export default function Splash({ onFinish, durationMs = 1600 }: Props) {
  useEffect(() => {
    const t = setTimeout(onFinish, durationMs + 400); // un mic buffer peste animatie
    return () => clearTimeout(t);
  }, [onFinish, durationMs]);

  return (
    <div className="splash-root" aria-hidden>
      <motion.div
        className="splash-logo-wrap"
        initial={{ opacity: 0, scale: 0.9, filter: "blur(6px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <img src={logo} alt="Logo" className="splash-logo" />
      </motion.div>

      {/* accent line */}
      <motion.div
        className="splash-accent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      />

      {/* fade out tot ecranul */}
      <motion.div
        className="splash-fadeout"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: durationMs / 1000 }}
      />
    </div>
    
  );
}

