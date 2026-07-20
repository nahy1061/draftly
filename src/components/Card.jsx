import React from 'react'

const Card = () => {
  return (
    <div className="flex-1 flex justify-center">
      <div className="relative w-72 sm:w-80 rotate-2 hover:rotate-0 transition-transform duration-500 ease-out">
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl shadow-xl p-6">
          <span className="font-mono-draft text-[10px] text-indigo-600 dark:text-indigo-400 tracking-wide font-medium">
            // auto-saved 2s ago
          </span>
          <div className="mt-4 space-y-2">
            <div className="h-3 w-2/3 bg-slate-800 dark:bg-slate-100 rounded-sm opacity-90"></div>
            <div className="h-2 w-1/2 bg-slate-400 dark:bg-slate-500 rounded-sm opacity-70"></div>
          </div>
          <div className="mt-5 space-y-2">
            <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-sm"></div>
            <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-sm"></div>
            <div className="h-2 w-3/4 relative bg-slate-200 dark:bg-slate-800 rounded-sm">
              <span className="absolute -left-1 -right-1 top-0 bottom-0 bg-indigo-500/20 dark:bg-indigo-500/30 z-0 rounded-sm"></span>
            </div>
          </div>
        </div>
        <span className="absolute -bottom-3 -right-3 bg-indigo-600 dark:bg-indigo-500 text-white text-[10px] font-mono-draft px-2 py-1 rounded-md shadow-md rotate-3 font-semibold tracking-wider uppercase">
          editing…
        </span>
      </div>
    </div>
  )
}

export default Card