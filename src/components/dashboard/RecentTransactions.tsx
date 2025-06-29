
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for recent transactions
const transactions = [
  {
    id: "tx-1",
    recipientId: "0x1a2...3b4c",
    recipientName: "Amara Okafor",
    amount: 100,
    type: "Food Aid",
    status: "completed",
    timestamp: "2 hours ago",
    location: "Lagos, Nigeria"
  },
  {
    id: "tx-2",
    recipientId: "0x4d5...6e7f",
    recipientName: "Kwame Mensah",
    amount: 75,
    type: "Medical Supplies",
    status: "pending",
    timestamp: "3 hours ago",
    location: "Accra, Ghana"
  },
  {
    id: "tx-3",
    recipientId: "0x8g9...0h1i",
    recipientName: "Fatima Ahmed",
    amount: 120,
    type: "Water Access",
    status: "completed",
    timestamp: "5 hours ago",
    location: "Khartoum, Sudan"
  },
  {
    id: "tx-4",
    recipientId: "0x2j3...4k5l",
    recipientName: "Tendai Mutasa",
    amount: 50,
    type: "Emergency Shelter",
    status: "failed",
    timestamp: "6 hours ago",
    location: "Harare, Zimbabwe"
  },
  {
    id: "tx-5",
    recipientId: "0x6m7...8n9o",
    recipientName: "Amare Bekele",
    amount: 90,
    type: "Food Aid",
    status: "completed",
    timestamp: "8 hours ago",
    location: "Addis Ababa, Ethiopia"
  }
];

export function RecentTransactions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>Latest aid token distributions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div 
              key={transaction.id} 
              className="flex items-start justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-start space-x-3">
                <div className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                  transaction.status === "completed" ? "bg-green-100" : 
                  transaction.status === "pending" ? "bg-amber-100" : "bg-red-100"
                )}>
                  {transaction.status === "completed" ? (
                    <CheckCircle className="h-5 w-5 text-chai-green" />
                  ) : transaction.status === "pending" ? (
                    <Clock className="h-5 w-5 text-amber-500" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
                <div>
                  <div className="font-medium text-sm">{transaction.recipientName}</div>
                  <div className="text-xs text-chai-gray flex flex-wrap gap-1 items-center">
                    <span>{transaction.recipientId}</span>
                    <span>•</span>
                    <span>{transaction.location}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">{transaction.amount} AID</div>
                <div className="flex items-center justify-end gap-1 mt-1">
                  <Badge variant="outline" className="text-xs py-0 h-5">
                    {transaction.type}
                  </Badge>
                  <Badge variant="secondary" className="text-xs py-0 h-5">
                    {transaction.timestamp}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
