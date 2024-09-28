import { AlertTriangle, Bell, CheckCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";

const alerts = [
  {
    id: 1,
    type: "warning",
    title: "Suspicious Activity Detected",
    description: "Multiple large transactions from account 1234567890",
  },
  {
    id: 2,
    type: "error",
    title: "Account Frozen",
    description: "Account 0987654321 has been frozen due to potential fraud",
  },
  {
    id: 3,
    type: "success",
    title: "False Positive Resolved",
    description:
      "Alert for account 1357924680 has been marked as a false positive",
  },
  {
    id: 4,
    type: "info",
    title: "New Fraud Detection Model Deployed",
    description: "Time-based Fraud Detection model is now active",
  },
];

export default function AlertsNotifications() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-blue-900">
        Alerts and Notifications
      </h1>
      <div className="space-y-4">
        {alerts.map((alert) => (
          <Alert
            key={alert.id}
            variant={alert.type as "default" | "destructive"}
            className="border-blue-200"
          >
            {alert.type === "warning" && (
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
            )}
            {alert.type === "error" && (
              <AlertTriangle className="h-4 w-4 text-red-500" />
            )}
            {alert.type === "success" && (
              <CheckCircle className="h-4 w-4 text-green-500" />
            )}
            {alert.type === "info" && (
              <Bell className="h-4 w-4 text-blue-500" />
            )}
            <AlertTitle className="text-blue-800">{alert.title}</AlertTitle>
            <AlertDescription className="text-blue-600">
              {alert.description}
            </AlertDescription>
          </Alert>
        ))}
      </div>
    </div>
  );
}
