const getSettingsKey = (name) => `setting:${name}`;

function loadSetting(name) {
  if (typeof window === "undefined") return null;

  try {
    const serializedValue = localStorage.getItem(getSettingsKey(name));
    if (serializedValue === null) {
      return null;
    }
    return JSON.parse(serializedValue);
  } catch (err) {
    console.log(err);
    return null;
  }
}

function saveSetting(name, value) {
  if (typeof window === "undefined") return null;

  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(getSettingsKey(name), serializedValue);
  } catch {
    console.log(err);
  }
}

export { loadSetting, saveSetting };
