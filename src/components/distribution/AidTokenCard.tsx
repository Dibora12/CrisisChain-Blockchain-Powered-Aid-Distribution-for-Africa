
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, LockKeyhole, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface AidTokenCardProps {
  token: {
    id: string;
    recipientId: string;
    amount: number;
    issuer: string;
    issuedDate: string;
    expiryDate: string;
    restrictions: string[];
    status: "active" | "locked" | "expired";
  };
  className?: string;
}

export function AidTokenCard({ token, className }: AidTokenCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <span>Aid Token</span>
          {token.status === "active" ? (
            <ShieldCheck className="h-5 w-5 text-chai-green" />
          ) : token.status === "locked" ? (
            <LockKeyhole className="h-5 w-5 text-chai-orange" />
          ) : (
            <Clock className="h-5 w-5 text-chai-red" />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-3xl font-bold">{token.amount}</h3>
              <p className="text-sm text-chai-gray">AID Tokens</p>
            </div>
            <div className={cn(
              "px-3 py-1 rounded-full text-sm font-medium",
              token.status === "active" ? "bg-green-100 text-chai-green" : 
              token.status === "locked" ? "bg-amber-100 text-amber-600" : 
              "bg-red-100 text-red-600"
            )}>
              {token.status.charAt(0).toUpperCase() + token.status.slice(1)}
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-chai-gray">Token ID:</span>
              <span className="font-medium">{token.id}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-chai-gray">Recipient ID:</span>
              <span>{token.recipientId}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-chai-gray">Issuer:</span>
              <span>{token.issuer}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-chai-gray">Issued:</span>
              <span>{token.issuedDate}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-chai-gray">Expires:</span>
              <span>{token.expiryDate}</span>
            </div>
          </div>
          
          <div className="pt-2 border-t">
            <p className="text-sm font-medium mb-2">Permitted Uses:</p>
            <div className="flex flex-wrap gap-2">
              {token.restrictions.map((restriction, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-chai-lightgray"
                >
                  {restriction}
                </span>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 border-t pt-4">
        <Button variant="outline" className="flex-1">View History</Button>
        <Button 
          className="flex-1 bg-chai-blue hover:bg-chai-darkblue"
          disabled={token.status !== "active"}
        >
          {token.status === "active" ? "Use Token" : "Token Unavailable"}
        </Button>
      </CardFooter>
    </Card>
  );
}
