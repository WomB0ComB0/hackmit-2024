"use client"

import { useState } from "react"
import { AlertTriangle, Bell, CheckCircle, Info, X } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion, AnimatePresence } from "framer-motion"

const initialAlerts = [
  {
    id: 1,
    type: "warning",
    title: "Suspicious Activity Detected",
    description: "Multiple large transactions from account 1234567890",
    timestamp: new Date(2024, 5, 15, 10, 30),
    read: false,
  },
  {
    id: 2,
    type: "error",
    title: "Account Frozen",
    description: "Account 0987654321 has been frozen due to potential fraud",
    timestamp: new Date(2024, 5, 15, 11, 45),
    read: false,
  },
  {
    id: 3,
    type: "success",
    title: "False Positive Resolved",
    description: "Alert for account 1357924680 has been marked as a false positive",
    timestamp: new Date(2024, 5, 15, 14, 20),
    read: false,
  },
  {
    id: 4,
    type: "info",
    title: "New Fraud Detection Model Deployed",
    description: "Time-based Fraud Detection model is now active",
    timestamp: new Date(2024, 5, 15, 16, 0),
    read: false,
  },
]

export default function AlertsNotifications() {
  const [alerts, setAlerts] = useState(initialAlerts)
  const [filter, setFilter] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  const filteredAlerts = alerts
    .filter((alert) => filter === "all" || alert.type === filter)
    .sort((a, b) => {
      if (sortBy === "newest") return b.timestamp.getTime() - a.timestamp.getTime()
      return a.timestamp.getTime() - b.timestamp.getTime()
    })

  const unreadCount = alerts.filter((alert) => !alert.read).length

  const markAsRead = (id: number) => {
    setAlerts(alerts.map((alert) => (alert.id === id ? { ...alert, read: true } : alert)))
  }

  const clearAll = () => {
    setAlerts([])
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />
      default:
        return <Bell className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="space-y-8 p-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold">Alerts and Notifications</h1>
        <div className="flex items-center gap-4">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="error">Error</SelectItem>
              <SelectItem value="success">Success</SelectItem>
              <SelectItem value="info">Info</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={clearAll}>Clear All</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Alerts</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{alerts.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unreadCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{alerts.filter((alert) => alert.type === "error").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved Alerts</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{alerts.filter((alert) => alert.type === "success").length}</div>
          </CardContent>
        </Card>
      </div>

      <AnimatePresence>
        {filteredAlerts.map((alert) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <Alert
              variant={alert.type as "default" | "destructive"}
              className={`mb-4 ${alert.read ? 'opacity-60' : ''}`}
            >
              <div className="flex items-start">
                {getAlertIcon(alert.type)}
                <div className="ml-4 flex-grow">
                  <AlertTitle>{alert.title}</AlertTitle>
                  <AlertDescription>{alert.description}</AlertDescription>
                  <div className="mt-2 text-sm text-muted-foreground">
                    {alert.timestamp.toLocaleString()}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-2"
                  onClick={() => markAsRead(alert.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </Alert>
          </motion.div>
        ))}
      </AnimatePresence>

      {filteredAlerts.length === 0 && (
        <div className="text-center text-muted-foreground">
          No alerts to display.
        </div>
      )}
    </div>
  )
}