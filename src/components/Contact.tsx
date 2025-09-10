import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import '../assets/styles/Contact.scss';

const fade = {
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55 } }
};

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xdklblva';

type Snack = { open:boolean; type:'success'|'error'; text:string };
type Stage = 'idle' | 'folding' | 'morph' | 'flying' | 'done';

export default function Contact() {
  const formRef = useRef<HTMLFormElement | null>(null);

  const [name, setName] = useState('');
  const [replyTo, setReplyTo] = useState(''); // email / telefon
  const [message, setMessage] = useState('');

  const [nameErr, setNameErr] = useState(false);
  const [replyErr, setReplyErr] = useState(false);
  const [msgErr, setMsgErr] = useState(false);

  const [snack, setSnack] = useState<Snack>({ open:false, type:'success', text:'' });
  const [stage, setStage] = useState<Stage>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValidEmailOrPhone = (val: string) => {
    const v = val.trim();
    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRx = /^[0-9+\-() ]{6,}$/;
    return emailRx.test(v) || phoneRx.test(v);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const e1 = name.trim() === '';
    const e2 = !isValidEmailOrPhone(replyTo);
    const e3 = message.trim() === '';
    setNameErr(e1); setReplyErr(e2); setMsgErr(e3);
    if (e1 || e2 || e3) return;

    try {
      setIsSubmitting(true);

      // 1) trimite la Formspree
      const fd = new FormData();
      fd.append('name', name);
      fd.append('replyTo', replyTo);
      fd.append('message', message);
      fd.append('subject', `New message from ${name} (portfolio contact)`);

      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: fd,
        headers: { Accept: 'application/json' }
      });

      if (!res.ok) throw new Error(`Formspree error: ${res.status}`);

      // 2) succes: secvența cinematică
      setSnack({ open:true, type:'success', text:'Mulțumesc! Mesajul a plecat ✈️' });
      setStage('folding');             // începe „îndoirea”
      setName(''); setReplyTo(''); setMessage('');
      formRef.current?.reset();

      setTimeout(() => setStage('morph'), 420);  // card → siluetă avion
      setTimeout(() => setStage('flying'), 820); // decolare pe traiectorie
      setTimeout(() => setStage('done'), 2800);  // final: dispare + apare badge
    } catch (err) {
      console.error(err);
      setSnack({ open:true, type:'error', text:'Ups — nu am putut trimite acum. Încearcă mai târziu.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // container visual states (plieri)
  const shellVariants = {
    idle:    { scale: 1, borderRadius: 18, rotateX: 0, filter: 'blur(0px)', opacity: 1 },
    folding: { scale: 0.94, borderRadius: 22, rotateX: 6,  filter: 'blur(0.7px)', opacity: 0.9, transition: { duration: 0.38 } },
    morph:   { scale: 0.82, borderRadius: 28, rotateX: 14, filter: 'blur(1.2px)', opacity: 0.75, transition: { duration: 0.32 } },
    gone:    { scale: 0.72, borderRadius: 32, rotateX: 20, filter: 'blur(2px)',  opacity: 0,    transition: { duration: 0.3 } },
  };

  // linii de îndoire
  const FoldLines = ({ show }: { show: boolean }) => (
    <AnimatePresence>
      {show && (
        <motion.svg
          width="100%" height="100%"
          viewBox="0 0 100 60"
          preserveAspectRatio="none"
          style={{ position:'absolute', inset:0, pointerEvents:'none' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        >
          <motion.line x1="50" y1="6" x2="50" y2="54"
            stroke="rgba(0,0,0,0.15)" strokeDasharray="3 3" strokeWidth="0.6"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5 }}
          />
          <motion.line x1="10" y1="22" x2="90" y2="22"
            stroke="rgba(0,0,0,0.1)" strokeDasharray="2 3" strokeWidth="0.5"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.45, delay: 0.08 }}
          />
          <motion.line x1="10" y1="38" x2="90" y2="38"
            stroke="rgba(0,0,0,0.1)" strokeDasharray="2 3" strokeWidth="0.5"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.45, delay: 0.12 }}
          />
        </motion.svg>
      )}
    </AnimatePresence>
  );

  // avion mare
  const PlaneSVG = (
    <motion.svg
      width="128" height="128" viewBox="0 0 128 128"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter:'drop-shadow(0 14px 28px rgba(0,0,0,0.25))' }}
      initial={{ opacity: 0, scale: 0.85, rotate: -10 }}
      animate={ stage === 'flying'
        ? { opacity: [1,1,0.95,0.9], scale: [0.9,1,1.02], rotate: [-10,-2,8] }
        : { opacity: 1, scale: 0.95 }
      }
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <defs>
        <linearGradient id="pGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff"/>
          <stop offset="55%" stopColor="#f2f4ff"/>
          <stop offset="100%" stopColor="#e6ebff"/>
        </linearGradient>
        <linearGradient id="edge" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#9aa7ff"/>
          <stop offset="100%" stopColor="#6b7cff"/>
        </linearGradient>
      </defs>
      <path d="M118 16L66 68" fill="none" stroke="url(#edge)" strokeWidth="3" strokeLinecap="round"/>
      <path d="M118 16L88 116L66 68L10 44L118 16Z" fill="url(#pGrad)" stroke="#c7cffc" strokeWidth="2" strokeLinejoin="round"/>
      <motion.rect x="34" y="32" width="26" height="4" rx="2" fill="white" opacity="0.55"
        initial={{ x: 10, opacity: 0 }} animate={{ x: 50, opacity: [0,1,0] }}
        transition={{ duration: 0.9, repeat: Infinity, repeatDelay: 0.8 }}
      />
    </motion.svg>
  );

  // urmă (trail)
  const Trail = ({ active }: { active: boolean }) => (
    <AnimatePresence>
      {active && (
        <motion.svg
          key="trail"
          width="380" height="220" viewBox="0 0 380 220"
          xmlns="http://www.w3.org/2000/svg"
          style={{ position:'absolute', left:'50%', bottom:16, transform:'translateX(-50%)', pointerEvents:'none' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        >
          <motion.path
            d="M10,200 C100,160 220,120 360,20"
            fill="none" stroke="rgba(107,124,255,0.55)" strokeWidth="3" strokeLinecap="round"
            strokeDasharray="6 10"
            initial={{ strokeDashoffset: 180 }}
            animate={{ strokeDashoffset: -40 }}
            transition={{ duration: 1.6, ease: 'easeOut' }}
          />
        </motion.svg>
      )}
    </AnimatePresence>
  );

  // confetti
  const Confetti = ({ show }: { show: boolean }) => {
    const pieces = Array.from({ length: 10 });
    return (
      <AnimatePresence>
        {show && (
          <div style={{ position:'absolute', left:'50%', bottom: 32, transform:'translateX(-50%)', pointerEvents:'none' }}>
            {pieces.map((_, i) => (
              <motion.div
                key={i}
                initial={{ x: 0, y: 0, opacity: 0 }}
                animate={{
                  x: (i - 5) * 16 + (i % 2 ? 10 : -6),
                  y: -80 - (i*6),
                  opacity: [0,1,0]
                }}
                transition={{ duration: 0.9 + (i%3)*0.12, ease: 'easeOut', delay: 0.06 * i }}
                style={{
                  width: 6, height: 10,
                  background: i%3===0 ? '#6b7cff' : i%3===1 ? '#a1afff' : '#e6ebff',
                  borderRadius: 1,
                  transform: `rotate(${i*18}deg)`,
                  position:'absolute'
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    );
  };

  // umbră dinamică sub avion (parallax)
  const PlaneShadow = ({ active }: { active: boolean }) => (
    <AnimatePresence>
      {active && (
        <motion.div
          key="shadow"
          initial={{ opacity: 0, scale: 0.8, x: -10, y: 0 }}
          animate={{
            opacity: [0.25, 0.35, 0.15, 0],
            scale:   [1, 0.95, 0.9, 0.85],
            x:       [0, 40, 90, 140],
            y:       [0, 10, 20, 30]
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.7, ease: 'easeOut' }}
          style={{
            position:'absolute',
            left:'50%',
            bottom: 18,
            transform:'translateX(-50%)',
            width: 120, height: 22,
            background: 'radial-gradient(50% 50% at 50% 50%, rgba(0,0,0,0.24) 0%, rgba(0,0,0,0.05) 60%, rgba(0,0,0,0) 100%)',
            filter: 'blur(6px)',
            pointerEvents:'none'
          }}
        />
      )}
    </AnimatePresence>
  );

  // film grain fin pe card în timpul folding/morph
  const FilmGrain = ({ show }: { show: boolean }) => (
    <AnimatePresence>
      {show && (
        <motion.div
          key="grain"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.12 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position:'absolute', inset:0, pointerEvents:'none', borderRadius: 18,
            mixBlendMode:'multiply',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='table' tableValues='0 0.8'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E")`
          }}
        />
      )}
    </AnimatePresence>
  );

  // badge "Delivered ✓" care pică în colț
  const DeliveredBadge = ({ visible }: { visible: boolean }) => (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="delivered"
          initial={{ opacity: 0, y: -20, scale: 0.9, rotate: -6 }}
          animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
          exit={{ opacity: 0 }}
          transition={{ type:'spring', stiffness: 420, damping: 20 }}
          style={{
            position: 'absolute',
            top: -10,
            right: -10,
            background: 'linear-gradient(135deg, #2ecc71, #27ae60)',
            color: 'white',
            fontWeight: 700,
            padding: '10px 14px',
            borderRadius: 14,
            boxShadow: '0 10px 26px rgba(39, 174, 96, 0.35)',
            zIndex: 2
          }}
        >
          Delivered ✓
        </motion.div>
      )}
    </AnimatePresence>
  );

  const supportsOffsetPath =
    typeof window !== 'undefined' &&
    // @ts-ignore
    CSS && CSS.supports?.('offset-path', 'path("M0,0 L10,10")');

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

          <div style={{ position:'relative', minHeight: 380 }}>
            {/* BADGE după zbor */}
            <DeliveredBadge visible={stage==='done'} />

            {/* FORM + plieri + grain + linii */}
            <AnimatePresence initial={false}>
              {stage !== 'done' && (
                <motion.div
                  key="form-shell"
                  variants={shellVariants}
                  animate={
                    stage === 'folding' ? 'folding' :
                    stage === 'morph'   ? 'morph'   :
                    stage === 'flying'  ? 'gone'    : 'idle'
                  }
                  style={{
                    position: 'relative',
                    border: '1px solid rgba(0,0,0,0.08)',
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.95), rgba(247,249,255,0.9))',
                    backdropFilter: 'blur(8px)',
                    boxShadow: '0 14px 40px rgba(0,0,0,0.10)',
                    padding: 18,
                    borderRadius: 18,
                    overflow:'hidden'
                  }}
                >
                  <FilmGrain show={stage==='folding' || stage==='morph'} />
                  <FoldLines show={stage==='folding' || stage==='morph'} />

                  <Box
                    ref={formRef as any}
                    component="form"
                    noValidate
                    autoComplete="off"
                    className="contact-form"
                    onSubmit={handleSubmit}
                  >
                    {/* Honeypot anti-spam */}
                    <input
                      type="text"
                      name="company"
                      tabIndex={-1}
                      autoComplete="off"
                      style={{ position:'absolute', left:'-9999px' }}
                      aria-hidden="true"
                    />

                    <motion.div animate={{ opacity: stage==='idle' ? 1 : 0.3 }} transition={{ duration: 0.25 }}>
                      <div className="form-flex" style={{ gap: 16 }}>
                        <TextField
                          required
                          label="Your Name"
                          placeholder="What's your name?"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          error={nameErr}
                          helperText={nameErr ? "Please enter your name" : ""}
                          fullWidth
                          disabled={isSubmitting}
                        />
                        <TextField
                          required
                          label="Email / Phone"
                          placeholder="How can I reach you?"
                          value={replyTo}
                          onChange={(e) => setReplyTo(e.target.value)}
                          error={replyErr}
                          helperText={replyErr ? "Please enter a valid email or phone number" : ""}
                          fullWidth
                          disabled={isSubmitting}
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
                        disabled={isSubmitting}
                        sx={{ mt: 2 }}
                      />

                      <Button type="submit" variant="contained" endIcon={<SendIcon />} disabled={isSubmitting} sx={{ mt: 2 }}>
                        {isSubmitting ? 'Sending…' : 'Send'}
                      </Button>
                    </motion.div>
                  </Box>
                </motion.div>
              )}
            </AnimatePresence>

            {/* TRAIECTORIE + AVION + UMBRĂ + CONFETTI */}
            <Trail active={stage==='flying'} />
            <PlaneShadow active={stage==='flying'} />
            <Confetti show={stage==='flying'} />

            <AnimatePresence>
              {(stage === 'morph' || stage === 'flying') && (
                supportsOffsetPath ? (
                  <motion.div
                    key="planePath"
                    initial={{ opacity: 0, offsetDistance: '0%', scale: 0.9 }}
                    animate={{
                      opacity: 1,
                      offsetDistance: stage==='flying' ? ['0%','45%','100%'] : '0%',
                      rotate: [-6, -2, 8],
                      scale: [0.95, 1, 1.02]
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.7, ease: 'easeOut' }}
                    style={{
                      position:'absolute',
                      left:'50%', bottom: 24,
                      transform:'translateX(-50%)',
                      offsetPath: 'path("M0,0 C100,-120 220,-160 380,-260")',
                      pointerEvents:'none'
                    }}
                  >
                    {PlaneSVG}
                  </motion.div>
                ) : (
                  <motion.div
                    key="planeFallback"
                    initial={{ opacity: 0, x: 0, y: 0, scale: 0.9 }}
                    animate={{
                      opacity: 1,
                      x: stage==='flying' ? [0, 120, 260, 360] : 0,
                      y: stage==='flying' ? [0, -90, -160, -240] : 0,
                      rotate: [-6, -2, 8],
                      scale: [0.95, 1, 1.02]
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.7, ease: 'easeOut' }}
                    style={{
                      position:'absolute',
                      left:'50%', bottom: 24,
                      transform:'translateX(-50%)',
                      pointerEvents:'none'
                    }}
                  >
                    {PlaneSVG}
                  </motion.div>
                )
              )}
            </AnimatePresence>
          </div>
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
