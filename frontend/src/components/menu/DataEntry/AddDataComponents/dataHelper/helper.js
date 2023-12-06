export const clearData = (data, setData) => {
  const newData = {};
  for (const key in data) {
    newData[key] = "";
  }
  setData(newData);
};
