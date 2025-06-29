
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, User, Users, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface VerifierProps {
  name: string;
  role: string;
  status: "approved" | "rejected" | "pending";
  avatar?: string;
  timestamp: string;
}

interface VerificationPanelProps {
  recipientName: string;
  recipientId: string;
  status: "pending" | "verified" | "rejected";
  locationName: string;
  verifiers: VerifierProps[];
  requiredVerifications: number;
  className?: string;
}

export function CommunityVerificationPanel({ 
  recipientName, 
  recipientId, 
  status, 
  locationName, 
  verifiers, 
  requiredVerifications,
  className 
}: VerificationPanelProps) {
  const approvedCount = verifiers.filter(v => v.status === "approved").length;
  const rejectedCount = verifiers.filter(v => v.status === "rejected").length;
  const pendingCount = verifiers.filter(v => v.status === "pending").length;

  const progress = (approvedCount / requiredVerifications) * 100;
  
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Community Verification</span>
          <div className="flex items-center">
            <Users className="h-5 w-5 text-chai-blue mr-1" />
            <span className="text-sm">DAO Vote</span>
          </div>
        </CardTitle>
        <CardDescription>Verification status for recipient identity</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg">{recipientName}</h3>
            <p className="text-sm text-chai-gray">{recipientId}</p>
            <div className="flex items-center mt-1">
              <Badge variant="outline" className="text-xs">
                {locationName}
              </Badge>
            </div>
          </div>
          <div>
            <div className={cn(
              "px-3 py-1 rounded-full font-medium",
              status === "verified" ? "bg-green-100 text-chai-green" : 
              status === "pending" ? "bg-yellow-100 text-amber-600" : 
              "bg-red-100 text-red-600"
            )}>
              {status === "verified" ? "Verified" : 
               status === "pending" ? "In Progress" : "Rejected"}
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="font-medium">Verification Progress</span>
            <span>{approvedCount} of {requiredVerifications} required</span>
          </div>
          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={cn(
                "h-full rounded-full",
                status === "rejected" ? "bg-chai-red" : "bg-chai-green"
              )}
              style={{ width: `${Math.min(100, progress)}%` }}
            ></div>
          </div>
        </div>

        <div className="pt-3 border-t">
          <h4 className="text-sm font-medium mb-3">Community Witnesses</h4>
          <div className="space-y-3">
            {verifiers.map((verifier, index) => (
              <div key={index} className="flex items-center justify-between bg-slate-50 p-2 rounded-md">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={verifier.avatar} alt={verifier.name} />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{verifier.name}</p>
                    <p className="text-xs text-chai-gray">{verifier.role}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  {verifier.status === "approved" ? (
                    <CheckCircle2 className="h-5 w-5 text-chai-green" />
                  ) : verifier.status === "rejected" ? (
                    <XCircle className="h-5 w-5 text-chai-red" />
                  ) : (
                    <span className="text-xs text-chai-gray">Pending</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 border-t pt-4">
        <Button variant="outline" className="flex-1">Transaction History</Button>
        <Button className="flex-1 bg-chai-blue hover:bg-chai-darkblue">
          Submit Verification
        </Button>
      </CardFooter>
    </Card>
  );
}
