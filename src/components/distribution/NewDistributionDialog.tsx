
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCreateDistribution } from "@/hooks/useDistributions";
import { useCreateAidToken } from "@/hooks/useAidTokens";
import { Shield, Plus } from "lucide-react";
import { toast } from "sonner";

export function NewDistributionDialog() {
  const [open, setOpen] = useState(false);
  const [recipientId, setRecipientId] = useState("");
  const [amount, setAmount] = useState("");
  const [tokenType, setTokenType] = useState("");
  const [restrictions, setRestrictions] = useState("");
  const [expiryDays, setExpiryDays] = useState("90");

  const createDistribution = useCreateDistribution();
  const createAidToken = useCreateAidToken();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!recipientId || !amount || !tokenType) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      // Create the distribution record
      const distribution = await createDistribution.mutateAsync({
        recipient_id: recipientId,
        amount: parseFloat(amount),
        aid_request_id: "system-generated", // This would normally come from an aid request
      });

      // Create the corresponding aid token
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + parseInt(expiryDays));

      await createAidToken.mutateAsync({
        recipient_id: recipientId,
        amount: parseFloat(amount),
        token_type: tokenType as any,
        restrictions: restrictions.split(",").map(r => r.trim()).filter(Boolean),
        expires_at: expiryDate.toISOString(),
      });

      setOpen(false);
      setRecipientId("");
      setAmount("");
      setTokenType("");
      setRestrictions("");
      setExpiryDays("90");

      toast.success("Distribution created successfully with Midnight privacy protection!");
    } catch (error) {
      console.error("Failed to create distribution:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center bg-chai-blue hover:bg-chai-darkblue">
          <Plus className="h-4 w-4 mr-2" />
          New Distribution
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2 text-purple-600" />
            Create New Aid Distribution
          </DialogTitle>
          <DialogDescription>
            Create a secure, private aid distribution using Midnight blockchain technology.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="recipient" className="text-right">
                Recipient ID
              </Label>
              <Input
                id="recipient"
                value={recipientId}
                onChange={(e) => setRecipientId(e.target.value)}
                className="col-span-3"
                placeholder="Enter recipient wallet address"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount
              </Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="col-span-3"
                placeholder="Enter token amount"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Aid Type
              </Label>
              <Select value={tokenType} onValueChange={setTokenType} required>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select aid type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="food">Food Aid</SelectItem>
                  <SelectItem value="medical">Medical Supplies</SelectItem>
                  <SelectItem value="shelter">Shelter</SelectItem>
                  <SelectItem value="water">Water</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="emergency">Emergency</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="restrictions" className="text-right">
                Restrictions
              </Label>
              <Textarea
                id="restrictions"
                value={restrictions}
                onChange={(e) => setRestrictions(e.target.value)}
                className="col-span-3"
                placeholder="Enter usage restrictions (comma-separated)"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="expiry" className="text-right">
                Expiry (days)
              </Label>
              <Input
                id="expiry"
                type="number"
                value={expiryDays}
                onChange={(e) => setExpiryDays(e.target.value)}
                className="col-span-3"
                placeholder="90"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={createDistribution.isPending || createAidToken.isPending}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {createDistribution.isPending || createAidToken.isPending ? (
                "Creating..."
              ) : (
                <>
                  <Shield className="h-4 w-4 mr-2" />
                  Create Distribution
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
