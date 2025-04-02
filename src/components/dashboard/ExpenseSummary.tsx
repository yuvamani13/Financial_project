
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownIcon, ArrowUpIcon, DollarSignIcon } from "lucide-react";
import AnimatedNumber from "../ui/AnimatedNumber";

interface ExpenseSummaryProps {
  spent: number;
  income: number;
  difference: number;
  className?: string;
}

const ExpenseSummary = ({
  spent,
  income,
  difference,
  className,
}: ExpenseSummaryProps) => {
  const isPositive = difference >= 0;

  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${className}`}>
      <Card className="animate-slide-up [animation-delay:100ms]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-normal text-muted-foreground">
            Monthly Expenses
          </CardTitle>
          <DollarSignIcon className="h-4 w-4 text-expense opacity-70" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold">
            <AnimatedNumber value={spent} />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            For current month
          </p>
        </CardContent>
      </Card>

      <Card className="animate-slide-up [animation-delay:200ms]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-normal text-muted-foreground">
            Monthly Income
          </CardTitle>
          <DollarSignIcon className="h-4 w-4 text-income opacity-70" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold">
            <AnimatedNumber value={income} />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            For current month
          </p>
        </CardContent>
      </Card>

      <Card className="animate-slide-up [animation-delay:300ms]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-normal text-muted-foreground">
            Balance
          </CardTitle>
          {isPositive ? (
            <ArrowUpIcon className="h-4 w-4 text-income opacity-70" />
          ) : (
            <ArrowDownIcon className="h-4 w-4 text-expense opacity-70" />
          )}
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-semibold ${isPositive ? 'text-income' : 'text-expense'}`}>
            <AnimatedNumber value={difference} />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {isPositive ? '+' : ''}{(difference / income * 100).toFixed(1)}% from expenses
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpenseSummary;
