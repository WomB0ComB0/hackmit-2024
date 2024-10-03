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
      animate={{ width: isOpen ? "240px" : "80px" }}
      className="bg-gradient-to-b from-blue-900 to-blue-800 text-white p-4 space-y-8 flex flex-col h-screen shadow-lg"
    >
      <div className="flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <div className="w-10 h-10 relative">
            <Image
              src="/logo.png"
              alt="Fraud Guard AI Logo"
              layout="fill"
              objectFit="contain"
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
          className="text-white hover:bg-blue-700 transition-colors"
        >
          {isOpen ? (
            <ChevronLeft className="h-6 w-6" />
          ) : (
            <ChevronRight className="h-6 w-6" />
          )}
        </Button>
      </div>
      <ul className="space-y-2 flex-grow">
        {navItems.map((item) => (
          <motion.li key={item.name} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href={item.href}>
              <Button
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start text-white hover:bg-blue-700/50 transition-colors",
                  pathname === item.href ? "bg-blue-700" : ""
                )}
              >
                <item.icon className="h-5 w-5 min-w-[20px]" />
                <motion.span
                  initial={false}
                  animate={{ opacity: isOpen ? 1 : 0, width: isOpen ? "auto" : 0 }}
                  transition={{ duration: 0.2 }}
                  className="ml-2 overflow-hidden whitespace-nowrap"
                >
                  {item.name}
                </motion.span>
              </Button>
            </Link>
          </motion.li>
        ))}
      </ul>
      <div className="space-y-2">
        {isLoggedIn ? (
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:bg-blue-700/50 transition-colors"
              onClick={() => setIsLoggedIn(false)}
            >
              <LogOut className="h-5 w-5 min-w-[20px]" />
              <motion.span
                initial={false}
                animate={{ opacity: isOpen ? 1 : 0, width: isOpen ? "auto" : 0 }}
                transition={{ duration: 0.2 }}
                className="ml-2 overflow-hidden whitespace-nowrap"
              >
                Logout
              </motion.span>
            </Button>
          </motion.div>
        ) : (
          <>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/login">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white hover:bg-blue-700/50 transition-colors"
                >
                  <LogIn className="h-5 w-5 min-w-[20px]" />
                  <motion.span
                    initial={false}
                    animate={{ opacity: isOpen ? 1 : 0, width: isOpen ? "auto" : 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-2 overflow-hidden whitespace-nowrap"
                  >
                    Login
                  </motion.span>
                </Button>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/signup">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white hover:bg-blue-700/50 transition-colors"
                >
                  <UserPlus className="h-5 w-5 min-w-[20px]" />
                  <motion.span
                    initial={false}
                    animate={{ opacity: isOpen ? 1 : 0, width: isOpen ? "auto" : 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-2 overflow-hidden whitespace-nowrap"
                  >
                    Sign Up
                  </motion.span>
                </motion.span>
                </Button>
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </motion.nav>
  )
}