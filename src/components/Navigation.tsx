"use client"

import {
  BarChart,
  Brain,
  LayoutDashboard,
  Settings,
  Users,
  ChevronLeft,
  ChevronRight,
  LogIn,
  UserPlus,
  Loader2,
  Zap
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { ModeToggle } from '@/providers'
import { SignInButton, SignUpButton, UserButton, useAuth, useUser, useClerk } from "@clerk/nextjs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const adminNavItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Account Management", href: "/accounts", icon: Users },
  { name: "Fraud Detection Models", href: "/models", icon: Brain },
  { name: "Reports", href: "/reports", icon: BarChart },
  { name: "Settings", href: "/settings", icon: Settings },
]

const userNavItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Demo", href: "/demo", icon: Zap },
  { name: "Reports", href: "/reports", icon: BarChart },
  { name: "Settings", href: "/settings", icon: Settings },
]

export default function Navigation() {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(true)
  const { isLoaded, isSignedIn } = useAuth()
  const { user } = useUser()
  const { signOut } = useClerk()
  const [navItems, setNavItems] = useState(userNavItems)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (isLoaded) {
      setIsLoading(false)
      if (isSignedIn && user?.publicMetadata?.role === 'admin') {
        setNavItems(adminNavItems)
      } else {
        setNavItems(userNavItems)
      }
    }
  }, [isLoaded, isSignedIn, user])

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <TooltipProvider>
      <motion.nav
        initial={false}
        animate={{ width: isOpen ? "240px" : "72px" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="bg-gradient-to-b from-blue-800 to-blue-900 dark:from-blue-950 dark:to-blue-900 text-white flex flex-col h-screen shadow-lg relative z-50"
      >
        <div className="flex items-center justify-between p-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 relative flex-shrink-0">
              <Image
                src="/assets/images/logo.png"
                alt="Fraud Guard AI Logo"
                width={40}
                height={40}
                className="rounded-md"
              />
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden whitespace-nowrap"
                >
                  <span className="font-bold text-xl">Fraud Guard AI</span>
                </motion.div>
              )}
            </AnimatePresence>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:bg-blue-700/50 dark:hover:bg-blue-800/50 transition-colors rounded-full"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isOpen ? "open" : "closed"}
                initial={{ rotate: 0 }}
                animate={{ rotate: 180 }}
                exit={{ rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                {isOpen ? (
                  <ChevronLeft className="h-6 w-6" />
                ) : (
                  <ChevronRight className="h-6 w-6" />
                )}
              </motion.div>
            </AnimatePresence>
          </Button>
        </div>
        <ul className="flex-grow space-y-1 p-2 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-800">
          {navItems.map((item) => (
            <motion.li key={item.name} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={item.href}>
                    <Button
                      variant={pathname === item.href ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-start text-white hover:bg-blue-700/50 dark:hover:bg-blue-800/50 transition-colors h-12 rounded-lg",
                        pathname === item.href ? "bg-blue-700 dark:bg-blue-800" : "",
                        isOpen ? "px-4" : "px-0 justify-center"
                      )}
                    >
                      <item.icon className={cn("h-6 w-6", isOpen ? "mr-2" : "")} />
                      <AnimatePresence>
                        {isOpen && (
                          <motion.span
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "auto" }}
                            exit={{ opacity: 0, width: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden whitespace-nowrap"
                          >
                            {item.name}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{item.name}</p>
                </TooltipContent>
              </Tooltip>
            </motion.li>
          ))}
        </ul>
        <div className="p-2 space-y-2 border-t border-blue-700 dark:border-blue-800">
          {isSignedIn ? (
            <>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10",
                    },
                  }}
                />
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  onClick={handleSignOut}
                  className={cn(
                    "w-full justify-start text-white hover:bg-blue-700/50 dark:hover:bg-blue-800/50 transition-colors h-12 rounded-lg",
                    isOpen ? "px-4" : "px-0 justify-center"
                  )}
                >
                  <LogIn className={cn("h-6 w-6 rotate-180", isOpen ? "mr-2" : "")} />
                  <AnimatePresence>
                    {isOpen && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden whitespace-nowrap"
                      >
                        Sign Out
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
            </>
          ) : (
            <>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <SignInButton mode="modal">
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start text-white hover:bg-blue-700/50 dark:hover:bg-blue-800/50 transition-colors h-12 rounded-lg",
                      isOpen ? "px-4" : "px-0 justify-center"
                    )}
                  >
                    <LogIn className={cn("h-6 w-6", isOpen ? "mr-2" : "")} />
                    <AnimatePresence>
                      {isOpen && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden whitespace-nowrap"
                        >
                          Sign In
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Button>
                </SignInButton>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <SignUpButton mode="modal">
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start text-white hover:bg-blue-700/50 dark:hover:bg-blue-800/50 transition-colors h-12 rounded-lg",
                      isOpen ? "px-4" : "px-0 justify-center"
                    )}
                  >
                    <UserPlus className={cn("h-6 w-6", isOpen ? "mr-2" : "")} />
                    <AnimatePresence>
                      {isOpen && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden whitespace-nowrap"
                        >
                          Sign Up
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Button>
                </SignUpButton>
              </motion.div>
            </>
          )}
          <div className={cn("flex", isOpen ? "justify-start px-4" : "justify-center")}>
            <ModeToggle />
          </div>
        </div>
      </motion.nav>
    </TooltipProvider>
  )
}
