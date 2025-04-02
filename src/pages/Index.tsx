import ExpenseSummary from "@/components/dashboard/ExpenseSummary";
import BudgetProgress from "@/components/dashboard/BudgetProgress";
import ExpenseChart from "@/components/dashboard/ExpenseChart";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import useExpenses from "@/hooks/useExpenses";
import { getMonthName } from "@/lib/utils";

const Dashboard = () => {
  const { 
    transactions, 
    categories, 
    budget, 
    currentMonthSpending, 
    getTotalIncome,
    removeTransaction
  } = useExpenses();

  const currentMonth = getMonthName(budget.month);
  const income = getTotalIncome();
  const difference = income - budget.spent;

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <h1 className="text-3xl font-semibold mb-1">
        Dashboard
      </h1>
      <p className="text-muted-foreground mb-8">
        Financial overview for {currentMonth}
      </p>

      <ExpenseSummary
        spent={budget.spent}
        income={income}
        difference={difference}
        className="mb-8"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <BudgetProgress
          budgetAmount={budget.amount}
          spentAmount={budget.spent}
        />
        <ExpenseChart
          data={currentMonthSpending.categories.filter(c => c.categoryId !== 'income')}
          categories={categories}
        />
      </div>

      <RecentTransactions
        transactions={transactions}
        categories={categories}
      />
    </div>
  );
};

export default Dashboard;
