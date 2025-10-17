import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-lg border-2 border-[hsl(var(--interbank-gray-300))] bg-white px-4 py-3 text-base font-['Geometria',sans-serif] font-medium text-[hsl(var(--interbank-gray-900))] transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[hsl(var(--interbank-gray-500))] focus-visible:outline-none focus-visible:border-[hsl(var(--interbank-primary-green))] focus-visible:ring-2 focus-visible:ring-[hsl(var(--interbank-primary-green))] focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[hsl(var(--interbank-gray-100))]",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
