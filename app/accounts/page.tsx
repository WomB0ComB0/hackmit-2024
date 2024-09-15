import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

const accounts = [
  {
    id: 1,
    number: "1234567890",
    name: "John Doe",
    status: "Active",
    riskLevel: "Low",
  },
  {
    id: 2,
    number: "0987654321",
    name: "Jane Smith",
    status: "Frozen",
    riskLevel: "High",
  },
  {
    id: 3,
    number: "1357924680",
    name: "Bob Johnson",
    status: "Active",
    riskLevel: "Medium",
  },
  {
    id: 4,
    number: "2468013579",
    name: "Alice Brown",
    status: "Active",
    riskLevel: "Low",
  },
];

export default function AccountManagement() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-blue-900">Account Management</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-blue-800">Account Number</TableHead>
            <TableHead className="text-blue-800">Name</TableHead>
            <TableHead className="text-blue-800">Status</TableHead>
            <TableHead className="text-blue-800">Risk Level</TableHead>
            <TableHead className="text-blue-800">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accounts.map((account) => (
            <TableRow key={account.id}>
              <TableCell className="text-blue-700">{account.number}</TableCell>
              <TableCell className="text-blue-700">{account.name}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    account.status === "Active" ? "default" : "destructive"
                  }
                >
                  {account.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    account.riskLevel === "Low"
                      ? "default"
                      : account.riskLevel === "Medium"
                      ? "secondary"
                      : "destructive"
                  }
                >
                  {account.riskLevel}
                </Badge>
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-blue-600 border-blue-300 hover:bg-blue-50"
                >
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
