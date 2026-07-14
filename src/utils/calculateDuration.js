export function calculateDuration(startDate, endDate) {
  if (!startDate) return "";

  const [startYear, startMonth] = startDate.split("-").map(Number);

  let endYear, endMonth;
  if (endDate) {
    [endYear, endMonth] = endDate.split("-").map(Number);
  } else {
    const today = new Date();
    endYear = today.getFullYear();
    endMonth = today.getMonth() + 1; // getMonth() is 0-indexed
  }

  // +1 makes it inclusive of both the start and end month.
  const totalMonths =
    (endYear - startYear) * 12 + (endMonth - startMonth) + 1;

  if (totalMonths <= 0) return "";

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  if (years === 0) return `${months} mo${months === 1 ? "" : "s"}`;
  if (months === 0) return `${years} yr${years === 1 ? "" : "s"}`;
  return `${years} yr${years === 1 ? "" : "s"} ${months} mo${months === 1 ? "" : "s"}`;
}