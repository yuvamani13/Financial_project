import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TransactionsList from "@/components/transactions/TransactionsList";
import TransactionForm from "@/components/transactions/TransactionForm";
import useExpenses from "@/hooks/useExpenses";

const Transactions = () => {
  const { 
    transactions, 
    categories, 
    addTransaction, 
    removeTransaction 
  } = useExpenses();

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <h1 className="text-3xl font-semibold mb-1">
        Transactions
      </h1>
      <p className="text-muted-foreground mb-8">
        Manage your income and expenses
      </p>

      <Tabs defaultValue="list">
        <TabsList className="mb-8">
          <TabsTrigger value="list">Transaction List</TabsTrigger>
          <TabsTrigger value="add">Add Transaction</TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          <TransactionsList
            transactions={transactions}
            categories={categories}
            onRemove={removeTransaction}
          />
        </TabsContent>
        <TabsContent value="add">
          <TransactionForm
            categories={categories}
            onAddTransaction={addTransaction}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Transactions;
