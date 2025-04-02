import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import useExpenses from "@/hooks/useExpenses";
import GlassCard from "@/components/ui/GlassCard";
import { formatCurrency } from "@/lib/utils";

const Settings = () => {
  const { budget, updateBudget } = useExpenses();
  const [budgetAmount, setBudgetAmount] = useState(budget.amount.toString());

  const handleUpdateBudget = () => {
    const amount = parseFloat(budgetAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid budget amount");
      return;
    }

    updateBudget(amount);
    toast.success("Budget updated successfully");
  };

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <h1 className="text-3xl font-semibold mb-1">
        Settings
      </h1>
      <p className="text-muted-foreground mb-8">
        Configure your budget preferences
      </p>

      <GlassCard className="p-6 mb-8">
        <h2 className="text-xl font-semibold mb-6">Monthly Budget</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="budget">Budget Amount</Label>
            <Input
              id="budget"
              value={budgetAmount}
              onChange={(e) => setBudgetAmount(e.target.value)}
              placeholder="0.00"
            />
            <p className="text-sm text-muted-foreground">
              Current budget: {formatCurrency(budget.amount)}
            </p>
          </div>
          <Button onClick={handleUpdateBudget}>Update Budget</Button>
        </div>
      </GlassCard>

      <GlassCard className="p-6">
        <h2 className="text-xl font-semibold mb-6">About</h2>
        <p className="text-muted-foreground mb-4">
          BudgetTrack helps you manage your personal finances with ease. Track your expenses, set budgets, and gain insights into your spending habits.
        </p>
        <Separator className="my-4" />
        <p className="text-sm text-muted-foreground">
          Version 1.0.0
        </p>
      </GlassCard>
    </div>
  );
};

export default Settings;
