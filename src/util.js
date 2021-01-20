import { RECORD_KEY } from './constant.js';

export function getRecords () {
  const str = localStorage.getItem(RECORD_KEY);
  return str ? JSON.parse(str) : Array(3).fill(['匿名', 999]);
}

export function setRecords (records) {
  localStorage.setItem(RECORD_KEY, JSON.stringify(records));
}
