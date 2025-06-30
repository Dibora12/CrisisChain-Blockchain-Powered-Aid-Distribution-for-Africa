
import { 
  Users, UserCheck, Search, Shield, Fingerprint, 
  CheckCircle, Settings, Filter, Clock, HandHeart 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CommunityVerificationPanel } from "@/components/verification/CommunityVerificationPanel";
import { VerifyIdentityDialog } from "@/components/dialogs/VerifyIdentityDialog";
import { NewRegistrationDialog } from "@/components/dialogs/NewRegistrationDialog";
import { useState } from "react";

// Mock data for verification requests
const verificationRequests = [
  {
    recipientName: "Ekon Nkosi",
    recipientId: "0x7a2...9f3b",
    status: "pending" as const,
    locationName: "Nairobi, Kenya",
    verifiers: [
      {
        name: "Elder Makena",
        role: "Community Elder",
        status: "approved" as const,
        timestamp: "2 hours ago"
      },
      {
        name: "John Kamau",
        role: "Local NGO Worker",
        status: "approved" as const,
        timestamp: "3 hours ago"
      },
      {
        name: "Sarah Omondi",
        role: "Regional Authority",
        status: "pending" as const,
        timestamp: "pending"
      }
    ],
    requiredVerifications: 3
  },
  {
    recipientName: "Amara Okafor",
    recipientId: "0x3c8...2d4e",
    status: "verified" as const,
    locationName: "Lagos, Nigeria",
    verifiers: [
      {
        name: "Chief Adebayo",
        role: "Community Leader",
        status: "approved" as const,
        timestamp: "1 day ago"
      },
      {
        name: "Dr. Ngozi",
        role: "Medical Volunteer",
        status: "approved" as const,
        timestamp: "1 day ago"
      },
      {
        name: "Olufemi Adeyemi",
        role: "Aid Worker",
        status: "approved" as const,
        timestamp: "2 days ago"
      }
    ],
    requiredVerifications: 3
  }
];

