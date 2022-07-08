import Json from 'types/Json';

function getAll() {
  if (window !== undefined) {
    return JSON.parse(JSON.stringify(window.localStorage));
  } else {
    return {};
  }
}

function getItem(key: string) {
  const data: Json = getAll();
  return data.hasOwnProperty(key) ? JSON.parse(data[key]) : null;
}

function setItem(key: string, value: any) {
  window.localStorage.setItem(key, JSON.stringify(value));
  return getAll();
}

function removeItem(key: string) {
  window.localStorage.removeItem(key);
  return getAll();
}

const useLocalStorage = {
  getAll,
  getItem,
  setItem,
  removeItem,
};

export default useLocalStorage;
