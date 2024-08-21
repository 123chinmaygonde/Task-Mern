import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TransactionTable = () => {
    const [transactions, setTransactions] = useState([]);
    const [month, setMonth] = useState('March');
    const [page, setPage] = useState(1);
    const [perPage] = useState(10);
    const [search, setSearch] = useState('');

    const fetchTransactions = async () => {
        try {
            const response = await axios.get(`/api/transactions`, {
                params: { month, page, perPage, search }
            });
            setTransactions(response.data.transactions || []);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, [month, page, search]);

    return (
        <div>
            <select value={month} onChange={e => setMonth(e.target.value)}>
                {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(month => (
                    <option key={month} value={month}>{month}</option>
                ))}
            </select>
            <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Date of Sale</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.length > 0 ? (
                        transactions.map(transaction => (
                            <tr key={transaction._id}>
                                <td>{transaction.title}</td>
                                <td>{transaction.description}</td>
                                <td>{transaction.price}</td>
                                <td>{transaction.dateOfSale}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No transactions found</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <button onClick={() => setPage(prev => Math.max(prev - 1, 1))}>Previous</button>
            <button onClick={() => setPage(prev => prev + 1)}>Next</button>
        </div>
    );
};

export default TransactionTable;
