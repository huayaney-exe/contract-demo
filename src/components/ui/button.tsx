import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Interbank Design System Button Variants
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-['Geometria',sans-serif] font-medium tracking-[0.1px] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[hsl(var(--interbank-primary-green))] text-white hover:bg-[hsl(var(--interbank-primary-green-light))] shadow-[0px_1px_4px_rgba(0,0,0,0.10)]",
        destructive:
          "bg-[hsl(var(--interbank-error))] text-white hover:bg-[hsl(var(--interbank-error-light))]",
        outline:
          "border-2 border-[hsl(var(--interbank-primary-green))] bg-transparent text-[hsl(var(--interbank-primary-green))] hover:bg-[hsl(var(--interbank-primary-green-bg))]",
        secondary:
          "bg-[hsl(var(--interbank-secondary-blue))] text-white hover:bg-[hsl(var(--interbank-secondary-blue-dark))]",
        ghost:
          "hover:bg-[hsl(var(--interbank-gray-50))] hover:text-[hsl(var(--interbank-gray-900))]",
        link:
          "text-[hsl(var(--interbank-primary-green))] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-8 text-sm rounded-3xl", // 48px height, 32px padding, 24px radius
        sm: "h-8 px-4 text-xs rounded-xl", // 32px height, 16px padding, 16px radius
        lg: "h-14 px-10 text-base rounded-[28px]", // 56px height, 40px padding, 28px radius
        icon: "h-10 w-10 rounded-full",
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
