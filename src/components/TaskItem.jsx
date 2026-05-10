import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Pencil, Trash2, Clock } from 'lucide-react';
import { CAT_META, PRIO_META } from '../data';
import styles from './TaskItem.module.css';

export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.45 : 1,
    zIndex: isDragging ? 50 : undefined,
  };

  const today = new Date().toISOString().slice(0, 10);
  const isOverdue = task.date && task.date < today && !task.done;
  const cm = CAT_META[task.cat] || { bg: '#eee', text: '#333' };
  const pm = PRIO_META[task.prio] || { bg: '#eee', text: '#333', dot: '#888' };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${styles.item} ${task.done ? styles.done : ''} ${isDragging ? styles.dragging : ''}`}
    >
      <button className={styles.grip} {...attributes} {...listeners} aria-label="Drag to reorder">
        <GripVertical size={14} />
      </button>

      <button
        className={`${styles.check} ${task.done ? styles.checked : ''}`}
        onClick={() => onToggle(task.id)}
        aria-label={task.done ? 'Mark incomplete' : 'Mark complete'}
      >
        {task.done && <span>✓</span>}
      </button>

      <div className={styles.body}>
        <p className={styles.title}>{task.title}</p>
        <div className={styles.meta}>
          <span className={styles.badge} style={{ background: cm.bg, color: cm.text }}>{task.cat}</span>
          <span className={styles.badge} style={{ background: pm.bg, color: pm.text }}>
            <span className={styles.prioDot} style={{ background: pm.dot }} />
            {task.prio}
          </span>
          {task.date && (
            <span className={`${styles.due} ${isOverdue ? styles.overdue : ''}`}>
              <Clock size={10} />
              {task.date}{task.time ? ' · ' + task.time : ''}
            </span>
          )}
        </div>
        {task.notes && <p className={styles.notes}>{task.notes}</p>}
      </div>

      <div className={styles.actions}>
        <button className={styles.iconBtn} onClick={() => onEdit(task)} aria-label="Edit">
          <Pencil size={13} />
        </button>
        <button className={`${styles.iconBtn} ${styles.del}`} onClick={() => onDelete(task.id)} aria-label="Delete">
          <Trash2 size={13} />
        </button>
      </div>
    </div>
  );
}
