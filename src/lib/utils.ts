
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Transaction, CategorySpending } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount)
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date)
}

export function getCurrentMonth(): string {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
}

export function getMonthName(monthStr: string): string {
  const [year, month] = monthStr.split('-')
  const date = new Date(parseInt(year), parseInt(month) - 1, 1)
  return date.toLocaleString('default', { month: 'long', year: 'numeric' })
}

export function calculateCategorySpending(
  transactions: Transaction[],
  categoryId: string
): number {
  return transactions
    .filter(t => t.category === categoryId && t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)
}

export function generateCategorySpending(
  transactions: Transaction[],
  categories: string[]
): CategorySpending[] {
  const totalSpent = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  return categories.map(categoryId => {
    const amount = calculateCategorySpending(transactions, categoryId)
    return {
      categoryId,
      amount,
      percentage: totalSpent > 0 ? (amount / totalSpent) * 100 : 0
    }
  })
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15)
}

export function parseAmount(input: string): number {
  return parseFloat(input.replace(/[^\d.-]/g, ''))
}

export function getProgressColor(percentage: number): string {
  if (percentage < 70) return 'bg-income'
  if (percentage < 90) return 'bg-yellow-500'
  return 'bg-expense'
}
