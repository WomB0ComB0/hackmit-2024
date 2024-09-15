import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

export default function ReportsAnalytics() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-blue-900">
        Reports and Analytics
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          {
            title: "Fraud Detection Summary",
            description: "Overview of fraud detection activities and outcomes.",
          },
          {
            title: "Transaction Analysis",
            description:
              "Detailed analysis of transaction patterns and anomalies.",
          },
          {
            title: "Model Performance",
            description:
              "Evaluation of fraud detection model accuracy and efficiency.",
          },
          {
            title: "Risk Assessment",
            description:
              "Analysis of account risk levels and contributing factors.",
          },
          {
            title: "Regulatory Compliance",
            description:
              "Report on adherence to financial regulations and standards.",
          },
          {
            title: "Custom Report",
            description: "Generate a custom report based on specific criteria.",
          },
        ].map((report, index) => (
          <Card key={index} className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-800">{report.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-600 mb-4">{report.description}</p>
              <Button
                variant="outline"
                className="text-blue-600 border-blue-300 hover:bg-blue-50"
              >
                {report.title === "Custom Report"
                  ? "Create Report"
                  : "Generate Report"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
