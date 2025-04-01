
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ArrowUpRight, ArrowDownRight, Plus, Wallet, LineChart as LineChartIcon, ShoppingCart, User } from "lucide-react";
import { TransactionItem } from "@/components/TransactionItem";
import { Transaction } from "@/types/transaction";
import { useTransactionData, useCategoryData } from "@/hooks/useDataFetching";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

// Computed data for the dashboard based on the transaction data
const BalanceSummary = ({ transactions }: { transactions: Transaction[] }) => {
  const [summary, setSummary] = useState({
    income: 0,
    expenses: 0,
    balance: 0,
  });

  useEffect(() => {
    if (transactions.length > 0) {
      const income = transactions
        .filter(t => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);
      
      const expenses = transactions
        .filter(t => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);
      
      setSummary({
        income,
        expenses,
        balance: income - expenses
      });
    }
  }, [transactions]);

  return summary;
};

// Mock monthly data (normally would be computed from transactions)
const monthlyData = [
  { name: "Jan", income: 3200, expenses: 2800 },
  { name: "Feb", income: 4100, expenses: 3100 },
  { name: "Mar", income: 3800, expenses: 2900 },
  { name: "Apr", income: 4000, expenses: 3300 },
  { name: "May", income: 4500, expenses: 3500 },
  { name: "Jun", income: 4750, expenses: 3250 },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { transactions, loading: transactionsLoading } = useTransactionData();
  const { categories, loading: categoriesLoading } = useCategoryData();
  const balanceSummary = BalanceSummary({ transactions });
  
  // Get 5 most recent transactions
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const quickActions = [
    { id: "amazon", name: "Amazon", description: "Up to 60% off", icon: ShoppingCart, color: "bg-blue-500" },
    { id: "zomato", name: "Zomato", description: "Order now", icon: ShoppingCart, color: "bg-orange-500" },
    { id: "gaming", name: "Gaming", description: "90% off", icon: User, color: "bg-purple-500" },
    { id: "netflix", name: "Netflix", description: "Stream now", icon: User, color: "bg-red-500" },
  ];

  const handleQuickActionClick = (id: string) => {
    navigate(`/app/products/${id}`);
  };

  return (
    <div className="space-y-8 pb-16 md:pb-0 bg-white text-black">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-black">Dashboard</h1>
          <p className="text-gray-600">Welcome to your financial overview</p>
        </div>
        <Button onClick={() => navigate("/app/transactions")} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          New Transaction
        </Button>
      </div>
      
      {/* Financial Summary Cards */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        {/* Wallet Balance */}
        <Card className="overflow-hidden border-none shadow-md bg-wallet-bg text-wallet-text">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20">
                <Wallet className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-white/80">Wallet Balance</p>
                <h2 className="text-3xl font-bold">${balanceSummary.balance.toLocaleString()}</h2>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Total Savings */}
        <Card className="overflow-hidden border-none shadow-md bg-savings-bg text-savings-text">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20">
                <ArrowUpRight className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-white/80">Total Savings</p>
                <h2 className="text-3xl font-bold">${balanceSummary.income.toLocaleString()}</h2>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Monthly Expenses */}
        <Card className="overflow-hidden border-none shadow-md bg-expenses-bg text-expenses-text">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20">
                <ShoppingCart className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-white/80">Monthly Expenses</p>
                <h2 className="text-3xl font-bold">${balanceSummary.expenses.toLocaleString()}</h2>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        {/* Chart */}
        <Card className="col-span-1 lg:col-span-2 border shadow-sm bg-white">
          <CardHeader>
            <CardTitle className="text-black">Yearly Expense Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="expenses" 
                    stroke="#7c3aed" 
                    strokeWidth={2} 
                    dot={{ r: 0 }}
                    activeDot={{ r: 8 }}
                    fill="url(#colorExpenses)"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="income" 
                    stroke="#10b981" 
                    strokeWidth={2} 
                    dot={{ r: 0 }}
                    activeDot={{ r: 8 }}
                  />
                  <defs>
                    <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Quick Actions */}
        <Card className="border shadow-sm bg-white">
          <CardHeader>
            <CardTitle className="text-black">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action) => (
                <div
                  key={action.id}
                  className="flex flex-col items-center p-3 rounded-xl border border-gray-200 bg-[#f5f5dc] hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleQuickActionClick(action.id)}
                >
                  <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", action.color)}>
                    <action.icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="mt-2 font-medium text-sm text-black">{action.name}</span>
                  <span className="text-xs text-gray-600">{action.description}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Transactions */}
      <Card className="border shadow-sm bg-white">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-black">Recent Transactions</CardTitle>
            <CardDescription>Your latest financial activity</CardDescription>
          </div>
          <Button 
            variant="outline" 
            className="text-sm" 
            onClick={() => navigate("/app/transactions")}
          >
            View All
          </Button>
        </CardHeader>
        <CardContent>
          {recentTransactions.length > 0 ? (
            <div className="space-y-1">
              {recentTransactions.map((transaction) => (
                <TransactionItem key={transaction.id} transaction={transaction} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">No transactions yet</p>
              <Button 
                className="mt-4" 
                onClick={() => navigate("/app/transactions")}
              >
                Add Your First Transaction
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
