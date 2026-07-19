import { useEffect, useRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MagneticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "ember" | "ghost";
  children: ReactNode;
}

export function MagneticButton({ variant = "ember", className, children, ...props }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const btn = ref.current;
    if (!btn) return;
    const strength = 18;
    const onMove = (e: PointerEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      btn.style.transform = `translate3d(${(x / rect.width) * strength}px, ${(y / rect.height) * strength}px, 0)`;
    };
    const reset = () => (btn.style.transform = "translate3d(0,0,0)");
    btn.addEventListener("pointermove", onMove);
    btn.addEventListener("pointerleave", reset);
    return () => {
      btn.removeEventListener("pointermove", onMove);
      btn.removeEventListener("pointerleave", reset);
    };
  }, []);

  const base =
    "group relative inline-flex select-none items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-medium tracking-wide transition-[background,color,box-shadow] duration-300 will-change-transform";
  const styles =
    variant === "ember"
      ? "bg-ember text-primary-foreground shadow-[0_20px_50px_-15px_oklch(0.72_0.19_45/0.6)] hover:shadow-[0_25px_70px_-15px_oklch(0.72_0.19_45/0.8)]"
      : "text-foreground border border-white/15 bg-white/[0.03] backdrop-blur hover:bg-white/[0.08]";

  return (
    <button ref={ref} className={cn(base, styles, className)} {...props}>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
}
