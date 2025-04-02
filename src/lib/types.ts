
export interface Transaction {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  type: 'income' | 'expense';
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
  budget?: number;
}

export interface MonthlyBudget {
  month: string; // Format: YYYY-MM
  amount: number;
  spent: number;
}

export interface CategorySpending {
  categoryId: string;
  amount: number;
  percentage: number;
}

export interface MonthlySpending {
  month: string; // Format: YYYY-MM
  total: number;
  categories: CategorySpending[];
}

export type TimeRange = 'week' | 'month' | 'quarter' | 'year';
