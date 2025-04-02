
import React, { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Category, CategorySpending } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';

interface ExpenseChartProps {
  data: CategorySpending[];
  categories: Category[];
  className?: string;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 rounded-md shadow-md border text-sm">
        <p className="font-semibold">{data.name}</p>
        <p>{formatCurrency(data.value)}</p>
        <p className="text-muted-foreground">{data.percentage.toFixed(1)}%</p>
      </div>
    );
  }
  return null;
};

const ExpenseChart = ({ data, categories, className }: ExpenseChartProps) => {
  const chartData = useMemo(() => {
    return data
      .filter(item => item.amount > 0)
      .map(item => {
        const category = categories.find(c => c.id === item.categoryId);
        return {
          name: category?.name || 'Unknown',
          value: item.amount,
          percentage: item.percentage,
          color: category?.color || '#94A3B8',
        };
      });
  }, [data, categories]);

  const totalAmount = useMemo(() => {
    return chartData.reduce((sum, item) => sum + item.value, 0);
  }, [chartData]);

  return (
    <Card className={`${className} animate-slide-up [animation-delay:500ms]`}>
      <CardHeader>
        <CardTitle className="text-xl">Expense Breakdown</CardTitle>
        <CardDescription>Where your money is going</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  animationDuration={750}
                  animationBegin={400}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full w-full flex items-center justify-center">
              <p className="text-muted-foreground">No expense data available</p>
            </div>
          )}
        </div>

        <div className="space-y-2 mt-6">
          {chartData.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <div className="flex justify-between w-full">
                <span className="text-sm">{item.name}</span>
                <span className="text-sm font-medium">{item.percentage.toFixed(1)}%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseChart;
