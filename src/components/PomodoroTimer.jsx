import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import styles from './PomodoroTimer.module.css';

const MODES = [
  { id: 'work',  label: 'Focus',      minutes: 25, color: '#7F77DD' },
  { id: 'short', label: 'Short break',minutes: 5,  color: '#1D9E75' },
  { id: 'long',  label: 'Long break', minutes: 15, color: '#378ADD' },
];

export default function PomodoroTimer() {
  const [modeIdx, setModeIdx] = useState(0);
  const [seconds, setSeconds] = useState(MODES[0].minutes * 60);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const interval = useRef(null);
  const mode = MODES[modeIdx];
  const total = mode.minutes * 60;
  const pct = ((total - seconds) / total) * 100;

  useEffect(() => {
    if (running) {
      interval.current = setInterval(() => {
        setSeconds(s => {
          if (s <= 1) {
            clearInterval(interval.current);
            setRunning(false);
            if (modeIdx === 0) setSessions(n => n + 1);
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval.current);
    }
    return () => clearInterval(interval.current);
  }, [running, modeIdx]);

  const switchMode = (i) => {
    setModeIdx(i);
    setSeconds(MODES[i].minutes * 60);
    setRunning(false);
  };

  const reset = () => {
    setSeconds(mode.minutes * 60);
    setRunning(false);
  };

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');
  const r = 44;
  const circ = 2 * Math.PI * r;
  const dash = circ - (pct / 100) * circ;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.title}>Pomodoro</span>
        <span className={styles.sessions}>{sessions} sessions today</span>
      </div>

      <div className={styles.tabs}>
        {MODES.map((m, i) => (
          <button
            key={m.id}
            className={`${styles.tab} ${modeIdx === i ? styles.activeTab : ''}`}
            onClick={() => switchMode(i)}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className={styles.ring}>
        <svg width="112" height="112" viewBox="0 0 112 112">
          <circle cx="56" cy="56" r={r} fill="none" stroke="#f0eff8" strokeWidth="6" />
          <circle
            cx="56" cy="56" r={r}
            fill="none"
            stroke={mode.color}
            strokeWidth="6"
            strokeDasharray={circ}
            strokeDashoffset={dash}
            strokeLinecap="round"
            transform="rotate(-90 56 56)"
            style={{ transition: 'stroke-dashoffset 0.9s linear' }}
          />
        </svg>
        <div className={styles.time}>{mm}:{ss}</div>
      </div>

      <div className={styles.controls}>
        <button className={styles.resetBtn} onClick={reset} aria-label="Reset">
          <RotateCcw size={14} />
        </button>
        <button
          className={styles.playBtn}
          style={{ background: mode.color }}
          onClick={() => setRunning(r => !r)}
          aria-label={running ? 'Pause' : 'Start'}
        >
          {running ? <Pause size={18} /> : <Play size={18} />}
        </button>
      </div>
    </div>
  );
}
