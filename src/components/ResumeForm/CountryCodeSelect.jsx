const countryCodes = [
    { code: "+92", label: "🇵🇰 +92" },   // Pakistan
  { code: "+1", label: "🇺🇸 +1" },    // United States
  { code: "+44", label: "🇬🇧 +44" },   // United Kingdom
  { code: "+91", label: "🇮🇳 +91" },   // India
  { code: "+966", label: "🇸🇦 +966" }, // Saudi Arabia
  { code: "+971", label: "🇦🇪 +971" }, // United Arab Emirates
  { code: "+1", label: "🇨🇦 +1" },    // Canada
  { code: "+61", label: "🇦🇺 +61" },   // Australia
  { code: "+49", label: "🇩🇪 +49" },   // Germany
  { code: "+33", label: "🇫🇷 +33" },   // France
  { code: "+90", label: "🇹🇷 +90" },   // Turkey
  { code: "+60", label: "🇲🇾 +60" },   // Malaysia
  { code: "+65", label: "🇸🇬 +65" },   // Singapore
  { code: "+880", label: "🇧🇩 +880" }, // Bangladesh
  { code: "+974", label: "🇶🇦 +974" }, // Qatar
  { code: "+965", label: "🇰🇼 +965" }, // Kuwait
];


function CountryCodeSelect({ value, onChange }) {
  return (
    <select
      name="countryCode"
      value={value}
      onChange={onChange}
      className="px-2 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-hidden transition-all"
    >
        {
            countryCodes.map(el=>(
                <option key={el.label} value={el.code} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">{el.label}</option>
            ))
        }
    </select>
  );
}

export default CountryCodeSelect;