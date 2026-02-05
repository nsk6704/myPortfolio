import { cn } from "@/lib/utils"

interface BackgroundGradientProps {
  children: React.ReactNode
  className?: string
  containerClassName?: string
  animate?: boolean
}

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
}: BackgroundGradientProps) => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  }

  return (
    <div className={cn("relative p-[4px] group", containerClassName)}>
      <div
        className={cn(
          "absolute inset-0 rounded-base opacity-60 group-hover:opacity-100 blur-xl transition duration-500",
          animate && "animate-gradient",
          "bg-[radial-gradient(circle_farthest-side_at_0_100%,oklch(66.9%_0.18368_248.8066),transparent),radial-gradient(circle_farthest-side_at_100%_0,oklch(66.9%_0.18368_248.8066),transparent),radial-gradient(circle_farthest-side_at_100%_100%,oklch(66.9%_0.18368_248.8066),transparent),radial-gradient(circle_farthest-side_at_0_0,oklch(66.9%_0.18368_248.8066),#141316)]"
        )}
      />
      <div
        className={cn(
          "relative bg-background border-2 border-border rounded-base shadow-shadow",
          className
        )}
      >
        {children}
      </div>
    </div>
  )
}
