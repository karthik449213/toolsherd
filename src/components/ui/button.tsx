import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-cyan-500 text-gray-950 hover:bg-cyan-400 active:bg-cyan-600 focus-visible:ring-cyan-500/50 font-semibold shadow-lg hover:shadow-glow-medium",
        destructive: "bg-red-600 text-white hover:bg-red-500 active:bg-red-700 focus-visible:ring-red-500/50",
        outline: "border-2 border-cyan-500/40 bg-transparent text-cyan-400 hover:border-cyan-500 hover:bg-cyan-500/10 active:bg-cyan-500/20 focus-visible:ring-cyan-500/50 hover:shadow-glow-subtle",
        secondary: "bg-slate-700/50 text-slate-100 hover:bg-slate-600 active:bg-slate-700 focus-visible:ring-slate-500/50 border border-slate-600/50",
        ghost: "text-cyan-400 hover:bg-cyan-500/10 active:bg-cyan-500/20 hover:text-cyan-300",
        link: "text-cyan-400 underline-offset-4 hover:underline hover:text-cyan-300",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
