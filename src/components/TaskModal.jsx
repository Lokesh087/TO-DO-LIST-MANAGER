import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { CAT_META, PRIO_META } from '../data';
import styles from './TaskModal.module.css';

const EMPTY = { title: '', notes: '', cat: 'Study', prio: 'Medium', date: '', time: '' };

export default function TaskModal({ task, onSave, onClose }) {
  const [form, setForm] = useState(EMPTY);

  useEffect(() => {
    setForm(task ? { ...task } : EMPTY);
  }, [task]);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = () => {
    if (!form.title.trim()) return;
    onSave(form);
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>{task ? 'Edit task' : 'New task'}</h2>
          <button className={styles.close} onClick={onClose} aria-label="Close"><X size={16} /></button>
        </div>

        <div className={styles.field}>
          <label>Title</label>
          <input
            autoFocus
            type="text"
            placeholder="What needs to be done?"
            value={form.title}
            onChange={e => set('title', e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSave()}
          />
        </div>

        <div className={styles.field}>
          <label>Notes</label>
          <textarea
            placeholder="Add details or notes…"
            value={form.notes}
            onChange={e => set('notes', e.target.value)}
            rows={3}
          />
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label>Category</label>
            <select value={form.cat} onChange={e => set('cat', e.target.value)}>
              {Object.keys(CAT_META).map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className={styles.field}>
            <label>Priority</label>
            <select value={form.prio} onChange={e => set('prio', e.target.value)}>
              {Object.keys(PRIO_META).map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label>Due date</label>
            <input type="date" value={form.date} onChange={e => set('date', e.target.value)} />
          </div>
          <div className={styles.field}>
            <label>Due time</label>
            <input type="time" value={form.time} onChange={e => set('time', e.target.value)} />
          </div>
        </div>

        <div className={styles.btns}>
          <button className={styles.cancel} onClick={onClose}>Cancel</button>
          <button className={styles.save} onClick={handleSave}>
            {task ? 'Save changes' : 'Add task'}
          </button>
        </div>
      </div>
    </div>
  );
}
