// tabs.jsx
import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { CheckSquare } from "lucide-react"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className="inline-flex h-10 items-center justify-center rounded-md bg-slate-800/90 p-1 text-slate-400"
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-slate-700 data-[state=active]:text-slate-100 data-[state=active]:shadow-sm"
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className="mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

// card.jsx
const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className="rounded-lg border border-slate-700 bg-slate-800/90 text-slate-50 shadow-sm"
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className="flex flex-row items-center justify-between space-y-1.5 p-6"
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className="text-lg font-semibold leading-none tracking-tight"
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className="text-sm text-slate-400"
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className="p-6 pt-0" {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className="flex items-center p-6 pt-0"
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

// button.jsx
const Button = React.forwardRef(({ className, variant = "default", size = "default", ...props }, ref) => {
  const variants = {
    default: "bg-slate-900 text-slate-50 hover:bg-slate-900/90",
    destructive: "bg-red-500 text-slate-50 hover:bg-red-500/90",
    outline: "border border-slate-200 bg-transparent hover:bg-slate-100 hover:text-slate-900",
    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-100/80",
    ghost: "hover:bg-slate-100 hover:text-slate-900",
    link: "text-slate-900 underline-offset-4 hover:underline"
  }
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10"
  }
  return (
    <button
      ref={ref}
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ${variants[variant]} ${sizes[size]}`}
      {...props}
    />
  )
})
Button.displayName = "Button"

// checkbox.jsx
const Checkbox = React.forwardRef(({ className, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    role="checkbox"
    className="peer h-4 w-4 shrink-0 rounded-sm border border-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-slate-900 data-[state=checked]:text-slate-50"
    {...props}
  >
    <CheckSquare className="h-4 w-4" />
  </button>
))
Checkbox.displayName = "Checkbox"

// separator.jsx
const Separator = React.forwardRef(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => (
  <div
    ref={ref}
    role={decorative ? "none" : "separator"}
    aria-orientation={orientation}
    className={`shrink-0 bg-slate-700 ${orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]"}`}
    {...props}
  />
))
Separator.displayName = "Separator"

// tooltip.jsx
const Tooltip = React.forwardRef(({ className, content, children, ...props }, ref) => (
  <div className="relative inline-block">
    <div
      ref={ref}
      className="absolute bottom-full left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-slate-50 bg-slate-900 rounded opacity-0 invisible transition-opacity group-hover:opacity-100 group-hover:visible"
      {...props}
    >
      {content}
    </div>
    <div className="group">{children}</div>
  </div>
))
Tooltip.displayName = "Tooltip"

export {
  // Tabs
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  // Card
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  // Button
  Button,
  // Checkbox
  Checkbox,
  // Separator
  Separator,
  // Tooltip
  Tooltip
}