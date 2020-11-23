function loadSetting(name) {
  if (typeof window === "undefined") {
    return null;
  }
  return localStorage.getItem(name);
}

function saveSetting(name, value) {
  if (typeof window === "undefined") {
    return null;
  }

  localStorage.setItem(name, value);
}

export { loadSetting, saveSetting };
