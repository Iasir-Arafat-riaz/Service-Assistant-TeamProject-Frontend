// const initialIds = [3, 4, 10, 6, 9];
// const initialIds = [31, 41, 101, 61, 91];
const initialIds = [];

export const getItemFromLocal = () => {
  const ids = JSON.parse(localStorage.getItem("recentView"));
  return ids;
};

export const setItemInLocal = (data) => {
  console.log(data);
  const exist = getItemFromLocal();
  if (!exist) {
    localStorage.setItem("recentView", JSON.stringify([data]));

  }
  else {
    let withoutThis = exist.filter(info => info.Id !== data.Id);
    const newData = [data, ...withoutThis];
    localStorage.setItem("recentView", JSON.stringify(newData));

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
