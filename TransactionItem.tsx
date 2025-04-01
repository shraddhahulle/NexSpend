
import { formatDistanceToNow } from "date-fns";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Transaction } from "@/types/transaction";

interface TransactionItemProps {
  transaction: Transaction;
}

export function TransactionItem({ transaction }: TransactionItemProps) {
  const isIncome = transaction.type === "income";
  const amountFormatted = `${isIncome ? "+" : "-"}$${transaction.amount.toLocaleString()}`;
  
  const formattedDate = formatDistanceToNow(new Date(transaction.date), { addSuffix: true });

  return (
    <div className="flex items-center justify-between p-4 hover:bg-muted/30 rounded-xl transition-colors">
      <div className="flex items-center gap-4">
        <div className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center",
          isIncome ? "bg-green-100" : "bg-red-100"
        )}>
          {isIncome ? (
            <ArrowUpRight className="h-5 w-5 text-income" />
          ) : (
            <ArrowDownLeft className="h-5 w-5 text-expense" />
          )}
        </div>
        <div>
          <p className="font-medium">{transaction.title}</p>
          <p className="text-sm text-muted-foreground">{transaction.category} • {formattedDate}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={cn(
          "font-semibold",
          isIncome ? "text-income" : "text-expense"
        )}>
          {amountFormatted}
        </p>
      </div>
    </div>
  );
}
