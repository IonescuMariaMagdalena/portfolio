import React from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import '../assets/styles/Footer.scss';

function Footer() {
  return (
    <footer>
      <div>
        <a href="https://github.com/IonescuMariaMagdalena" target="_blank" rel="noreferrer" aria-label="GitHub">
          <GitHubIcon/>
        </a>
        <a href="https://www.linkedin.com/in/maria-ionescu05/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
          <LinkedInIcon/>
        </a>
      </div>
      <p>
        © {new Date().getFullYear()} <strong>Maria-Magdalena Ionescu</strong> ·
        <a href="mailto:imagda05@yahoo.com" style={{ marginLeft: 6 }}>imagda05@yahoo.com</a>
      </p>
    </footer>
  );
}

export default Footer;
