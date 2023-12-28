export const getLSItem = (key) => {
    const data = JSON.parse(localStorage.getItem(key)) || "";
    return data;
};

export const setLSItem = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const deleteLSItem = (key) => {
  localStorage.removeItem(key);
};