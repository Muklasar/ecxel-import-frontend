const dateFormatter = (dt) => {
  const date = new Date(dt);
  const year = date.getFullYear(); // 2023
  const month = date.getMonth() + 1; // 9 (Note: Months are 0-based, so we add 1)
  const day = date.getDate(); //

  return `${day}-${month}-${year}`
};

export default dateFormatter
