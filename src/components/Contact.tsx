import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import '../assets/styles/Contact.scss';

/** Dacă vrei EmailJS, decomentează linia de mai jos și urmează notele din cod */
// import emailjs from '@emailjs/browser';

const fade = {
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55 } }
};

export default function Contact() {
  const formRef = useRef<HTMLFormElement | null>(null);

  const [name, setName] = useState('');
  const [replyTo, setReplyTo] = useState(''); // email sau telefon
  const [message, setMessage] = useState('');

  const [nameErr, setNameErr] = useState(false);
  const [replyErr, setReplyErr] = useState(false);
  const [msgErr, setMsgErr] = useState(false);

  const [snack, setSnack] = useState<{open:boolean; type:'success'|'error'; text:string}>({
    open:false, type:'success', text:''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const e1 = name.trim() === '';
    const e2 = replyTo.trim() === '';
    const e3 = message.trim() === '';
    setNameErr(e1); setReplyErr(e2); setMsgErr(e3);
    if (e1 || e2 || e3) return;

    /** ————— VARIANTA FĂRĂ BACKEND (EmailJS) —————
     *  1) npm i @emailjs/browser
     *  2) creezi Service + Template pe emailjs.com
     *  3) decomentezi importul de sus și blocul de mai jos, apoi completezi ID-urile
     */
    try {
      // const SERVICE_ID = 'YOUR_SERVICE_ID';
      // const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
      // const PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';
      // const params = {
      //   user_name: name,
      //   user_replyto: replyTo,
      //   message,
      //   to_email: 'imagda05@yahoo.com',
      // };
      // await emailjs.send(SERVICE_ID, TEMPLATE_ID, params, { publicKey: PUBLIC_KEY });

      // Pentru moment, doar simulez succesul (ca să vezi UI-ul corect)
      await new Promise(r => setTimeout(r, 500));

      setSnack({open:true, type:'success', text:'Mulțumesc! Mesajul a fost trimis.'});
      setName(''); setReplyTo(''); setMessage('');

      await fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, replyTo, message })
});

      formRef.current?.reset();
    } catch (err) {
      console.error(err);
      setSnack({open:true, type:'error', text:'Ups — nu am putut trimite acum. Încearcă mai târziu.'});
    }
  };
  

  return (
    <div id="contact">
      <div className="items-container">
        <motion.div
          className="contact_wrapper"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10% 0px' }}
          variants={fade}
        >
          <h1>Contact Me</h1>
          <p className="lead">
            Ai un proiect sau o idee? Scrie-mi și vedem cum o transformăm în realitate.
          </p>

          <Box
            ref={formRef as any}
            component="form"
            noValidate
            autoComplete="off"
            className="contact-form"
            onSubmit={handleSubmit}
          >
            <div className="form-flex">
              <TextField
                required
                label="Your Name"
                placeholder="What's your name?"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={nameErr}
                helperText={nameErr ? "Please enter your name" : ""}
                fullWidth
              />
              <TextField
                required
                label="Email / Phone"
                placeholder="How can I reach you?"
                value={replyTo}
                onChange={(e) => setReplyTo(e.target.value)}
                error={replyErr}
                helperText={replyErr ? "Please enter your email or phone number" : ""}
                fullWidth
              />
            </div>

            <TextField
              required
              label="Message"
              placeholder="Send me any inquiries or questions"
              multiline
              rows={8}
              className="body-form"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              error={msgErr}
              helperText={msgErr ? "Please enter the message" : ""}
              fullWidth
            />

            <Button type="submit" variant="contained" endIcon={<SendIcon />}>
              Send
            </Button>
          </Box>
        </motion.div>
      </div>

      <Snackbar
        open={snack.open}
        autoHideDuration={3400}
        onClose={() => setSnack(s => ({...s, open:false}))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnack(s => ({...s, open:false}))} severity={snack.type} variant="filled" sx={{ width: '100%' }}>
          {snack.text}
        </Alert>
      </Snackbar>
      
    </div>
  );
  
}
