import styles from './StatsBar.module.css';

export default function StatsBar({ tasks }) {
  const total = tasks.length;
  const done = tasks.filter(t => t.done).length;
  const pending = total - done;
  const pct = total ? Math.round((done / total) * 100) : 0;

  return (
    <div className={styles.bar}>
      <div className={styles.stat}>
        <span className={styles.val}>{total}</span>
        <span className={styles.lbl}>Total</span>
      </div>
      <div className={styles.divider} />
      <div className={styles.stat}>
        <span className={styles.val} style={{ color: '#1D9E75' }}>{done}</span>
        <span className={styles.lbl}>Done</span>
      </div>
      <div className={styles.divider} />
      <div className={styles.stat}>
        <span className={styles.val} style={{ color: '#7F77DD' }}>{pending}</span>
        <span className={styles.lbl}>Pending</span>
      </div>
      <div className={styles.progress}>
        <div className={styles.progressTop}>
          <span className={styles.lbl}>Today's progress</span>
          <span className={styles.pct}>{pct}%</span>
        </div>
        <div className={styles.track}>
          <div className={styles.fill} style={{ width: pct + '%' }} />
        </div>
      </div>
    </div>
  );
}
