import { 
  Users, Search, Filter, Plus, Download, ArrowUpDown, 
  ArrowRight, Fingerprint, QrCode, Link 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CrisisIDCard } from "@/components/identity/CrisisIDCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { NewRegistrationDialog } from "@/components/dialogs/NewRegistrationDialog";
import { ConnectionStatus } from "@/components/dashboard/ConnectionStatus";
import { exportIdentityData } from "@/utils/exportUtils";
import { toast } from "sonner";
import { useState } from "react";

// Mock data for recipients
const recipients = [
  {
    id: "0x7a2...9f3b",
    name: "Ekon Nkosi",
    location: "Nairobi, Kenya",
    status: "Verified",
    verificationMethod: "biometric" as const,
    verifiedBy: "Community Council",
    dateCreated: "03/15/2025",
    lastVerified: "04/02/2025",
  },
  {
    id: "0x3c8...2d4e",
    name: "Amara Okafor",
    location: "Lagos, Nigeria",
    status: "Verified",
    verificationMethod: "qrcode" as const,
    verifiedBy: "NGO Partnership",
    dateCreated: "02/20/2025",
    lastVerified: "03/28/2025",
  },
  {
    id: "0x5f1...8c9d",
    name: "Kwame Mensah",
    location: "Accra, Ghana",
    status: "Pending",
    verificationMethod: "voiceprint" as const,
    verifiedBy: "Pending Approval",
    dateCreated: "03/25/2025",
    lastVerified: "Pending",
  },
  {
    id: "0x2e6...7b2c",
    name: "Zainab Abara",
    location: "Mogadishu, Somalia",
    status: "Verified",
    verificationMethod: "biometric" as const,
    verifiedBy: "Regional Authority",
    dateCreated: "01/10/2025",
    lastVerified: "03/15/2025",
  },
];

export default function Identity() {
  const [newRegistrationOpen, setNewRegistrationOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await exportIdentityData();
      toast.success('Identity data exported successfully');
    } catch (error) {
      toast.error('Failed to export data', {
        description: 'Please try again'
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-chai-darkblue">Identity Management</h1>
          <p className="text-chai-gray mt-1">Secure blockchain-based identities for crisis-affected individuals</p>
        </div>
        <div className="flex space-x-3 mt-4 md:mt-0">
          <Button 
            variant="outline" 
            className="flex items-center"
            onClick={handleExport}
            disabled={isExporting}
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button 
            className="flex items-center bg-chai-blue hover:bg-chai-darkblue"
            onClick={() => setNewRegistrationOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Registration
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Identity Verification Methods</CardTitle>
            <CardDescription>Multiple verification approaches for different environments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <Fingerprint className="h-8 w-8 text-chai-blue" />
                  <span className="bg-chai-blue/10 text-chai-blue px-2 py-1 rounded-full text-xs font-medium">Primary</span>
                </div>
                <h3 className="font-bold mb-1">Biometric ID</h3>
                <p className="text-sm text-chai-gray mb-3">Fingerprint, iris, or facial recognition for strongest verification.</p>
                <Button variant="link" className="px-0 text-chai-blue flex items-center">
                  Learn more <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
              
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <QrCode className="h-8 w-8 text-chai-green" />
                  <span className="bg-chai-green/10 text-chai-green px-2 py-1 rounded-full text-xs font-medium">Alternative</span>
                </div>
                <h3 className="font-bold mb-1">QR Code System</h3>
                <p className="text-sm text-chai-gray mb-3">Scannable unique QR codes for regions with device limitations.</p>
                <Button variant="link" className="px-0 text-chai-blue flex items-center">
                  Learn more <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
              
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <svg className="h-8 w-8 text-chai-orange" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="bg-chai-orange/10 text-chai-orange px-2 py-1 rounded-full text-xs font-medium">Fallback</span>
                </div>
                <h3 className="font-bold mb-1">Voice Authentication</h3>
                <p className="text-sm text-chai-gray mb-3">Voice recognition for areas with low technology access.</p>
                <Button variant="link" className="px-0 text-chai-blue flex items-center">
                  Learn more <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Verification Stats</CardTitle>
            <CardDescription>Current identity verification metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-chai-gray">Total Registered</span>
                  <span className="font-bold">32,450</span>
                </div>
                <div className="h-2 w-full bg-gray-200 rounded-full">
                  <div className="h-full bg-chai-blue rounded-full" style={{ width: "100%" }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-chai-gray">Fully Verified</span>
                  <span className="font-bold">28,389 (87.5%)</span>
                </div>
                <div className="h-2 w-full bg-gray-200 rounded-full">
                  <div className="h-full bg-chai-green rounded-full" style={{ width: "87.5%" }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-chai-gray">Pending Verification</span>
                  <span className="font-bold">3,216 (9.9%)</span>
                </div>
                <div className="h-2 w-full bg-gray-200 rounded-full">
                  <div className="h-full bg-chai-orange rounded-full" style={{ width: "9.9%" }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-chai-gray">Failed Verification</span>
                  <span className="font-bold">845 (2.6%)</span>
                </div>
                <div className="h-2 w-full bg-gray-200 rounded-full">
                  <div className="h-full bg-chai-red rounded-full" style={{ width: "2.6%" }}></div>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="font-medium mb-2">Verification Methods</h3>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-chai-lightgray rounded p-2">
                    <Fingerprint className="h-5 w-5 mx-auto mb-1 text-chai-blue" />
                    <span className="text-xs">65%</span>
                  </div>
                  <div className="bg-chai-lightgray rounded p-2">
                    <QrCode className="h-5 w-5 mx-auto mb-1 text-chai-green" />
                    <span className="text-xs">25%</span>
                  </div>
                  <div className="bg-chai-lightgray rounded p-2">
                    <svg className="h-5 w-5 mx-auto mb-1 text-chai-orange" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-xs">10%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-chai-darkblue mb-2 sm:mb-0">Recent Identities</h2>
          <div className="flex space-x-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search identities..." 
                className="w-full pl-8"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
          {recipients.map((recipient) => (
            <CrisisIDCard key={recipient.id} recipient={recipient} />
          ))}
        </div>
      </div>
      
      <div className="mb-8">
        <ConnectionStatus />
      </div>
      
      <Card className="bg-chai-lightblue/10 border-chai-lightblue/30">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="mb-4 md:mb-0 md:mr-6">
              <Link className="h-10 w-10 text-chai-blue" />
            </div>
            <div className="flex-grow text-center md:text-left mb-4 md:mb-0">
              <h3 className="font-bold text-lg text-chai-darkblue">Connect External Identity Systems</h3>
              <p className="text-chai-gray">Integrate with existing humanitarian ID systems for faster verification.</p>
            </div>
            <Button className="bg-chai-blue hover:bg-chai-darkblue">
              Connect Systems
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <NewRegistrationDialog 
        open={newRegistrationOpen} 
        onOpenChange={setNewRegistrationOpen} 
      />
    </div>
  );
}
