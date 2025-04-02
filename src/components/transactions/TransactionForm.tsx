
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Category, Transaction } from "@/lib/types";
import { parseAmount } from "@/lib/utils";
import GlassCard from "../ui/GlassCard";

interface TransactionFormProps {
  categories: Category[];
  onAddTransaction: (transaction: Omit<Transaction, "id">) => void;
}

const TransactionForm = ({ 
  categories, 
  onAddTransaction 
}: TransactionFormProps) => {
  const [type, setType] = useState<"income" | "expense">("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !category || !description || !date) {
      return;
    }

    onAddTransaction({
      amount: parseAmount(amount),
      category,
      description,
      date,
      type,
    });

    // Reset form
    setAmount("");
    setDescription("");
    setDate(new Date().toISOString().slice(0, 10));
  };

  return (
    <GlassCard className="p-6 animate-scale-in max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-6">Add New Transaction</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Button
            type="button"
            variant={type === "expense" ? "default" : "outline"}
            className={type === "expense" ? "bg-expense text-white" : ""}
            onClick={() => setType("expense")}
          >
            Expense
          </Button>
          <Button
            type="button"
            variant={type === "income" ? "default" : "outline"}
            className={type === "income" ? "bg-income text-white" : ""}
            onClick={() => setType("income")}
          >
            Income
          </Button>
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={category} onValueChange={setCategory} required>
            <SelectTrigger id="category">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories
                .filter((c) => 
                  type === "income" 
                    ? c.id === "income" 
                    : c.id !== "income"
                )
                .map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <Button type="submit" className="w-full">
          Add Transaction
        </Button>
      </form>
    </GlassCard>
  );
};

export default TransactionForm;
