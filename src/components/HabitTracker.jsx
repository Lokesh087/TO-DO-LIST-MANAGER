import { useLocalStorage } from '../hooks/useLocalStorage';
import { HABITS } from '../data';
import { Plus, Minus } from 'lucide-react';
import styles from './HabitTracker.module.css';

export default function HabitTracker() {
  const todayKey = new Date().toISOString().slice(0, 10);
  const [data, setData] = useLocalStorage(`habits_${todayKey}`, {});

  const get = (id) => data[id] || 0;
  const adjust = (id, delta, max) => {
    const next = Math.min(max, Math.max(0, get(id) + delta));
    setData(d => ({ ...d, [id]: next }));
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.title}>Habits</span>
        <span className={styles.sub}>Today</span>
      </div>
      <div className={styles.list}>
        {HABITS.map(h => {
          const val = get(h.id);
          const pct = Math.min(100, Math.round((val / h.goal) * 100));
          const done = val >= h.goal;
          return (
            <div key={h.id} className={`${styles.row} ${done ? styles.done : ''}`}>
              <span className={styles.emoji}>{h.icon}</span>
              <div className={styles.info}>
                <div className={styles.labelRow}>
                  <span className={styles.label}>{h.label}</span>
                  <span className={styles.count}>{val}/{h.goal} {h.unit}</span>
                </div>
                <div className={styles.bar}>
                  <div
                    className={styles.fill}
                    style={{ width: pct + '%', background: done ? '#1D9E75' : '#7F77DD' }}
                  />
                </div>
              </div>
              <div className={styles.btns}>
                <button className={styles.adj} onClick={() => adjust(h.id, -1, h.goal)} aria-label="Decrease">
                  <Minus size={11} />
                </button>
                <button className={`${styles.adj} ${styles.plus}`} onClick={() => adjust(h.id, 1, h.goal)} aria-label="Increase">
                  <Plus size={11} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
