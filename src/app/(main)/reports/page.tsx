"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { AlertCircle, BarChart, FileText, PieChart, Shield, TrendingUp } from "lucide-react"

const reports = [
  {
    title: "Fraud Detection Summary",
    description: "Overview of fraud detection activities and outcomes.",
    icon: Shield,
  },
  {
    title: "Transaction Analysis",
    description: "Detailed analysis of transaction patterns and anomalies.",
    icon: TrendingUp,
  },
  {
    title: "Model Performance",
    description: "Evaluation of fraud detection model accuracy and efficiency.",
    icon: PieChart,
  },
  {
    title: "Risk Assessment",
    description: "Analysis of account risk levels and contributing factors.",
    icon: AlertCircle,
  },
  {
    title: "Regulatory Compliance",
    description: "Report on adherence to financial regulations and standards.",
    icon: FileText,
  },
  {
    title: "Custom Report",
    description: "Generate a custom report based on specific criteria.",
    icon: BarChart,
  },
]

export default function ReportsAnalytics() {
  const [dateRange, setDateRange] = useState("last7days")
  const [loadingReports, setLoadingReports] = useState<{ [key: string]: boolean }>({})

  const handleGenerateReport = (reportTitle: string) => {
    setLoadingReports((prev) => ({ ...prev, [reportTitle]: true }))
    // Simulating report generation
    setTimeout(() => {
      setLoadingReports((prev) => ({ ...prev, [reportTitle]: false }))
      toast({
        title: "Report Generated",
        description: `${reportTitle} has been successfully generated.`,
      })
    }, 2000)
  }

  return (
    <div className="space-y-8 p-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold">Reports and Analytics</h1>
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select date range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="last7days">Last 7 Days</SelectItem>
            <SelectItem value="last30days">Last 30 Days</SelectItem>
            <SelectItem value="last90days">Last 90 Days</SelectItem>
            <SelectItem value="custom">Custom Range</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports Generated</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">+10% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fraud Detected</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">-5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Model Accuracy</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.5%</div>
            <p className="text-xs text-muted-foreground">+0.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">A+</div>
            <p className="text-xs text-muted-foreground">Unchanged from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((report, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <report.icon className="h-5 w-5" />
                {report.title}
              </CardTitle>
              <CardDescription>{report.description}</CardDescription>
            </CardHeader>
            <CardContent>
              {report.title === "Custom Report" ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Create Report</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create Custom Report</DialogTitle>
                      <DialogDescription>
                        Select the parameters for your custom report.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="report-type" className="text-right">
                          Report Type
                        </Label>
                        <Select>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select report type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="transactions">Transactions</SelectItem>
                            <SelectItem value="accounts">Accounts</SelectItem>
                            <SelectItem value="fraud">Fraud Incidents</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="start-date" className="text-right">
                          Start Date
                        </Label>
                        <Input
                          id="start-date"
                          type="date"
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="end-date" className="text-right">
                          End Date
                        </Label>
                        <Input
                          id="end-date"
                          type="date"
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={() => handleGenerateReport("Custom Report")}>
                        Generate Report
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => handleGenerateReport(report.title)}
                  disabled={loadingReports[report.title]}
                >
                  {loadingReports[report.title] ? "Generating..." : "Generate Report"}
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}