const MONTHS_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

// Formats "YYYY-MM" date inputs for display on the resume
export function formatMonthYear(value) {
  if (!value) return "";
  const [year, month] = value.split("-");
  const monthIndex = Number(month) - 1;
  return `${MONTHS_SHORT[monthIndex]} ${year}`;
}