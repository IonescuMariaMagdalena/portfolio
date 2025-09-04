import React from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import '../assets/styles/Main.scss';
import ME from "../assets/images/me.jpeg"; 

function Main() {
  return (
    <div className="container">
      <div className="about-section">
        <div className="image-wrapper">
          <img src={ME} alt="Maria Ionescu" />
        </div>
        <div className="content">
          <div className="social_icons">
            <a href="https://github.com/IonescuMariaMagdalena" target="_blank" rel="noreferrer">
              <GitHubIcon />
            </a>
            <a href="https://www.linkedin.com/in/maria-ionescu05/" target="_blank" rel="noreferrer">
              <LinkedInIcon />
            </a>
          </div>

          <h1>Maria Magdalena Ionescu</h1>
          <p>Student at FILS - ETTI – UPB</p>

          <div className="mobile_social_icons">
            <a href="https://github.com/IonescuMariaMagdalena" target="_blank" rel="noreferrer">
              <GitHubIcon />
            </a>
            <a href="https://www.linkedin.com/in/maria-ionescu05/" target="_blank" rel="noreferrer">
              <LinkedInIcon />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