export default function Verification() {
  const [verifyIdentityOpen, setVerifyIdentityOpen] = useState(false);
  const [applyForAidOpen, setApplyForAidOpen] = useState(false);

  const handleApplyNow = () => {
    setVerifyIdentityOpen(true);
  };

  const handleApplyForAid = () => {
    setApplyForAidOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Community Verification</h1>
          <p className="text-muted-foreground mt-1">DAO-based verification by community witnesses and elders</p>
        </div>
        <div className="flex space-x-3 mt-4 md:mt-0">
          <Button 
            onClick={handleApplyForAid}
            className="flex items-center bg-green-600 hover:bg-green-700 text-white"
          >
            <HandHeart className="h-4 w-4 mr-2" />
            Apply for Aid
          </Button>
          <Button variant="outline" className="flex items-center border-border text-foreground hover:bg-muted">
            <Shield className="h-4 w-4 mr-2" />
            Verifier Portal
          </Button>
          <Button 
            className="flex items-center bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={handleApplyNow}
          >
            <UserCheck className="h-4 w-4 mr-2" />
            Apply Now
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <Card className="border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-800">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center">
              <div className="mb-4 md:mb-0 md:mr-6">
                <HandHeart className="h-10 w-10 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-grow text-center md:text-left mb-4 md:mb-0">
                <h3 className="font-bold text-lg text-green-800 dark:text-green-200">Need Aid? Apply Here</h3>
                <p className="text-green-700 dark:text-green-300">Submit your aid request with privacy protection through zero-knowledge proofs.</p>
              </div>
              <Button 
                onClick={handleApplyForAid}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Apply for Aid
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-foreground">
              <Users className="h-5 w-5 mr-2 text-blue-600" />
              Active Verifiers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">438</div>
            <p className="text-sm text-muted-foreground">Community witnesses</p>
            <div className="flex items-center mt-2 text-green-600 text-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                <path d="M7 17l5-5 5 5M7 7l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              +23 new this month
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-foreground">
              <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
              Successful Verifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">28,389</div>
            <p className="text-sm text-muted-foreground">Identities verified</p>
            <div className="flex items-center mt-2 text-green-600 text-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                <path d="M7 17l5-5 5 5M7 7l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              97.2% success rate
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-foreground">
              <Clock className="h-5 w-5 mr-2 text-orange-600" />
              Pending Verifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">146</div>
            <p className="text-sm text-muted-foreground">Awaiting verification</p>
            <div className="mt-2 text-orange-600 text-sm">
              Avg. time: 8.2 hours
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-8 bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Verification Process</CardTitle>
          <CardDescription className="text-muted-foreground">How community-based verification works</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="flex-grow">
              <div className="relative">
                <div className="hidden md:block absolute z-0 top-1/2 left-[35px] right-[35px] h-0.5 bg-border"></div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-10">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-950/20 flex items-center justify-center mb-3">
                      <Fingerprint className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="font-medium mb-1 text-foreground">Identity Claim</h3>
                    <p className="text-xs text-muted-foreground">Individual requests identity verification</p>
                  </div>
                  
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-orange-100 dark:bg-orange-950/20 flex items-center justify-center mb-3">
                      <Users className="h-8 w-8 text-orange-600" />
                    </div>
                    <h3 className="font-medium mb-1 text-foreground">Witness Gathering</h3>
                    <p className="text-xs text-muted-foreground">Community elders and approved witnesses are notified</p>
                  </div>
                  
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-950/20 flex items-center justify-center mb-3">
                      <UserCheck className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="font-medium mb-1 text-foreground">DAO Voting</h3>
                    <p className="text-xs text-muted-foreground">Witnesses vote to confirm identity</p>
                  </div>
                  
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-950/20 flex items-center justify-center mb-3">
                      <Shield className="h-8 w-8 text-purple-600" />
                    </div>
                    <h3 className="font-medium mb-1 text-foreground">Blockchain Record</h3>
                    <p className="text-xs text-muted-foreground">Identity is permanently recorded on blockchain</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/3 bg-muted p-4 rounded-lg">
              <h3 className="font-medium mb-2 text-foreground">Benefits of Community Verification</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                  <span className="text-muted-foreground">Works in regions with limited technology access</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                  <span className="text-muted-foreground">Leverages existing community trust networks</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                  <span className="text-muted-foreground">Prevents fraud through multiple independent witnesses</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                  <span className="text-muted-foreground">Creates immutable blockchain record of verification</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="mb-6">
        <Tabs defaultValue="pending">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
            <TabsList className="bg-muted">
              <TabsTrigger value="pending" className="flex items-center data-[state=active]:bg-background data-[state=active]:text-foreground">
                <Clock className="h-4 w-4 mr-2" />
                <span>Pending</span>
              </TabsTrigger>
              <TabsTrigger value="verified" className="flex items-center data-[state=active]:bg-background data-[state=active]:text-foreground">
                <CheckCircle className="h-4 w-4 mr-2" />
                <span>Verified</span>
              </TabsTrigger>
            </TabsList>
            
            <div className="flex space-x-2 w-full sm:w-auto mt-4 sm:mt-0">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search verifications..." 
                  className="w-full pl-8 bg-background border-border text-foreground"
                />
              </div>
              <Button variant="outline" size="icon" className="border-border text-foreground hover:bg-muted">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="border-border text-foreground hover:bg-muted">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <TabsContent value="pending">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {verificationRequests.filter(req => req.status === 'pending').map((request, index) => (
                <CommunityVerificationPanel 
                  key={index}
                  recipientName={request.recipientName}
                  recipientId={request.recipientId}
                  status={request.status}
                  locationName={request.locationName}
                  verifiers={request.verifiers}
                  requiredVerifications={request.requiredVerifications}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="verified">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {verificationRequests.filter(req => req.status === 'verified').map((request, index) => (
                <CommunityVerificationPanel 
                  key={index}
                  recipientName={request.recipientName}
                  recipientId={request.recipientId}
                  status={request.status}
                  locationName={request.locationName}
                  verifiers={request.verifiers}
                  requiredVerifications={request.requiredVerifications}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <Card className="bg-gradient-to-r from-green-100 to-green-50 dark:from-green-950/20 dark:to-green-900/20 border-green-200 dark:border-green-800">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="mb-4 md:mb-0 md:mr-6">
              <UserCheck className="h-10 w-10 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex-grow text-center md:text-left mb-4 md:mb-0">
              <h3 className="font-bold text-lg text-green-800 dark:text-green-200">Become a Community Verifier</h3>
              <p className="text-green-700 dark:text-green-300">Help your community by verifying identities and enabling aid distribution.</p>
            </div>
            <Button 
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={handleApplyNow}
            >
              Apply Now
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <VerifyIdentityDialog 
        open={verifyIdentityOpen} 
        onOpenChange={setVerifyIdentityOpen} 
      />
      
      <NewRegistrationDialog 
        open={applyForAidOpen} 
        onOpenChange={setApplyForAidOpen} 
      />
    </div>
  );
}
