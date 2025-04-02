
import { useState, useEffect } from 'react';
import { Transaction, Category, MonthlyBudget, MonthlySpending } from '@/lib/types';
import { getCurrentMonth, generateCategorySpending, generateId } from '@/lib/utils';

// Sample data
const sampleCategories: Category[] = [
  { id: 'food', name: 'Food & Dining', color: '#4F46E5', icon: 'utensils' },
  { id: 'housing', name: 'Housing', color: '#0EA5E9', icon: 'home' },
  { id: 'transport', name: 'Transportation', color: '#10B981', icon: 'car' },
  { id: 'utilities', name: 'Utilities', color: '#F59E0B', icon: 'bolt' },
  { id: 'entertainment', name: 'Entertainment', color: '#EC4899', icon: 'film' },
  { id: 'shopping', name: 'Shopping', color: '#8B5CF6', icon: 'shopping-bag' },
  { id: 'healthcare', name: 'Healthcare', color: '#EF4444', icon: 'heart-pulse' },
  { id: 'personal', name: 'Personal', color: '#6366F1', icon: 'user' },
  { id: 'other', name: 'Other', color: '#94A3B8', icon: 'more-horizontal' },
  { id: 'income', name: 'Income', color: '#22C55E', icon: 'wallet' },
];

const currentMonth = getCurrentMonth();
const lastMonth = `${currentMonth.split('-')[0]}-${String(parseInt(currentMonth.split('-')[1]) - 1).padStart(2, '0')}`;

const sampleTransactions: Transaction[] = [
  {
    id: generateId(),
    amount: 1200,
    category: 'income',
    description: 'Salary',
    date: '2023-06-01',
    type: 'income',
  },
  {
    id: generateId(),
    amount: 500,
    category: 'income',
    description: 'Freelance work',
    date: '2023-06-15',
    type: 'income',
  },
  {
    id: generateId(),
    amount: 85.75,
    category: 'food',
    description: 'Grocery shopping',
    date: '2023-06-02',
    type: 'expense',
  },
  {
    id: generateId(),
    amount: 35.50,
    category: 'food',
    description: 'Restaurant',
    date: '2023-06-10',
    type: 'expense',
  },
  {
    id: generateId(),
    amount: 800,
    category: 'housing',
    description: 'Rent',
    date: '2023-06-01',
    type: 'expense',
  },
  {
    id: generateId(),
    amount: 120,
    category: 'utilities',
    description: 'Electricity bill',
    date: '2023-06-05',
    type: 'expense',
  },
  {
    id: generateId(),
    amount: 65,
    category: 'transport',
    description: 'Gas',
    date: '2023-06-08',
    type: 'expense',
  },
  {
    id: generateId(),
    amount: 45.99,
    category: 'entertainment',
    description: 'Movie tickets',
    date: '2023-06-12',
    type: 'expense',
  },
  {
    id: generateId(),
    amount: 200,
    category: 'shopping',
    description: 'New clothes',
    date: '2023-06-18',
    type: 'expense',
  },
  {
    id: generateId(),
    amount: 30,
    category: 'personal',
    description: 'Haircut',
    date: '2023-06-20',
    type: 'expense',
  },
];

const sampleBudget: MonthlyBudget = {
  month: currentMonth,
  amount: 2000,
  spent: 1382.24,
};

const useExpenses = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(sampleTransactions);
  const [categories, setCategories] = useState<Category[]>(sampleCategories);
  const [budget, setBudget] = useState<MonthlyBudget>(sampleBudget);
  const [currentMonthSpending, setCurrentMonthSpending] = useState<MonthlySpending>({
    month: currentMonth,
    total: 0,
    categories: [],
  });

  // Calculate spending by category
  useEffect(() => {
    const currentMonthTransactions = transactions.filter(t => {
      const transactionMonth = t.date.substring(0, 7);
      return transactionMonth === currentMonth;
    });

    const totalSpent = currentMonthTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const categoryIds = categories.map(c => c.id);
    const categoriesSpending = generateCategorySpending(currentMonthTransactions, categoryIds);

    setCurrentMonthSpending({
      month: currentMonth,
      total: totalSpent,
      categories: categoriesSpending,
    });

    // Update budget spent amount
    setBudget(prev => ({
      ...prev,
      spent: totalSpent,
    }));

  }, [transactions, categories, currentMonth]);

  // Add a new transaction
  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: generateId(),
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  // Remove a transaction
  const removeTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  // Update budget
  const updateBudget = (amount: number) => {
    setBudget(prev => ({
      ...prev,
      amount,
    }));
  };

  // Add a category
  const addCategory = (category: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...category,
      id: category.name.toLowerCase().replace(/\s+/g, '-'),
    };
    setCategories(prev => [...prev, newCategory]);
  };

  // Remove a category
  const removeCategory = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  // Get total income
  const getTotalIncome = (): number => {
    return transactions
      .filter(t => t.type === 'income' && t.date.startsWith(currentMonth))
      .reduce((sum, t) => sum + t.amount, 0);
  };

  // Get budget progress percentage
  const getBudgetProgress = (): number => {
    return budget.amount > 0 ? (budget.spent / budget.amount) * 100 : 0;
  };

  // Get transactions for a specific month
  const getTransactionsByMonth = (month: string): Transaction[] => {
    return transactions.filter(t => t.date.startsWith(month));
  };

  return {
    transactions,
    categories,
    budget,
    currentMonthSpending,
    addTransaction,
    removeTransaction,
    updateBudget,
    addCategory,
    removeCategory,
    getTotalIncome,
    getBudgetProgress,
    getTransactionsByMonth,
  };
};

export default useExpenses;
