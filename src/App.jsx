import { useState, useMemo } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { Plus, Search } from 'lucide-react';

import Sidebar from './components/Sidebar';
import TaskItem from './components/TaskItem';
import TaskModal from './components/TaskModal';
import StatsBar from './components/StatsBar';
import PomodoroTimer from './components/PomodoroTimer';
import HabitTracker from './components/HabitTracker';
import { useLocalStorage } from './hooks/useLocalStorage';
import { SAMPLE_TASKS, PRIO_META } from './data';
import styles from './App.module.css';

let _nextId = 100;
const uid = () => String(_nextId++);

export default function App() {
  const [tasks, setTasks] = useLocalStorage('smartdo_tasks', SAMPLE_TASKS);
  const [view, setView] = useState('all');
  const [activeCat, setActiveCat] = useState(null);
  const [prioPick, setPrioPick] = useState('all');
  const [query, setQuery] = useState('');
  const [modal, setModal] = useState(null); // null | 'new' | task object
  const [dragId, setDragId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } })
  );

  const today = new Date().toISOString().slice(0, 10);

  const filtered = useMemo(() => {
    let list = tasks.slice();
    if (activeCat) {
      list = list.filter(t => t.cat === activeCat);
    } else {
      if (view === 'today') list = list.filter(t => t.date === today);
      else if (view === 'upcoming') list = list.filter(t => t.date > today && !t.done);
      else if (view === 'completed') list = list.filter(t => t.done);
    }
    if (prioPick !== 'all') list = list.filter(t => t.prio === prioPick);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(t =>
        t.title.toLowerCase().includes(q) || (t.notes || '').toLowerCase().includes(q)
      );
    }
    return list;
  }, [tasks, view, activeCat, prioPick, query, today]);

  const taskCounts = useMemo(() => {
    const all = tasks.length;
    const todayTasks = tasks.filter(t => t.date === today).length;
    const upcoming = tasks.filter(t => t.date > today && !t.done).length;
    const completed = tasks.filter(t => t.done).length;
    const cats = {};
    tasks.forEach(t => { cats['cat_' + t.cat] = (cats['cat_' + t.cat] || 0) + 1; });
    return { all, today: todayTasks, upcoming, completed, ...cats };
  }, [tasks, today]);

  const handleView = (v) => { setView(v); setActiveCat(null); };
  const handleCat = (c) => { setActiveCat(c); setView(null); };

  const toggle = (id) => setTasks(ts => ts.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const del = (id) => setTasks(ts => ts.filter(t => t.id !== id));

  const saveTask = (form) => {
    if (modal && modal.id) {
      setTasks(ts => ts.map(t => t.id === modal.id ? { ...t, ...form } : t));
    } else {
      setTasks(ts => [...ts, { id: uid(), done: false, ...form }]);
    }
  };

  const handleDragStart = ({ active }) => setDragId(active.id);
  const handleDragEnd = ({ active, over }) => {
    setDragId(null);
    if (!over || active.id === over.id) return;
    setTasks(ts => {
      const ids = filtered.map(t => t.id);
      const oldIdx = ids.indexOf(active.id);
      const newIdx = ids.indexOf(over.id);
      const reordered = arrayMove(ids, oldIdx, newIdx);
      const map = Object.fromEntries(ts.map(t => [t.id, t]));
      const filteredSet = new Set(ids);
      const others = ts.filter(t => !filteredSet.has(t.id));
      return [...reordered.map(id => map[id]), ...others];
    });
  };

  const dragTask = dragId ? tasks.find(t => t.id === dragId) : null;

  const viewTitle = activeCat
    ? activeCat
    : { all: 'All tasks', today: 'Today', upcoming: 'Upcoming', completed: 'Completed' }[view];

  return (
    <div className={styles.layout}>
      <Sidebar
        view={!activeCat ? view : null}
        cat={activeCat}
        onView={handleView}
        onCat={handleCat}
        taskCounts={taskCounts}
      />

      <main className={styles.main}>
        <div className={styles.topbar}>
          <h1 className={styles.heading}>{viewTitle}</h1>
          <div className={styles.searchWrap}>
            <Search size={14} className={styles.searchIcon} />
            <input
              className={styles.search}
              placeholder="Search tasks…"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </div>
          <button className={styles.addBtn} onClick={() => setModal('new')}>
            <Plus size={15} /> Add task
          </button>
        </div>

        <StatsBar tasks={tasks} />

        <div className={styles.filterRow}>
          {['all', ...Object.keys(PRIO_META)].map(p => (
            <button
              key={p}
              className={`${styles.chip} ${prioPick === p ? styles.chipActive : ''}`}
              onClick={() => setPrioPick(p)}
            >
              {p === 'all' ? 'All' : p}
            </button>
          ))}
        </div>

        <div className={styles.taskArea}>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={filtered.map(t => t.id)} strategy={verticalListSortingStrategy}>
              {filtered.length === 0 ? (
                <div className={styles.empty}>
                  <span>✦</span>
                  <p>No tasks here</p>
                </div>
              ) : (
                filtered.map(task => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={toggle}
                    onEdit={t => setModal(t)}
                    onDelete={del}
                  />
                ))
              )}
            </SortableContext>
            <DragOverlay>
              {dragTask && (
                <TaskItem
                  task={dragTask}
                  onToggle={() => {}}
                  onEdit={() => {}}
                  onDelete={() => {}}
                />
              )}
            </DragOverlay>
          </DndContext>
        </div>
      </main>

      <aside className={styles.rightPanel}>
        <PomodoroTimer />
        <HabitTracker />
      </aside>

      {modal && (
        <TaskModal
          task={modal === 'new' ? null : modal}
          onSave={saveTask}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}
