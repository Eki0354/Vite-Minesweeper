import { RECORD_KEY, CONFIG_KEY, DEFAULT_CONFIG } from './constant.js';

export function getRecords () {
  const str = localStorage.getItem(RECORD_KEY);
  return str ? JSON.parse(str) : Array(3).fill(['匿名', 999]);
}

export function setRecords (records) {
  localStorage.setItem(RECORD_KEY, JSON.stringify(records));
}

export function getConfig () {
  const str = localStorage.getItem(CONFIG_KEY);
  return str ? JSON.parse(str) : (setConfig(DEFAULT_CONFIG) || DEFAULT_CONFIG);
}

export function setConfig (config) {
  localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
}

export function exitWindow () {
  window.open("about:blank","_self").close();
}
