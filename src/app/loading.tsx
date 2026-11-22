import { Scissors } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center bg-[#FDFBF7] dark:bg-[#12100E]">
      <div className="relative flex size-16 items-center justify-center">
        <div className="absolute inset-0 rounded-full border-2 border-[#C4A265]/20 border-t-[#C4A265] animate-spin" />
        <div className="flex size-11 items-center justify-center rounded-full bg-[#C4A265]/10 text-[#8F6E2E] dark:text-[#C4A265]">
          <Scissors className="size-5" />
        </div>
      </div>
      <p className="mt-4 font-mono text-xs font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400 animate-pulse">
        Preparing Salon Experience...
      </p>
    </div>
  );
}
