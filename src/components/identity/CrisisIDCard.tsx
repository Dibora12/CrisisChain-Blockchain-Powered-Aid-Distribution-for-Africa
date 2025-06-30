
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Fingerprint, Shield, QrCode, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface CrisisIDCardProps {
  recipient: {
    id: string;
    name: string;
    location: string;
    status: string;
    verificationMethod: "biometric" | "qrcode" | "voiceprint";
    verifiedBy: string;
    dateCreated: string;
    lastVerified: string;
  };
  className?: string;
}

export function CrisisIDCard({ recipient, className }: CrisisIDCardProps) {
  const getVerificationIcon = () => {
    switch (recipient.verificationMethod) {
      case "biometric":
        return <Fingerprint className="h-14 w-14 text-chai-blue" />;
      case "qrcode":
        return <QrCode className="h-14 w-14 text-chai-blue" />;
      case "voiceprint":
        return (
          <svg className="h-14 w-14 text-chai-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 10v2a5 5 0 0010 0v-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
    }
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <span>Crisis ID</span>
          <Shield className="h-5 w-5 text-chai-green" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-shrink-0 flex items-center justify-center bg-chai-lightgray rounded-lg p-4 w-full sm:w-auto">
            {getVerificationIcon()}
          </div>
          <div className="flex-grow space-y-2">
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-lg">{recipient.name}</h3>
              <div className={cn(
                "px-2 py-1 text-xs rounded-full",
                recipient.status === "Verified" ? "bg-green-100 text-chai-green" : 
                recipient.status === "Pending" ? "bg-yellow-100 text-amber-600" : 
                "bg-red-100 text-red-600"
              )}>
                {recipient.status}
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-1">
              <div className="flex items-center text-sm">
                <span className="text-chai-gray">ID:</span>
                <span className="ml-2 font-medium">{recipient.id}</span>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-chai-gray">Location:</span>
                <span className="ml-2">{recipient.location}</span>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-chai-gray">Verified By:</span>
                <span className="ml-2">{recipient.verifiedBy}</span>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-chai-gray">Created:</span>
                <span className="ml-2">{recipient.dateCreated}</span>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-chai-gray">Last Verified:</span>
                <span className="ml-2">{recipient.lastVerified}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 border-t pt-4">
        <Button variant="outline" className="flex-1">View History</Button>
        <Button className="flex-1 bg-chai-blue hover:bg-chai-darkblue">Verify Identity</Button>
      </CardFooter>
    </Card>
  );
}
