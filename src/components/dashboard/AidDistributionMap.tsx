import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

// This is a simplified mock component for the aid distribution map
// In a real implementation, you would use libraries like Leaflet, MapBox, or Google Maps

export function AidDistributionMap() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  
  const regions = [
    { id: 'region1', name: 'Northern Nigeria', recipients: 12540, aidValue: 125400 },
    { id: 'region2', name: 'Eastern Ethiopia', recipients: 8320, aidValue: 83200 },
    { id: 'region3', name: 'Southern Sudan', recipients: 15780, aidValue: 157800 },
    { id: 'region4', name: 'Western Kenya', recipients: 6230, aidValue: 62300 },
  ];

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Aid Distribution Map</CardTitle>
        <CardDescription>Real-time view of aid distribution across regions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative rounded-md bg-slate-100 h-[400px] overflow-hidden border border-slate-200">
          {/* Mock map image - in a real app, render an actual map here */}

          <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Africa_%28orthographic_projection%29.svg/1200px-Africa_%28orthographic_projection%29.svg.png')] bg-cover bg-center opacity-10"></div>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[80%] h-[80%] relative flex">
              {/* These would be actual map markers in a real implementation */}
              {regions.map((region) => (
                <button
                  key={region.id}
                  className={`absolute rounded-full flex items-center justify-center transition-all duration-200 ${
                    selectedRegion === region.id 
                      ? "bg-chai-blue text-white border-2 border-white" 
                      : "bg-chai-orange bg-opacity-70 hover:bg-opacity-100"
                  }`}
                  style={{
                    width: `${Math.min(60, Math.max(30, region.recipients / 500))}px`,
                    height: `${Math.min(60, Math.max(30, region.recipients / 500))}px`,
                    // These positions would be calculated based on actual coordinates in a real app
                    left: region.id === 'region1' ? '30%' : region.id === 'region2' ? '60%' : 
                          region.id === 'region3' ? '45%' : '25%',
                    top: region.id === 'region1' ? '30%' : region.id === 'region2' ? '50%' : 
                         region.id === 'region3' ? '70%' : '60%',
                  }}
                  onClick={() => setSelectedRegion(region.id === selectedRegion ? null : region.id)}
                >
                  {selectedRegion === region.id ? region.recipients : ""}
                </button>
              ))}
            </div>
          </div>
          
          {/* Region information panel */}
          {selectedRegion && (
            <div className="absolute bottom-4 right-4 bg-white rounded-md shadow-md p-4 max-w-[300px]">
              <h3 className="font-bold">
                {regions.find(r => r.id === selectedRegion)?.name}
              </h3>
              <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                <div>
                  <p className="text-chai-gray">Recipients</p>
                  <p className="font-bold">{regions.find(r => r.id === selectedRegion)?.recipients.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-chai-gray">Aid Value</p>
                  <p className="font-bold">{regions.find(r => r.id === selectedRegion)?.aidValue.toLocaleString()} AID</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="absolute bottom-4 left-4 bg-white bg-opacity-80 rounded-md p-2 text-xs">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-chai-orange mr-1"></div>
              <span>Distribution Center</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
