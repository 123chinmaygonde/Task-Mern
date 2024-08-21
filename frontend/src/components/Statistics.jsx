import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Statistics = ({ month }) => {
    const [statistics, setStatistics] = useState({});

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const response = await axios.get(`/api/statistics?month=${month}`);
                setStatistics(response.data);
            } catch (error) {
                console.error('Error fetching statistics:', error);
            }
        };
        fetchStatistics();
    }, [month]);

    return (
        <div>
            <h3>Statistics for {month}</h3>
            <p>Total Sale Amount: {statistics.totalSaleAmount || 0}</p>
            <p>Total Sold Items: {statistics.totalSoldItems || 0}</p>
            <p>Total Not Sold Items: {statistics.totalNotSoldItems || 0}</p>
        </div>
    );
};

export default Statistics;
