import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

const models = [
  {
    id: 1,
    name: "Transaction Anomaly Detection",
    status: "Active",
    accuracy: 98.5,
  },
  { id: 2, name: "User Behavior Analysis", status: "Active", accuracy: 97.2 },
  {
    id: 3,
    name: "Geographical Risk Assessment",
    status: "Inactive",
    accuracy: 95.8,
  },
  {
    id: 4,
    name: "Time-based Fraud Detection",
    status: "In Training",
    accuracy: 0,
  },
];

export default function FraudDetectionModels() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-blue-900">
        Fraud Detection Models
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {models.map((model) => (
          <Card key={model.id} className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-800">{model.name}</CardTitle>
              <CardDescription>
                <Badge
                  variant={
                    model.status === "Active"
                      ? "default"
                      : model.status === "Inactive"
                      ? "secondary"
                      : "outline"
                  }
                >
                  {model.status}
                </Badge>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-blue-700">
                Accuracy: {model.accuracy.toFixed(1)}%
              </p>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="text-blue-600 border-blue-300 hover:bg-blue-50"
              >
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
