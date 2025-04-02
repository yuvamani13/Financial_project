
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpIcon, ArrowDownIcon, PlusIcon } from "lucide-react";
import { Transaction, Category } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface RecentTransactionsProps {
  transactions: Transaction[];
  categories: Category[];
  className?: string;
}

const RecentTransactions = ({
  transactions,
  categories,
  className,
}: RecentTransactionsProps) => {
  const navigate = useNavigate();
  const recentTransactions = transactions.slice(0, 5);

  return (
    <Card className={`${className} animate-slide-up [animation-delay:600ms]`}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl">Recent Transactions</CardTitle>
          <CardDescription>Your latest financial activity</CardDescription>
        </div>
        <Button size="sm" onClick={() => navigate('/transactions')}>
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {recentTransactions.length > 0 ? (
            recentTransactions.map((transaction, index) => {
              const category = categories.find(c => c.id === transaction.category);
              const isIncome = transaction.type === 'income';

              return (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between space-x-4"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isIncome ? 'bg-income/10 text-income' : 'bg-expense/10 text-expense'
                      }`}
                    >
                      {isIncome ? (
                        <ArrowUpIcon className="h-4 w-4" />
                      ) : (
                        <ArrowDownIcon className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{transaction.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {category?.name} • {formatDate(transaction.date)}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`text-sm font-medium ${
                      isIncome ? 'text-income' : 'text-expense'
                    }`}
                  >
                    {isIncome ? '+' : '-'}
                    {formatCurrency(transaction.amount)}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-6">
              <p className="text-muted-foreground mb-4">No recent transactions</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/transactions')}
              >
                <PlusIcon className="mr-2 h-4 w-4" />
                Add Transaction
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;
