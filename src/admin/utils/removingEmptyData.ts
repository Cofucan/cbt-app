const removeEmptyData = (obj: Record<string, any>) => {
  for (const key in obj) {
    if (obj[key] === null || obj[key] === undefined || obj[key] === "") {
      delete obj[key];
    }
  }
  return obj;
};

export default removeEmptyData;
