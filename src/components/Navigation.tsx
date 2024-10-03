"use client"

import {
  Activity,
  BarChart,
  Bell,
  Brain,
  LayoutDashboard,
  LogIn,
  LogOut,
  Settings,
  UserPlus,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { ModeToggle } from '@/providers'

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Transaction Monitoring", href: "/transactions", icon: Activity },
  { name: "Fraud Detection Models", href: "/models", icon: Brain },
  { name: "Alerts", href: "/alerts", icon: Bell },
  { name: "Account Management", href: "/accounts", icon: Users },
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Reports", href: "/reports", icon: BarChart },
]

export default function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <motion.nav
      initial={false}
      animate={{ width: isOpen ? "240px" : "72px" }}
      className="bg-blue-800 dark:bg-blue-950 text-white flex flex-col h-screen shadow-lg"
    >
      <div className="flex items-center justify-between p-4">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <div className="w-10 h-10 relative flex-shrink-0">
            <Image
              src="/assets/svgs/logo.svg"
              alt="Fraud Guard AI Logo"
              layout="fill"
              objectFit="contain"
              className="rounded-md"
            />
          </div>
          <motion.div
            initial={false}
            animate={{ opacity: isOpen ? 1 : 0, width: isOpen ? "auto" : 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden whitespace-nowrap"
          >
            <span className="font-bold text-xl">Fraud Guard AI</span>
          </motion.div>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="text-white hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
        >
          {isOpen ? (
            <ChevronLeft className="h-6 w-6" />
          ) : (
            <ChevronRight className="h-6 w-6" />
          )}
        </Button>
      </div>
      <ul className="flex-grow space-y-1 p-2">
        {navItems.map((item) => (
          <motion.li key={item.name} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href={item.href}>
              <Button
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start text-white hover:bg-blue-700/50 dark:hover:bg-blue-800/50 transition-colors h-12",
                  pathname === item.href ? "bg-blue-700 dark:bg-blue-800" : "",
                  isOpen ? "px-4" : "px-0 justify-center"
                )}
              >
                <item.icon className={cn("h-6 w-6", isOpen ? "mr-2" : "")} />
                {isOpen && (
                  <span className="overflow-hidden whitespace-nowrap">{item.name}</span>
                )}
              </Button>
            </Link>
          </motion.li>
        ))}
      </ul>
      <div className="p-2 space-y-1">
        {isLoggedIn ? (
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start text-white hover:bg-blue-700/50 dark:hover:bg-blue-800/50 transition-colors h-12",
                isOpen ? "px-4" : "px-0 justify-center"
              )}
              onClick={() => setIsLoggedIn(false)}
            >
              <LogOut className={cn("h-6 w-6", isOpen ? "mr-2" : "")} />
              {isOpen && <span className="overflow-hidden whitespace-nowrap">Logout</span>}
            </Button>
          </motion.div>
        ) : (
          <>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/login">
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start text-white hover:bg-blue-700/50 dark:hover:bg-blue-800/50 transition-colors h-12",
                    isOpen ? "px-4" : "px-0 justify-center"
                  )}
                >
                  <LogIn className={cn("h-6 w-6", isOpen ? "mr-2" : "")} />
                  {isOpen && <span className="overflow-hidden whitespace-nowrap">Login</span>}
                </Button>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/signup">
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start text-white hover:bg-blue-700/50 dark:hover:bg-blue-800/50 transition-colors h-12",
                    isOpen ? "px-4" : "px-0 justify-center"
                  )}
                >
                  <UserPlus className={cn("h-6 w-6", isOpen ? "mr-2" : "")} />
                  {isOpen && <span className="overflow-hidden whitespace-nowrap">Sign Up</span>}
                </Button>
              </Link>
            </motion.div>
          </>
        )}
        <div className={cn("flex", isOpen ? "justify-start px-4" : "justify-center")}>
          <ModeToggle />
        </div>
      </div>
    </motion.nav>
  )
}