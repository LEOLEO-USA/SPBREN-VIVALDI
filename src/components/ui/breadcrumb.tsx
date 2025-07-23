import * as React from "react"
import { cn } from "@/lib/utils"

interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {}

export function Breadcrumb({ className, ...props }: BreadcrumbProps) {
  return (
    <nav aria-label="breadcrumb" className={cn("", className)} {...props} />
  )
}

interface BreadcrumbListProps extends React.HTMLAttributes<HTMLOListElement> {}

export function BreadcrumbList({ className, ...props }: BreadcrumbListProps) {
  return (
    <ol className={cn("flex items-center space-x-2", className)} {...props} />
  )
}

interface BreadcrumbItemProps extends React.HTMLAttributes<HTMLLIElement> {}

export function BreadcrumbItem({ className, ...props }: BreadcrumbItemProps) {
  return (
    <li className={cn("text-neutral-600", className)} {...props} />
  )
}
