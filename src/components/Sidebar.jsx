import { LayoutList, Sun, Calendar, CheckCircle, Tag } from 'lucide-react';
import { CAT_META } from '../data';
import styles from './Sidebar.module.css';

const VIEWS = [
  { id: 'all',       label: 'All tasks',  Icon: LayoutList },
  { id: 'today',     label: 'Today',      Icon: Sun },
  { id: 'upcoming',  label: 'Upcoming',   Icon: Calendar },
  { id: 'completed', label: 'Completed',  Icon: CheckCircle },
];

export default function Sidebar({ view, cat, onView, onCat, taskCounts }) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <span className={styles.brandIcon}>✦</span>
        <span className={styles.brandName}>SmartDo</span>
      </div>

      <nav className={styles.nav}>
        <p className={styles.sectionLabel}>Views</p>
        {VIEWS.map(({ id, label, Icon }) => (
          <button
            key={id}
            className={`${styles.navItem} ${view === id && !cat ? styles.active : ''}`}
            onClick={() => onView(id)}
          >
            <Icon size={15} />
            <span>{label}</span>
            {taskCounts[id] != null && (
              <span className={styles.count}>{taskCounts[id]}</span>
            )}
          </button>
        ))}

        <p className={styles.sectionLabel} style={{ marginTop: 20 }}>Categories</p>
        {Object.entries(CAT_META).map(([name, meta]) => (
          <button
            key={name}
            className={`${styles.navItem} ${cat === name ? styles.active : ''}`}
            onClick={() => onCat(name)}
          >
            <span className={styles.dot} style={{ background: meta.color }} />
            <span>{name}</span>
            {taskCounts['cat_' + name] != null && (
              <span className={styles.count}>{taskCounts['cat_' + name]}</span>
            )}
          </button>
        ))}
      </nav>
    </aside>
  );
}
