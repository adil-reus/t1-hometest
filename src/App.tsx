import React, { useEffect, useState } from "react";
import { formatDateTime } from "./Utils/formatDateTime";

interface Transaction {
  id: string;
  date: string;
  amount: number;
  merchant: string;
  category: string;
}

const TransactionsTable: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // commented this as i removed .env 
        //const response = await fetch(import.meta.env.VITE_API_TRANSACTION_URL as string);
        const response = await fetch("https://tip-transactions.vercel.app/api/transactions?page=1");
        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }
        const data = await response.json();
        console.log("Fetched data:", data); // Debugging line

        // Assuming the JSON object has a key 'transactions' that holds the array
        if (data && Array.isArray(data.transactions)) {
          setTransactions(data.transactions);
        } else {
          throw new Error("Fetched data does not contain transactions array");
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) return <p className="text-center">Loading transactions...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;


  
  return (
    <div className="transactions-container">
    <h1 className="transactions-title">Expenses</h1>
    <div className="table-wrapper">
      <table className="transactions-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Merchant</th>
            <th>Category</th>
     
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{formatDateTime(transaction.date)}</td>
              <td>${transaction.amount.toFixed(2)}</td>
              <td>{transaction.merchant}</td>
              <td>{transaction.category}</td>       
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
};

export default TransactionsTable;
