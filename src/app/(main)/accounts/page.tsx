"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AlertCircle, ArrowUpDown, Search, Shield, Users } from "lucide-react"

const initialAccounts = [
  { id: 1, number: "1234567890", name: "John Doe", status: "Active", riskLevel: "Low" },
  { id: 2, number: "0987654321", name: "Jane Smith", status: "Frozen", riskLevel: "High" },
  { id: 3, number: "1357924680", name: "Bob Johnson", status: "Active", riskLevel: "Medium" },
  { id: 4, number: "2468013579", name: "Alice Brown", status: "Active", riskLevel: "Low" },
  { id: 5, number: "3692581470", name: "Charlie Davis", status: "Active", riskLevel: "Medium" },
  { id: 6, number: "9876543210", name: "Eva Wilson", status: "Frozen", riskLevel: "High" },
  { id: 7, number: "1472583690", name: "Frank Miller", status: "Active", riskLevel: "Low" },
  { id: 8, number: "3698521470", name: "Grace Taylor", status: "Active", riskLevel: "Medium" },
]

export default function AccountManagement() {
  const [accounts, setAccounts] = useState(initialAccounts)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [riskFilter, setRiskFilter] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [sortOrder, setSortOrder] = useState("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const filteredAccounts = accounts
    .filter((account) =>
      account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.number.includes(searchTerm)
    )
    .filter((account) => statusFilter === "all" || account.status === statusFilter)
    .filter((account) => riskFilter === "all" || account.riskLevel === riskFilter)
    .sort((a, b) => {
      const sortFieldA = a[sortBy as keyof typeof a]
      const sortFieldB = b[sortBy as keyof typeof b]
      if (sortFieldA < sortFieldB) return sortOrder === "asc" ? -1 : 1
      if (sortFieldA > sortFieldB) return sortOrder === "asc" ? 1 : -1
      return 0
    })

  const pageCount = Math.ceil(filteredAccounts.length / itemsPerPage)
  const paginatedAccounts = filteredAccounts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const toggleSort = (field: keyof typeof accounts[number]) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortOrder("asc")
    }
  }

  const updateAccountStatus = (id: number, newStatus: string) => {
    setAccounts(accounts.map(account =>
      account.id === id ? { ...account, status: newStatus } : account
    ))
  }

  const updateAccountRiskLevel = (id: number, newRiskLevel: string) => {
    setAccounts(accounts.map(account =>
      account.id === id ? { ...account, riskLevel: newRiskLevel } : account
    ))
  }

  return (
    <div className="space-y-8 p-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold">Account Management</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search accounts"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 w-[200px]"
            />
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Accounts</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{accounts.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Accounts</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{accounts.filter(a => a.status === "Active").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Frozen Accounts</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{accounts.filter(a => a.status === "Frozen").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Risk Accounts</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{accounts.filter(a => a.riskLevel === "High").length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Frozen">Frozen</SelectItem>
            </SelectContent>
          </Select>
          <Select value={riskFilter} onValueChange={setRiskFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter by risk" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Risk Levels</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="High">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="cursor-pointer" onClick={() => toggleSort("number")}>
              Account Number {sortBy === "number" && <ArrowUpDown className="ml-2 h-4 w-4 inline" />}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => toggleSort("name")}>
              Name {sortBy === "name" && <ArrowUpDown className="ml-2 h-4 w-4 inline" />}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => toggleSort("status")}>
              Status {sortBy === "status" && <ArrowUpDown className="ml-2 h-4 w-4 inline" />}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => toggleSort("riskLevel")}>
              Risk Level {sortBy === "riskLevel" && <ArrowUpDown className="ml-2 h-4 w-4 inline" />}
            </TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedAccounts.map((account) => (
            <TableRow key={account.id}>
              <TableCell>{account.number}</TableCell>
              <TableCell>{account.name}</TableCell>
              <TableCell>
                <Select
                  value={account.status}
                  onValueChange={(newStatus) => updateAccountStatus(account.id, newStatus)}
                >
                  <SelectTrigger className="w-[100px]">
                    <SelectValue>
                      <Badge
                        variant={account.status === "Active" ? "default" : "destructive"}
                      >
                        {account.status}
                      </Badge>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Frozen">Frozen</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <Select
                  value={account.riskLevel}
                  onValueChange={(newRiskLevel) => updateAccountRiskLevel(account.id, newRiskLevel)}
                >
                  <SelectTrigger className="w-[100px]">
                    <SelectValue>
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
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Account Details</DialogTitle>
                      <DialogDescription>
                        Detailed information for account {account.number}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-bold">Name:</span>
                        <span className="col-span-3">{account.name}</span>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-bold">Account Number:</span>
                        <span className="col-span-3">{account.number}</span>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-bold">Status:</span>
                        <span className="col-span-3">{account.status}</span>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-bold">Risk Level:</span>
                        <span className="col-span-3">{account.riskLevel}</span>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <div className="text-sm text-muted-foreground">
          Page {currentPage} of {pageCount}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pageCount))}
          disabled={currentPage === pageCount}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
