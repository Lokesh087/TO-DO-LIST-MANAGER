export const CAT_META = {
  Study:    { color: '#378ADD', bg: '#E6F1FB', text: '#185FA5' },
  Work:     { color: '#7F77DD', bg: '#EEEDFE', text: '#534AB7' },
  Fitness:  { color: '#1D9E75', bg: '#E1F5EE', text: '#0F6E56' },
  Personal: { color: '#D85A30', bg: '#FAECE7', text: '#993C1D' },
  Shopping: { color: '#BA7517', bg: '#FAEEDA', text: '#854F0B' },
};

export const PRIO_META = {
  High:   { bg: '#FCEBEB', text: '#A32D2D', dot: '#E24B4A' },
  Medium: { bg: '#FAEEDA', text: '#854F0B', dot: '#BA7517' },
  Low:    { bg: '#EAF3DE', text: '#3B6D11', dot: '#639922' },
};

export const HABITS = [
  { id: 'water',  label: 'Water',  icon: '💧', goal: 8,  unit: 'glasses' },
  { id: 'study',  label: 'Study',  icon: '📚', goal: 4,  unit: 'hours' },
  { id: 'gym',    label: 'Gym',    icon: '🏋️', goal: 1,  unit: 'session' },
  { id: 'sleep',  label: 'Sleep',  icon: '😴', goal: 8,  unit: 'hours' },
];

export const SAMPLE_TASKS = [
  { id: '1', title: 'Complete DBMS assignment', cat: 'Study',   prio: 'High',   date: '2026-05-11', time: '23:00', done: false, notes: 'Chapters 5-7 normalization theory' },
  { id: '2', title: 'Chest & triceps workout',  cat: 'Fitness', prio: 'Medium', date: '2026-05-10', time: '07:00', done: true,  notes: '' },
  { id: '3', title: 'Submit internship form',   cat: 'Work',    prio: 'High',   date: '2026-05-12', time: '',      done: false, notes: 'Attach updated resume + cover letter' },
  { id: '4', title: 'Buy weekly groceries',     cat: 'Shopping',prio: 'Low',    date: '2026-05-13', time: '',      done: false, notes: 'Milk, bread, eggs, vegetables' },
  { id: '5', title: 'AI project frontend',      cat: 'Study',   prio: 'Medium', date: '2026-05-14', time: '',      done: false, notes: 'Complete React UI by Friday' },
  { id: '6', title: 'Client meeting prep',      cat: 'Work',    prio: 'High',   date: '2026-05-10', time: '14:00', done: false, notes: '' },
  { id: '7', title: 'Evening run 5km',          cat: 'Fitness', prio: 'Low',    date: '2026-05-10', time: '18:00', done: false, notes: '' },
];
