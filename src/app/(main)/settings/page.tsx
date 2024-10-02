import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function Settings() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-blue-900">Settings</h1>
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-blue-800">
            Notification Settings
          </h2>
          <div className="flex items-center space-x-2">
            <Switch id="email-notifications" />
            <Label htmlFor="email-notifications" className="text-blue-700">
              Email Notifications
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="sms-notifications" />
            <Label htmlFor="sms-notifications" className="text-blue-700">
              SMS Notifications
            </Label>
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-blue-800">
            API Integration
          </h2>
          <div className="space-y-1">
            <Label htmlFor="api-key" className="text-blue-700">
              API Key
            </Label>
            <Input
              id="api-key"
              type="password"
              value="••••••••••••••••"
              readOnly
              className="border-blue-300"
            />
          </div>
          <Button
            variant="outline"
            className="text-blue-600 border-blue-300 hover:bg-blue-50"
          >
            Regenerate API Key
          </Button>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-blue-800">
            Fraud Detection Thresholds
          </h2>
          <div className="space-y-1">
            <Label htmlFor="transaction-threshold" className="text-blue-700">
              Transaction Amount Threshold ($)
            </Label>
            <Input
              id="transaction-threshold"
              type="number"
              defaultValue={5000}
              className="border-blue-300"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="velocity-threshold" className="text-blue-700">
              Transaction Velocity Threshold (per hour)
            </Label>
            <Input
              id="velocity-threshold"
              type="number"
              defaultValue={10}
              className="border-blue-300"
            />
          </div>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          Save Settings
        </Button>
      </div>
    </div>
  );
}
