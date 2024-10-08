/* eslint-disable @typescript-eslint/no-explicit-any */
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
