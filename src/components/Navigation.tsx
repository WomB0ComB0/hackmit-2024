"use client";

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
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Transaction Monitoring", href: "/transactions", icon: Activity },
  { name: "Fraud Detection Models", href: "/models", icon: Brain },
  { name: "Alerts", href: "/alerts", icon: Bell },
  { name: "Account Management", href: "/accounts", icon: Users },
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Reports", href: "/reports", icon: BarChart },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Add this state to track login status

  return (
    <nav
      className={cn(
        "bg-blue-800 text-white p-4 space-y-8 transition-all duration-300 flex flex-col",
        isOpen ? "w-64" : "w-20"
      )}
    >
      <div className="flex items-center justify-between">
        <Link
          href="/dashboard"
          className={cn(
            "font-bold transition-all duration-300",
            isOpen ? "text-2xl" : "text-lg"
          )}
        >
          {isOpen ? "Fraud Guard AI" : "FG"}
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="text-white hover:bg-blue-700"
        >
          {isOpen ? "←" : "→"}
        </Button>
      </div>
      <ul className="space-y-2 flex-grow">
        {navItems.map((item) => (
          <li key={item.name}>
            <Link href={item.href}>
              <Button
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start text-white hover:bg-blue-700",
                  isOpen ? "px-4" : "px-2"
                )}
              >
                <item.icon className="h-5 w-5 mr-2" />
                {isOpen && item.name}
              </Button>
            </Link>
          </li>
        ))}
      </ul>
      <div className="space-y-2">
        {isLoggedIn ? (
          <Button
            variant="ghost"
            className="w-full justify-start text-white hover:bg-blue-700"
            onClick={() => setIsLoggedIn(false)} // Simulate logout
          >
            <LogOut className="h-5 w-5 mr-2" />
            {isOpen && "Logout"}
          </Button>
        ) : (
          <>
            <Link href="/login">
              <Button
                variant="ghost"
                className="w-full justify-start text-white hover:bg-blue-700"
              >
                <LogIn className="h-5 w-5 mr-2" />
                {isOpen && "Login"}
              </Button>
            </Link>
            <Link href="/signup">
              <Button
                variant="ghost"
                className="w-full justify-start text-white hover:bg-blue-700"
              >
                <UserPlus className="h-5 w-5 mr-2" />
                {isOpen && "Sign Up"}
              </Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
