"use client";

import {
  Activity,
  AlertTriangle,
  ArrowRight,
  CheckCircle,
  DollarSign,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const data = [
  { name: "Jan", total: 1234 },
  { name: "Feb", total: 2234 },
  { name: "Mar", total: 1834 },
  { name: "Apr", total: 2534 },
  { name: "May", total: 1634 },
  { name: "Jun", total: 3134 },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-blue-900">Dashboard</h1>
        <div className="flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm">
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
          },
          {
            title: "Flagged Transactions",
            value: "23",
            icon: AlertTriangle,
            trend: "-4.5%",
          },
          {
            title: "False Positives",
            value: "3",
            icon: CheckCircle,
            trend: "+0.5%",
          },
          {
            title: "Prevented Fraud Amount",
            value: "$123,456",
            icon: DollarSign,
            trend: "+12.3%",
          },
        ].map((item, index) => (
          <Card key={index} className="border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-blue-800">
                {item.title}
              </CardTitle>
              <item.icon className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">
                {item.value}
              </div>
              <p className="text-xs text-blue-600 mt-1">
                {item.trend.startsWith("+") ? (
                  <TrendingUp className="h-4 w-4 text-green-500 inline mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500 inline mr-1" />
                )}
                {item.trend} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-800">
              Transaction Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={data}>
                <XAxis
                  dataKey="name"
                  stroke="#1e40af"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#1e40af"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Bar dataKey="total" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-800">Recent Alerts</CardTitle>
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
                  className="flex items-center p-3 rounded-lg bg-blue-50 border border-blue-200"
                >
                  <AlertTriangle className="h-9 w-9 text-blue-500 flex-shrink-0" />
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none text-blue-800">
                      {alert.title}
                    </p>
                    <p className="text-sm text-blue-600">{alert.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-blue-200">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-blue-800">
            Top Fraud Detection Models
          </CardTitle>
          <Button
            variant="outline"
            className="text-blue-600 border-blue-300 hover:bg-blue-50"
          >
            View All <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
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
                className="flex items-center justify-between p-4 rounded-lg bg-blue-50 border border-blue-200"
              >
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none text-blue-800">
                    {model.name}
                  </p>
                  <p className="text-sm text-blue-600">
                    Transactions Analyzed: {model.transactions.toLocaleString()}
                  </p>
                </div>
                <div className="text-2xl font-bold text-blue-900">
                  {model.accuracy}%
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
