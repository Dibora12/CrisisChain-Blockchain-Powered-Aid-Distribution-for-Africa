
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for the charts
const monthlyData = [
  { name: "Jan", food: 2400, medical: 1200, water: 1800, shelter: 900 },
  { name: "Feb", food: 3000, medical: 1400, water: 2200, shelter: 1100 },
  { name: "Mar", food: 2700, medical: 1300, water: 2000, shelter: 1000 },
  { name: "Apr", food: 3300, medical: 1600, water: 2500, shelter: 1200 },
  { name: "May", food: 3600, medical: 1800, water: 2700, shelter: 1400 },
  { name: "Jun", food: 3200, medical: 1500, water: 2400, shelter: 1300 },
];

const aidTypesData = [
  { name: "Food", value: 35, color: "#5BBB5D" },
  { name: "Medical", value: 20, color: "#33A1DE" },
  { name: "Water", value: 25, color: "#7DD3FC" },
  { name: "Shelter", value: 15, color: "#F97316" },
  { name: "Education", value: 5, color: "#FCD34D" },
];

export function DistributionChart() {
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Distribution Analytics</CardTitle>
        <CardDescription>Aid token distribution by type and time</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="timeline">
          <TabsList className="mb-4">
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="category">By Category</TabsTrigger>
          </TabsList>
          <TabsContent value="timeline" className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyData}
                margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`${value} AID`, undefined]}
                  labelFormatter={(label) => `Month: ${label}`}
                />
                <Legend verticalAlign="top" height={36} />
                <Bar dataKey="food" name="Food Aid" fill="#5BBB5D" radius={[4, 4, 0, 0]} />
                <Bar dataKey="medical" name="Medical" fill="#33A1DE" radius={[4, 4, 0, 0]} />
                <Bar dataKey="water" name="Water" fill="#7DD3FC" radius={[4, 4, 0, 0]} />
                <Bar dataKey="shelter" name="Shelter" fill="#F97316" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="category" className="h-[350px]">
            <div className="flex flex-col md:flex-row items-center h-full">
              <div className="w-full md:w-3/5 h-[250px] md:h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={aidTypesData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey="value"
                      label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {aidTypesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value}%`, 'Percentage']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-full md:w-2/5 mt-4 md:mt-0 flex flex-col justify-center">
                <h3 className="text-sm font-medium mb-3">Aid Type Distribution</h3>
                <div className="space-y-2">
                  {aidTypesData.map((item) => (
                    <div key={item.name} className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-sm text-chai-gray">{item.name}</span>
                      <span className="text-sm font-medium ml-auto">{item.value}%</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="text-xs text-chai-gray">
                    Total Aid Tokens Distributed
                  </div>
                  <div className="text-2xl font-bold mt-1">238,450 AID</div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
