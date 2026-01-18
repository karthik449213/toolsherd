import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500/50",
  {
    variants: {
      variant: {
        default: "border-cyan-500/50 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-500/80",
        secondary: "border-slate-500/50 bg-slate-500/10 text-slate-300 hover:bg-slate-500/20",
        destructive: "border-red-500/50 bg-red-500/10 text-red-300 hover:bg-red-500/20",
        outline: "border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/10",
        magenta: "border-magenta-500/50 bg-magenta-500/10 text-magenta-300 hover:bg-magenta-500/20",
        green: "border-green-500/50 bg-green-500/10 text-green-300 hover:bg-green-500/20",
        orange: "border-orange-500/50 bg-orange-500/10 text-orange-300 hover:bg-orange-500/20",
        purple: "border-purple-500/50 bg-purple-500/10 text-purple-300 hover:bg-purple-500/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
