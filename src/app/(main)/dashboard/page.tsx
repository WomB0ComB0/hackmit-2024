"use client"

import { useState } from "react"
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  CheckCircle,
  DollarSign,
  TrendingDown,
  TrendingUp,
  Calendar,
} from "lucide-react"
import { Bar, BarChart, Line, LineChart } from "recharts"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const transactionData = [
  { name: "Jan", total: 1234 },
  { name: "Feb", total: 2234 },
  { name: "Mar", total: 1834 },
  { name: "Apr", total: 2534 },
  { name: "May", total: 1634 },
  { name: "Jun", total: 3134 },
]

const fraudData = [
  { name: "Jan", amount: 234 },
  { name: "Feb", amount: 334 },
  { name: "Mar", amount: 284 },
  { name: "Apr", amount: 384 },
  { name: "May", amount: 254 },
  { name: "Jun", amount: 434 },
]

const CustomTooltip = ({ active, payload, label }: { active: boolean, payload: any, label: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border p-2 rounded-md shadow-md">
        <p className="text-sm font-semibold text-foreground">{`${label}`}</p>
        <p className="text-sm text-muted-foreground">{`Total: ${payload[0].value}`}</p>
      </div>
    )
  }
  return null
}

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState("6M")

  return (
    <div className="space-y-8 p-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center space-x-2 bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm">
          <Calendar className="h-4 w-4" />
          <span>Last updated: June 15, 2024 at 12:34 PM</span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Total Transactions",
            value: "1,234,567",
            icon: Activity,
            trend: "+20.1%",
            trendColor: "text-green-500",
          },
          {
            title: "Flagged Transactions",
            value: "23",
            icon: AlertTriangle,
            trend: "-4.5%",
            trendColor: "text-red-500",
          },
          {
            title: "False Positives",
            value: "3",
            icon: CheckCircle,
            trend: "+0.5%",
            trendColor: "text-green-500",
          },
          {
            title: "Prevented Fraud Amount",
            value: "$123,456",
            icon: DollarSign,
            trend: "+12.3%",
            trendColor: "text-green-500",
          },
        ].map((item, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {item.title}
              </CardTitle>
              <item.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              <p className={`text-xs ${item.trendColor} mt-1 flex items-center`}>
                {item.trend.startsWith("+") ? (
                  <TrendingUp className="h-4 w-4 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 mr-1" />
                )}
                {item.trend} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Transaction Overview</CardTitle>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1M">Last Month</SelectItem>
                <SelectItem value="3M">Last 3 Months</SelectItem>
                <SelectItem value="6M">Last 6 Months</SelectItem>
                <SelectItem value="1Y">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{
              total: {
                label: "Total",
                color: "hsl(var(--primary))",
              },
            }}>
              <BarChart
                data={transactionData}
                className="w-full aspect-[4/3]"
              >
                <Bar dataKey="total" fill="hsl(var(--primary))" />
                <ChartTooltip content={<CustomTooltip active={false} payload={undefined} label={""} />} cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                {
                  title: "Unusual activity detected",
                  description:
                    "Multiple large transactions from account ending in 1234",
                },
                {
                  title: "New device login",
                  description: "New device logged into account ending in 5678",
                },
                {
                  title: "Potential ATO attempt",
                  description:
                    "Multiple failed login attempts for account ending in 9012",
                },
              ].map((alert, index) => (
                <div
                  key={index}
                  className="flex items-center p-3 rounded-lg bg-destructive/10 border border-destructive/20"
                >
                  <AlertTriangle className="h-9 w-9 text-destructive flex-shrink-0" />
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {alert.title}
                    </p>
                    <p className="text-sm text-muted-foreground">{alert.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Top Fraud Detection Models</CardTitle>
          <Tabs defaultValue="accuracy">
            <TabsList>
              <TabsTrigger value="accuracy">Accuracy</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[
              {
                name: "Transaction Anomaly Detection",
                accuracy: 98.5,
                transactions: 15234,
              },
              {
                name: "User Behavior Analysis",
                accuracy: 97.2,
                transactions: 12456,
              },
              {
                name: "Geographical Risk Assessment",
                accuracy: 95.8,
                transactions: 10789,
              },
            ].map((model, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg bg-secondary"
              >
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {model.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Transactions Analyzed: {model.transactions.toLocaleString()}
                  </p>
                </div>
                <div className="text-2xl font-bold text-primary">
                  {model.accuracy}%
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            View All Models <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Fraud Prevention Trend</CardTitle>
          <CardDescription>Amount of fraud prevented over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{
            amount: {
              label: "Amount",
              color: "hsl(var(--primary))",
            },
          }}>
            <LineChart
              data={fraudData}
              className="w-full aspect-[4/3]"
            >
              <Line dataKey="amount" stroke="hsl(var(--primary))" />
              <ChartTooltip content={<CustomTooltip active={false} payload={undefined} label={""} />} cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
