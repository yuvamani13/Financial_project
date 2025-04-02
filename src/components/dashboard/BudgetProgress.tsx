
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getProgressColor } from "@/lib/utils";
import AnimatedNumber from "../ui/AnimatedNumber";

interface BudgetProgressProps {
  budgetAmount: number;
  spentAmount: number;
  className?: string;
}

const BudgetProgress = ({
  budgetAmount,
  spentAmount,
  className,
}: BudgetProgressProps) => {
  const percentage = budgetAmount > 0 ? (spentAmount / budgetAmount) * 100 : 0;
  const remaining = budgetAmount - spentAmount;
  const progressColor = getProgressColor(percentage);

  return (
    <Card className={`${className} animate-slide-up [animation-delay:400ms]`}>
      <CardHeader>
        <CardTitle className="text-xl">Monthly Budget</CardTitle>
        <CardDescription>Your spending against your budget</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <span className="text-sm font-medium">Progress</span>
          <span className="text-sm font-medium">{percentage.toFixed(0)}%</span>
        </div>
        <Progress value={percentage} className={progressColor} />

        <div className="grid grid-cols-2 gap-4 pt-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Budget</p>
            <p className="text-2xl font-semibold">
              <AnimatedNumber value={budgetAmount} />
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Remaining</p>
            <p className="text-2xl font-semibold">
              <AnimatedNumber value={remaining} />
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetProgress;
