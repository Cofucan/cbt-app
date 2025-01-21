const findEmptyFields = (data: Record<string, string | any>) => {
  return Object.keys(data).filter(
    (key) =>
      !data[key] || (typeof data[key] === "string" && data[key].trim() === ""),
  );
};

export default findEmptyFields;
