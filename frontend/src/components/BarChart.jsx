import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement } from 'chart.js';

// Register necessary components
Chart.register(CategoryScale, LinearScale, BarElement);

const BarChart = ({ month }) => {
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/bar-chart?month=${month}`);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching bar chart data:', error);
            }
        };
        
        fetchData();
    }, [month]);

    const chartData = {
        labels: Object.keys(data),
        datasets: [
            {
                label: 'Number of Items',
                data: Object.values(data),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    return <Bar data={chartData} />;
};

export default BarChart;
