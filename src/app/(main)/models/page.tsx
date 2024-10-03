"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  AlertTriangle,
  BarChart,
  CheckCircle,
  Clock,
  PlusCircle,
  Search,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"

const initialModels = [
  {
    id: 1,
    name: "Transaction Anomaly Detection",
    status: "Active",
    accuracy: 98.5,
    description: "Detects unusual patterns in transaction data",
  },
  {
    id: 2,
    name: "User Behavior Analysis",
    status: "Active",
    accuracy: 97.2,
    description: "Analyzes user behavior to identify potential fraud",
  },
  {
    id: 3,
    name: "Geographical Risk Assessment",
    status: "Inactive",
    accuracy: 95.8,
    description: "Evaluates risk based on geographical location",
  },
  {
    id: 4,
    name: "Time-based Fraud Detection",
    status: "In Training",
    accuracy: 0,
    description: "Identifies fraud patterns based on transaction timing",
  },
]

export default function FraudDetectionModels() {
  const [models, setModels] = useState(initialModels)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredModels = models.filter((model) =>
    model.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const activeModels = models.filter((model) => model.status === "Active").length
  const averageAccuracy =
    models.reduce((sum, model) => sum + model.accuracy, 0) / models.length

  const addNewModel = () => {
    const newModel = {
      id: models.length + 1,
      name: "New Model",
      status: "In Training",
      accuracy: 0,
      description: "Description for the new model",
    }
    setModels([...models, newModel])
  }

  return (
    <div className="space-y-8 p-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold">Fraud Detection Models</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search models"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 w-[200px]"
            />
          </div>
          <Button onClick={addNewModel}>
            <PlusCircle className="mr-2 h-4 w-4" /> New Model
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Models</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{models.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Models</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeModels}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Accuracy</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageAccuracy.toFixed(1)}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Models in Training</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {models.filter((model) => model.status === "In Training").length}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredModels.map((model) => (
          <Card key={model.id} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{model.name}</CardTitle>
                  <CardDescription className="mt-1.5">
                    <Badge
                      variant={
                        model.status === "Active"
                          ? "default"
                          : model.status === "Inactive"
                          ? "secondary"
                          : "outline"
                      }
                      className="mt-1"
                    >
                      {model.status}
                    </Badge>
                  </CardDescription>
                </div>
                {model.status === "Active" && (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
                {model.status === "Inactive" && (
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                )}
                {model.status === "In Training" && (
                  <Clock className="h-5 w-5 text-blue-500" />
                )}
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground mb-4">{model.description}</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Accuracy</span>
                  <span className="text-sm text-muted-foreground">
                    {model.accuracy.toFixed(1)}%
                  </span>
                </div>
                <Progress value={model.accuracy} className="h-2" />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}