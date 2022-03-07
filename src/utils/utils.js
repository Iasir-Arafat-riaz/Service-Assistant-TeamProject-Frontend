// const initialIds = [3, 4, 10, 6, 9];
// const initialIds = [31, 41, 101, 61, 91];
const initialIds = [];

export const getItemFromLocal = () => {
  const ids = JSON.parse(localStorage.getItem("recentView"));
  return ids;
};

export const setItemInLocal = (id) => {
  const exist = getItemFromLocal();
  if (!exist) {
    localStorage.setItem("recentView", JSON.stringify(initialIds));
    return;
  }
  const newId = parseInt(id);
  if (!exist.includes(newId)) {
    const newIdsArray = [newId, ...exist].slice(0, 5);
    localStorage.setItem("recentView", JSON.stringify(newIdsArray));
  }
};

export const initialRecent = () => {
  const ids = getItemFromLocal();
  if (!ids) {
    localStorage.setItem("recentView", JSON.stringify(initialIds));
    return initialIds;
  }
  return ids;
};
