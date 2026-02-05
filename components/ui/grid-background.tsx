import { cn } from "@/lib/utils"

interface GridBackgroundProps {
  children: React.ReactNode
  className?: string
}

export function GridBackground({ children, className }: GridBackgroundProps) {
  return (
    <div className={cn("relative", className)}>
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      {children}
    </div>
  )
}
