import React from 'react'

const Card = () => {
  return (
    <div className="flex-1 flex justify-center">
          <div className="relative w-72 sm:w-80 rotate-2 hover:rotate-0 transition-transform duration-500">
            <div className="bg-white dark:bg-[#233256] border border-[#1C2541]/10 dark:border-[#F2EFE9]/10 rounded-lg shadow-xl p-6">
              <span className="font-mono-draft text-[10px] text-[#3C6E71] dark:text-[#7FA8A3] tracking-wide">
                // auto-saved 2s ago
              </span>
              <div className="mt-4 space-y-2">
                <div className="h-3 w-2/3 bg-[#1C2541]/80 dark:bg-[#F2EFE9]/80 rounded-sm"></div>
                <div className="h-2 w-1/2 bg-[#1C2541]/30 dark:bg-[#F2EFE9]/30 rounded-sm"></div>
              </div>
              <div className="mt-5 space-y-2">
                <div className="h-2 w-full bg-[#1C2541]/15 dark:bg-[#F2EFE9]/15 rounded-sm"></div>
                <div className="h-2 w-full bg-[#1C2541]/15 dark:bg-[#F2EFE9]/15 rounded-sm"></div>
                <div className="h-2 w-3/4 relative bg-[#1C2541]/15 dark:bg-[#F2EFE9]/15 rounded-sm">
                  <span className="absolute -left-1 -right-1 top-0 bottom-0 bg-[#F4B942]/50 z-0 rounded-sm"></span>
                </div>
              </div>
            </div>
            <span className="absolute -bottom-3 -right-3 bg-[#F4B942] text-[#1C2541] text-[10px] font-mono-draft px-2 py-1 rounded shadow-md rotate-3">
              editing…
            </span>
          </div>
        </div>
  )
}

export default Card