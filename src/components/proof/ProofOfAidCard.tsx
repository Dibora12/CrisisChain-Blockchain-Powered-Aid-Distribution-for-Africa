
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Package, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProofOfAidCardProps {
  proofData: {
    id: string;
    recipientId: string;
    recipientName: string;
    aidType: string;
    amount: number;
    location: string;
    date: string;
    time: string;
    distributorName: string;
    status: "verified" | "pending" | "disputed";
    ipfsHash: string;
  };
  className?: string;
}

export function ProofOfAidCard({ proofData, className }: ProofOfAidCardProps) {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Proof of Aid</CardTitle>
            <CardDescription>Blockchain-verified aid distribution record</CardDescription>
          </div>
          <div className={cn(
            "px-3 py-1 rounded-full text-sm font-medium",
            proofData.status === "verified" ? "bg-green-100 text-chai-green" : 
            proofData.status === "pending" ? "bg-yellow-100 text-amber-600" : 
            "bg-red-100 text-red-600"
          )}>
            {proofData.status.charAt(0).toUpperCase() + proofData.status.slice(1)}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 sm:col-span-1">
            <h3 className="text-sm text-chai-gray mb-1">Recipient</h3>
            <p className="font-bold">{proofData.recipientName}</p>
            <p className="text-sm">{proofData.recipientId}</p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <h3 className="text-sm text-chai-gray mb-1">Aid Details</h3>
            <div className="flex items-center">
              <Badge className="bg-chai-blue text-white">{proofData.aidType}</Badge>
              <span className="ml-2 font-bold">{proofData.amount} AID</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-start">
            <MapPin className="h-4 w-4 text-chai-gray mt-0.5 mr-1" />
            <div>
              <h3 className="text-sm text-chai-gray">Location</h3>
              <p className="font-medium">{proofData.location}</p>
            </div>
          </div>
          <div className="flex items-start">
            <Calendar className="h-4 w-4 text-chai-gray mt-0.5 mr-1" />
            <div>
              <h3 className="text-sm text-chai-gray">Date</h3>
              <p className="font-medium">{proofData.date}</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-start">
            <Clock className="h-4 w-4 text-chai-gray mt-0.5 mr-1" />
            <div>
              <h3 className="text-sm text-chai-gray">Time</h3>
              <p className="font-medium">{proofData.time}</p>
            </div>
          </div>
          <div className="flex items-start">
            <Package className="h-4 w-4 text-chai-gray mt-0.5 mr-1" />
            <div>
              <h3 className="text-sm text-chai-gray">Distributor</h3>
              <p className="font-medium">{proofData.distributorName}</p>
            </div>
          </div>
        </div>
        
        <div className="pt-3 border-t">
          <h3 className="text-sm font-medium mb-2">Blockchain Verification</h3>
          <div className="bg-slate-50 p-3 rounded-md">
            <p className="text-sm text-chai-gray mb-1">IPFS Hash:</p>
            <div className="flex items-center justify-between">
              <code className="text-xs bg-white px-2 py-1 rounded border overflow-x-auto max-w-[70%]">
                {proofData.ipfsHash}
              </code>
              <button className="text-xs text-chai-blue hover:underline">
                Verify on Chain
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
