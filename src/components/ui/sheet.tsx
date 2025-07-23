import * as React from "react"
import { cn } from "@/lib/utils"

interface SheetProps {
  children: React.ReactNode
}

export function Sheet({ children }: SheetProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  
  return (
    <div>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { 
            isOpen, 
            setIsOpen,
            ...child.props 
          } as any)
        }
        return child
      })}
    </div>
  )
}

interface SheetTriggerProps {
  asChild?: boolean
  children: React.ReactNode
  isOpen?: boolean
  setIsOpen?: (open: boolean) => void
}

export function SheetTrigger({ asChild, children, isOpen, setIsOpen }: SheetTriggerProps) {
  const handleClick = () => {
    setIsOpen?.(!isOpen)
  }

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onClick: handleClick,
      ...children.props
    })
  }

  return (
    <button onClick={handleClick}>
      {children}
    </button>
  )
}

interface SheetContentProps {
  side?: "left" | "right" | "top" | "bottom"
  className?: string
  children: React.ReactNode
  isOpen?: boolean
  setIsOpen?: (open: boolean) => void
}

export function SheetContent({ 
  side = "right", 
  className, 
  children, 
  isOpen, 
  setIsOpen 
}: SheetContentProps) {
  if (!isOpen) return null

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 z-50"
        onClick={() => setIsOpen?.(false)}
      />
      <div
        className={cn(
          "fixed z-50 bg-white shadow-lg",
          side === "right" && "right-0 top-0 h-full",
          side === "left" && "left-0 top-0 h-full",
          side === "top" && "top-0 left-0 w-full",
          side === "bottom" && "bottom-0 left-0 w-full",
          className
        )}
      >
        {children}
      </div>
    </>
  )
}
