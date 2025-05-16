import type { TransactionType } from '@prisma/client';
import type { CategorySummary } from './category.types';

export interface TransactionFilters {
  userId: string;
  date?: {
    gte: Date; //Maior ou igual que
    lte: Date; //Menor ou igual que
  };
  type?: TransactionType;
  categoryId?: string;
}

export interface TransactionSummary {
  totalExpenses: number;
  totalIncomes: number;
  balance: number;
  expensesByCategory: CategorySummary[];
}
