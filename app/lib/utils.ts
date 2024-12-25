/* eslint-disable @typescript-eslint/no-explicit-any */
export const getAllSearchsFromLocalStorage = () => {
  const searchs = [];
  for (let i = 0; i < 100; i++) {
    const search = getFromLocalStorage(`@SEARCH${i}`);
    if (!search) break;
    searchs.push(search);
  }
  if (searchs.length === 0) return [0];
  return searchs;
};

export const getFromLocalStorage = (key: string) => {
  const value = localStorage.getItem(key);
  return value && JSON.parse(value);
};

export const addToLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const updateLocalStorage = (key: string, newValue: any) => {
  localStorage.setItem(key, JSON.stringify(newValue));
};

export const deleteFromLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

export const addToSessionStorage = (key: string, value: any) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

export const updateSessionStorage = (key: string, newValue: any) => {
  sessionStorage.setItem(key, JSON.stringify(newValue));
};

export const deleteFromSessionStorage = (key: string) => {
  sessionStorage.removeItem(key);
};

export const getJobDataTimeValueMeaning = (value: string) => {
  switch (value) {
    case "r86400":
      return "Útimas 24 horas";

    case "r604800":
      return "Útimos 7 dias";

    case "r2592000":
      return "Útimos 30 dias";

    default:
      return value;
  }
};

export const getJobDataRemoteValueMeaning = (value: string) => {
  switch (value) {
    case "1%2C2%2C3":
      return "Todas as vagas";

    case "3":
      return "Somente Híbridas";

    case "2":
      return "Somente Remotas";

    case "1":
      return "Somente Presenciais";

    default:
      return value;
  }
};
