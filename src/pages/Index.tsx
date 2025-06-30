import { StatCard } from "@/components/dashboard/StatCard";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { DistributionChart } from "@/components/dashboard/DistributionChart";
import { AidDistributionMap } from "@/components/dashboard/AidDistributionMap";
import { ConnectionStatus } from "@/components/dashboard/ConnectionStatus";
import { CreditCard, Users, MapPin, TrendingUp, Shield, UserCheck, HandHeart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Index() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col lg:flex-row items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Crisis Aid Dashboard</h1>
          <p className="text-muted-foreground">
            Privacy-preserving humanitarian aid distribution powered by Midnight blockchain
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Active Recipients"
          value="2,847"
          icon={Users}
          trend={{ value: 12, positive: true }}
          description="Verified individuals receiving aid"
        />
        <StatCard
          title="Aid Distributed"
          value="$284,923"
          icon={CreditCard}
          trend={{ value: 8, positive: true }}
          description="Total value distributed this month"
        />
        <StatCard
          title="Active Locations"
          value="47"
          icon={MapPin}
          trend={{ value: 3, positive: true }}
          description="Crisis zones currently served"
        />
        <StatCard
          title="Privacy Rate"
          value="98.7%"
          icon={TrendingUp}
          trend={{ value: 0.3, positive: true }}
          description="Transactions with zero-knowledge protection"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20 border-blue-200 dark:border-blue-800 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-blue-900 dark:text-blue-100">
              <div className="p-2 bg-blue-600 rounded-lg mr-3">
                <Shield className="h-5 w-5 text-white" />
              </div>
              Crisis ID Verification
            </CardTitle>
            <CardDescription className="text-blue-700 dark:text-blue-300">
              Secure identity verification using zero-knowledge proofs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-blue-600 dark:text-blue-400 mb-4 leading-relaxed">
              Verify your identity privately while maintaining anonymity through advanced cryptographic methods.
            </p>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200">
              <Shield className="h-4 w-4 mr-2" />
              Verify Identity
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/20 border-green-200 dark:border-green-800 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-green-900 dark:text-green-100">
              <div className="p-2 bg-green-600 rounded-lg mr-3">
                <CreditCard className="h-5 w-5 text-white" />
              </div>
              Aid Token Distribution
            </CardTitle>
            <CardDescription className="text-green-700 dark:text-green-300">
              Distribute aid tokens to verified recipients
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-green-600 dark:text-green-400 mb-4 leading-relaxed">
              Create and distribute privacy-preserving aid tokens powered by Midnight blockchain technology.
            </p>
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg transition-all duration-200">
              <CreditCard className="h-4 w-4 mr-2" />
              Distribute Aid
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/20 border-purple-200 dark:border-purple-800 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-purple-900 dark:text-purple-100">
              <div className="p-2 bg-purple-600 rounded-lg mr-3">
                <UserCheck className="h-5 w-5 text-white" />
              </div>
              Community Verification
            </CardTitle>
            <CardDescription className="text-purple-700 dark:text-purple-300">
              DAO-based verification by community witnesses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-purple-600 dark:text-purple-400 mb-4 leading-relaxed">
              Participate in community-driven verification processes to help establish trust and legitimacy.
            </p>
            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-200">
              <UserCheck className="h-4 w-4 mr-2" />
              Join Verification
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Distribution Overview</CardTitle>
              <CardDescription className="text-muted-foreground">
                Monthly aid distribution trends with privacy metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DistributionChart />
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <ConnectionStatus />
          
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Recent Activity</CardTitle>
              <CardDescription className="text-muted-foreground">
                Latest aid distributions and verifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RecentTransactions />
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Global Aid Distribution Map</CardTitle>
          <CardDescription className="text-muted-foreground">
            Real-time view of active crisis zones and aid distribution points
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AidDistributionMap />
        </CardContent>
      </Card>
    </div>
  );
}
