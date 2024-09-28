import { Badge } from "../../components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

const transactions = [
  {
    id: 1,
    account: "1234567890",
    amount: 1000,
    date: "2024-06-01",
    status: "Normal",
  },
  {
    id: 2,
    account: "0987654321",
    amount: 5000,
    date: "2024-06-02",
    status: "Flagged",
  },
  {
    id: 3,
    account: "1357924680",
    amount: 250,
    date: "2024-06-03",
    status: "Normal",
  },
  {
    id: 4,
    account: "2468013579",
    amount: 10000,
    date: "2024-06-04",
    status: "Frozen",
  },
];

export default function TransactionMonitoring() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-blue-900">
        Transaction Monitoring
      </h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-blue-800">Account</TableHead>
            <TableHead className="text-blue-800">Amount</TableHead>
            <TableHead className="text-blue-800">Date</TableHead>
            <TableHead className="text-blue-800">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell className="text-blue-700">
                {transaction.account}
              </TableCell>
              <TableCell className="text-blue-700">
                ${transaction.amount.toFixed(2)}
              </TableCell>
              <TableCell className="text-blue-700">
                {transaction.date}
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    transaction.status === "Normal"
                      ? "default"
                      : transaction.status === "Flagged"
                      ? "secondary"
                      : "destructive"
                  }
                >
                  {transaction.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
