export const dateToIso = (date: Date): string => {
  const formattedDate = date.toISOString().slice(0, 10);

  return formattedDate;
};
