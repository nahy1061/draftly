import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { FaRegCalendarAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";

function parseMonthString(value) {
  if (!value) return null;
  const [year, month] = value.split("-").map(Number);
  return new Date(year, month - 1, 1);
}

function formatToMonthString(date) {
  if (!date) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

// 100 years back (old education dates) to 10 years ahead (future plans)
const CURRENT_YEAR = new Date().getFullYear();
const YEAR_OPTIONS = Array.from(
  { length: 111 },
  (_, i) => CURRENT_YEAR + 10 - i,
);

function MonthYearField({ value, onChange, onBlur, disabled, hasError }) {
  const [yearMenuOpen, setYearMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!yearMenuOpen) return;

    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setYearMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [yearMenuOpen]);

  // Plain function, not a component — react-datepicker calls this directly
  // rather than rendering it through React, so no hooks can be called
  // inside it. It only reads state via closure from the component above.
  function renderCustomHeader({ date, decreaseYear, increaseYear }) {
    return (
      <div className="relative flex items-center justify-between px-2 py-2">
        <button
          type="button"
          onClick={decreaseYear}
          className="p-1 rounded-sm hover:bg-[#EDE8DF] dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400"
          aria-label="Previous Year"
        >
          <FaChevronLeft size={12} />
        </button>

        <button
          type="button"
          onClick={() => setYearMenuOpen((open) => !open)}
          className="text-sm font-semibold text-slate-800 dark:text-slate-100 px-2 py-0.5 rounded-sm hover:bg-[#EDE8DF] dark:hover:bg-slate-800"
        >
          {date.getFullYear()}
        </button>

        {yearMenuOpen && (
          <div
            ref={menuRef}
            className="draftly-year-scroll absolute top-full left-1/2 -translate-x-1/2 mt-1 w-24 max-h-48 overflow-y-auto rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg z-10"
          >
            {YEAR_OPTIONS.map((year) => (
              <button
                key={year}
                type="button"
                onClick={() => {
                  const newDate = new Date(date);
                  newDate.setFullYear(year);
                  onChange(formatToMonthString(newDate));
                  setYearMenuOpen(false);
                }}
                className={`block w-full text-center text-sm px-3 py-1.5 hover:bg-indigo-50 dark:hover:bg-slate-800 ${
                  year === date.getFullYear()
                    ? "bg-indigo-600 text-white hover:bg-indigo-600"
                    : "text-slate-700 dark:text-slate-200"
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={increaseYear}
          className="p-1 rounded-sm hover:bg-[#EDE8DF] dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400"
          aria-label="Next Year"
        >
          <FaChevronRight size={12} />
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <DatePicker
        selected={parseMonthString(value)}
        onChange={(date) => onChange(formatToMonthString(date))}
        onBlur={onBlur}
        disabled={disabled}
        showMonthYearPicker
        dateFormat="MMM yyyy"
        calendarClassName="draftly-datepicker"
        wrapperClassName="w-full"
        renderCustomHeader={renderCustomHeader}
        className={`draftly-picker-input w-full px-3 py-2 rounded-lg border bg-white/50 dark:bg-slate-900/50 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-hidden transition-all disabled:opacity-50 ${
          hasError
            ? "border-red-400"
            : "border-slate-200 dark:border-slate-800"
        }`}
      />
      <FaRegCalendarAlt
        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none"
        size={14}
      />
    </div>
  );
}

export default MonthYearField;