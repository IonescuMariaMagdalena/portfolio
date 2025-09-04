import React, { useState } from "react";
import { motion } from "framer-motion";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import "../assets/styles/Certifications.scss";

import nvidiaImg from "../assets/images/certs/nvidiacertificate.jpeg";
import uipathBaaImg from "../assets/images/certs/uipathbusinessan.jpeg";
import uipathDevImg from "../assets/images/certs/uipathdeveloper.jpeg";

import nvidiaPdf from "../assets/images/certs/nvidiacertificate.pdf";
import uipathBaaPdf from "../assets/images/certs/uipathbusinessan.pdf";
import uipathDevPdf from "../assets/images/certs/uipathdeveloper.pdf";

type Cert = {
  title: string;
  issuer: string;
  image?: string; 
  doc?: string;   
};

const certifications: Cert[] = [
  {
    title: "Computer Vision for Industrial Inspection",
    issuer: "NVIDIA",
    image: nvidiaImg,
    doc: nvidiaPdf,
  },
  {
    title: "UiPath Certified Professional Automation Developer Associate",
    issuer: "UiPath",
    image: uipathDevImg,   
    doc: uipathDevPdf,     
  },
  {
    title: "UiPath Certified Professional Automation Business Analyst Associate",
    issuer: "UiPath",
    image: uipathBaaImg,   
    doc: uipathBaaPdf,     
  },
];


function Certifications() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<Cert | null>(null);

  const handleOpen = (c: Cert) => { setActive(c); setOpen(true); };
  const handleClose = () => { setOpen(false); setActive(null); };

  const isPdf = (url?: string) => !!url && url.toLowerCase().endsWith(".pdf");

  return (
    <div className="container" id="certifications">
      <h1>Certifications</h1>
      <div className="cert-grid">
        {certifications.map((c, i) => (
          <motion.div
            key={c.title}
            className="cert-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.06 }}
          >
            {c.image && <img src={c.image} alt={c.title} className="cert-thumb" />}
            <h3>{c.title}</h3>
            <p className="issuer">{c.issuer}</p>

            <div className="actions">
              <button className="btn" onClick={() => handleOpen(c)}>View certificate</button>
              {c.doc && (
                <a className="btn outline" href={c.doc} target="_blank" rel="noreferrer">
                  Open in new tab
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <IconButton aria-label="close" onClick={handleClose} className="close-btn">
          <CloseIcon />
        </IconButton>
        <DialogContent dividers className="preview-wrap">
          {isPdf(active?.doc) ? (
            <iframe title={active?.title || "certificate"} src={active!.doc!} className="preview-pdf" />
          ) : active?.doc ? (
            <img src={active.doc} alt={active.title} className="preview-img" />
          ) : active?.image ? (
            <img src={active.image} alt={active.title} className="preview-img" />
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Certifications;
